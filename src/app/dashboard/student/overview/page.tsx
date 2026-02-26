import Link from "next/link";
import { Wallet, Share2, User } from "lucide-react";

export default function StudentOverviewPage() {
    return (
        <div className="space-y-10">
            {/* 1. Page Header */}
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
                <p className="text-gray-400 mt-2">
                    Access and manage your verified academic credentials.
                </p>
            </div>

            {/* 2. Welcome Section */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-[#111111] to-[#0A0A0A] border border-[#1C1C1C] relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-2xl font-medium">Welcome back, Student Name</h2>
                    <p className="text-gray-400 mt-2 max-w-2xl">
                        Your verified academic credentials are securely stored on VERIDUS.
                    </p>
                </div>
            </div>

            {/* 3. Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Credentials", value: "3" },
                    { label: "Verified Credentials", value: "3" },
                    { label: "Shared Credentials", value: "1" },
                    { label: "Recent Activity", value: "5" },
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
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link
                        href="/dashboard/student/credentials"
                        className="flex flex-col items-center justify-center p-6 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:bg-[#111] transition-colors group"
                    >
                        <Wallet className="w-8 h-8 text-gray-400 group-hover:text-white mb-3" />
                        <span className="font-medium text-sm text-gray-300 group-hover:text-white">My Credentials</span>
                    </Link>
                    <Link
                        href="/dashboard/student/shared"
                        className="flex flex-col items-center justify-center p-6 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:bg-[#111] transition-colors group"
                    >
                        <Share2 className="w-8 h-8 text-gray-400 group-hover:text-white mb-3" />
                        <span className="font-medium text-sm text-gray-300 group-hover:text-white">Shared Credentials</span>
                    </Link>
                    <Link
                        href="/dashboard/student/profile"
                        className="flex flex-col items-center justify-center p-6 rounded-xl border border-[#1C1C1C] bg-[#0A0A0A] hover:bg-[#111] transition-colors group"
                    >
                        <User className="w-8 h-8 text-gray-400 group-hover:text-white mb-3" />
                        <span className="font-medium text-sm text-gray-300 group-hover:text-white">Profile</span>
                    </Link>
                </div>
            </div>

            {/* 5. Recent Activity Panel */}
            <div>
                <h2 className="text-xl font-medium mb-4">Recent Activity</h2>
                <div className="p-12 rounded-xl border border-[#1C1C1C] bg-[#050505] text-center flex flex-col items-center justify-center">
                    <p className="text-gray-300 font-medium">No credential activity yet.</p>
                    <p className="text-sm text-gray-500 mt-1">
                        Your credential interactions will appear here.
                    </p>
                </div>
            </div>
        </div>
    );
}
