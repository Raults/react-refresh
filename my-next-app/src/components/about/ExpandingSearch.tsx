"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

const RESPONSES = [
    "No results. But you look great today.",
    "Searching... just kidding, this isn't real.",
    "You found the secret search bar. Congrats.",
    "404: Meaningful content not found.",
    "Try yelling at your screen louder.",
    "It's not plugged in. Probably.",
    "Enhance... enhance... nope, still nothing.",
    "Nice typing. Still nothing.",
];

export default function MorphingSearch() {
    const [expanded, setExpanded] = useState(false);
    const [input, setInput] = useState("");
    const [comment, setComment] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Collapse on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target as Node) &&
                !(e.target as HTMLElement).closest("#search-wrapper")
            ) {
                setExpanded(false);
                setInput("");
                setComment("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle fake comment generation
    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        if (input.trim()) {
            timeoutRef.current = setTimeout(() => {
                const response =
                    RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
                setComment(response);
            }, 800); // wait 800ms after typing
        } else {
            setComment("");
        }
    }, [input]);

    return (
        <div
            id="search-wrapper"
            className="relative h-10 flex items-center"
            onClick={() => setExpanded(true)}
        >
            {/* Input */}
            <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`
                    h-10 pl-12 pr-4 rounded-full border border-gray-300 shadow-sm
                    text-sm transition-all duration-500 ease-in-out
                    bg-white text-black
                    focus:outline-none focus:ring-2 focus:ring-black
                    ${expanded ? "w-64 opacity-100 cursor-text" : "w-10 opacity-0 cursor-pointer"}
                    `}
                style={{
                    transitionProperty: "width, opacity, padding",
                }}
                autoFocus={expanded}
            />

            {/* Icon */}
            <div
                className={`
          absolute top-1/2 -translate-y-1/2
          transition-all duration-500 ease-in-out
          ${expanded ? "left-[13.5rem] text-black" : "left-2 text-muted-foreground cursor-pointer"}
        `}
                style={{
                    transitionProperty: "left, color",
                }}
            >
                <Search className="w-6 h-6" />
            </div>

            {/* Fake comment */}
            {comment && (
                <div className="absolute top-12 left-0 w-64 text-sm text-gray-500 bg-white border border-gray-200 rounded shadow p-2 animate-fade-in">
                    {comment}
                </div>
            )}
        </div>
    );
}
