"use client";

import { useState, useEffect } from "react";
import { HardwareBox } from "./HardwareBox";

// Utility
const generateRandomUnit = () => (20 + Math.random() * 10).toFixed(1);

// Main Demo Component
export default function HardwareDemo() {
  const [values, setValues] = useState<string[]>([]);
  const [toggles, setToggles] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    const interval = setInterval(() => {
      setValues(Array.from({ length: 4 }, generateRandomUnit));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const positions = [
    "top-0 left-0",       // HW1
    "top-0 right-0",      // HW2
    "bottom-0 right-0",   // HW3
    "bottom-0 left-0",    // HW4
  ];

  const lines = [
    { x1: 100, y1: 56, x2: 400, y2: 56 },   // HW1 to HW2
    { x1: 100, y1: 56, x2: 100, y2: 224 },  // HW1 to HW4
    { x1: 400, y1: 56, x2: 400, y2: 224 },  // HW2 to HW3
    { x1: 100, y1: 224, x2: 400, y2: 224 }, // HW4 to HW3
  ];

  return (
    <div className="relative w-[500px] h-[300px] mx-auto bg-slate-50 rounded-xl overflow-hidden">
      <svg className="absolute w-full h-full pointer-events-none">
        {lines.map((line, idx) => (
          <line
            key={idx}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="gray"
            strokeDasharray="5,5"
            strokeWidth="2"
          />
        ))}
      </svg>

      {[1, 2, 3, 4].map((id, i) => (
        <HardwareBox
          key={id}
          id={id}
          value={values[id - 1] ?? "--"}
          toggle={toggles[id - 1]}
          setToggle={setToggles}
          position={positions[i]}
        />
      ))}
    </div>
  );
}