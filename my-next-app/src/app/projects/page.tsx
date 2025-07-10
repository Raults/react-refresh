"use client"

import { useState, useEffect } from "react";
import Header from "@/components/shared/Header";
import SlideUp from "@/components/shared/SlideUp";
import HexLogo from "@/components/projects/HexLogo";
import VideoBackground from "@/components/shared/VideoBackground";
import ProjectModal from "@/components/projects/ProjectModal";

const videos = [
  "/videos/board-pile_6755170-uhd_3840_2160_25fps.mp4",
  "/videos/board-pile_6755170-uhd_3840_2160_25fps copy.mp4"
];

export default function ProjectsPage() {
  const [activeModal, setActiveModal] = useState<null | string>(null);

  useEffect(() => {
    const video = document.getElementById("bg-video") as HTMLVideoElement | null;
    if (video) {
      video.playbackRate = 0.5; // 0.5 = half speed
    }
  }, []);

  return (
    <>
      <Header />
      <VideoBackground videos={videos} transitionDelayMs={4000} fadeDurationMs={5000} />
      <div className="fixed inset-0 bg-black/60 z-0" />
      <main className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 py-20 sm:py-30 z-10">
        <div className="relative w-full flex flex-col gap-10 items-center pr-20 pl-10 py-10">
          {/* 👨‍💻 Hexagon Layout – Only shown on md+ */}
          <SlideUp className="relative hidden md:block w-full max-w-4xl h-[600px] mx-auto">
            <div className="absolute inset-0 flex items-center text-center z-10 pointer-events-none">
              <div className="w-full px-48 text-lg text-white leading-relaxed">
                These logos belong to the companies I’ve built for.
                Click them to learn who they are, what I did with them, and explore a sample of what you might have seen of my work there.
              </div>
            </div>
            <HexLogo pos="top" type="video" />
            <HexLogo pos="top-left" src="/logos/duke_logo.png" onClick={() => setActiveModal("duke")} />
            <HexLogo pos="top-right" src="/logos/delta_logo.png" />
            <HexLogo pos="bottom-left" src="/logos/equifax_logo.png" />
            <HexLogo pos="bottom-right" src="/logos/onscale_logo.png" />
            <HexLogo pos="bottom" src="/logos/turner_logo.png" />
          </SlideUp>

          <SlideUp>
            <div className="w-full max-w-4xl mx-auto text-center md:hidden mb-10">
              <p className="text-lg text-white leading-relaxed">
                These logos belong to the companies I’ve built for.
                Click them to learn who they are, what I did with them, and explore a sample of what you might have seen of my work there.
              </p>
            </div>
          </SlideUp>
          {/* 📱 Zigzag Layout – Only shown on small screens */}
          <div className="w-[80%] flex flex-col gap-6 md:hidden px-4">
            {[
              { name: "Google X", type: "video" },
              { name: "Duke", src: "/logos/duke_logo.png" },
              { name: "Delta", src: "/logos/delta_logo.png" },
              { name: "Equifax", src: "/logos/equifax_logo.png" },
              { name: "OnScale", src: "/logos/onscale_logo.png" },
              { name: "Turner", src: "/logos/turner_logo.png" },
            ].map((logo, i) => (
              <SlideUp
                key={i}
                className={`w-36 h-36 max-w-[50%] flex justify-center bg-white rounded-full p-4 shadow-md grayscale hover:grayscale-0 transition hover:scale-105 cursor-pointer ${i % 2 === 0 ? "ml-auto" : "mr-auto"}`}
              >
                {logo.type === "video" ? (
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
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </SlideUp>
            ))}
          </div>

        </div>
      </main>
      <ProjectModal isOpen={activeModal === "duke"} onClose={() => setActiveModal(null)}>
        {/* <DukeDemo /> */}
        test
      </ProjectModal>

    </>
  );
}
