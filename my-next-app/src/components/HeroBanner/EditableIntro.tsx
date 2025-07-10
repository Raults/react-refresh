"use client";
import { useEffect, useRef, useState, RefObject } from "react";
import dynamic from "next/dynamic";
const TerminalModal = dynamic(() => import("./TerminalModal"), { ssr: false });

const lines = [
    "Hi, I'm Ryan Tibbetts.",
    "I build thoughtful frontend experiences.",
];

const EditableIntro = ({ onTypingComplete }: { onTypingComplete: () => void }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isEditable, setIsEditable] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const [showTerminal, setShowTerminal] = useState(false);
    const [terminalKey, setTerminalKey] = useState(0);
    const editableRef = useRef<HTMLDivElement>(null);

    const focusEditableAtEnd = (ref: RefObject<HTMLDivElement | null>) => {
        const element = ref.current;
        if (!element) return;
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
    };

    const handleCloseTerminal = () => {
        setShowTerminal(false);

        requestAnimationFrame(() => {
            setDisplayedText("");
            setLineIndex(0);
            setCharIndex(0);
            setIsEditable(false);
            setShowCursor(true);
            setTerminalKey((k) => k + 1);
            editableRef.current?.focus(); // optional
        });

        // Clear editable text content
        if (editableRef.current) {
            editableRef.current.innerText = "";
        }
    };

    useEffect(() => {
        if (lineIndex >= lines.length) return;

        const currentLine = lines[lineIndex];
        if (charIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + currentLine[charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 50);
            return () => clearTimeout(timeout);
        } else {
            const lineDelay = setTimeout(() => {
                if (lineIndex === lines.length - 1) {
                    onTypingComplete();
                    setTimeout(() => {
                        setShowCursor(false);
                        setTimeout(() => {
                            setIsEditable(true);
                            requestAnimationFrame(() => {
                                requestAnimationFrame(() => {
                                    if (editableRef.current) {
                                        focusEditableAtEnd(editableRef);
                                    }
                                });
                            });
                        }, 500);
                    }, 1000);
                } else {
                    setDisplayedText((prev) => prev + "\n");
                    setLineIndex((prev) => prev + 1);
                    setCharIndex(0);
                }
            }, 1000);
            return () => clearTimeout(lineDelay);
        }
    }, [charIndex, lineIndex]);

    useEffect(() => {
        if (!isEditable) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault();

                const text = editableRef.current?.innerText.trim().toLowerCase();
                if (text === "terminal") {
                    setShowTerminal(true);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isEditable]);

    return (
        <>
            <div
                ref={editableRef}
                contentEditable={isEditable && !showTerminal}
                suppressContentEditableWarning
                data-gramm="false"
                data-gramm_editor="false"
                className="text-white text-2xl md:text-3xl font-mono whitespace-pre-line text-center max-w-2xl mx-auto outline-none"
            >
                {!showTerminal && displayedText}
                {showCursor && (
                    <span className="inline-block w-[0ch] transition-opacity duration-1000 ease-in opacity-100 animate-pulse">
                        |
                    </span>
                )}
            </div>

            {showTerminal && <TerminalModal key={terminalKey} onClose={handleCloseTerminal} />}
        </>
    );
};

export default EditableIntro;
