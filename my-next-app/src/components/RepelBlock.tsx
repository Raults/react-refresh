// src/components/RepelBlock.tsx
"use client";

import { ReactNode, useRef } from "react";
import { useRepelEffect } from "@/hooks/useRepelEffect";
import clsx from "clsx";

type RepelBlockProps = {
  children: ReactNode;
  className?: string;
};

const RepelBlock = ({ children, className }: RepelBlockProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useRepelEffect(ref);

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
