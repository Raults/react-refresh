"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useRepelEffect } from "@/hooks/useRepelEffect";
import clsx from "clsx";

type RepelBlockProps = {
  children: ReactNode;
  className?: string;
  enabled?: boolean;
};

const RepelBlock = ({ children, className, enabled }: RepelBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  // prevent SSR hydration mismatch
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // run repel effect only on client after mount
  useRepelEffect(ref, enabled && hasMounted);

  return (
    <div
      ref={ref}
      className={clsx("inline-block", className)}
      data-repel
    >
      {children}
    </div>
  );
};

export default RepelBlock;
