"use client";

import { LogOut, Shield, KeyRound, CalendarDays, Mail } from "lucide-react";

export default function StudentSettingsPage() {
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
                                <p className="text-white">alex.thompson@example.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 bg-[#0A0A0A] rounded-lg border border-[#111]">
                            <div className="p-2 bg-[#111] rounded-md">
                                <CalendarDays className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium mb-1">Account Creation Date</p>
                                <p className="text-white">October 11, 2023</p>
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
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 text-red-500 font-medium rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors border border-red-500/20">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>

            </div>
        </div>
    );
}
