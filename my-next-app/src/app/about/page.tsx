// src/app/about/page.tsx
"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import RepelBlock from "@/components/RepelBlock";
import CarGallery from "@/components/CarGallery";
import ProximitySpin from "@/components/ProximitySpin";
import EyeTracker from "@/components/EyeTracker";
import CatPolaroids from "@/components/CatPolaroids";
import FooterSpacer from "@/components/FooterSpacer";
import {
  Search,
  Eye,
  Mountain,
  Bike,
  Dumbbell,
  Car,
  Cat,
} from "lucide-react";

export default function AboutPage() {
  const [repelEnabled, setRepelEnabled] = useState(false);

  useEffect(() => {
    const video = document.getElementById("bg-video") as HTMLVideoElement | null;
    if (video) {
      video.playbackRate = 0.5; // 0.5 = half speed
    }
  }, []);

  return (
    <div className="relative">
      <Header />
      <>
        {/* Background video (desktop only) */}
        <video
          id="bg-video"
          autoPlay
          loop
          muted
          playsInline
          className="hidden sm:block fixed inset-0 w-full h-full object-cover opacity-50 blur-md -z-20"
        >
          <source src="/videos/ocean-loop_7513671-uhd_3840_2160_24fps.mp4" type="video/mp4" />
        </video>

        {/* Fallback image (mobile only) */}
        <div
          className="block sm:hidden fixed inset-0 bg-cover bg-center opacity-30 blur-md -z-20"
          style={{ backgroundImage: "url('/images/ocean1.jpg')" }}
        />

        {/* Shared dark overlay */}
        <div className="absolute inset-0 bg-black/70 -z-10" />
      </>
      <main className="relative min-h-screen flex items-center justify-center px-12 py-30 z-10">
        <div className="relative flex flex-col gap-10 items-center pr-20 pl-10 py-10">

          <div className="flex gap-10">
            <EyeTracker />
            <section className="px-8 py-16 max-w-4xl mx-auto text-white">
              <h1 className="text-3xl font-bold mb-4">
                <RepelBlock enabled={repelEnabled}>
                  Real Quick
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
                <h1 className="text-3xl font-bold">Pro Tip</h1>
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <div
                className="text-lg leading-relaxed font-mono text-white space-y-4 my-4"
              >
                <div className="space-y-1">
                  <RepelBlock enabled={repelEnabled}>
                    If you haven’t found the terminal on the homepage... try looking a little closer <Eye className="inline-block w-5 h-5 ml-2 text-primary" /> <Eye className="inline-block w-5 h-5 text-primary" />
                  </RepelBlock>
                </div>
              </div>
            </section>
          </div>
          <div className="flex gap-10">
            <section className="px-8 py-16 max-w-4xl mx-auto text-white">
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
                    After losing my job during COVID, I decided to lean into remote life.
                    I retrofitted my Honda Element into a mobile home, packed my two cats, and spent the next year driving across the U.S. — visiting national parks, family, friends, and festivals.
                  </RepelBlock>
                </div>
                <div className="space-y-1">
                  <RepelBlock enabled={repelEnabled}>
                    Eventually, I was invited by some friends at Meta to stay in California. That led to a contract at Google, where I built internal tools as a frontend engineer (Angular) on an incubator project.
                    When the project sunset, I stayed. These days, I live in San Francisco with my wife and our four cats.
                  </RepelBlock>
                </div>
              </div>
            </section>
            <CarGallery />
          </div>
          <div className="flex gap-40 space-y-10">
            <CatPolaroids />
            <section className="px-8 py-16 max-w-6xl mx-auto text-white">
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
                        <Mountain className="w-5 h-5 mt-1 text-primary" />
                        Former competitive climber — I’ve lead a 5.11, sent a 5.12, and flashed a V9.
                      </li>
                      <li className="flex items-start gap-2">
                        <Bike className="w-5 h-5 mt-1 text-primary" />
                        Bike courier for 6 years in Atlanta during college.
                      </li>
                      <li className="flex items-start gap-2">
                        <Dumbbell className="w-5 h-5 mt-1 text-primary" />
                        Pretty jacked — weightlifting is a daily ritual.
                      </li>
                      <li className="flex items-start gap-2">
                        <Car className="w-5 h-5 mt-1 text-primary" />
                        Once lived in a Honda Element for a year with two cats.
                      </li>
                      <li className="flex items-start gap-2">
                        <Cat className="w-5 h-5 mt-1 text-primary" />
                        Now live with four.
                      </li>
                    </ul>
                  </RepelBlock>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <FooterSpacer />
    </div>
  );
}
