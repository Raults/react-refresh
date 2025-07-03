// src/components/HeroBanner.tsx
"use client";

import { useEffect, useRef, useState } from 'react';

const videos = [
    "/videos/circuit-board_6754824-uhd_3840_2160_25fps.mp4",
    "/videos/paint-drop_7126268-uhd_4096_2160_30fps.mp4",
    "/videos/crashing-waves_3571264-uhd_3840_2160_30fps.mp4"
];

const HeroBanner = () => {
    // video player
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [fadeIn, setFadeIn] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const currentVideoRef = useRef<HTMLVideoElement>(null);
    const nextVideoRef = useRef<HTMLVideoElement>(null);
    const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // center text
    const [displayedText, setDisplayedText] = useState("");
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const lines = [
        "Hi, I'm Ryan Tibbetts.",
        "I build thoughtful frontend experiences.",
    ];
    const [showCTA, setShowCTA] = useState(false);

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
                    // This was the final line — reveal CTA
                    setShowCTA(true);
                } else {
                    setDisplayedText((prev) => prev + "\n");
                    setLineIndex(lineIndex + 1);
                    setCharIndex(0);
                }
            }, 1000);
            return () => clearTimeout(lineDelay);
        }
    }, [charIndex, lineIndex]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Trigger crossfade every 20s
    useEffect(() => {
        if (isMobile) return;

        fadeTimeoutRef.current = setTimeout(() => {
            if (!nextVideoRef.current) return;

            setFadeIn(true);
            nextVideoRef.current.currentTime = 0; // start from beginning
            nextVideoRef.current.play();

            setTimeout(() => {
                setCurrentIndex(nextIndex);
                setNextIndex((nextIndex + 1) % videos.length);
                setFadeIn(false);
            }, 5000); // 5s fade
        }, 15000); // 20s timer

        return () => {
            if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
        };
    }, [currentIndex, nextIndex, isMobile]);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {isMobile ? (
                <img
                    src="/images/hero-fallback.jpg"
                    alt="Hero fallback"
                    className="absolute top-0 left-0 w-full h-full object-cover object-center"
                />
            ) : (
                <>
                    {/* Current playing video */}
                    <video
                        key={`video-${currentIndex}`}
                        ref={currentVideoRef}
                        className="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        <source src={videos[currentIndex]} type="video/mp4" />
                    </video>

                    {/* Next video fading in */}
                    <video
                        key={`video-${nextIndex}`}
                        ref={nextVideoRef}
                        className={`absolute top-0 left-0 w-full h-full object-cover object-center z-10 transition-opacity duration-[5000ms] ${fadeIn ? "opacity-100" : "opacity-0"
                            }`}
                        muted
                        loop
                        playsInline
                    >
                        <source src={videos[nextIndex]} type="video/mp4" />
                    </video>
                </>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-20" />

            {/* Content */}
            <div className="relative z-30 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <pre className="text-white text-2xl md:text-3xl font-mono whitespace-pre-line text-center max-w-2xl mx-auto">
                    {displayedText}
                    <span className="animate-pulse">|</span>
                </pre>
                <a
  href="#projects"
  className={`${
    showCTA ? "opacity-100" : "opacity-0"
  } pointer-events-${showCTA ? "auto" : "none"} 
  relative inline-block px-12 py-4 text-white rounded 
  overflow-hidden transition-opacity duration-500 group`}
>
  <span className="relative z-10">See My Work</span>
  <span
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
    opacity-0 group-hover:opacity-100 
    transition-opacity duration-500"
  />
</a>

            </div>
        </section>
    );
};

export default HeroBanner;
