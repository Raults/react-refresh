'use client';

import Header from "@/components/shared/Header";
import { HeroBanner } from "@/components/HeroBanner";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
      </main>
    </>
  );
}
