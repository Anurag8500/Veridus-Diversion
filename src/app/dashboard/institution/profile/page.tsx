"use client";

import { Building2, Save, Upload } from "lucide-react";

export default function InstitutionProfilePage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Institution Profile</h1>
                <p className="text-gray-400 mt-2">
                    Manage institutional information and identity details.
                </p>
            </div>

            <div className="space-y-8">
                {/* 3. Institution Logo Upload Section */}
                <div className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] flex items-center gap-8">
                    <div className="w-24 h-24 rounded-full bg-[#111] border border-[#222] flex flex-col items-center justify-center text-gray-500 hover:text-white hover:bg-[#1a1a1a] transition-colors cursor-pointer group">
                        <Building2 className="w-8 h-8 mb-1 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-white mb-1">Institution Logo</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Upload your official institution seal or logo. Minimum 400x400px.
                        </p>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1C1C1C] hover:bg-[#2A2A2A] text-white text-sm font-medium rounded-lg transition-colors">
                            <Upload className="w-4 h-4" />
                            Upload Image
                        </button>
                    </div>
                </div>

                {/* 1. Basic Information */}
                <div className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] space-y-6">
                    <h2 className="text-xl font-medium border-b border-[#1C1C1C] pb-4">
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                Official Email
                            </label>
                            <input
                                type="email"
                                defaultValue="registry@mit.edu"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-300">
                                Institution Address
                            </label>
                            <input
                                type="text"
                                defaultValue="77 Massachusetts Ave, Cambridge, MA 02139, USA"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-300">
                                Website (Optional)
                            </label>
                            <input
                                type="url"
                                defaultValue="https://web.mit.edu"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Institutional Details */}
                <div className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] space-y-6">
                    <h2 className="text-xl font-medium border-b border-[#1C1C1C] pb-4">
                        Institutional Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Accreditation ID
                            </label>
                            <input
                                type="text"
                                defaultValue="NEASC-00129"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                defaultValue="+1 (617) 253-1000"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-gray-300">
                                Authorized Representative Name
                            </label>
                            <input
                                type="text"
                                defaultValue="Dr. Robert Mercer"
                                className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. Save Button */}
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
