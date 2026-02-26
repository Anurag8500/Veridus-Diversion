"use client";

import { Search, Filter, MoreHorizontal } from "lucide-react";

export default function StudentRecordsPage() {
    const placeholderStudents = [
        {
            id: "STU-001",
            name: "Alex Thompson",
            email: "alex@example.com",
            credentialsIssued: 3,
            lastCredential: "12 Oct 2023",
        },
        {
            id: "STU-002",
            name: "Sarah Jenkins",
            email: "sarah@example.com",
            credentialsIssued: 1,
            lastCredential: "15 Oct 2023",
        },
        {
            id: "STU-003",
            name: "Michael Chen",
            email: "michael@example.com",
            credentialsIssued: 2,
            lastCredential: "20 Oct 2023",
        },
        {
            id: "STU-004",
            name: "Emily Parker",
            email: "emily@example.com",
            credentialsIssued: 1,
            lastCredential: "02 Nov 2023",
        },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Student Records</h1>
                    <p className="text-gray-400 mt-2">
                        Track students associated with issued credentials.
                    </p>
                </div>
            </div>

            {/* 1. Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search students by name or email..."
                        className="w-full pl-10 pr-4 py-2.5 bg-[#050505] border border-[#1C1C1C] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-colors"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#050505] border border-[#1C1C1C] rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-[#111] transition-colors">
                    <Filter className="w-4 h-4" />
                    Filter Options
                </button>
            </div>

            {/* 2. Student List Table */}
            <div className="rounded-xl border border-[#1C1C1C] bg-[#050505] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 bg-[#0A0A0A] border-b border-[#1C1C1C] uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-medium">Student Name</th>
                                <th scope="col" className="px-6 py-4 font-medium">Email Address</th>
                                <th scope="col" className="px-6 py-4 font-medium text-center">Credentials Issued</th>
                                <th scope="col" className="px-6 py-4 font-medium text-right">Last Credential Date</th>
                                <th scope="col" className="px-6 py-4 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {placeholderStudents.map((student) => (
                                <tr
                                    key={student.id}
                                    className="border-b border-[#1C1C1C] last:border-0 hover:bg-[#0A0A0A] transition-colors"
                                >
                                    <td className="px-6 py-4 font-medium text-white">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#1C1C1C] flex items-center justify-center text-xs font-medium">
                                                {student.name.charAt(0)}
                                            </div>
                                            {student.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{student.email}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1C1C1C] text-xs font-medium text-gray-300">
                                            {student.credentialsIssued}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-400">{student.lastCredential}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button className="p-1.5 text-gray-500 hover:text-white hover:bg-[#1C1C1C] rounded transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
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
