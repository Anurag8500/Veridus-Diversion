"use client";

import { Eye, Ban, Link as LinkIcon, Share2 } from "lucide-react";

const placeholderShared = [
    {
        id: "SHR-9921",
        credentialName: "B.S. Computer Science",
        sharedWith: "Google HR Department",
        shareDate: "24 Nov 2023",
        status: "Active",
    },
    {
        id: "SHR-9922",
        credentialName: "AWS Certified Solutions Architect",
        sharedWith: "TechCorp Inc.",
        shareDate: "10 Dec 2023",
        status: "Revoked",
    },
];

export default function SharedCredentialsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Shared Credentials</h1>
                <p className="text-gray-400 mt-2">
                    Manage credentials you have shared with organizations or employers.
                </p>
            </div>

            {placeholderShared.length > 0 ? (
                /* 1. Shared Credential Table */
                <div className="rounded-xl border border-[#1C1C1C] bg-[#050505] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-400 bg-[#0A0A0A] border-b border-[#1C1C1C] uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-4 font-medium">Credential Name</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Shared With</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Share Date</th>
                                    <th scope="col" className="px-6 py-4 font-medium">Access Status</th>
                                    <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {placeholderShared.map((share) => (
                                    <tr
                                        key={share.id}
                                        className="border-b border-[#1C1C1C] last:border-0 hover:bg-[#0A0A0A] transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-white">{share.credentialName}</td>
                                        <td className="px-6 py-4 text-gray-300">{share.sharedWith}</td>
                                        <td className="px-6 py-4 text-gray-400">{share.shareDate}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${share.status === "Active"
                                                        ? "bg-green-500/10 text-green-500"
                                                        : "bg-red-500/10 text-red-500"
                                                    }`}
                                            >
                                                {share.status}
                                            </span>
                                        </td>
                                        {/* 2. Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button title="View Credential" className="p-1.5 text-gray-500 hover:text-white hover:bg-[#1C1C1C] rounded transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button title="Copy Share Link" className="p-1.5 text-gray-500 hover:text-white hover:bg-[#1C1C1C] rounded transition-colors">
                                                    <LinkIcon className="w-4 h-4" />
                                                </button>
                                                {share.status === "Active" && (
                                                    <button title="Revoke Access" className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors ml-2">
                                                        <Ban className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="p-12 rounded-xl border border-[#1C1C1C] bg-[#050505] text-center flex flex-col items-center justify-center">
                    <Share2 className="w-12 h-12 text-gray-600 mb-4" />
                    <p className="text-gray-300 font-medium text-lg">No shared credentials</p>
                    <p className="text-sm text-gray-500 mt-2 max-w-sm">
                        You haven't shared any credentials yet. Share them from your "My Credentials" page.
                    </p>
                </div>
            )}
        </div>
    );
}
