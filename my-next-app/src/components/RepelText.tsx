// src/components/RepelText.tsx
"use client";

import { setCharRef } from "@/utils/setCharRef";
import { useRef, useEffect } from "react";


type RepelTextProps = {
    text: string;
};

const RepelText = ({ text }: RepelTextProps) => {
    const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        let animationFrameId: number;

        const handleMouseMove = (e: MouseEvent) => {
            animationFrameId = requestAnimationFrame(() => {
                charRefs.current.forEach((char) => {
                    if (!char) return;

                    const rect = char.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    const dx = e.clientX - centerX;
                    const dy = e.clientY - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const maxDistance = 50;
                    const repelStrength = 20;
                    const repelSpeed = 100;
                    const returnSpeed = 2000;

                    if (distance < maxDistance) {
                        const angle = Math.atan2(dy, dx);
                        const intensity = Math.max(0, Math.min(1, (maxDistance - distance) / maxDistance));
                        const repelX = Math.cos(angle) * -repelStrength * intensity;
                        const repelY = Math.sin(angle) * -repelStrength * intensity;
                        const rotate = Math.sin(angle) * 15;

                        char.style.transition = `transform ${repelSpeed}ms linear`;
                        char.style.transform = `translate(${repelX}px, ${repelY}px) rotate(${rotate}deg) scale(1.05)`;
                    } else {
                        char.style.transition = `transform ${returnSpeed}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
                        char.style.transform = "translate(0, 0) rotate(0deg) scale(1)";
                    }
                });
            });
        };


        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <p className="flex flex-wrap text-xl md:text-2xl font-mono leading-relaxed max-w-3xl mx-auto text-white">
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    ref={setCharRef(charRefs)(i)}
                    className="inline-block text-white"
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </p>
    );
};

export default RepelText;
