import { useState } from "react";

type ToggleSwapProps = {
    front: React.ReactNode;
    back: React.ReactNode;
    width?: string;
    height?: string;
    duration?: number;
};

export default function ToggleSwap({
    front,
    back,
    width = "w-[360px]",
    height = "h-[480px]",
    duration = 300,
}: ToggleSwapProps) {
    const [flipped, setFlipped] = useState(false);
    const [isFading, setIsFading] = useState(false);
    const [visibleChild, setVisibleChild] = useState<React.ReactNode>(front);

    const handleClick = () => {
        if (isFading) return; // prevent spamming

        setIsFading(true);

        setTimeout(() => {
            setFlipped((prev) => !prev);
            setVisibleChild(flipped ? front : back);
            setIsFading(false);
        }, duration);
    };

    return (
        <div
            onClick={handleClick}
            className={`relative overflow-hidden ${width} ${height} cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-100`}
        >
            <div
                className={`absolute inset-0 transition-opacity duration-${duration} ${isFading ? "opacity-0" : "opacity-100"
                    }`}
            >
                {visibleChild}
            </div>
        </div>
    );
}
