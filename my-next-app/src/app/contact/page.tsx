"use client";

import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import { useRef, useEffect, useState } from "react";
import { Palette, X, Eraser } from "lucide-react";

type Bloom = {
  x: number;
  y: number;
  radius: number;
  growing: boolean;
  maxRadius: number;
  colorStart: string;
  colorEnd: string;
};

const COLOR_PALETTES: { name: string; start: string; end: string }[] = [
  { name: "Blue", start: "rgba(0, 123, 255, 0.4)", end: "rgba(0, 123, 255, 0)" },
  { name: "Pink", start: "rgba(255, 99, 132, 0.4)", end: "rgba(255, 99, 132, 0)" },
  { name: "Yellow", start: "rgba(255, 205, 86, 0.4)", end: "rgba(255, 205, 86, 0)" },
  { name: "Teal", start: "rgba(75, 192, 192, 0.4)", end: "rgba(75, 192, 192, 0)" },
  { name: "Purple", start: "rgba(153, 102, 255, 0.4)", end: "rgba(153, 102, 255, 0)" },
  { name: "Orange", start: "rgba(255, 159, 64, 0.4)", end: "rgba(255, 159, 64, 0)" },
];

export default function ContactPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blooms = useRef<Bloom[]>([]);
  const [selectedColor, setSelectedColor] = useState<null | {
    start: string;
    end: string;
  }>(null);
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    setClickCount((prev) => prev + 1);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const maxRadius = Math.sqrt(width * width + height * height);

    const palette =
      selectedColor ??
      COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];

    const newBloom: Bloom = {
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      growing: true,
      maxRadius,
      colorStart: palette.start,
      colorEnd: palette.end,
    };

    blooms.current.push(newBloom);
  };

  const toggleDropdown = () => {
    if (dropdownOpen) {
      setDropdownVisible(false);
      setTimeout(() => setDropdownOpen(false), 150); // match animation duration
    } else {
      setDropdownOpen(true);
      setTimeout(() => setDropdownVisible(true), 10); // allow mount before animate in
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      blooms.current.forEach((bloom) => {
        if (bloom.growing) {
          const growthRate = 20 * Math.exp(-bloom.radius / 200);
          bloom.radius += growthRate;

          if (bloom.radius >= bloom.maxRadius) {
            bloom.growing = false;
            bloom.radius = bloom.maxRadius;
          }
        }

        const gradient = ctx.createRadialGradient(
          bloom.x,
          bloom.y,
          0,
          bloom.x,
          bloom.y,
          bloom.radius
        );
        gradient.addColorStop(0, bloom.colorStart);
        gradient.addColorStop(1, bloom.colorEnd);

        ctx.save();
        ctx.shadowBlur = 50;
        ctx.shadowColor = bloom.colorStart.replace("0.4", "0.6");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(bloom.x, bloom.y, bloom.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (clickCount >= 3 && !paletteVisible) {
      setPaletteVisible(true);
    }
  }, [clickCount]);

  return (
    <>
      <Header />
      <div
        className="relative w-full h-screen flex items-center justify-center bg-white"
        onClick={handleClick}
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        />
        <ContactForm />

        {/* Color Picker UI */}
        {clickCount >= 4 && (
          <div
            className={`absolute bottom-6 right-6 z-50 transform transition-all duration-300 ${clickCount === 4 ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
              }`}
          >
            <button
              className="bg-white border shadow p-2 rounded-full text-xl hover:bg-gray-50 transition cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown();
              }}
              title="Select Bloom Color"
            >
              <Palette className="w-5 h-5 text-gray-700" />
            </button>

            {dropdownOpen && (
              <div
                className={`absolute bottom-full right-0 mb-2 w-44 bg-white border shadow rounded p-2 space-y-1
                transition-all duration-150 transform
                ${dropdownVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-1"}
              `}
              >
                <div className="flex justify-between items-center mb-1 px-2 text-xs text-gray-500">
                  <span>Select color</span>
                  <X
                    className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown();
                    }}
                  />
                </div>

                <div
                  className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded hover:bg-gray-100 text-sm text-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    blooms.current = []; // clear the canvas
                  }}
                >
                  <Eraser className="w-4 h-4 text-gray-600" />
                  <span>Clear Canvas</span>
                </div>

                <div
                  className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded ${selectedColor === null ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(null);
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-100"></div>
                  <span className="text-sm text-gray-800">Random</span>
                  {selectedColor === null && (
                    <span className="ml-auto text-green-500 text-xs">✔</span>
                  )}
                </div>

                {COLOR_PALETTES.map((palette, i) => {
                  const isSelected =
                    selectedColor?.start === palette.start &&
                    selectedColor?.end === palette.end;

                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded ${isSelected ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColor({ start: palette.start, end: palette.end });
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ background: palette.start }}
                      ></div>
                      <span className="text-sm text-gray-800">{palette.name}</span>
                      {isSelected && (
                        <span className="ml-auto text-green-500 text-xs">✔</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
