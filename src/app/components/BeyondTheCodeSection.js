'use client';

import { useEffect, useRef } from 'react';
import { FaPuzzlePiece, FaRocket, FaBookOpen, FaBullseye } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollVelocity } from '../hooks/useScrollVelocity';
import './styles/BeyondTheCodeSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BeyondTheCodeSection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const gridRef = useRef(null);

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
          y: 60, 
          scale: 0.86, 
          filter: 'blur(8px)' 
        })
        .to(wrapperRef.current, { 
          opacity: 0, 
          y: 60, 
          scale: 0.86, 
          filter: 'blur(8px)', 
          duration: 0.25 
        })
        .to(wrapperRef.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: 'blur(0px)', 
          duration: 0.25, 
          ease: 'power3.out' 
        })
        .to(wrapperRef.current, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.10 })
        .to(wrapperRef.current, { 
          opacity: 0, 
          y: -45, 
          scale: 0.9, 
          filter: 'blur(6px)', 
          duration: 0.20, 
          ease: 'power3.in' 
        })
        .to(wrapperRef.current, { opacity: 0, y: -45, filter: 'blur(6px)', duration: 0.20 });

      if (cardElements) {
        gsap.fromTo(
          cardElements,
          { opacity: 0, y: 35, scale: 0.88 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'top 45%',
              scrub: 0.5
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="home-snap-section beyond-code-snap-section">
      <div ref={wrapperRef} className="portfolio-dashboard-beyond-wrapper">
        
        {/* Header */}
        <div className="beyond-code-header">
          <div className="beyond-sky-pill">Engineering Philosophy</div>
          <h2 className="beyond-code-title">Beyond the Code</h2>
          <p className="beyond-code-desc">
            I enjoy turning complex problems into simple, useful products. Beyond building applications, I spend time sharpening my problem-solving skills, exploring new technologies, and continuously improving the way I design and write software.
          </p>
        </div>

        {/* 4 Small Cards Grid in Sky Blue Theme */}
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
