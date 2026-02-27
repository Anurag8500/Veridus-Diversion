/**
 * src/lib/wagmi.ts
 *
 * Salvus-style cached wagmi config.
 *
 * Rules:
 *  1. Config is created ONCE — module-level variable ensures this server-side.
 *  2. On the client, the config is pinned to `window.__VERIDUS_WC_CONFIG__`
 *     so HMR reloads and Fast Refresh do not re-initialize WalletConnect,
 *     which would cause the "multiple WC sessions" bug and button disappearing.
 *  3. `initWalletConnect()` is idempotent — safe to call multiple times.
 */

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";
import { sepolia, polygonAmoy } from "wagmi/chains";

type WagmiConfigType = ReturnType<typeof getDefaultConfig>;

// Hardhat node runs on chainId 31337 — wagmi's built-in `localhost` uses 1337,
// which causes RainbowKit to show "Wrong Network". Define the correct chain here.
const hardhatLocalhost = defineChain({
    id: 31337,
    name: "Hardhat Localhost",
    network: "hardhat",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
        default: { http: ["http://127.0.0.1:8545"] },
    },
});

// Extend Window to hold our cached instances
declare global {
    interface Window {
        __VERIDUS_WC_CONFIG__?: WagmiConfigType;
        __VERIDUS_WC_INITED__?: boolean;
    }
}

// Module-level cache — survives across renders on both server and client
let cachedConfig: WagmiConfigType | undefined;

function createConfig(): WagmiConfigType {
    return getDefaultConfig({
        appName: "VERIDUS",
        projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "veridus-dev-placeholder",
        chains: [hardhatLocalhost, sepolia, polygonAmoy],
        ssr: true,
    });
}

export function initWalletConnect(): void {
    // Already initialized in this module scope — done
    if (cachedConfig) return;

    // Server-side: create fresh (no window caching needed)
    if (typeof window === "undefined") {
        cachedConfig = createConfig();
        return;
    }

    // Client-side: restore from window cache if HMR reloaded the module
    const w = window as Window;

    if (w.__VERIDUS_WC_CONFIG__) {
        cachedConfig = w.__VERIDUS_WC_CONFIG__;
        return;
    }

    // Guard: WC can only be initialized once per browser session
    if (w.__VERIDUS_WC_INITED__) return;

    const config = createConfig();

    // Pin to window so Fast Refresh / HMR cannot lose the reference
    w.__VERIDUS_WC_INITED__ = true;
    w.__VERIDUS_WC_CONFIG__ = config;
    cachedConfig = config;
}

export function getWagmiConfig(): WagmiConfigType {
    if (!cachedConfig) initWalletConnect();
    if (!cachedConfig) throw new Error("wagmi config initialization failed");
    return cachedConfig;
}

// Named export for direct use in WagmiProvider
export const config = getWagmiConfig();
