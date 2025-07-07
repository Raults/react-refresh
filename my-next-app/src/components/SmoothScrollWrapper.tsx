"use client";

import { useEffect, useRef } from "react";
import Scrollbar from "smooth-scrollbar";

export default function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollbar = Scrollbar.init(scrollRef.current, {
        damping: 0.08,
        alwaysShowTracks: true,
      });

      return () => {
        scrollbar.destroy();
      };
    }
  }, []);

  return (
    <div ref={scrollRef} className="h-screen overflow-hidden">
        {children}
    </div>
  );
}
