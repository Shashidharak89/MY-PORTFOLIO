'use client';

import { useEffect, useRef } from 'react';
import { FaPuzzlePiece, FaRocket, FaBookOpen, FaBullseye } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollVelocity } from '../hooks/useScrollVelocity';
import './styles/BeyondTheCodeSection.css';
import beyondthecodeBg from './images/beyondthecodesection.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BeyondTheCodeSection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const gridRef = useRef(null);
  const orbBeyondRef = useRef(null);

  useScrollVelocity(sectionRef, { maxSkew: 0.8, maxOffset: 10 });

  const philosophyCards = [
    {
      id: 'problem-solver',
      icon: <FaPuzzlePiece className="card-icon-sky" />,
      title: 'Problem Solver',
      description: 'I enjoy breaking complex problems into simple, logical solutions.'
    },
    {
      id: 'builder-mindset',
      icon: <FaRocket className="card-icon-sky" />,
      title: 'Builder Mindset',
      description: 'I learn best by turning ideas into real, working products.'
    },
    {
      id: 'continuous-learner',
      icon: <FaBookOpen className="card-icon-sky" />,
      title: 'Continuous Learner',
      description: 'Always exploring new technologies and improving my development skills.'
    },
    {
      id: 'consistency',
      icon: <FaBullseye className="card-icon-sky" />,
      title: 'Consistency',
      description: 'I believe consistent practice and small improvements lead to meaningful results.'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cardElements = gridRef.current?.children;

      // Master Section 3D Timeline:
      // 0% -> 25%: hidden
      // 25% -> 50%: Fade in entrance (opacity 0 -> 1)
      // 50% -> 55%: Full Visibility Plateau (opacity 1)
      // 55% -> 75%: Fade out exit (opacity 1 -> 0)
      // 75% -> 100%: hidden
      const beyondTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      beyondTl
        .set(wrapperRef.current, { 
          opacity: 0, 
          y: 70, 
          scale: 0.82, 
          rotationX: 20,
          transformPerspective: 1000, 
          filter: 'blur(10px)' 
        })
        .to(wrapperRef.current, { 
          opacity: 0, 
          y: 70, 
          scale: 0.82, 
          rotationX: 20,
          filter: 'blur(10px)', 
          duration: 0.25 
        })
        .to(wrapperRef.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotationX: 0,
          filter: 'blur(0px)', 
          duration: 0.25, 
          ease: 'power3.out' 
        })
        .to(wrapperRef.current, { opacity: 1, y: 0, scale: 1, rotationX: 0, filter: 'blur(0px)', duration: 0.05 })
        .to(wrapperRef.current, { 
          opacity: 0, 
          y: -45, 
          scale: 0.9, 
          rotationX: -15,
          filter: 'blur(6px)', 
          duration: 0.20, 
          ease: 'power3.in' 
        })
        .to(wrapperRef.current, { opacity: 0, y: -45, filter: 'blur(6px)', duration: 0.25 });

      // 4 Small Cards (3D Diamond Wave Cascade Flip Reveal)
      if (cardElements && cardElements.length > 0) {
        gsap.fromTo(
          cardElements,
          { 
            opacity: 0, 
            y: 60, 
            rotationZ: (i) => (i % 2 === 0 ? -12 : 12),
            rotationX: 35, 
            scale: 0.72, 
            transformPerspective: 800 
          },
          {
            opacity: 1,
            y: 0,
            rotationZ: 0,
            rotationX: 0,
            scale: 1,
            stagger: 0.06,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              end: 'top 42%',
              scrub: 0.5,
              invalidateOnRefresh: true,
            }
          }
        );
      }

      // Sky Blue Floating Ambient Orb Motion
      if (orbBeyondRef.current) {
        gsap.to(orbBeyondRef.current, {
          y: -100,
          x: 45,
          rotation: 45,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
            invalidateOnRefresh: true,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="home-snap-section beyond-code-snap-section"
      style={{ backgroundImage: `url(${beyondthecodeBg.src})` }}
    >
      <div className="beyond-code-bg-overlay"></div>
      <div ref={orbBeyondRef} className="beyond-floating-orb"></div>

      <div ref={wrapperRef} className="portfolio-dashboard-beyond-wrapper">
        
        {/* Header */}
        <div className="beyond-code-header">
          <div className="beyond-sky-pill">Engineering Philosophy</div>
          <h2 className="beyond-code-title">Beyond the Code</h2>
          <p className="beyond-code-desc">
            I enjoy turning complex problems into simple, useful products. Beyond building applications, I spend time sharpening my problem-solving skills, exploring new technologies, and continuously improving the way I design and write software.
          </p>
        </div>

        {/* 4 Small Cards (3D Diamond Wave Cascade Flip Reveal) */}
        <div ref={gridRef} className="beyond-code-grid">
          {philosophyCards.map((card) => (
            <div key={card.id} className="beyond-card">
              <div className="beyond-card-icon-box">
                {card.icon}
              </div>
              <h3 className="beyond-card-title">{card.title}</h3>
              <p className="beyond-card-desc">{card.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
