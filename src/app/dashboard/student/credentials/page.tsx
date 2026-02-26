"use client";

import { Search, Filter, Eye, Download, Share2, Link as LinkIcon, Wallet } from "lucide-react";

const placeholderCredentials = [
    {
        id: "VRD-2023-8941",
        title: "B.S. Computer Science",
        institution: "Massachusetts Institute of Technology",
        issueDate: "12 Oct 2023",
        status: "Verified",
    },
    {
        id: "VRD-2023-8942",
        title: "AWS Certified Solutions Architect",
        institution: "Amazon Web Services",
        issueDate: "15 Oct 2023",
        status: "Verified",
    },
    {
        id: "VRD-2021-3329",
        title: "High School Diploma",
        institution: "Lincoln High School",
        issueDate: "20 May 2021",
        status: "Verified",
    },
];

export default function MyCredentialsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">My Credentials</h1>
                    <p className="text-gray-400 mt-2">
                        View and manage your verified academic credentials.
                    </p>
                </div>
            </div>

            {/* 1. Search and Filter Area */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by credential title..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[#050505] border border-[#1C1C1C] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#050505] border border-[#1C1C1C] rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#111] transition-colors">
                    <Filter className="w-4 h-4" />
                    Filter: Institution
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#050505] border border-[#1C1C1C] rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#111] transition-colors">
                    <Filter className="w-4 h-4" />
                    Filter: Status
                </button>
            </div>

            {/* 2. Credentials List/Table */}
            {placeholderCredentials.length > 0 ? (
                <div className="rounded-xl border border-[#1C1C1C] bg-[#050505] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-400 bg-[#0A0A0A] border-b border-[#1C1C1C] uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium">Credential Title</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Issuing Institution</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Issue Date</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Status</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {placeholderCredentials.map((cred) => (
                                    <tr
                                        key={cred.id}
                                        className="border-b border-[#1C1C1C] last:border-0 hover:bg-[#0A0A0A] transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-white">{cred.title}</td>
                                        <td className="px-6 py-4 text-gray-300">{cred.institution}</td>
                                        <td className="px-6 py-4 text-gray-400">{cred.issueDate}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-500/10 text-green-500">
                                                {cred.status}
                                            </span>
                                        </td>
                                        {/* 3. Credential Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button title="View Credential" className="p-1.5 text-gray-500 hover:text-white hover:bg-[#1C1C1C] rounded transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button title="Download Certificate" className="p-1.5 text-gray-500 hover:text-white hover:bg-[#1C1C1C] rounded transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button title="Share Credential" className="p-1.5 text-gray-500 hover:text-white hover:bg-[#1C1C1C] rounded transition-colors">
                                                    <Share2 className="w-4 h-4" />
                                                </button>
                                                <button title="Copy Verification Link" className="p-1.5 text-gray-500 hover:text-white hover:bg-[#1C1C1C] rounded transition-colors">
                                                    <LinkIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* 4. Empty State */
                <div className="p-12 rounded-xl border border-[#1C1C1C] bg-[#050505] text-center flex flex-col items-center justify-center">
                    <Wallet className="w-12 h-12 text-gray-600 mb-4" />
                    <p className="text-gray-300 font-medium text-lg">No credentials available yet.</p>
                    <p className="text-sm text-gray-500 mt-2 max-w-sm">
                        When an institution issues a verified credential to your email address, it will appear here.
                    </p>
                </div>
            )}
        </div>
    );
}
