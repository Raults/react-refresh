// src/components/Header.tsx
"use client";

import { Terminal } from "lucide-react";
import Link from "next/link";

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-40">
            <div className="absolute inset-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

            <div className="flex items-center justify-end pr-12 py-4 z-10">
                <nav className="hidden md:flex text-white text-lg font-medium">
                    {["Projects", "About", "Contact"].map((label) => {
                        const href = `/${label.toLowerCase()}`;
                        return (
                            <Link
                                key={label}
                                href={href}
                                className="group px-10 py-2 relative"
                            >
                                <span className="underline-hover-ltr tracking-widest">
                                    {label}
                                </span>
                            </Link>
                        );
                    })}
                    <Link href="/" className="group mb-2 flex items-center pl-5 ">
                        <Terminal className="w-6 h-6 text-white animate-pulse-slow transition-transform group-hover:scale-110" />
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;