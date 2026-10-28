'use client';

import React, { useEffect, useRef } from 'react';
import { FaRocket, FaLaptopCode, FaGithub, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/MobileStatsSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MobileStatsSection() {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const countRefs = useRef([]);

  const stats = [
    {
      label: 'Projects Completed',
      value: '10+',
      targetNumber: 10,
      icon: <FaRocket />,
      badge: 'Builds'
    },
    {
      label: 'LeetCode Solved',
      value: '540+',
      targetNumber: 540,
      icon: <SiLeetcode />,
      link: 'https://leetcode.com/u/shashidhara_k/',
      ariaLabel: 'View LeetCode profile — 540+ problems solved',
      badge: 'Problems'
    },
    {
      label: 'GitHub Contributions',
      value: '4800+',
      targetNumber: 4800,
      icon: <FaGithub />,
      link: 'https://github.com/Shashidharak89',
      ariaLabel: 'View GitHub profile — 4800+ contributions',
      badge: 'Commits'
    },
    {
      label: 'Technologies Used',
      value: '10+',
      targetNumber: 10,
      icon: <FaLaptopCode />,
      badge: 'Stack'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 600px)', () => {
      // 1. Subtle ambient floating orb pulse
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          x: 20,
          y: -20,
          scale: 1.15,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // 2. Entrance animation triggered ONCE when scrolled into view
      const cards = gridRef.current ? Array.from(gridRef.current.children) : [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true
        }
      });

      // Header entrance
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
        );
      }

      // Cards staggered pop-in
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          {
            opacity: 0,
            y: 32,
            scale: 0.92
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'back.out(1.5)',
            onStart: () => {
              // Trigger rolling counter animation for numbers
              stats.forEach((stat, index) => {
                const el = countRefs.current[index];
                if (!el) return;
                const counter = { val: 0 };
                gsap.to(counter, {
                  val: stat.targetNumber,
                  duration: 1.3,
                  ease: 'power2.out',
                  delay: index * 0.08,
                  onUpdate: () => {
                    el.textContent = `${Math.floor(counter.val)}+`;
                  }
                });
              });
            }
          },
          '-=0.3'
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mobile-stats-snap-section"
      aria-label="Metrics and Impact"
    >
      {/* Ambient background glow orb with gentle floating animation */}
      <div ref={orbRef} className="mobile-stats-orb" aria-hidden="true" />

      <div className="mobile-stats-wrapper">
        <header ref={headerRef} className="mobile-stats-header">
          <div className="mobile-stats-pill">
            <span className="mobile-stats-pill-dot" />
            <span>Highlights</span>
          </div>
          <h2 className="mobile-stats-title">Metrics &amp; Impact</h2>
          <p className="mobile-stats-subtitle">
            Consistent practice, shipped projects, and proven problem solving
          </p>
        </header>

        <div ref={gridRef} className="mobile-stats-grid">
          {stats.map((stat, idx) => {
            const isClickable = Boolean(stat.link);
            const CardTag = isClickable ? 'a' : 'div';
            const linkProps = isClickable
              ? {
                  href: stat.link,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  'aria-label': stat.ariaLabel,
                }
              : {};

            return (
              <CardTag
                key={stat.label}
                className="mobile-stat-card"
                {...linkProps}
              >
                <div className="mobile-stat-top-row">
                  <div className="mobile-stat-icon-wrapper">
                    {stat.icon}
                  </div>
                  {isClickable ? (
                    <span className="mobile-stat-link-arrow" aria-hidden="true">
                      <FaArrowUpRightFromSquare />
                    </span>
                  ) : (
                    <span className="mobile-stat-badge">{stat.badge}</span>
                  )}
                </div>

                <div
                  ref={(el) => (countRefs.current[idx] = el)}
                  className="mobile-stat-value"
                >
                  {stat.value}
                </div>
                <div className="mobile-stat-label">{stat.label}</div>
              </CardTag>
            );
          })}
        </div>

        <div className="mobile-stats-hint">
          Tap on LeetCode or GitHub cards to view live profiles
        </div>
      </div>
    </section>
  );
}
