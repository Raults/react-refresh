// components/PageFadeOverlay.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageFadeOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 600); // matches animation duration
    return () => clearTimeout(timeout);
  }, []);

  return visible ? (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-black pointer-events-none"
    />
  ) : null;
}
