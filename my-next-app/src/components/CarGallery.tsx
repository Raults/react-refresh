"use client";
import { useState } from "react";

const carImages = ["car1.jpg", "car2.jpg", "car3.jpg", "car4.jpg", "car5.jpg", "car6.jpg"];

export default function CarGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      {/* Grid of Thumbnails */}
      <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
        {carImages.map((src, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(`/images/${src}`)}
            className="cursor-pointer overflow-hidden rounded-xl shadow-md group"
          >
            <img
              src={`/images/${src}`}
              alt={`Car ${i + 1}`}
              className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full Size"
            className="max-w-[90%] max-h-[80%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
