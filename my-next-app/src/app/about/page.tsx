// src/app/about/page.tsx
"use client";

import Header from "@/components/Header";
import { useRef } from "react";
import { useRepelEffect } from "@/hooks/useRepelEffect";
import RepelBlock from "@/components/RepelBlock";
import CarCarousel from "@/components/CarCarousel";
import CarGallery from "@/components/CarGallery";

const CTA = `Before you go clicking around thinking this is just another cookie-cutter portfolio — it’s not.  
There are easter eggs scattered all over the place. Some subtle, some not.  
Feel free to explore, poke around, and see what you uncover.

If you’re more interested in the *how* than the *wow*,  
you’ll find full documentation and source code on [GitHub](https://github.com/Raults/react-refresh).  
This app is 100% public.`

const aboutText = `
## About Me

I’m Ryan Tibbetts — a frontend engineer with a soft spot for creative experiences and a history that spans both hemispheres.

I grew up as a military kid. Both my parents served in the U.S. Army and retired as Lieutenant Colonels. That lifestyle had me bouncing around: Kansas, Texas, Virginia, and Germany.  
By my teens, we landed more permanently in a small town called Tifton, Georgia.

I went on to attend Georgia State University in Atlanta, where I lived from 2012–2021. I started working remotely in 2019 — a move that would become pivotal.  
After losing my job during COVID, I decided to lean into remote life.  
I retrofitted my Honda Element into a mobile home, packed my two cats, and spent the next year driving across the U.S. — visiting national parks, family, friends, and festivals.

Eventually, I was invited by some friends at Meta to stay in California. That led to a contract at Google, where I built internal tools as a frontend engineer (Angular) on an incubator project.  
When the project sunset, I stayed. These days, I live in San Francisco with my wife and our four cats.

---

## Problem Solving is My Thing

I've built a web-based CAD interface using Three.js for OnScale (now owned by Ansys), wrangled Bazel-based monorepos using gRPC, HTTP/2, and Protocol Buffers at Google, and I tinker with game development in my free time.  
Limited but growing experience with Blender and Unreal Engine 5 helps keep the creativity sharp.

---

## Fun Facts

🧷 Former competitive climber — I’ve lead a 5.11, sent a 5.12, and flashed a V9.  
🚴 Bike courier for 6 years in Atlanta during college.  
💪 Pretty jacked — weightlifting is a daily ritual.  
🚘 Once lived in a Honda Element for a year with two cats.  
🐱 Now live with four.

---

## Pro Tip 🧠

If you haven’t found the terminal on the homepage... try looking a little closer 😉`;

export default function AboutPage() {
  const repelRef = useRef<HTMLParagraphElement>(null);
  useRepelEffect(repelRef);

  const repelP1 = useRef<HTMLParagraphElement>(null);
  const repelP2 = useRef<HTMLParagraphElement>(null);
  useRepelEffect(repelP1);
  useRepelEffect(repelP2);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-12">
      <Header />
      <div className="flex flex-col gap-10 items-center">
        <div className="flex gap-10">
          <img
            src="/images/ryan.jpeg"
            alt="Me while working on this website, very greasy."
            className="rounded-xl shadow-lg w-32 sm:w-40 md:w-56 lg:w-64 h-auto object-cover"
          />
          <section className="px-8 py-16 max-w-4xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-4">Real Quick</h1>
            <div
              className="text-lg leading-relaxed font-mono text-white space-y-4"
            >
              <p className="space-y-1">
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  Before you go clicking around thinking this is just another cookie-cutter portfolio — it’s not.
                </RepelBlock>
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  There are easter eggs scattered all over the place. Some subtle, some not.
                </RepelBlock>
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  Feel free to explore, poke around, and see what you uncover.
                </RepelBlock>
              </p>
              <p ref={repelP2} className="space-y-1">
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  If you’re more interested in the <em>how</em> than the <em>wow</em>,
                  you’ll find full documentation and source code on{" "}
                </RepelBlock>
                <a
                  href="https://github.com/Raults/react-refresh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mb-[-8] underline-hover-ltr-green tracking-widest text-green-200"
                >
                  GitHub
                </a>
                . This app is 100% public.
              </p>
            </div>
          </section>
        </div>
        <div className="flex gap-10">
          <section className="px-8 py-16 max-w-4xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-4">About Me</h1>
            <div
              className="text-lg leading-relaxed font-mono text-white space-y-4"
            >
              <p className="space-y-1">
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  I’m Ryan Tibbetts — a frontend engineer with a soft spot for creative experiences and a history that spans both hemispheres.
                </RepelBlock>
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  I grew up as a military kid. Both my parents served in the U.S. Army and retired as Lieutenant Colonels. That lifestyle had me bouncing around: Kansas, Texas, Virginia, and Germany.
                  By my teens, we landed more permanently in a small town called Tifton, Georgia.
                </RepelBlock>
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  I went on to attend Georgia State University in Atlanta, where I lived from 2012–2021. I started working remotely in 2019 — a move that would become pivotal.
                  After losing my job during COVID, I decided to lean into remote life.
                  I retrofitted my Honda Element into a mobile home, packed my two cats, and spent the next year driving across the U.S. — visiting national parks, family, friends, and festivals.
                </RepelBlock>
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  Eventually, I was invited by some friends at Meta to stay in California. That led to a contract at Google, where I built internal tools as a frontend engineer (Angular) on an incubator project.
                  When the project sunset, I stayed. These days, I live in San Francisco with my wife and our four cats.
                </RepelBlock>
              </p>
            </div>
          </section>
          <CarGallery />
        </div>
        <div className="flex gap-10">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {[
              { name: "Caeda", src: "caeda.jpeg" },
              { name: "Lulu", src: "lulu.jpeg" },
              { name: "Murph", src: "murph.jpeg" },
              { name: "Fuzzy", src: "fuzzy.jpeg" },
            ].map((cat, i) => (
              <div
                key={cat.name}
                className={`relative p-2 bg-white rounded-xl shadow-lg transform ${i % 2 === 0 ? "-rotate-2" : "rotate-2"
                  }`}
              >
                <img
                  src={`/images/${cat.src}`}
                  alt={cat.name}
                  className="w-full h-auto rounded-lg object-cover"
                />
                <p className="text-center text-sm mt-2 text-gray-800 italic">{cat.name}</p>
              </div>
            ))}
          </div>
          <section className="px-8 py-16 max-w-4xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-4">About Me</h1>
            <div
              className="text-lg leading-relaxed font-mono text-white space-y-4"
            >
              <p className="space-y-1">
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  Before you go clicking around thinking this is just another cookie-cutter portfolio — it’s not.
                </RepelBlock>
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  There are easter eggs scattered all over the place. Some subtle, some not.
                </RepelBlock>
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  Feel free to explore, poke around, and see what you uncover.
                </RepelBlock>
              </p>
              <p className="space-y-1">
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  If you’re more interested in the <em>how</em> than the <em>wow</em>,
                  you’ll find full documentation and source code on{" "}
                </RepelBlock>
                <a
                  href="https://github.com/Raults/react-refresh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mb-[-8] underline-hover-ltr-green tracking-widest text-green-200"
                >
                  GitHub
                </a>
                <RepelBlock className="text-lg leading-relaxed font-mono text-white mb-2">
                  . This app is 100% public.
                </RepelBlock>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
