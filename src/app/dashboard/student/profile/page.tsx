"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Save, UserCircle, Loader2 } from "lucide-react";

interface UserProfile {
    name: string;
    email: string;
    role: string;
    studentId?: string;
    institution?: string;
    program?: string;
}

export default function StudentProfilePage() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!session?.user?.id) return;
            try {
                setLoading(true);
                const response = await fetch("/api/me");
                const data = await response.json();
                if (data.success !== false) {
                    setProfile(data);
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [session?.user?.id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-white animate-spin mb-4" />
                <p className="text-gray-400">Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
                <p className="text-gray-400 mt-2">
                    Manage your personal and academic details.
                </p>
            </div>

            <div className="space-y-8">
                {/* Avatar Section */}
                <div className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-gray-500">
                        <UserCircle className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-xl font-medium text-white">{profile?.name || "Student"}</h2>
                        <p className="text-sm text-gray-400 mt-1">{profile?.email || "No email provided"}</p>
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
                                defaultValue={profile?.name}
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={profile?.email || ""}
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
                                placeholder="Not set"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Profile Update Action */}
                <div className="flex justify-end">
                    <button 
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                        disabled={isUpdating}
                    >
                        {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

