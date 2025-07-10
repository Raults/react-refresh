import { useState } from "react";

const cats = [
  { name: "Caeda", src: "caeda.jpeg", rotation: -8, x: -60, y: -40 },
  { name: "Lulu", src: "lulu.jpeg", rotation: 5, x: 30, y: -20 },
  { name: "Murph", src: "murph.jpeg", rotation: -3, x: -30, y: 40 },
  { name: "Fuzzy", src: "fuzzy.jpeg", rotation: 10, x: 50, y: 60 },
];

type Transform = { x: number; y: number; rotation: number };

export default function CatPolaroids() {
  const [topCat, setTopCat] = useState<string | null>(null);
  const [blownTransforms, setBlownTransforms] = useState<Record<string, Transform> | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateRandomTransforms = () => {
    const rand = () => Math.floor(Math.random() * 400 - 200); // x/y displacement
    const rot = () => Math.floor(Math.random() * 90 - 45);    // only -45° to +45°
    const transforms: Record<string, Transform> = {};
    for (const cat of cats) {
      transforms[cat.name] = { x: rand(), y: rand(), rotation: rot() };
    }
    return transforms;
  };

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setBlownTransforms(generateRandomTransforms());
    setTimeout(() => setIsAnimating(false), 800); // match your duration
  };

  return (
    <div className="relative w-full w-md h-100 mt-8">
      {cats.map((cat, i) => {
        const isTop = cat.name === topCat;
        const style = blownTransforms?.[cat.name] ?? cat;

        return (
          <div
            key={cat.name}
            className="absolute left-1/2 top-1/2 transition-transform duration-700 ease-out cursor-pointer"
            onMouseEnter={() => setTopCat(cat.name)}
            onClick={handleClick}
            style={{
              transform: `translate(-50%, -50%) translate(${style.x}px, ${style.y}px) rotate(${style.rotation}deg)`,
              zIndex: isTop ? 999 : i,
            }}
          >
            <div className="p-2 bg-white rounded-xl shadow-xl w-64 transition-transform duration-300 hover:scale-105">
              <img
                src={`/images/${cat.src}`}
                alt={cat.name}
                className="w-full h-auto rounded-lg object-cover"
              />
              <div className="text-center text-sm mt-2 text-gray-800 italic">
                {cat.name}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
