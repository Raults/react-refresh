import { wrapTextNodesWithSpans } from "@/utils/wrapTextNodesWithSpans";
import { useEffect } from "react";

export const useRepelEffect = (containerRef: React.RefObject<HTMLElement | null>) => {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        wrapTextNodesWithSpans(container);

        let animationFrameId: number | null = null;

        const handleMouseMove = (e: MouseEvent) => {
            // Cancel previous frame if it hasn't run yet
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = requestAnimationFrame(() => {
                const spans = container.querySelectorAll("span");

                spans.forEach((char) => {
                    const rect = char.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;

                    const dx = e.clientX - centerX;
                    const dy = e.clientY - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const maxDistance = 100;
                    const repelStrength = 50;
                    const repelSpeed = 100;
                    const intensity = Math.max((maxDistance - distance) / maxDistance, 0);

                    if (distance < maxDistance) {
                        const angle = Math.atan2(dy, dx);
                        const repelX = Math.cos(angle) * -repelStrength * intensity;
                        const repelY = Math.sin(angle) * -repelStrength * intensity;
                        const rotate = Math.sin(angle) * 15;

                        char.style.transition = `transform ${repelSpeed}ms ease-out`;
                        char.style.transform = `translate(${repelX}px, ${repelY}px) rotate(${rotate}deg) scale(1.05)`;
                    } else {
                        const returnSpeed = 3000;
                        char.style.transition = `transform ${returnSpeed}ms cubic-bezier(0.22, 1, 0.36, 1)`;
                        char.style.transform = `translate(0, 0) rotate(0deg) scale(1)`;
                    }
                });
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [containerRef]);
};
