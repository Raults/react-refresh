'use client';

import { useEffect, useRef, useState } from 'react';

type ProximitySpinProps = {
  children: React.ReactNode;
};

export default function ProximitySpin({ children }: ProximitySpinProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const angleRef = useRef(0);
  const speedRef = useRef(0);
  const pausedRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateSpin = () => {
      if (ref.current && !pausedRef.current) {
        angleRef.current += speedRef.current;
        ref.current.style.transform = `rotate(${angleRef.current}deg)`;
      }
      requestAnimationFrame(updateSpin);
    };

    const updateMousePos = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const calculateSpeed = () => {
      if (!ref.current || pausedRef.current) return;

      const { x, y } = mousePosRef.current;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const maxSpeed = 50;
      const minSpeed = 0;
      const maxDistance = 100;

      const proximity = Math.max(0, 1 - distance / maxDistance);
      speedRef.current = minSpeed + (maxSpeed - minSpeed) * proximity;
    };

    const tick = () => {
      calculateSpeed();
      updateSpin();
    };

    const pause = () => (pausedRef.current = true);
    const resume = () => (pausedRef.current = false);

    window.addEventListener('mousemove', updateMousePos);
    window.addEventListener('mousedown', pause);
    window.addEventListener('mouseup', resume);

    requestAnimationFrame(tick);

    const interval = setInterval(calculateSpeed, 50); // update speed every 50ms

    return () => {
      window.removeEventListener('mousemove', updateMousePos);
      window.removeEventListener('mousedown', pause);
      window.removeEventListener('mouseup', resume);
      clearInterval(interval);
    };
  }, []);

  return (
    <span
      ref={ref}
      className="inline-block transition-transform ease-linear select-none cursor-pointer"
    >
      {children}
    </span>
  );
}
