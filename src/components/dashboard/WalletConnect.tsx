"use client";

/**
 * WalletConnect.tsx
 *
 * Uses wagmi's `status` to silence the UI during the reconnect window:
 *
 *   "reconnecting"  →  skeleton placeholder (no layout shift, no flash)
 *   "connected"     →  ConnectButton (shows address + disconnect)
 *   "disconnected"  →  ConnectButton (shows "Connect Wallet")
 *   "connecting"    →  skeleton (MetaMask popup is open)
 */

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

function ButtonSkeleton() {
    return (
        <div className="h-9 w-36 rounded-xl bg-white/5 animate-pulse" />
    );
}

export default function WalletConnect() {
    const { status } = useAccount();

    // While wagmi is silently restoring the previous session, render a
    // same-size skeleton so there is no flash AND no layout shift.
    if (status === "reconnecting" || status === "connecting") {
        return <ButtonSkeleton />;
    }

    return (
        <ConnectButton
            showBalance={false}
            accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
            }}
        />
    );
}
