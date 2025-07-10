"use client"

import { useState, useEffect } from "react";
import Header from "@/components/shared/Header";
import SlideUp from "@/components/shared/SlideUp";
import HexLogo from "@/components/projects/HexLogo";
import VideoBackground from "@/components/shared/VideoBackground";
import ProjectModal from "@/components/projects/ProjectModal";
import Link from "next/link";
import HardwareDemo from "@/components/projects/HardwareDemo";
import PlotDemo from "@/components/projects/PlotDemo";
import MockDocumentParserDemo from "@/components/projects/MockDocumentParserDemo";
import OnScaleViewer from "@/components/projects/OnScaleViewer";
import DeltaFlightDemo from "@/components/projects/DeltaFlightDemo";
import ClipAndShipDemo from "@/components/projects/ClipAndShipDemo";

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

// Duke Energy
export function DukeModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          <a
            href="https://www.duke-energy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Duke Energy
          </a>
        </h2>
        <p className="text-sm text-gray-600">
          One of the largest electric power holding companies in the U.S., serving millions of customers across the Southeast and Midwest.
        </p>
        <div className="text-base text-gray-700 space-y-2">
          <p className="font-semibold">Project Lead / Sr. Frontend Developer</p>
          <p className="text-sm text-gray-600">Mar 2022 – Feb 2023</p>
          <p>Spearheaded UI modernization project, rebuilt architecture from scratch, and led the frontend team. Designed and delivered custom data visualization systems using Angular and Material.</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <PlotDemo />
      </div>
    </div>
  );
}

// Google X
export function GoogleXModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          <a
            href="https://x.company"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Google X
          </a>
        </h2>
        <p className="text-sm text-gray-600">
          Alphabet’s moonshot factory, where breakthrough technologies are developed to solve some of the world’s hardest problems.
        </p>
        <div className="text-base text-gray-700 space-y-2">
          <p className="font-semibold">Sr. Frontend Developer / Lead UI Architect – US Tech Solutions @ Google X</p>
          <p className="text-sm text-gray-600">Mar 2023 – Present</p>
          <p>Sole frontend owner across 3 major apps: Factory Interface, Lab UI, and Marketing site. Architected entire Angular codebase using Bazel, gRPC, and Firebase. Built internal visualizations with InfluxDB and Grafana.</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <HardwareDemo />
      </div>
    </div>
  );
}

// Delta
export function DeltaModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          <a
            href="https://www.delta.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Delta Air Lines
          </a>
        </h2>
        <p className="text-sm text-gray-600">
          One of the major airlines of the United States, providing domestic and international air travel to millions annually.
        </p>
        <div className="text-base text-gray-700 space-y-2">
          <p className="font-semibold">Senior iOS Developer – Cognizant Softvision @ Delta</p>
          <p className="text-sm text-gray-600">Aug 2021 – Jan 2022</p>
          <p>Built and shipped new iOS features across multiple agile teams. Coordinated with backend teams to integrate and deliver new functionality.</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <DeltaFlightDemo />
      </div>
    </div>
  );
}

// Equifax
export function EquifaxModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          <a
            href="https://www.equifax.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Equifax
          </a>
        </h2>
        <p className="text-sm text-gray-600">
          A global data, analytics, and technology company helping financial institutions and individuals make critical decisions.
        </p>
        <div className="text-base text-gray-700 space-y-2">
          <p className="font-semibold">Full-Stack Developer</p>
          <p className="text-sm text-gray-600">Dec 2020 – Jul 2021</p>
          <p>Created internal SDKs and integrated AWS/GCP identity solutions. Modernized legacy internal tools with Angular and Java, delivering modern, scalable replacements.</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <MockDocumentParserDemo />
      </div>
    </div>
  );
}

// OnScale
export function OnScaleModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          <a
            href="https://onscale.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            OnScale
          </a>
        </h2>
        <p className="text-sm text-gray-600">
          Cloud engineering simulation platform used by engineers to run large-scale multiphysics simulations in the cloud.
        </p>
        <div className="text-base text-gray-700 space-y-2">
          <p className="font-semibold">Senior Frontend Developer</p>
          <p className="text-sm text-gray-600">Apr 2018 – Apr 2020</p>
          <p>Developed Angular and Polymer apps with Stripe integration. Owned architecture and led feature delivery across agile teams focused on UI/UX and simulation workflows.</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <OnScaleViewer />
      </div>
    </div>
  );
}

// Turner Broadcasting
export function TurnerModalContent() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          <a
            href="https://www.warnermediagroup.com/company/turner"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Turner Broadcasting
          </a>
        </h2>
        <p className="text-sm text-gray-600">
          A major media conglomerate responsible for channels like CNN, TBS, TNT, and Cartoon Network.
        </p>
        <div className="text-base text-gray-700 space-y-2">
          <p className="font-semibold">Developer I</p>
          <p className="text-sm text-gray-600">2016 – 2017</p>
          <p>Contributed to web development efforts across Turner properties. Focused on frontend enhancements and iterative improvements under senior engineering guidance.</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center border rounded-lg shadow p-4 bg-gray-50 overflow-hidden">
        <ClipAndShipDemo />
      </div>
    </div>
  );
}
