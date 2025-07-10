// components/OnScaleModel.tsx
"use client";
import { useGLTF } from "@react-three/drei";

export function Model(props: any) {
  const { scene } = useGLTF("/models/scene.gltf");
  return <primitive object={scene} {...props} scale={0.125} />;
}
