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
  const section2TitleRef = useRef(null);
  const section2StatsRef = useRef(null);
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
      // Bi-directional Scrub Timeline (Fade in on enter, fade out on leave for both down and up scroll)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.5,
        }
      });

      // 1. Entrance Title Reveal with Blur Removal
      gsap.fromTo(
        section2TitleRef.current,
        { opacity: 0, y: 45, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.5,
          }
        }
      );

      // 2. Card Grid Stagger Reveal
      const statCards = section2StatsRef.current?.children;
      if (statCards) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section2Ref.current,
              start: 'top 75%',
              end: 'top 35%',
              scrub: 0.5,
            }
          }
        );
      }

      // 3. Floating Orb Parallax Movement
      gsap.to(orbStatsRef.current, {
        y: -100,
        x: 50,
        rotation: 30,
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
      {/* Floating Accent Background Orb */}
      <div ref={orbStatsRef} className="stats-floating-orb"></div>

      <div className="portfolio-dashboard-stats-wrapper">
        <h2 ref={section2TitleRef} className="stats-section-title">Achievements & Impact</h2>
        <div ref={section2StatsRef} className="portfolio-dashboard-stats">
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
