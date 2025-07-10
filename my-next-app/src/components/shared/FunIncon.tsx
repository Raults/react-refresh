// src/components/FunIcon.tsx
import { motion } from "framer-motion";
import { useState } from "react";

const animations = {
    mountain: {
        animate: { x: [0, -2, 2, -2, 2, 0] },
        transition: { duration: 0.5 },
    },
    bike: {
        animate: { x: [0, 5, 10, 0] },
        transition: { duration: 0.6 },
    },
    dumbbell: {
        animate: { y: [0, -5, 0, -3, 0] },
        transition: { duration: 0.5 },
    },
    car: {
        animate: { scale: [1, 1.2, 1], x: [0, 8, 0] },
        transition: { duration: 0.5 },
    },
    cat: {
        animate: { rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] },
        transition: { duration: 0.6 },
    },
    eye: {
        animate: { scaleY: [1, 0.2, 1] },
        transition: { duration: 0.3 },
    },
};

export function FunIcon({
    Icon,
    type,
    className = "",
}: {
    Icon: React.ElementType;
    type: keyof typeof animations;
    className?: string;
}) {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => setIsAnimating(true);

    return (
        <motion.div
            onClick={handleClick}
            animate={isAnimating ? animations[type].animate : {}}
            transition={animations[type].transition}
            onAnimationComplete={() => setIsAnimating(false)}
            className={`cursor-pointer ${className}`}
        >
            <Icon className="w-5 h-5" />
        </motion.div>
    );
}