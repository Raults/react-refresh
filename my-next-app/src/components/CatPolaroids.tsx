import { useState } from "react";

const cats = [
  {
    name: "Caeda",
    src: "caeda.jpeg",
    rotation: -8,
    x: -60,
    y: -40,
  },
  {
    name: "Lulu",
    src: "lulu.jpeg",
    rotation: 5,
    x: 30,
    y: -20,
  },
  {
    name: "Murph",
    src: "murph.jpeg",
    rotation: -3,
    x: -30,
    y: 40,
  },
  {
    name: "Fuzzy",
    src: "fuzzy.jpeg",
    rotation: 10,
    x: 50,
    y: 60,
  },
];

export default function CatPolaroids() {
  const [topCat, setTopCat] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-md h-100 mx-auto mt-8">
      {cats.map((cat, i) => {
        const isTop = cat.name === topCat;

        return (
          <div
            key={cat.name}
            className="absolute left-1/2 top-1/2 transition-transform duration-300 ease-in-out cursor-pointer"
            onMouseEnter={() => setTopCat(cat.name)}
            style={{
              transform: `translate(-50%, -50%) translate(${cat.x}px, ${cat.y}px) rotate(${cat.rotation}deg)`,
              zIndex: isTop ? 999 : i,
            }}
          >
            <div className="p-2 bg-white rounded-xl shadow-xl w-64 transition-transform duration-300 hover:scale-105">
              <img
                src={`/images/${cat.src}`}
                alt={cat.name}
                className="w-full h-auto rounded-lg object-cover"
              />
              <div className="text-center text-sm mt-2 text-gray-800 italic">{cat.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
