"use client";

import { Save, UserCircle } from "lucide-react";

export default function StudentProfilePage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
                <p className="text-gray-400 mt-2">
                    Manage your personal and academic details.
                </p>
            </div>

            <div className="space-y-8">
                {/* Avatar Placeholder */}
                <div className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-gray-500">
                        <UserCircle className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-xl font-medium text-white">Alex Thompson</h2>
                        <p className="text-sm text-gray-400 mt-1">alex.thompson@example.com</p>
                    </div>
                </div>

                {/* 1. Personal Information */}
                <div className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] space-y-6">
                    <h2 className="text-xl font-medium border-b border-[#1C1C1C] pb-4">
                        Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium text-gray-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                defaultValue="Alex Thompson"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                defaultValue="alex.thompson@example.com"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-gray-400 cursor-not-allowed focus:outline-none transition-colors"
                                disabled
                            />
                            <p className="text-xs text-gray-500 mt-1">Email cannot be changed.</p>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-300">
                                Student ID
                            </label>
                            <input
                                type="text"
                                defaultValue="STU-2023-8941"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Institution Name
                            </label>
                            <input
                                type="text"
                                defaultValue="Massachusetts Institute of Technology"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Program / Degree
                            </label>
                            <input
                                type="text"
                                defaultValue="B.S. Computer Science"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Profile Update Action */}
                <div className="flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors">
                        <Save className="w-5 h-5" />
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
}
