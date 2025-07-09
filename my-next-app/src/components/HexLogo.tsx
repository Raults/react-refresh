// src/components/HexLogo.tsx

import React from "react";

type HexLogoProps = {
  pos: "top" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "bottom";
  src?: string;
  type?: "video";
};

const positions: Record<HexLogoProps["pos"], string> = {
  top: "absolute top-0 left-1/2 transform -translate-x-1/2",
  "top-left": "absolute top-[20%] left-[5%]",
  "top-right": "absolute top-[20%] right-[5%]",
  "bottom-left": "absolute bottom-[20%] left-[5%]",
  "bottom-right": "absolute bottom-[20%] right-[5%]",
  bottom: "absolute bottom-0 left-1/2 transform -translate-x-1/2",
};

export default function HexLogo({ pos, src, type }: HexLogoProps) {
  return (
    <div
      className={`w-32 h-32 bg-white rounded-full p-4 shadow-md flex items-center justify-center transition-transform hover:scale-105 grayscale hover:grayscale-0 cursor-pointer ${positions[pos]}`}
    >
      {type === "video" ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-contain"
          disablePictureInPicture
          disableRemotePlayback
        >
          <source
            src="https://storage.googleapis.com/gweb-x-cdn/x/uploads/c7d4ba0183be0bf8abdd09b7e3ea3b6a25562fe8.webm"
            type="video/webm"
          />
          <source
            src="https://storage.googleapis.com/gweb-x-cdn/x/uploads/714f9027243895148b44a20cc69c5d85ca971121.mp4"
            type="video/mp4"
          />
        </video>
      ) : (
        <img src={src} alt="logo" className="max-w-full max-h-full object-contain" />
      )}
    </div>
  );
}
