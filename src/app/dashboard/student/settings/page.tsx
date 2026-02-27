"use client";

import { useState, useEffect } from "react";

import { useSession, signOut } from "next-auth/react";
import { LogOut, Shield, KeyRound, CalendarDays, Mail, Loader2 } from "lucide-react";

export default function StudentSettingsPage() {
    const { data: session } = useSession();
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!session?.user?.id) return;
            try {
                setLoading(true);
                const response = await fetch("/api/me");
                const data = await response.json();
                if (data.success !== false) {
                    setUserData(data);
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [session?.user?.id]);

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-white animate-spin mb-4" />
                <p className="text-gray-400">Loading your settings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Account Settings</h1>
                <p className="text-gray-400 mt-2">
                    Manage account preferences and security settings.
                </p>
            </div>

            <div className="space-y-8">
                {/* 2. Account Information Display */}
                <div className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#1C1C1C] pb-4">
                        <Shield className="w-5 h-5 text-gray-400" />
                        <h2 className="text-xl font-medium">Account Overview</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start gap-4 p-4 bg-[#0A0A0A] rounded-lg border border-[#111]">
                            <div className="p-2 bg-[#111] rounded-md">
                                <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium mb-1">Registered Email</p>
                                <p className="text-white">{userData?.email || "No email provided"}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-[#0A0A0A] rounded-lg border border-[#111]">
                            <div className="p-2 bg-[#111] rounded-md">
                                <CalendarDays className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium mb-1">Account Creation Date</p>
                                <p className="text-white">
                                    {userData?.createdAt 
                                        ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                          })
                                        : "N/A"
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 1. Password Update */}
                <div className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] space-y-6">
                    <div className="flex items-center gap-3 border-b border-[#1C1C1C] pb-4">
                        <KeyRound className="w-5 h-5 text-gray-400" />
                        <h2 className="text-xl font-medium">Password & Security</h2>
                    </div>
                    <form className="space-y-6 max-w-xl">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Current Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter current password"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter new password"
                                    className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Update Password
                        </button>
                    </form>
                </div>

                {/* 3. Logout Section */}
                <div className="p-6 rounded-xl border border-red-500/20 bg-[#0A0000] space-y-4">
                    <h2 className="text-xl font-medium text-red-500">Log Out</h2>
                    <p className="text-gray-400 text-sm max-w-xl">
                        You will be required to enter your credentials to access your academic records again.
                    </p>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 text-red-500 font-medium rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors border border-red-500/20"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
}
