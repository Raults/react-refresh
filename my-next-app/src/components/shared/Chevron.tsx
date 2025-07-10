import React from "react";
import clsx from "clsx";

type ChevronProps = {
  direction: "up" | "down" | "left" | "right";
  onClick?: () => void;
  className?: string;
};

export default function Chevron({ direction, onClick, className }: ChevronProps) {
  const rotation = {
    up: "rotate-180",
    down: "",
    left: "rotate-90",
    right: "-rotate-90",
  }[direction];

  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center w-32 h-20 cursor-pointer group",
        className
      )}
    >
      <div
        className={clsx(
          "chevron transition-opacity group-hover:opacity-80",
          rotation
        )}
      />
    </div>
  );
}
