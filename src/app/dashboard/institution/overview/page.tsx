import Link from "next/link";
import { FilePlus, Files, Users, Building2 } from "lucide-react";

export default function OverviewPage() {
    return (
        <div className="space-y-10">
            {/* 1. Page Header */}
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
                <p className="text-gray-400 mt-2">
                    Monitor institutional credential activity and platform usage.
                </p>
            </div>

            {/* 2. Welcome Section */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-[#1C1C1C] relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-medium">Welcome back, Institution Name</h2>
                    <p className="text-gray-400 mt-2 max-w-2xl">
                        Manage and issue verified academic credentials securely through VERIDUS.
                    </p>
                </div>
            </div>

            {/* 3. Statistics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Credentials Issued", value: "1,248" },
                    { label: "Active Students", value: "842" },
                    { label: "Credentials Verified", value: "1,105" },
                    { label: "Recent Activity", value: "12" },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505]"
                    >
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <p className="text-3xl font-semibold mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* 4. Quick Actions Section */}
            <div>
                <h2 className="text-xl font-medium mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href="/dashboard/institution/create"
                        className="flex flex-col items-center justify-center p-6 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:bg-[#111] transition-colors group"
                    >
                        <FilePlus className="w-8 h-8 text-gray-400 group-hover:text-white mb-3" />
                        <span className="font-medium text-sm text-gray-300 group-hover:text-white">Create Credential</span>
                    </Link>
                    <Link
                        href="/dashboard/institution/records"
                        className="flex flex-col items-center justify-center p-6 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:bg-[#111] transition-colors group"
                    >
                        <Files className="w-8 h-8 text-gray-400 group-hover:text-white mb-3" />
                        <span className="font-medium text-sm text-gray-300 group-hover:text-white">Credential Records</span>
                    </Link>
                    <Link
                        href="/dashboard/institution/students"
                        className="flex flex-col items-center justify-center p-6 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:bg-[#111] transition-colors group"
                    >
                        <Users className="w-8 h-8 text-gray-400 group-hover:text-white mb-3" />
                        <span className="font-medium text-sm text-gray-300 group-hover:text-white">Student Records</span>
                    </Link>
                    <Link
                        href="/dashboard/institution/profile"
                        className="flex flex-col items-center justify-center p-6 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:bg-[#111] transition-colors group"
                    >
                        <Building2 className="w-8 h-8 text-gray-400 group-hover:text-white mb-3" />
                        <span className="font-medium text-sm text-gray-300 group-hover:text-white">Institution Profile</span>
                    </Link>
                </div>
            </div>

            {/* 5. Recent Activity Panel */}
            <div>
                <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
                <div className="p-12 rounded-xl border border-[#1C1C1C] bg-[#050505] text-center flex flex-col items-center justify-center">
                    <p className="text-gray-300 font-medium">No credential activity yet.</p>
                    <p className="text-sm text-gray-500 mt-1">
                        Activity will appear once credentials are created.
                    </p>
                </div>
            </div>
        </div>
    );
}
