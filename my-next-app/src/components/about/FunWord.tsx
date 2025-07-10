// components/FunWord.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function FunWord({
  children,
  animationType,
}: {
  children: React.ReactNode;
  animationType: string;
}) {
  const [clicks, setClicks] = useState(0);
  const [trigger, setTrigger] = useState(false);

  const commonProps = {
    className: "inline-block pointer-events-auto cursor-pointer",
  };

  switch (animationType) {
    case "flip": {
      const transforms = [
        { scaleX: 1, scaleY: 1 },
        { scaleX: 1, scaleY: -1 },
        { scaleX: -1, scaleY: -1 },
        { scaleX: -1, scaleY: 1 },
      ];
      const current = transforms[clicks % 4];
      return (
        <motion.span
          {...commonProps}
          onClick={() => setClicks((c) => c + 1)}
          animate={current}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.span>
      );
    }
    case "bounce":
      const [isHovered, setIsHovered] = useState(false);
      return (
        <motion.span
          {...commonProps}
          animate={isHovered ? { y: [-2, -8, 0] } : { y: 0 }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </motion.span>
      );
    case "drive": {
      const [driveKey, setDriveKey] = useState(0);
      const [shouldAnimate, setShouldAnimate] = useState(false);
      return (
        <motion.span
          key={driveKey}
          {...commonProps}
          onClick={() => {
            setDriveKey((k) => k + 1);
            setShouldAnimate(true);
          }}
          initial={{ x: 0 }}
          animate={shouldAnimate ? { x: [0, 300, -300, 0] } : {}}
          transition={{ duration: 1.6 }}
          onAnimationComplete={() => setShouldAnimate(false)}
        >
          {children}
        </motion.span>
      );
    }
    case "sparkle":
      return (
        <motion.span
          {...commonProps}
          whileHover={{ scale: 1.1, textShadow: "0px 0px 8px #8aff80" }}
        >
          {children}
        </motion.span>
      );
    case "pulse": {
      const [isHovered, setIsHovered] = useState(false);
      return (
        <motion.span
          {...commonProps}
          animate={isHovered ? { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] } : { scale: 1, opacity: 1 }}
          transition={isHovered ? { duration: 1.2, repeat: Infinity } : { duration: 0.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {children}
        </motion.span>
      );
    }
    case "glitch":
      return (
        <motion.span
          {...commonProps}
          whileHover={{
            x: [-1, 1, -1, 1, 0],
            opacity: [1, 0.6, 1],
            transition: { duration: 0.3 },
          }}
        >
          {children}
        </motion.span>
      );
    case "cats":
      const spawnPaw = () => {
        const paw = document.createElement("div");
        paw.textContent = "😺"; // higher contrast emoji
        paw.style.position = "fixed";
        paw.style.left = `${Math.random() * window.innerWidth}px`;
        paw.style.top = `${Math.random() * window.innerHeight}px`;
        paw.style.fontSize = "48px";
        paw.style.zIndex = "9999";
        paw.style.pointerEvents = "none";
        paw.style.opacity = "1";
        paw.style.transition = "opacity 0.5s ease-out";
        paw.style.filter = "drop-shadow(0 0 4px rgba(255,255,255,0.8))";
        document.body.appendChild(paw);
        setTimeout(() => paw.style.opacity = "0", 1500);
        setTimeout(() => paw.remove(), 2000);
      };
      return (
        <motion.span
          {...commonProps}
          onClick={() => {
            for (let i = 0; i < 4; i++) {
              setTimeout(spawnPaw, i * 150);
            }
          }}
        >
          {children}
        </motion.span>
      );
    case "skyline": {
      const [isHovered, setIsHovered] = useState(false);
      return (
        <motion.span
          {...commonProps}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: "inline-block",
            color: isHovered ? "#38bdf8" : "#fff",
            textShadow: isHovered
              ? "0 0 8px rgba(56,189,248,0.8), 0 0 16px rgba(56,189,248,0.6)"
              : "none",
            transition: "color 0.3s ease, text-shadow 0.3s ease",
          }}
        >
          {children}
        </motion.span>
      );
    }
    default:
      return <span className="cursor-pointer">{children}</span>;
  }
}
