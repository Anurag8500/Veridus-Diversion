"use client";

/**
 * src/app/providers.tsx
 *
 * Global Web3 provider tree — mounted ONCE at the root layout.
 * Never put these providers inside a dashboard or page layout.
 *
 * Tree: WagmiProvider → QueryClientProvider → RainbowKitProvider
 *
 * `initWalletConnect()` is called in useEffect so the browser-side
 * WalletConnect session refresh runs after hydration only, not during SSR.
 */

import { useEffect } from "react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config, initWalletConnect } from "@/lib/wagmi";

// RainbowKit styles must be imported in a client component
import "@rainbow-me/rainbowkit/styles.css";

// Stable QueryClient — created once at module scope, not inside the component
const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    // Re-attach the cached WalletConnect session after client hydration
    useEffect(() => {
        initWalletConnect();
    }, []);

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: "#ffffff",
                        accentColorForeground: "#000000",
                        borderRadius: "medium",
                        fontStack: "system",
                    })}
                >
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
