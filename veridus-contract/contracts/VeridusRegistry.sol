// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title  VeridusRegistry
 * @author Veridus Protocol
 * @notice Immutable trust-anchor registry for academic credential hashes.
 *         Any wallet address may anchor SHA-256 credential hashes; the anchoring
 *         wallet identity is recorded via msg.sender.  No personal data is stored on-chain.
 *         Issuance permission is enforced off-chain by the VERIDUS backend.
 *
 * @dev    Security model
 *         ─────────────
 *         • Owner   → may transfer contract ownership.
 *         • Any wallet → may anchor credentials; issuer address is permanently recorded.
 *         • Original issuer only → may revoke their own credential.
 *         • Public  → read-only access via verifyCredential / getCredentialStatus / credentialExists.
 *
 *         Gas notes
 *         ─────────
 *         • Credential struct is packed into a single 32-byte EVM storage slot:
 *             bool (1 byte) + uint64 (8 bytes) + address (20 bytes) = 29 bytes < 32 ✓
 *         • No dynamic arrays. All lookups are O(1) mapping reads.
 *         • Events carry all audit-trail data so off-chain indexers need no
 *           expensive on-chain enumeration.
 */
contract VeridusRegistry {

    // ─────────────────────────────────────────────────────────────────────────
    //  Storage layout
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * @dev Credential record tightly packed into a single 32-byte EVM storage slot.
     *
     *  | Field     | Type    | Size   | Notes                              |
     *  |-----------|---------|--------|------------------------------------|
     *  | revoked   | bool    | 1 byte | revocation flag                    |
     *  | issuedAt  | uint64  | 8 bytes| Unix timestamp; overflow-safe      |
     *  | issuer    | address | 20 bytes| wallet that anchored this hash   |
     *                                   Total: 29 bytes < 32 byte slot ✓  |
     *
     * Solidity packs structs right-to-left within a slot when fields are
     * declared smallest-first (bool → uint64 → address).
     */
    struct Credential {
        bool    revoked;    // 1 byte  — whether the credential has been revoked
        uint64  issuedAt;   // 8 bytes — block timestamp at the time of anchoring
        address issuer;     // 20 bytes — wallet address of the issuing institution
    }

    /// @notice Maps a SHA-256 credential hash to its on-chain record.
    mapping(bytes32 => Credential) private _credentials;

    /// @notice The contract administrator; sole authority to transfer ownership.
    address public owner;

    // ─────────────────────────────────────────────────────────────────────────
    //  Events
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * @notice Emitted when contract ownership is transferred to a new address.
     * @param previousOwner The wallet address that previously held ownership.
     * @param newOwner      The wallet address that now holds ownership.
     */
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @notice Emitted when a credential hash is successfully anchored.
     * @param credentialHash The SHA-256 hash of the credential being anchored.
     * @param issuer         The wallet address that anchored the credential.
     * @param issuedAt       The Unix timestamp of the anchoring block.
     */
    event CredentialAnchored(
        bytes32 indexed credentialHash,
        address indexed issuer,
        uint64          issuedAt
    );

    /**
     * @notice Emitted when the original issuer revokes a previously anchored credential.
     * @param credentialHash The hash of the credential being revoked.
     * @param revokedBy      The issuer address that performed the revocation.
     */
    event CredentialRevoked(
        bytes32 indexed credentialHash,
        address indexed revokedBy
    );

    // ─────────────────────────────────────────────────────────────────────────
    //  Custom errors  (cheaper than string revert messages — EIP-838)
    // ─────────────────────────────────────────────────────────────────────────

    error Unauthorized();               // caller is not the original issuer of this credential
    error ZeroHash();                   // bytes32(0) passed as credential hash
    error ZeroAddress();                // address(0) passed where forbidden
    error AlreadyAnchored();            // credential hash already exists on-chain
    error CredentialNotFound();         // no record exists for this hash
    error AlreadyRevoked();             // credential is already in revoked state

    // ─────────────────────────────────────────────────────────────────────────
    //  Modifiers
    // ─────────────────────────────────────────────────────────────────────────

    /// @dev Restricts function access to the contract owner.
    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    /// @dev Rejects the zero hash (bytes32(0)) as an invalid credential identifier.
    modifier validHash(bytes32 hash) {
        if (hash == bytes32(0)) revert ZeroHash();
        _;
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Constructor
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * @notice Deploys the registry and sets the deployer as the initial owner.
     * @dev    Any wallet address may anchor credentials after deployment.
     *         Issuance permission is controlled off-chain by the VERIDUS backend.
     */
    constructor() {
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Owner — administration
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * @notice Transfers contract ownership to a new administrator wallet.
     * @dev    Only the current owner may call this function.
     *         Ownership changes take effect immediately upon transaction confirmation.
     *         There is no two-step pending-owner pattern here (YAGNI for MVP);
     *         add OpenZeppelin Ownable2Step in a future upgrade if required.
     * @param  newOwner The wallet address to transfer ownership to.
     *
     * Reverts with:
     *  • `Unauthorized`  if caller is not the current owner
     *  • `ZeroAddress`   if newOwner is address(0)
     */
    function transferOwnership(address newOwner) external onlyOwner {
        if (newOwner == address(0)) revert ZeroAddress();

        address previous = owner;
        owner = newOwner;

        emit OwnershipTransferred(previous, newOwner);
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Credential anchoring & revocation  (open to any wallet)
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * @notice Anchors a credential hash on-chain as an immutable trust record.
     * @dev    Any wallet address may call this function; no whitelist is required.
     *         The calling wallet address is permanently recorded as the issuer.
     *         Issuance permission is enforced off-chain by the VERIDUS backend.
     *         Once anchored, the same hash cannot be re-anchored (uniqueness guarantee).
     *
     *         Gas cost is dominated by one SSTORE (new slot) ≈ 20,000 gas.
     *
     * @param  credentialHash SHA-256 hash of the off-chain credential payload,
     *                        computed by the VERIDUS backend before submission.
     *
     * Reverts with:
     *  • `ZeroHash`         if credentialHash is bytes32(0)
     *  • `AlreadyAnchored`  if this hash was previously registered
     */
    function anchorCredential(bytes32 credentialHash)
        external
        validHash(credentialHash)
    {
        // Revert if a record already exists for this hash
        if (_credentials[credentialHash].issuer != address(0)) {
            revert AlreadyAnchored();
        }

        // uint64 safely holds Unix timestamps past the year 2500
        uint64 timestamp = uint64(block.timestamp);

        // Write the packed struct — single SSTORE
        _credentials[credentialHash] = Credential({
            revoked:  false,
            issuedAt: timestamp,
            issuer:   msg.sender   // calling wallet is permanently recorded as issuer
        });

        emit CredentialAnchored(credentialHash, msg.sender, timestamp);
    }

    /**
     * @notice Revokes a previously anchored credential.
     * @dev    Only the ORIGINAL issuer wallet (the one that anchored the hash)
     *         may revoke it.  This is enforced on-chain and cannot be bypassed.
     *         Revocation is permanent and irreversible.
     *         The credential record is retained for audit purposes;
     *         only the `revoked` flag is flipped.
     *
     * @param  credentialHash The hash of the credential to revoke.
     *
     * Reverts with:
     *  • `ZeroHash`            if credentialHash is bytes32(0)
     *  • `CredentialNotFound`  if no record exists for this hash
     *  • `Unauthorized`        if caller is not the original anchoring wallet
     *  • `AlreadyRevoked`      if the credential is already revoked
     */
    function revokeCredential(bytes32 credentialHash)
        external
        validHash(credentialHash)
    {
        Credential storage cred = _credentials[credentialHash];

        // Credential must exist
        if (cred.issuer == address(0)) revert CredentialNotFound();

        // Only the original anchoring wallet may revoke — enforced on-chain
        if (cred.issuer != msg.sender) revert Unauthorized();

        // Idempotency guard: prevent a no-op revocation
        if (cred.revoked) revert AlreadyRevoked();

        // Flip the revocation flag — partial SSTORE (warm slot) ≈ 5,000 gas
        cred.revoked = true;

        emit CredentialRevoked(credentialHash, msg.sender);
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Internal — shared read helper
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * @dev Single authoritative storage read for all verification paths.
     *      Returns a memory copy so callers pay only one SLOAD regardless of
     *      how many fields they inspect.  Zero-cost for view calls.
     */
    function _resolveCredential(bytes32 credentialHash)
        private
        view
        returns (Credential memory)
    {
        return _credentials[credentialHash];
    }

    // ─────────────────────────────────────────────────────────────────────────
    //  Public — verification
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * @notice Verifies a credential hash and returns its full on-chain record.
     * @dev    REVERTING variant — use when the caller guarantees the hash exists
     *         (e.g. institution dashboard, typed QR deep-link).
     *         Any party can call this; no authentication required.
     *
     * @param  credentialHash SHA-256 hash of the credential to verify.
     * @return issuer    Wallet address of the institution that anchored the hash.
     * @return issuedAt  Unix timestamp (seconds) of the block when anchored.
     * @return revoked   True if the credential has been revoked, false if valid.
     *
     * Reverts with:
     *  • `ZeroHash`           if credentialHash is bytes32(0)
     *  • `CredentialNotFound` if no record exists for this hash (not anchored)
     */
    function verifyCredential(bytes32 credentialHash)
        external
        view
        validHash(credentialHash)
        returns (
            address issuer,
            uint64  issuedAt,
            bool    revoked
        )
    {
        Credential memory cred = _resolveCredential(credentialHash);
        if (cred.issuer == address(0)) revert CredentialNotFound();
        return (cred.issuer, cred.issuedAt, cred.revoked);
    }

    /**
     * @notice Non-reverting full status query — primary endpoint for backend APIs.
     * @dev    NON-REVERTING variant designed for QR verification, degree-ID lookup,
     *         and PDF-hash verification flows where the backend must not wrap calls
     *         in try/catch.  Always returns a well-formed tuple.
     *
     *         • exists == false → credential was never anchored
     *         • exists == true, revoked == false → credential is valid
     *         • exists == true, revoked == true  → credential is revoked
     *
     *         Zero-hash inputs are safe: returns (false, false, address(0), 0).
     *
     * @param  credentialHash SHA-256 hash of the credential to query.
     * @return exists    Whether the hash has ever been anchored.
     * @return revoked   Whether the credential has been revoked.
     * @return issuer    Issuing institution wallet (address(0) if not anchored).
     * @return issuedAt  Anchoring timestamp in seconds (0 if not anchored).
     */
    function getCredentialStatus(bytes32 credentialHash)
        external
        view
        returns (
            bool    exists,
            bool    revoked,
            address issuer,
            uint64  issuedAt
        )
    {
        // Zero hash is a sentinel for "not found" — return safe empty values.
        if (credentialHash == bytes32(0)) {
            return (false, false, address(0), 0);
        }

        Credential memory cred = _resolveCredential(credentialHash);

        // issuer == address(0) is the canonical "does not exist" sentinel.
        exists   = cred.issuer != address(0);
        revoked  = cred.revoked;
        issuer   = cred.issuer;
        issuedAt = cred.issuedAt;
    }

    /**
     * @notice Lightweight existence check for a credential hash.
     * @dev    Use when only a boolean answer is needed (e.g. pre-anchor duplicate
     *         guard in the backend before submitting a transaction).
     *         Never reverts.
     *
     * @param  credentialHash SHA-256 hash to check.
     * @return True if the hash has been anchored (regardless of revocation status).
     */
    function credentialExists(bytes32 credentialHash)
        external
        view
        returns (bool)
    {
        return _resolveCredential(credentialHash).issuer != address(0);
    }
}
