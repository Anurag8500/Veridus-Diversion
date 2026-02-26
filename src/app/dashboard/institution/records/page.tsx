"use client";

import { Search, Filter, Eye, Download, Link as LinkIcon, Ban } from "lucide-react";

const placeholderRecords = [
    {
        id: "VRD-2023-8941",
        studentName: "Alex Thompson",
        degree: "B.S. Computer Science",
        date: "12 Oct 2023",
        status: "Active",
    },
    {
        id: "VRD-2023-8942",
        studentName: "Sarah Jenkins",
        degree: "M.A. Business Admin",
        date: "15 Oct 2023",
        status: "Active",
    },
    {
        id: "VRD-2023-8943",
        studentName: "Michael Chen",
        degree: "B.A. Graphic Design",
        date: "20 Oct 2023",
        status: "Revoked",
    },
    {
        id: "VRD-2023-8944",
        studentName: "Emily Parker",
        degree: "Ph.D. Physics",
        date: "02 Nov 2023",
        status: "Active",
    },
    {
        id: "VRD-2023-8945",
        studentName: "David Rodriguez",
        degree: "B.S. Electrical Eng.",
        date: "14 Nov 2023",
        status: "Active",
    },
];

export default function CredentialRecordsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Credential Records</h1>
                    <p className="text-gray-400 mt-2">
                        View and manage all issued academic credentials.
                    </p>
                </div>
                <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap">
                    Export CSV
                </button>
            </div>

            {/* 1. Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by student name or credential ID..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[#050505] border border-[#1C1C1C] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#050505] border border-[#1C1C1C] rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#111] transition-colors">
                    <Filter className="w-4 h-4" />
                    Filter: All Status
                </button>
            </div>

            {/* 2. Credentials Table */}
            <div className="rounded-xl border border-[#1C1C1C] bg-[#050505] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 bg-[#0A0A0A] border-b border-[#1C1C1C] uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium">Credential ID</th>
                                <th scope="col" className="px-6 py-4 font-medium">Student Name</th>
                                <th scope="col" className="px-6 py-4 font-medium">Degree Title</th>
                                <th scope="col" className="px-6 py-4 font-medium">Issue Date</th>
                                <th scope="col" className="px-6 py-4 font-medium">Status</th>
                                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {placeholderRecords.map((record) => (
                                <tr
                                    key={record.id}
                                    className="border-b border-[#1C1C1C] last:border-0 hover:bg-[#0A0A0A] transition-colors"
                                >
                                    <td className="px-6 py-4 font-mono text-xs text-gray-300">{record.id}</td>
                                    <td className="px-6 py-4 font-medium text-white">{record.studentName}</td>
                                    <td className="px-6 py-4 text-gray-300">{record.degree}</td>
                                    <td className="px-6 py-4 text-gray-400">{record.date}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${record.status === "Active"
                                                    ? "bg-green-500/10 text-green-500"
                                                    : "bg-red-500/10 text-red-500"
                                                }`}
                                        >
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button title="View Details" className="p-1.5 text-gray-500 hover:text-white hover:bg-[#1C1C1C] rounded transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button title="Download PDF" className="p-1.5 text-gray-500 hover:text-white hover:bg-[#1C1C1C] rounded transition-colors">
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <button title="Copy Link" className="p-1.5 text-gray-500 hover:text-white hover:bg-[#1C1C1C] rounded transition-colors">
                                                <LinkIcon className="w-4 h-4" />
                                            </button>
                                            {record.status === "Active" && (
                                                <button title="Revoke" className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors ml-2">
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
        </div>
    );
}
