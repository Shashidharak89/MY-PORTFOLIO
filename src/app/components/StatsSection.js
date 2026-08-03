'use client';

import { useEffect, useRef } from 'react';
import { FaRocket, FaLaptopCode, FaGithub } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollVelocity } from '../hooks/useScrollVelocity';
import './styles/StatsSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StatsSection() {
  const section2Ref = useRef(null);
  const wrapper2Ref = useRef(null);
  const orbStatsRef = useRef(null);

  useScrollVelocity(section2Ref, { maxSkew: 0.8, maxOffset: 10 });

  const stats = [
    { label: 'Projects Completed', value: '10+', icon: <FaRocket /> },
    { label: 'LeetCode Solved', value: '450+', icon: <SiLeetcode /> },
    { label: 'GitHub Contributions', value: '3800+', icon: <FaGithub /> },
    { label: 'Technologies Used', value: '10+', icon: <FaLaptopCode /> }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Precision Section 2 Scroll Timeline:
      // 0% -> 20%: hidden
      // 20% -> 50%: Fade In (opacity 0 -> 1, y 50px -> 0px, blur 6px -> 0px)
      // 50% -> 75%: Plateau (opacity 1)
      // 75% -> 95%: Fade Out (opacity 1 -> 0, y 0px -> -40px, blur 0px -> 6px)
      // 95% -> 100%: hidden
      const sec2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      sec2Tl
        .set(wrapper2Ref.current, { opacity: 0, y: 55, filter: 'blur(6px)' })
        .to(wrapper2Ref.current, { opacity: 0, y: 55, filter: 'blur(6px)', duration: 0.20 })
        .to(wrapper2Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.30, ease: 'power2.out' })
        .to(wrapper2Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.25 })
        .to(wrapper2Ref.current, { opacity: 0, y: -45, filter: 'blur(6px)', duration: 0.20, ease: 'power2.in' })
        .to(wrapper2Ref.current, { opacity: 0, y: -45, filter: 'blur(6px)', duration: 0.05 });

      // Floating Orb Motion
      gsap.to(orbStatsRef.current, {
        y: -120,
        x: 60,
        rotation: 35,
        ease: 'none',
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section2Ref} className="home-snap-section stats-snap-section">
      {/* Ambient Floating Background Orb */}
      <div ref={orbStatsRef} className="stats-floating-orb"></div>

      <div ref={wrapper2Ref} className="portfolio-dashboard-stats-wrapper">
        <h2 className="stats-section-title">Achievements & Impact</h2>
        <div className="portfolio-dashboard-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="portfolio-dashboard-stat-card">
              <span className="portfolio-dashboard-stat-icon">{stat.icon}</span>
              <div className="portfolio-dashboard-stat-value">{stat.value}</div>
              <div className="portfolio-dashboard-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
