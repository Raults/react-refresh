"use client"

import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("https://6zhg6ilxed.execute-api.us-east-1.amazonaws.com/prod/contactFormHandler", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to send");

            setStatus("sent");
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md p-6 bg-white/20 backdrop-blur-sm rounded-xl border border-black/10 shadow-lg">
            <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="p-3 rounded-md border border-black/20 bg-white/40 placeholder-black/60 text-black/90 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-black/30"
            />
            <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="p-3 rounded-md border border-black/20 bg-white/40 placeholder-black/60 text-black/90 backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-black/30"
            />
            <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
                className="p-3 rounded-md border border-black/20 bg-white/40 placeholder-black/60 text-black/90 backdrop-blur-sm h-32 resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/30 focus:border-black/30"
            />
            <button
                type="submit"
                disabled={status === "sending"}
                className="bg-black/80 text-white p-3 rounded-md hover:bg-black transition disabled:opacity-50 cursor-pointer"
            >
                {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "sent" && <p className="text-green-600 text-sm">Message sent!</p>}
            {status === "error" && <p className="text-red-600 text-sm">Something went wrong. Try again.</p>}
        </form>
    );
}
