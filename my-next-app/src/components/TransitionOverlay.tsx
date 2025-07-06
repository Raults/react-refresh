// components/TransitionOverlay.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePageTransition } from "@/context/PageTransitionContext";

export default function TransitionOverlay() {
  const { isTransitioning } = usePageTransition();

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="transition"
          className="fixed inset-0 bg-black z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}
