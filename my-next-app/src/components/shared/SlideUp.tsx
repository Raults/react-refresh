// components/SlideUp.tsx
"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function SlideUp({
  children,
  delay = 0,
  threshold = 0.4,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 30,
        transition: { duration: 0.4, ease: "easeIn" },
      });
    }
  }, [inView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      className={className} // ← ✅ Add this
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
