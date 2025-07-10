"use client";

import { useState } from "react";
// import VideoBackground from "./VideoBackground";
import EditableIntro from "./EditableIntro";
import CallToAction from "./CallToAction";
import VideoBackground from "../shared/VideoBackground";

const HeroBanner = () => {
  const [showCTA, setShowCTA] = useState(false);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            <VideoBackground />
            <div className="absolute inset-0 bg-black/40 z-20" />
            <div className="relative z-30 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <EditableIntro onTypingComplete={() => setShowCTA(true)}/>
                <CallToAction showCTA={showCTA} />
            </div>
        </section>
    );
};

export default HeroBanner;
