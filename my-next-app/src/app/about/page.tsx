// src/app/about/page.tsx
"use client";

import Header from "@/components/Header";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import RepelBlock from "@/components/RepelBlock";
import CarGallery from "@/components/CarGallery";
import ProximitySpin from "@/components/ProximitySpin";
import EyeTracker from "@/components/EyeTracker";
import CatPolaroids from "@/components/CatPolaroids";
import FooterSpacer from "@/components/FooterSpacer";
import {
  Eye,
  Mountain,
  Bike,
  Dumbbell,
  Car,
  Cat,
} from "lucide-react";
import ExpandingSearch from "@/components/ExpandingSearch";
import { FunIcon } from "@/components/FunIncon";
import SlideUp from "@/components/SlideUp";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import VideoBackground from "@/components/VideoBackground";
import Chevron from "@/components/Chevron";
import ToggleSwap from "@/components/ToggleSwap";

const videos = [
  "/videos/waves-1_1777362-uhd_3840_2160_25fps.mp4",
  "/videos/waves-2_1757853-uhd_3840_2160_25fps.mp4",
];

export default function AboutPage() {
  const [repelEnabled, setRepelEnabled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRefs = [
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
  ];

  const scrollTo = (index: number) => {
    if (index < 0 || index >= sectionRefs.length) return;
    setCurrentIndex(index);
    sectionRefs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") scrollTo(currentIndex + 1);
      if (e.key === "ArrowUp") scrollTo(currentIndex - 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  return (
    <>
      <Header />
      <VideoBackground videos={videos} />
      <div className="fixed inset-0 bg-black/60 z-0" />
      <main className="relative h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth z-10">
        <section
          ref={sectionRefs[0]}
          className="relative h-screen flex items-center justify-center snap-start transition-all duration-1000">

          <SlideUp>
            <div className="flex flex-col xl:flex-row items-center justify-center gap-10 w-full">
              <ToggleSwap
                front={<img src="/images/ryan.jpeg" className="w-full h-full object-cover rounded-xl" />}
                back={<EyeTracker />}
              />
              <div className="px-6 sm:px-8 py-12 sm:py-16 w-full max-w-4xl text-white">
                <h1 className="text-3xl font-bold mb-4">
                  <RepelBlock enabled={repelEnabled}>
                    Welcome!
                  </RepelBlock>
                </h1>
                <div
                  className="text-lg leading-relaxed font-mono text-white space-y-4"
                >
                  <div className="space-y-1 text-lg leading-relaxed font-mono text-white mb-2">
                    <RepelBlock enabled={repelEnabled}>
                      Before you go clicking around thinking this is just another cookie-cutter portfolio — it’s not.
                    </RepelBlock>
                    <RepelBlock enabled={repelEnabled}>
                      There are easter eggs scattered all over the place. Some </RepelBlock>{" "}
                    <div
                      className="inline-block transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
                      onClick={() => {
                        setRepelEnabled((prev) => {
                          const next = !prev;
                          console.log("Repel enabled:", next);
                          return next;
                        });
                      }}
                    >
                      subtle,
                    </div>{" "}
                    <RepelBlock enabled={repelEnabled}>
                      some</RepelBlock>{" "}
                    <ProximitySpin>not.</ProximitySpin>{" "}
                    <RepelBlock enabled={repelEnabled}>
                      Feel free to explore, poke around, and see what you uncover.
                    </RepelBlock>
                  </div>
                  <div className="space-y-1">
                    <RepelBlock enabled={repelEnabled}>
                      If you’re more interested in the <em>how</em> than the <em>wow</em>,
                      you’ll find full documentation and source code on{" "}
                    </RepelBlock>
                    <a
                      href="https://github.com/Raults/react-refresh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative -mb-2.25 underline-hover-ltr-green tracking-widest text-green-200"
                    >
                      GitHub
                    </a>
                    <RepelBlock enabled={repelEnabled}>
                      . This app is 100% public.
                    </RepelBlock>
                  </div>
                </div>
                <div className="flex items-center gap-2 my-4">
                  <h1 className="text-3xl font-bold">
                    <RepelBlock enabled={repelEnabled}>
                      Pro Tip
                    </RepelBlock>
                  </h1>
                  <ExpandingSearch />
                </div>
                <div
                  className="text-lg leading-relaxed font-mono text-white space-y-4 my-4"
                >
                  <div className="space-y-1">
                    <RepelBlock enabled={repelEnabled}>
                      If you haven’t found the terminal on the homepage... try looking a little closer <FunIcon Icon={Eye} type="eye" className="inline-block w-5 h-5 ml-2 text-primary" />{" "}<FunIcon Icon={Eye} type="eye" className="inline-block w-5 h-5 text-primary" />
                    </RepelBlock>
                  </div>
                </div>
              </div>
            </div>
          </SlideUp>
          <Chevron
            direction="down"
            onClick={() => scrollTo(1)}
            className="absolute bottom-10 animate-slow-bounce z-50"
          />
        </section>
        <section
          ref={sectionRefs[1]}
          className="relative h-screen flex items-center justify-center snap-start transition-all duration-1000">

          <SlideUp>
            <div className="flex flex-col-reverse xl:flex-row items-center justify-center gap-10 w-full">
              <div className="px-6 sm:px-8 py-12 sm:py-16 w-full max-w-4xl text-white">
                <h1 className="text-3xl font-bold mb-4">
                  <RepelBlock enabled={repelEnabled}>
                    About Me
                  </RepelBlock>
                </h1>
                <div
                  className="text-lg leading-relaxed font-mono text-white space-y-4"
                >
                  <div className="space-y-1">
                    <RepelBlock enabled={repelEnabled}>
                      I’m Ryan Tibbetts — a frontend engineer with a soft spot for creative experiences and a history that spans both hemispheres.
                    </RepelBlock>
                  </div>
                  <div className="space-y-1">
                    <RepelBlock enabled={repelEnabled}>
                      I grew up as a military kid. Both my parents served in the U.S. Army and retired as Lieutenant Colonels. That lifestyle had me bouncing around: Kansas, Texas, Virginia, and Germany.
                      By my teens, we landed more permanently in a small town called Tifton, Georgia.
                    </RepelBlock>
                  </div>
                  <div className="space-y-1">
                    <RepelBlock enabled={repelEnabled}>
                      I went on to attend Georgia State University in Atlanta, where I lived from 2012–2021. I started working remotely in 2019 — a move that would become pivotal.
                      During COVID, I decided to lean into remote work life.
                      I retrofitted my Honda Element into a mobile home, packed my two cats, and spent the next year driving across the U.S. — visiting national parks, family, friends, and festivals.
                      All while working from the comfort of my vehicle using various methods such as starlink and cell tower routers.
                    </RepelBlock>
                  </div>
                  <div className="space-y-1">
                    <RepelBlock enabled={repelEnabled}>
                      Eventually, I was invited by some friends at META to stay in California. That led to a contract at Google, where I built internal tools as a frontend engineer on an incubator project.
                      When the project sunset, I stayed in CA. These days, I live in San Francisco with my wife and our four cats.
                    </RepelBlock>
                  </div>
                </div>
              </div>
              <CarGallery />
            </div>
          </SlideUp>
          <Chevron
            direction="up"
            onClick={() => scrollTo(0)}
            className="absolute top-28 animate-slow-bounce z-50"
          />
          <Chevron
            direction="down"
            onClick={() => scrollTo(2)}
            className="absolute bottom-10 animate-slow-bounce z-50"
          />
        </section>
        <section
          ref={sectionRefs[2]}
          className="relative h-screen flex items-center justify-center snap-start transition-all duration-1000">

          <SlideUp>
            <div className="flex flex-col xl:flex-row items-center justify-center gap-10 w-full space-y-10 lg:space-y-0">
              <CatPolaroids />
              <div className="px-6 sm:px-8 py-12 sm:py-16 w-full max-w-4xl text-white">
                <h1 className="text-3xl font-bold mb-4">
                  <RepelBlock enabled={repelEnabled}>
                    Problem Solving is My Thing
                  </RepelBlock>
                </h1>
                <div
                  className="text-lg leading-relaxed font-mono text-white space-y-4"
                >
                  <div className="space-y-1">
                    <RepelBlock enabled={repelEnabled}>
                      I've built a web-based CAD interface using Three.js for OnScale (now owned by Ansys), wrangled Bazel-based monorepos using gRPC, HTTP/2, and Protocol Buffers at Google, and I tinker with game development in my free time.
                      Limited but growing experience with Blender and Unreal Engine 5 helps keep the creativity sharp.
                    </RepelBlock>
                  </div>
                </div>
                <h1 className="text-3xl font-bold my-4">
                  <RepelBlock enabled={repelEnabled}>
                    Fun Facts!
                  </RepelBlock>
                </h1>
                <div
                  className="text-lg leading-relaxed font-mono text-white space-y-4"
                >
                  <div className="space-y-1">
                    <RepelBlock enabled={repelEnabled}>
                      <ul className="space-y-2 text-base text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <FunIcon Icon={Mountain} type="mountain" />
                          Former competitive climber — I’ve lead a 5.11, sent a 5.12, and flashed a V9.
                        </li>
                        <li className="flex items-start gap-2">
                          <FunIcon Icon={Bike} type="bike" />
                          Bike courier for 6 years in Atlanta during college.
                        </li>
                        <li className="flex items-start gap-2">
                          <FunIcon Icon={Dumbbell} type="dumbbell" />
                          Pretty jacked — weightlifting is a daily ritual.
                        </li>
                        <li className="flex items-start gap-2">
                          <FunIcon Icon={Car} type="car" />
                          Once lived in a Honda Element for a year with two cats.
                        </li>
                        <li className="flex items-start gap-2">
                          <FunIcon Icon={Cat} type="cat" />
                          Now live with four.
                        </li>
                      </ul>
                    </RepelBlock>
                  </div>
                </div>
              </div>
            </div>
          </SlideUp>
          <Chevron
            direction="up"
            onClick={() => scrollTo(1)}
            className="absolute top-28 animate-slow-bounce z-50"
          />
        </section>
      </main>
    </>
  );
}
