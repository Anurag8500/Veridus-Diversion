"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";

export default function CreateCredentialPage() {
    const [formData, setFormData] = useState({
        studentName: "",
        studentEmail: "",
        studentId: "",
        degreeTitle: "",
        fieldOfStudy: "",
        graduationYear: "",
        grade: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Create Credential</h1>
                <p className="text-gray-400 mt-2">
                    Create and issue a verified academic credential for a student.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                    <form className="space-y-8">
                        {/* 1. Student Information */}
                        <div className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] space-y-6">
                            <h2 className="text-xl font-medium border-b border-[#1C1C1C] pb-4">
                                1. Student Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Student Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="studentName"
                                        value={formData.studentName}
                                        onChange={handleChange}
                                        placeholder="Enter full name"
                                        className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Student Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="studentEmail"
                                        value={formData.studentEmail}
                                        onChange={handleChange}
                                        placeholder="student@example.com"
                                        className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Student ID / Roll Number
                                    </label>
                                    <input
                                        type="text"
                                        name="studentId"
                                        value={formData.studentId}
                                        onChange={handleChange}
                                        placeholder="e.g. STU-2023-001"
                                        className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. Academic Information */}
                        <div className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] space-y-6">
                            <h2 className="text-xl font-medium border-b border-[#1C1C1C] pb-4">
                                2. Academic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Degree / Certification Title
                                    </label>
                                    <input
                                        type="text"
                                        name="degreeTitle"
                                        value={formData.degreeTitle}
                                        onChange={handleChange}
                                        placeholder="e.g. Bachelor of Science in Computer Science"
                                        className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Field of Study
                                    </label>
                                    <input
                                        type="text"
                                        name="fieldOfStudy"
                                        value={formData.fieldOfStudy}
                                        onChange={handleChange}
                                        placeholder="e.g. Computer Science"
                                        className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Graduation Year
                                    </label>
                                    <input
                                        type="text"
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleChange}
                                        placeholder="YYYY"
                                        className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Grade / CGPA (optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="grade"
                                        value={formData.grade}
                                        onChange={handleChange}
                                        placeholder="e.g. 3.8/4.0 or First Class"
                                        className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-300">
                                        Credential Description (optional)
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Add any additional details about this credential..."
                                        rows={4}
                                        className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Certificate Upload */}
                        <div className="p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] space-y-6">
                            <h2 className="text-xl font-medium border-b border-[#1C1C1C] pb-4">
                                3. Certificate Upload
                            </h2>
                            <div className="border-2 border-dashed border-[#222] rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-[#0A0A0A] transition-colors cursor-pointer group">
                                <div className="w-12 h-12 rounded-full bg-[#111] flex items-center justify-center mb-4 group-hover:bg-[#1C1C1C] transition-colors">
                                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-white" />
                                </div>
                                <p className="text-sm font-medium text-gray-300">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PDF, JPG, or PNG (max. 10MB)
                                </p>
                            </div>
                        </div>

                        {/* 5. Primary Action Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="button"
                                className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                Create Credential
                            </button>
                        </div>
                    </form>
                </div>

                {/* 4. Credential Preview Sidebar */}
                <div className="xl:col-span-1">
                    <div className="sticky top-8 p-6 rounded-xl border border-[#1C1C1C] bg-[#050505] space-y-6">
                        <h2 className="text-xl font-medium border-b border-[#1C1C1C] pb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-400" />
                            Preview
                        </h2>

                        <div className="space-y-4">
                            {formData.degreeTitle ? (
                                <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#111] space-y-3">
                                    <div className="text-center pb-3 border-b border-[#1C1C1C]">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                                            VERIDUS VERIFIED
                                        </p>
                                        <h3 className="font-medium leading-snug">
                                            {formData.degreeTitle}
                                        </h3>
                                    </div>

                                    <div className="space-y-2 text-sm pt-2">
                                        <div className="flex justify-between items-start gap-4">
                                            <span className="text-gray-500">Issued To:</span>
                                            <span className="font-medium text-right break-words">{formData.studentName || "—"}</span>
                                        </div>
                                        <div className="flex justify-between items-start gap-4">
                                            <span className="text-gray-500">Student ID:</span>
                                            <span className="text-right break-words">{formData.studentId || "—"}</span>
                                        </div>
                                        <div className="flex justify-between items-start gap-4">
                                            <span className="text-gray-500">Major:</span>
                                            <span className="text-right break-words">{formData.fieldOfStudy || "—"}</span>
                                        </div>
                                        <div className="flex justify-between items-start gap-4">
                                            <span className="text-gray-500">Class of:</span>
                                            <span className="text-right break-words">{formData.graduationYear || "—"}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-12 text-center text-sm text-gray-500">
                                    <p>Start typing to see</p>
                                    <p>credential preview.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
