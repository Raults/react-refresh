"use client"

import { useState, useEffect } from "react";
import Header from "@/components/shared/Header";
import SlideUp from "@/components/shared/SlideUp";
import HexLogo from "@/components/projects/HexLogo";
import VideoBackground from "@/components/shared/VideoBackground";
import ProjectModal from "@/components/projects/ProjectModal";
import Chevron from "@/components/shared/Chevron";
import DukeModalContent from "@/components/projects/modals/DukeModalContent";
import { OnScaleModalContent } from "@/components/projects/modals/OnScaleModalContent";
import TurnerModalContent from "@/components/projects/modals/TurnerModalContent";
import { EquifaxModalContent } from "@/components/projects/modals/EquifaxModalContent";
import { DeltaModalContent } from "@/components/projects/modals/DeltaModalContent";
import { GoogleXModalContent } from "@/components/projects/modals/GoogleXModalContent";

const videos = [
  "/videos/board-pile_6755170-uhd_3840_2160_25fps.mp4",
  "/videos/board-pile_6755170-uhd_3840_2160_25fps copy.mp4"
];

const modalKeys = ["x", "duke", "equifax", "delta", "turner", "onscale"];

export default function ProjectsPage() {
  const [activeModal, setActiveModal] = useState<null | string>(null);

  const handleNextModal = () => {
    if (activeModal === null) return;

    const currentIndex = modalKeys.indexOf(activeModal);
    const nextIndex = (currentIndex + 1) % modalKeys.length;
    setActiveModal(modalKeys[nextIndex]);
  };

  const handlePreviousModal = () => {
    if (activeModal === null) return;

    const currentIndex = modalKeys.indexOf(activeModal);
    const prevIndex = (currentIndex - 1 + modalKeys.length) % modalKeys.length;
    setActiveModal(modalKeys[prevIndex]);
  };

  useEffect(() => {
    const video = document.getElementById("bg-video") as HTMLVideoElement | null;
    if (video) {
      video.playbackRate = 0.5; // 0.5 = half speed
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModal) return;

      if (e.key === "ArrowRight") {
        handleNextModal();
      } else if (e.key === "ArrowLeft") {
        handlePreviousModal();
      } else if (e.key === "Escape") {
        setActiveModal(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

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
            <HexLogo pos="top" type="video" onClick={() => setActiveModal("x")} />
            <HexLogo pos="top-left" src="/logos/duke_logo.png" onClick={() => setActiveModal("duke")} />
            <HexLogo pos="top-right" src="/logos/delta_logo.png" onClick={() => setActiveModal("delta")} />
            <HexLogo pos="bottom-left" src="/logos/equifax_logo.png" onClick={() => setActiveModal("equifax")} />
            <HexLogo pos="bottom-right" src="/logos/onscale_logo.png" onClick={() => setActiveModal("onscale")} />
            <HexLogo pos="bottom" src="/logos/turner_logo.png" onClick={() => setActiveModal("turner")} />
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
              { name: "x", type: "video" },
              { name: "duke", src: "/logos/duke_logo.png" },
              { name: "delta", src: "/logos/delta_logo.png" },
              { name: "equifax", src: "/logos/equifax_logo.png" },
              { name: "onscale", src: "/logos/onscale_logo.png" },
              { name: "urner", src: "/logos/turner_logo.png" },
            ].map((logo, i) => (
              <SlideUp
                key={i}
                className={`w-36 h-36 max-w-[50%] flex justify-center bg-white rounded-full p-4 shadow-md grayscale hover:grayscale-0 transition hover:scale-105 cursor-pointer ${i % 2 === 0 ? "ml-auto" : "mr-auto"}`}
                onClick={() => setActiveModal(logo.name)}
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
      {activeModal && (
        <>
          <Chevron
            direction="left"
            onClick={handlePreviousModal}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50"
          />
          <Chevron
            direction="right"
            onClick={handleNextModal}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50"
          />
        </>
      )}
      <ProjectModal isOpen={activeModal === "x"} onClose={() => setActiveModal(null)}>
        <GoogleXModalContent />
      </ProjectModal>
      <ProjectModal isOpen={activeModal === "duke"} onClose={() => setActiveModal(null)}>
        <DukeModalContent />
      </ProjectModal>
      <ProjectModal isOpen={activeModal === "equifax"} onClose={() => setActiveModal(null)}>
        <EquifaxModalContent />
      </ProjectModal>
      <ProjectModal isOpen={activeModal === "delta"} onClose={() => setActiveModal(null)}>
        <DeltaModalContent />
      </ProjectModal>
      <ProjectModal isOpen={activeModal === "turner"} onClose={() => setActiveModal(null)}>
        <TurnerModalContent />
      </ProjectModal>
      <ProjectModal isOpen={activeModal === "onscale"} onClose={() => setActiveModal(null)}>
        <OnScaleModalContent />
      </ProjectModal>
    </>
  );
}
