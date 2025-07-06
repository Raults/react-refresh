// components/PageTransitionOverlay.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransitionOverlay() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Trigger fade on every pathname change
    setShow(true);
    const timeout = setTimeout(() => setShow(false), 600); // match animation duration
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={pathname} // makes it rerun on every path
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 bg-black z-50 pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
}
