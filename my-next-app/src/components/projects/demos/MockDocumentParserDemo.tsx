"use client";
import { MoveLeft } from "lucide-react";
import { useState } from "react";

const EQUIFAX_RED = "#9E1B32";
const TEXT_COLOR = "#1a1a1a";

export default function EquifaxUploadDemo() {
    const [uploaded, setUploaded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: "John Doe",
        email: "",
        dob: "1990-01-01",
        ssn: "",
    });

    const handleUpload = () => {
        setUploaded(true);
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            setFormVisible(true);
        }, 1800); // simulate fake parsing
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isFormValid = formData.email.trim() !== "" && formData.ssn.trim() !== "";

    return (
        <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow-md space-y-6 border border-gray-200">
            {/* Logo */}
            <div className="text-center">
                <img
                    src="/logos/equifax_logo.png" // make sure this is in your /public folder
                    alt="Equifax Logo"
                    className="w-40 mx-auto mb-4"
                />
                <p className="text-sm text-gray-500 italic">
                    (This is a fake upload demo — just go with it 😅)
                </p>
            </div>

            {!uploaded && (
                <div className="space-y-4 text-center">
                    <p className="text-xl font-semibold" style={{ color: TEXT_COLOR }}>
                        Upload a Document
                    </p>
                    <div className="text-center">
                        <label
                            htmlFor="file-upload"
                            className="inline-block px-6 py-2 bg-[#9E1B32] text-white font-medium rounded hover:bg-[#7f162a] cursor-pointer transition"
                        >
                            📄 Upload Document
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleUpload}
                        />
                    </div>
                    <p className="text-sm text-gray-500">
                        We’ll "extract" the data and ask you to complete what’s missing.
                    </p>
                </div>
            )}

            {processing && (
                <div className="text-center text-gray-600 animate-pulse">
                    <p>Parsing document…</p>
                </div>
            )}

            {formVisible && (
                <form className="space-y-4 text-[#1a1a1a]">
                    <p
                        className="text-lg font-semibold text-center mb-4"
                        style={{ color: EQUIFAX_RED }}
                    >
                        Help us complete your profile
                    </p>

                    <div>
                        <label className="block font-medium text-sm mb-1">Full Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-[#9E1B32]"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-sm mb-1">Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Required"
                            className="w-full border border-red-300 px-3 py-2 rounded focus:ring-2 focus:ring-[#9E1B32]"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-sm mb-1">Date of Birth</label>
                        <input
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-[#9E1B32]"
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-sm mb-1">SSN</label>
                        <input
                            name="ssn"
                            value={formData.ssn}
                            onChange={handleChange}
                            placeholder="Required"
                            className="w-full border border-red-300 px-3 py-2 rounded focus:ring-2 focus:ring-[#9E1B32]"
                        />
                    </div>

                    <div className="flex justify-between gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                setFormVisible(false);
                                setUploaded(false);
                            }}
                            className="w-1/2 border border-gray-400 py-2 rounded hover:bg-gray-100 transition flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            <MoveLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                alert("Form submitted!");
                                setFormVisible(false);
                                setUploaded(false);
                                setFormData({
                                    name: "John Doe",
                                    email: "",
                                    dob: "1990-01-01",
                                    ssn: "",
                                });
                            }}
                            disabled={!isFormValid}
                            className={`w-1/2 py-2 rounded transition text-white cursor-pointer ${isFormValid
                                    ? "bg-[#9E1B32] hover:bg-[#7f162a]"
                                    : "bg-gray-300 cursor-not-allowed"
                                }`}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
