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
  const title2Ref = useRef(null);
  const cardsGridRef = useRef(null);
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
      // Precision Section 2 Timeline:
      // 0% -> 25%: hidden
      // 25% -> 50%: Entrance Fade-In (opacity 0 -> 1, y 60px -> 0, scale 0.88 -> 1, blur 8px -> 0px)
      // 50% -> 60%: Full Visibility Plateau (opacity 1)
      // 60% -> 85%: Exit Fade-Out (opacity 1 -> 0, y 0 -> -60px, scale 1 -> 0.88, blur 0px -> 8px)
      // 85% -> 100%: hidden
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
        // 0% -> 25%: Hidden
        .set(wrapper2Ref.current, { opacity: 0, y: 60, scale: 0.88, filter: 'blur(8px)' })
        .to(wrapper2Ref.current, { opacity: 0, y: 60, scale: 0.88, filter: 'blur(8px)', duration: 0.25 })
        
        // 25% -> 50%: Fade In Entrance
        .to(wrapper2Ref.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: 'blur(0px)', 
          duration: 0.25, 
          ease: 'power2.out' 
        })
        
        // 50% -> 60%: Full Visibility Plateau
        .to(wrapper2Ref.current, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.10 })
        
        // 60% -> 85%: Exit Fade-Out
        .to(wrapper2Ref.current, { 
          opacity: 0, 
          y: -60, 
          scale: 0.88, 
          filter: 'blur(8px)', 
          duration: 0.25, 
          ease: 'power2.in' 
        })
        
        // 85% -> 100%: Hold hidden
        .to(wrapper2Ref.current, { opacity: 0, y: -60, scale: 0.88, filter: 'blur(8px)', duration: 0.15 });

      // Stat cards internal micro stagger during entrance
      const statCards = cardsGridRef.current?.children;
      if (statCards) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 35, scale: 0.9, rotationX: -15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section2Ref.current,
              start: 'top 75%',
              end: 'top 45%',
              scrub: 0.5
            }
          }
        );
      }

      // Floating Orb Parallax Motion
      gsap.to(orbStatsRef.current, {
        y: -140,
        x: 70,
        rotation: 45,
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
        <h2 ref={title2Ref} className="stats-section-title">Achievements & Impact</h2>
        <div ref={cardsGridRef} className="portfolio-dashboard-stats">
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
