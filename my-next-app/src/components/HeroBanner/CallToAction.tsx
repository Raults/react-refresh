"use client"

import FadeLink from "../shared/FadeLink";

type CallToActionProps = {
    showCTA: boolean;
};

const CallToAction = ({ showCTA }: CallToActionProps) => (
    <FadeLink key={'See My Work'} href={'/projects'} className={`${showCTA ? "opacity-100" : "opacity-0"}
      pointer-events-${showCTA ? "auto" : "none"} 
      relative inline-block px-12 py-4 text-white rounded 
      overflow-hidden transition-opacity duration-500 group`}>
        <span className="underline-hover-ltr text-lg font-medium tracking-widest">See My Work</span>
    </FadeLink>
);

export default CallToAction;
