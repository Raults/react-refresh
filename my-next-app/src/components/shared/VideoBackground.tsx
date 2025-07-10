"use client";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface VideoBackgroundProps {
  videos?: string[];
  transitionDelayMs?: number;
  fadeDurationMs?: number;
}

const defaultVideos = [
  "/videos/circuit-board_6754824-uhd_3840_2160_25fps.mp4",
  "/videos/paint-drop_7126268-uhd_4096_2160_30fps.mp4",
  "/videos/crashing-waves_3571264-uhd_3840_2160_30fps.mp4",
];

const VideoBackground = ({
  videos = defaultVideos,
  transitionDelayMs = 15000,
  fadeDurationMs = 5000,
}: VideoBackgroundProps) => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);

  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isMobile || videos.length < 2) return;

    const current = currentVideoRef.current;
    if (current && current.paused) {
      current.currentTime = 0;
      current.play().catch(() => { });
    }

    const handleCrossfade = () => {
      const current = currentVideoRef.current;
      const next = nextVideoRef.current;
      if (!next || !current) return;

      // Reset and play next
      next.currentTime = 0;
      next.play().catch(() => { });
      setFadeIn(true);

      // After fade is done
      setTimeout(() => {
        // Pause the now-hidden previous video
        current.pause();

        // Update indices
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % videos.length);
        setFadeIn(false);
      }, fadeDurationMs);
    };

    fadeTimeoutRef.current = setTimeout(handleCrossfade, transitionDelayMs);

    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [currentIndex, nextIndex, isMobile, videos, transitionDelayMs, fadeDurationMs]);

  if (isMobile) {
    return (
      <>
        {/* Hero background image */}
        <img
          src="/images/hero-fallback.jpg"
          alt="Hero fallback"
          className="fixed inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* Dark overlay for text contrast */}
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-0" />
      </>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      <video
        key={`video-${currentIndex}`}
        ref={currentVideoRef}
        className="absolute inset-0 w-full h-full object-cover object-center z-10"
        muted
        playsInline
        loop={false}
      >
        <source src={videos[currentIndex]} type="video/mp4" />
      </video>

      <video
        key={`video-${nextIndex}`}
        ref={nextVideoRef}
        className={`absolute inset-0 w-full h-full object-cover object-center z-20 transition-opacity duration-[${fadeDurationMs}ms] ${fadeIn ? "opacity-100" : "opacity-0"
          }`}
        muted
        playsInline
        loop={false}
      >
        <source src={videos[nextIndex]} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;
