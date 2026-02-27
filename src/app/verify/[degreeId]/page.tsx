"use client";

import { useState, useEffect, use } from "react";
import { 
    ShieldCheck, 
    AlertCircle, 
    Loader2, 
    Building2, 
    User, 
    GraduationCap, 
    Calendar, 
    Fingerprint, 
    Link as LinkIcon,
    ExternalLink,
    FileText
} from "lucide-react";

interface Credential {
    degreeId: string;
    studentName: string;
    degreeTitle: string;
    branch: string;
    issueDate: string;
    status: "valid" | "revoked";
    institutionName: string;
    blockchainTxHash?: string;
}

export default function PublicVerifyPage({ params }: { params: Promise<{ degreeId: string }> }) {
    const { degreeId } = use(params);
    const [credential, setCredential] = useState<Credential | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVerification = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/verify/${degreeId}`);
                const data = await response.json();

                if (data.success) {
                    setCredential(data.credential);
                } else {
                    setError(data.message || "Credential Not Found");
                }
            } catch (err) {
                console.error("Verification error:", err);
                setError("An unexpected error occurred during verification.");
            } finally {
                setLoading(false);
            }
        };

        fetchVerification();
    }, [degreeId]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const shortenHash = (hash: string) => {
        if (!hash) return "";
        return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
    };

    // 1. Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-4">
                <Loader2 className="w-10 h-10 text-brand animate-spin mb-4" />
                <p className="text-gray-400 font-medium animate-pulse">Verifying credential...</p>
            </div>
        );
    }

    // 2. Error / Not Found State
    if (error || !credential) {
        return (
            <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md p-8 rounded-2xl border border-red-500/20 bg-red-500/5 text-center">
                    <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Credential Not Found</h1>
                    <p className="text-gray-400 mb-8">
                        {error || "This credential does not exist or may have been removed."}
                    </p>
                    <button 
                        onClick={() => window.location.href = "/"}
                        className="px-6 py-2.5 bg-[#111] border border-[#222] rounded-lg text-sm font-medium text-white hover:bg-[#1a1a1a] transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    // 3. Verified State
    return (
        <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-4 py-12">
            <div className="w-full max-w-[700px] space-y-8">
                {/* Header Info */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/10 rounded-2xl mb-2">
                        <ShieldCheck className="w-10 h-10 text-brand" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Credential Verification</h1>
                    <p className="text-gray-400 max-w-md mx-auto">
                        This academic credential has been securely verified through the VERIDUS platform.
                    </p>
                </div>

                {/* Main Verification Card */}
                <div className="relative overflow-hidden rounded-3xl border border-[#1C1C1C] bg-[#050505] shadow-2xl">
                    {/* Status Ribbon */}
                    <div className={`py-4 px-6 border-b border-[#1C1C1C] flex items-center justify-between ${
                        credential.status === "valid" ? "bg-green-500/5" : "bg-red-500/5"
                    }`}>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Verification Status</span>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
                            credential.status === "valid" 
                                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                            {credential.status === "valid" ? "Verified Credential ✅" : "Credential Revoked ❌"}
                        </div>
                    </div>

                    {/* Credential Content */}
                    <div className="p-8 md:p-10 space-y-10">
                        {/* Student & Degree */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <User className="w-3 h-3" /> Student Name
                                </label>
                                <p className="text-xl font-semibold text-white">{credential.studentName}</p>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <GraduationCap className="w-3 h-3" /> Degree Title
                                </label>
                                <p className="text-xl font-semibold text-white">{credential.degreeTitle}</p>
                            </div>
                        </div>

                        {/* Branch & Institution */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Branch / Field</label>
                                <p className="text-lg text-gray-300 font-medium">{credential.branch}</p>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                    <Building2 className="w-3 h-3" /> Issuing Institution
                                </label>
                                <p className="text-lg text-gray-300 font-medium">{credential.institutionName}</p>
                            </div>
                        </div>

                        {/* Metadata: Date & ID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#1C1C1C]">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-[#0A0A0A] rounded-lg border border-[#111]">
                                    <Calendar className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">Issue Date</p>
                                    <p className="text-sm text-gray-300 font-medium">{formatDate(credential.issueDate)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-[#0A0A0A] rounded-lg border border-[#111]">
                                    <Fingerprint className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-tighter">Credential ID</p>
                                    <p className="text-sm text-gray-300 font-mono font-medium">{credential.degreeId}</p>
                                </div>
                            </div>
                        </div>

                        {/* Blockchain Proof Improvement */}
                        {credential.blockchainTxHash && (
                            <div className="p-4 rounded-xl bg-brand/5 border border-brand/10 flex items-center justify-between group cursor-help">
                                <div className="flex items-center gap-3">
                                    <LinkIcon className="w-4 h-4 text-brand" />
                                    <div>
                                        <p className="text-[10px] font-bold text-brand uppercase tracking-widest">Blockchain Proof Available</p>
                                        <p className="text-xs text-gray-500 font-mono mt-0.5">{shortenHash(credential.blockchainTxHash)}</p>
                                    </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-700 group-hover:text-brand transition-colors" />
                            </div>
                        )}
                    </div>

                    {/* Footer Action */}
                    <div className="p-6 bg-[#0A0A0A] border-t border-[#1C1C1C] flex justify-center">
                        <button 
                            onClick={() => window.open(`/api/certificates/${credential.degreeId}`, "_blank")}
                            className="flex items-center gap-2.5 px-8 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
                        >
                            <FileText className="w-4 h-4" />
                            View Certificate
                        </button>
                    </div>
                </div>

                {/* Platform Link */}
                <div className="text-center">
                    <p className="text-[10px] text-gray-600 font-medium uppercase tracking-[0.2em]">
                        Verified Academic Records • Powered by VERIDUS
                    </p>
                </div>
            </div>
        </div>
    );
}
