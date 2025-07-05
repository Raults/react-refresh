type CallToActionProps = {
    showCTA: boolean;
};

const CallToAction = ({ showCTA }: CallToActionProps) => (
    <a
        href="#projects"
        className={`${showCTA ? "opacity-100" : "opacity-0"}
      pointer-events-${showCTA ? "auto" : "none"} 
      relative inline-block px-12 py-4 text-white rounded 
      overflow-hidden transition-opacity duration-500 group`}
    >
        <span className="underline-hover-ltr tracking-widest text-lg font-medium">
            See My Work
        </span>
    </a>
);

export default CallToAction;
