import { useEffect, useState } from "react";

const COLOR_CLASSES = [
  "bg-red-100",
  "bg-yellow-100",
  "bg-orange-100",
  "bg-green-100",
];

export const HardwareBox = ({ id, value, toggle, setToggle, position }: any) => {
  const [color, setColor] = useState("bg-slate-100");

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random();
      if (random < 0.4) {
        setColor(COLOR_CLASSES[Math.floor(Math.random() * COLOR_CLASSES.length)]);
      } else {
        setColor("bg-slate-100");
      }
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setToggle((prev: boolean[]) => {
      const copy = [...prev];
      copy[id - 1] = !copy[id - 1];
      return copy;
    });
  };

  return (
    <div
      className={`absolute ${position} w-44 h-28 rounded-xl border border-slate-300 
        p-3 shadow-sm text-slate-900 flex flex-col justify-between transition-colors duration-1000 
        ${color} animate-[pulse-slow] cursor-pointer`}
      onClick={handleClick}
    >
      <div className="text-sm font-semibold">Hardware {id}</div>
      <div className="text-sm font-mono text-slate-700">{value} units</div>

      {/* Decorative Toggle (non-interactive directly) */}
      <div
        className={`w-9 h-5 rounded-full transition-all 
          ${toggle ? "bg-teal-500" : "bg-slate-300"}`}
      />
    </div>
  );
};
