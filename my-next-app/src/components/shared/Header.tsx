"use client";

import { useState } from "react";
import { Terminal, Menu, X } from "lucide-react";
import FadeLink from "./FadeLink";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      <div className="absolute inset-0 h-24 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

      <div className="flex items-center justify-between md:justify-end px-6 py-4 z-10 relative">
        {/* Mobile menu toggle (only shows on small screens) */}
        <button
          className="text-white md:hidden z-50 cursor-pointer relative"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        {/* Logo/Icon (shared) */}
        <FadeLink href="/" className="group flex items-center md:hidden cursor-pointer">
          <Terminal className="w-6 h-6 text-white animate-pulse-slow transition-transform group-hover:scale-110" />
        </FadeLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex text-white text-lg font-medium">
          {navItems.map(({ label, href }) => (
            <FadeLink key={label} href={href} className="group px-10 py-2 relative">
              <span className="underline-hover-ltr tracking-widest">{label}</span>
            </FadeLink>
          ))}
          <FadeLink href="/" className="group mb-2 flex items-center pl-5 cursor-pointer">
            <Terminal className="w-6 h-6 text-white animate-pulse-slow transition-transform group-hover:scale-110" />
          </FadeLink>
        </nav>
      </div>

      {/* Mobile nav overlay */}
      {isOpen && (
        <nav className="fixed top-0 left-0 w-full h-screen bg-black/90 flex flex-col items-center justify-center space-y-6 text-white text-2xl font-medium md:hidden z-50">
          <button
            className="absolute top-6 left-6 text-white z-50 cursor-pointer"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>

          {navItems.map(({ label, href }) => (
            <FadeLink
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="hover:scale-105 transition cursor-pointer"
            >
              {label}
            </FadeLink>
          ))}

          <FadeLink
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-white hover:scale-105 transition cursor-pointer"
          >
            <Terminal className="w-6 h-6 animate-pulse-slow" />
          </FadeLink>
        </nav>
      )}
    </header>
  );
};

export default Header;
