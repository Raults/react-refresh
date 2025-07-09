"use client";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

interface VideoBackgroundProps {
  videos?: string[];
}

const defaultVideos = [
  "/videos/circuit-board_6754824-uhd_3840_2160_25fps.mp4",
  "/videos/paint-drop_7126268-uhd_4096_2160_30fps.mp4",
  "/videos/crashing-waves_3571264-uhd_3840_2160_30fps.mp4",
];

const VideoBackground = ({ videos = defaultVideos }: VideoBackgroundProps) => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [fadeIn, setFadeIn] = useState(false);

  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Crossfade
  useEffect(() => {
    if (isMobile || videos.length < 2) return;

    const handleCrossfade = () => {
      if (!nextVideoRef.current) return;

      setFadeIn(true);
      nextVideoRef.current.currentTime = 0;
      nextVideoRef.current.play();

      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % videos.length);
        setFadeIn(false);
      }, 5000);
    };

    fadeTimeoutRef.current = setTimeout(handleCrossfade, 15000);

    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [currentIndex, nextIndex, isMobile, videos]);

  if (isMobile) {
    return (
      <img
        src="/images/hero-fallback.jpg"
        alt="Hero fallback"
        className="fixed inset-0 w-full h-full object-cover object-center z-[-1]"
      />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      <video
        key={`video-${currentIndex}`}
        ref={currentVideoRef}
        className="absolute inset-0 w-full h-full object-cover object-center z-[0]"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videos[currentIndex]} type="video/mp4" />
      </video>

      <video
        key={`video-${nextIndex}`}
        ref={nextVideoRef}
        className={`absolute inset-0 w-full h-full object-cover object-center z-[10] transition-opacity duration-[5000ms] ${fadeIn ? "opacity-100" : "opacity-0"
          }`}
        muted
        loop
        playsInline
      >
        <source src={videos[nextIndex]} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoBackground;
