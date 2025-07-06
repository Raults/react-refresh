"use client";
import { useEffect, useState } from "react";

const carImages = ["car1.jpg", "car2.jpg", "car3.jpg", "car5.jpg"];

export default function CarCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-32 sm:w-40 md:w-56 lg:w-64 mx-auto aspect-[3/4] relative overflow-hidden rounded-xl shadow-lg">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${carImages.length * 100}%`,
        }}
      >
        {carImages.map((src, i) => (
          <div key={i} className="w-full h-full flex-shrink-0">
            <img
              src={`/images/${src}`}
              alt={`Car ${i + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
        {carImages.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
