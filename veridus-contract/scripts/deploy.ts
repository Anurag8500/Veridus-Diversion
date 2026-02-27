import { ethers, network } from "hardhat";
import * as fs from "fs";
import * as path from "path";

/**
 * deploy.ts — VeridusRegistry deployment script
 *
 * Usage:
 *   npx hardhat run scripts/deploy.ts --network localhost
 *   npx hardhat run scripts/deploy.ts --network sepolia
 *   npx hardhat run scripts/deploy.ts --network amoy
 *
 * Requires ethers v6 (@nomicfoundation/hardhat-ethers ^3).
 */

async function main(): Promise<string> {
    // ── Deployer signer ────────────────────────────────────────────────────────
    const [deployer] = await ethers.getSigners();

    const balanceWei = await ethers.provider.getBalance(deployer.address);
    const balanceEth = ethers.formatEther(balanceWei);

    console.log("─────────────────────────────────────────────");
    console.log("  VERIDUS Registry — Deployment");
    console.log("─────────────────────────────────────────────");
    console.log(`  Network   : ${network.name}`);
    console.log(`  Deployer  : ${deployer.address}`);
    console.log(`  Balance   : ${balanceEth} ETH`);
    console.log("─────────────────────────────────────────────");
    console.log("  Deploying VeridusRegistry …");

    // ── Deploy ─────────────────────────────────────────────────────────────────
    const Factory = await ethers.getContractFactory("VeridusRegistry", deployer);
    const registry = await Factory.deploy();

    // Wait for the deployment transaction to be mined (ethers v6 API)
    await registry.waitForDeployment();

    const contractAddress = await registry.getAddress();

    // ── Improvement 1 — Transaction hash ──────────────────────────────────────
    const deployTx = registry.deploymentTransaction();
    const txHash = deployTx?.hash ?? "(unavailable)";

    // ── Improvement 3 — Gas used ───────────────────────────────────────────────
    let gasUsed = "(unavailable)";
    if (deployTx) {
        const receipt = await deployTx.wait();
        if (receipt) {
            gasUsed = receipt.gasUsed.toString();
        }
    }

    // ── Confirmation ───────────────────────────────────────────────────────────
    console.log(`  Contract  : ${contractAddress}`);
    console.log(`  Tx Hash   : ${txHash}`);
    console.log(`  Gas Used  : ${gasUsed}`);
    console.log("─────────────────────────────────────────────");
    console.log("  ✅  VeridusRegistry deployed successfully.");
    console.log("─────────────────────────────────────────────\n");

    // ── Improvement 2 — Persist address to deployments.json ───────────────────
    const deploymentsPath = path.resolve(__dirname, "..", "deployments.json");

    // Merge with existing data so prior-network entries are preserved.
    let deployments: Record<string, Record<string, string>> = {};
    if (fs.existsSync(deploymentsPath)) {
        const raw = fs.readFileSync(deploymentsPath, "utf-8");
        deployments = JSON.parse(raw) as Record<string, Record<string, string>>;
    }

    deployments[network.name] = {
        ...(deployments[network.name] ?? {}),
        VeridusRegistry: contractAddress,
    };

    fs.writeFileSync(deploymentsPath, JSON.stringify(deployments, null, 2));
    console.log(`  📄  Address saved → deployments.json [${network.name}]\n`);

    return contractAddress;
}

// Standard Hardhat entry-point: surface any errors to the shell with a
// non-zero exit code so CI/CD pipelines detect deployment failures.
main()
    .then(() => {
        process.exit(0);
    })
    .catch((error: unknown) => {
        console.error("\n❌  Deployment failed:");
        console.error(error);
        process.exit(1);
    });
