"use client";
import { useEffect, useRef, useState, RefObject } from "react";

type EditableIntroProps = {
    onTypingComplete: () => void;
};

const lines = [
    "Hi, I'm Ryan Tibbetts.",
    "I build thoughtful frontend experiences.",
];

const EditableIntro = ({ onTypingComplete }: EditableIntroProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isEditable, setIsEditable] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const editableRef = useRef<HTMLDivElement>(null);

    const focusEditableAtEnd = (ref: RefObject<HTMLDivElement | null>) => {
        const element = ref.current;
        if (!element) return;

        const range = document.createRange();
        const sel = window.getSelection();

        range.selectNodeContents(element);
        range.collapse(false); // cursor at end
        sel?.removeAllRanges();
        sel?.addRange(range);
    };

    useEffect(() => {
        if (lineIndex >= lines.length) return;

        const currentLine = lines[lineIndex];

        if (charIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + currentLine[charIndex]);
                setCharIndex(charIndex + 1);
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
                    setLineIndex(lineIndex + 1);
                    setCharIndex(0);
                }
            }, 1000);
            return () => clearTimeout(lineDelay);
        }
    }, [charIndex, lineIndex]);

    return (
        <div
            ref={editableRef}
            contentEditable={isEditable}
            suppressContentEditableWarning
            data-gramm="false"
            data-gramm_editor="false"
            className="text-white text-2xl md:text-3xl font-mono whitespace-pre-line text-center max-w-2xl mx-auto outline-none"
        >
            {displayedText}
            {showCursor && (
                <span className="inline-block w-[0ch] transition-opacity duration-1000 ease-in opacity-100 animate-pulse">
                    |
                </span>
            )}
        </div>
    );
};

export default EditableIntro;
