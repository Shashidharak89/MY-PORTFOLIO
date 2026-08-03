'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollVelocity(containerRef, options = {}) {
  const { maxSkew = 1.2, maxOffset = 12 } = options;

  useEffect(() => {
    if (!containerRef?.current || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const element = containerRef.current;
    let setterSkew = gsap.quickSetter(element, 'skewY', 'deg');
    let setterY = gsap.quickSetter(element, 'y', 'px');

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const clampedVelocity = Math.max(-2500, Math.min(2500, velocity));
        const skewAmount = (clampedVelocity / 2500) * maxSkew;
        const offsetAmount = (clampedVelocity / 2500) * maxOffset;

        setterSkew(skewAmount);
        setterY(-offsetAmount);

        gsap.to(element, {
          skewY: 0,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [containerRef, maxSkew, maxOffset]);
}
