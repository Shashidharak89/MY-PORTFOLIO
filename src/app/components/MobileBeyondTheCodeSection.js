'use client';

import React, { useEffect, useRef } from 'react';
import { FaPuzzlePiece, FaRocket, FaBookOpen, FaBullseye } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/MobileBeyondTheCodeSection.css';
import beyondthecodeBg from './images/beyondthecodesection.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MobileBeyondTheCodeSection() {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const philosophyCards = [
    {
      id: 'problem-solver',
      icon: <FaPuzzlePiece />,
      title: 'Problem Solver',
      description: 'Breaking down complex challenges into clean, logical, and maintainable software architectures.'
    },
    {
      id: 'builder-mindset',
      icon: <FaRocket />,
      title: 'Builder Mindset',
      description: 'Driven by shipping impactful, production-ready apps from concept to live deployment.'
    },
    {
      id: 'continuous-learner',
      icon: <FaBookOpen />,
      title: 'Lifelong Learner',
      description: 'Actively exploring emerging frameworks, system design patterns, and algorithmic optimization.'
    },
    {
      id: 'consistency',
      icon: <FaBullseye />,
      title: 'Consistency',
      description: 'Daily coding practice, competitive problem solving, and compounding small improvements.'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 600px)', () => {
      // Ambient orb floating
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: 30,
          x: -20,
          scale: 1.15,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 88%',
              once: true
            }
          }
        );
      }

      // Cards staggered pop-in
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 88%',
              once: true
            }
          }
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mobile-beyond-section"
      aria-label="Beyond the Code"
      style={{ backgroundImage: `url(${beyondthecodeBg.src})` }}
    >
      <div className="mobile-beyond-overlay" />
      <div ref={orbRef} className="mobile-beyond-orb" aria-hidden="true" />

      <div className="mobile-beyond-wrapper">
        {/* Header */}
        <header ref={headerRef} className="mobile-beyond-header">
          <div className="mobile-beyond-pill">Engineering Mindset</div>
          <h2 className="mobile-beyond-title">Beyond the Code</h2>
          <p className="mobile-beyond-desc">
            Core philosophies that shape how I build software and approach engineering challenges
          </p>
        </header>

        {/* 2x2 Philosophy Grid */}
        <div ref={gridRef} className="mobile-beyond-grid">
          {philosophyCards.map((card) => (
            <div key={card.id} className="mobile-beyond-card">
              <div className="mobile-beyond-icon-box">
                {card.icon}
              </div>
              <h3 className="mobile-beyond-card-title">{card.title}</h3>
              <p className="mobile-beyond-card-desc">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
