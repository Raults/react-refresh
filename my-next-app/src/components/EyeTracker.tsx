import { useEffect, useRef, useState } from "react";

export default function EyeTracker() {
  const pupilRef = useRef<HTMLImageElement>(null);
  const [trackingEnabled, setTrackingEnabled] = useState(false);

  useEffect(() => {
    // Enable tracking after delay
    const enableTimer = setTimeout(() => {
      setTrackingEnabled(true);
    }, 15000); // ⏱️ 3 seconds

    return () => clearTimeout(enableTimer);
  }, []);

  useEffect(() => {
    if (!trackingEnabled) return;

    const pupil = pupilRef.current;
    if (!pupil) return;

    let animationFrameId: number;
    let idleTimeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      if (!pupilRef.current) return;
      clearTimeout(idleTimeoutId);

      const container = pupilRef.current.parentElement!;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const magnitude = Math.sqrt(dx * dx + dy * dy);
      if (magnitude === 0) return;

      const unitX = dx / magnitude;
      const unitY = dy / magnitude;

      const maxX = 8;
      const maxY = 5;

      const distanceFactor = Math.min(magnitude / 100, 1); // Optional
      const x = unitX * maxX * distanceFactor;
      const y = unitY * maxY * distanceFactor;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        pupil.style.transition = "transform 1000ms ease-out";
        pupil.style.transform = `translate(${x}px, ${y}px)`;
      });

      idleTimeoutId = setTimeout(() => {
        pupil.style.transition = "transform 0.5s ease-out";
        pupil.style.transform = `translate(0px, 0px)`;
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [trackingEnabled]);

  return (
    <div className="relative flex items-center justify-center">
      <div
        className="relative w-90 h-120 mx-auto rounded-xl overflow-hidden"
        style={{
          backgroundImage: `repeating-linear-gradient(
                          to right,
                          #acaaab 0%,
                          #acaaab 38%,
                          #b0bfd4 41%,
                          #acaaab 65%,
                          #b0bfd4 68%,
                          #b0bfd4 100%
                        )`,
          backgroundSize: "100% 100%", // or experiment with '400% 100%' to stretch it
        }}
      >
        {/* Eye whites (bottom layer) */}
        <img
          src="/assets/eyes.svg"
          alt="Eyes"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
        />

        {/* Pupils (middle layer, animated) */}
        <img
          ref={pupilRef}
          src="/assets/pupils.svg"
          alt="Pupils"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-transform duration-75 z-10"
        />

        {/* Face (top layer) */}
        <img
          src="/assets/face.svg"
          alt="Face"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
        />
      </div>
    </div>
  );
}
