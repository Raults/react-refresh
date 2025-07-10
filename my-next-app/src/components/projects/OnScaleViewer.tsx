// components/OnScaleViewer.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from "./OnScaleModel";

export default function OnScaleViewer() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [1.5, 2, 1.5], fov: 35 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <Model position={[0, -0.2, 0]} />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
