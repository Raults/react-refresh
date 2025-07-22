"use client";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// const carImages = ["car1.JPG", "car2.JPG", "car3.JPG", "car4.JPG", "car5.JPG", "car6.JPG"];
const carImages = ["car1.JPG", "car2.JPG", "car3.JPG", "car5.JPG"];

export default function CarGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage = selectedIndex !== null ? `/images/${carImages[selectedIndex]}` : null;

  const handleNext = () =>
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % carImages.length : null));

  const handlePrev = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + carImages.length) % carImages.length : null
    );

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const img = e.currentTarget;
    const clickX = e.nativeEvent.offsetX;
    const middle = img.clientWidth / 2;

    if (clickX < middle) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
  }, [selectedIndex]);

  useEffect(() => {
    if (selectedImage !== null) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [selectedImage]);


  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 xl:grid-cols-2 gap-4 xl:min-w-[496px] xl:max-h-[656px]">
        {carImages.map((src, i) => (
          <div
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="cursor-pointer overflow-hidden rounded-xl shadow-md group"
          >
            <img
              src={`/images/${src}`}
              alt={`Car ${i + 1}`}
              className="w-full h-80 object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-100 animate-fade-in"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <X
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:scale-110 transition-transform cursor-pointer z-50"
            />

            {/* Clickable Image */}
            <img
              src={selectedImage}
              alt="Full Size"
              onClick={handleImageClick}
              className="max-w-[90vw] max-h-[80vh] rounded-xl shadow-2xl cursor-pointer select-none"
            />
          </div>
        </div>
      )}
    </>
  );
}
