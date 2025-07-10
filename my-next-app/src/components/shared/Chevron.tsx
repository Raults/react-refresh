import React from "react";
import clsx from "clsx";

type ChevronProps = {
  direction: "up" | "down";
  onClick?: () => void;
  className?: string;
};

export default function Chevron({ direction, onClick, className }: ChevronProps) {
  const rotate = direction === "up" ? "rotate-180" : "";

  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center w-32 h-20 cursor-pointer group", // enlarged clickable area
        className
      )}
    >
      <div
        className={clsx(
          "chevron transition-opacity group-hover:opacity-80", // clip-path shape
          rotate
        )}
      />
    </div>
  );
}