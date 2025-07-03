// src/components/Header.tsx
"use client";

const Header = () => {
    return (
        <header className="absolute top-0 left-0 w-full z-40">
            <div className="absolute inset-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

            <div className="flex items-center justify-end px-20 py-4 z-10">
                <nav className="hidden md:flex text-white text-lg font-medium">
                    {["About", "Projects", "Contact"].map((label) => {
                        const href = `#${label.toLowerCase()}`;
                        return (
                            <a
                                key={label}
                                href={href}
                                className="group px-10 py-2 relative"
                            >
                                <span className="relative inline-block tracking-widest">
                                    {label}
                                    <span className="pointer-events-none absolute left-1/2 bottom-0 h-[2px] w-0 bg-white transition-all duration-300 ease-in-out group-hover:left-0 group-hover:w-full" />
                                </span>
                            </a>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
};

export default Header;