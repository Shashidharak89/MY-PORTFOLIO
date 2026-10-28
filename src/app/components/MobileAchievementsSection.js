'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaTrophy, FaMedal, FaLightbulb, FaCertificate, FaArrowRight, FaAward } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/MobileAchievementsSection.css';
import achivementBg from './images/achivement.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MobileAchievementsSection() {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const headerRef = useRef(null);
  const blocksRef = useRef([]);

  const achievementsList = [
    {
      id: 'winner',
      count: '3×',
      label: 'Coding Competition Winner',
      icon: <FaTrophy />,
      tag: '1st Place',
      badgeClass: 'badge-gold',
      colorClass: 'gold'
    },
    {
      id: 'runner-up',
      count: '2×',
      label: 'Coding Competition Runner-Up',
      icon: <FaMedal />,
      tag: '2nd Place',
      badgeClass: 'badge-silver',
      colorClass: 'silver'
    },
    {
      id: 'hackathon',
      count: 'Active',
      label: 'Hackathon Participant',
      icon: <FaLightbulb />,
      tag: 'Innovation',
      badgeClass: 'badge-bronze',
      colorClass: 'bronze'
    }
  ];

  const certificationsSummary = {
    count: '10+',
    label: 'Certifications Completed',
    description: 'Verified certificates across Full-Stack Web Development, Data Structures & Algorithms, and Cloud technologies.',
    icon: <FaCertificate />
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 600px)', () => {
      // Ambient orb floating
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: 25,
          x: -15,
          scale: 1.15,
          duration: 3.5,
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

      // Blocks staggered entrance
      blocksRef.current.forEach((block) => {
        if (!block) return;
        gsap.fromTo(
          block,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 88%',
              once: true
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mobile-achievements-section"
      aria-label="Achievements and Certifications"
      style={{ backgroundImage: `url(${achivementBg.src})` }}
    >
      <div className="mobile-achievements-overlay" />
      <div ref={orbRef} className="mobile-achieve-orb" aria-hidden="true" />

      <div className="mobile-achievements-wrapper">
        {/* Header */}
        <header ref={headerRef} className="mobile-achieve-header">
          <div className="mobile-achieve-pill">
            <FaAward />
            <span>Honors &amp; Certifications</span>
          </div>
          <h2 className="mobile-achieve-title">Achievements &amp; Certifications</h2>
          <p className="mobile-achieve-subtitle">
            Milestones reflecting continuous learning and competitive excellence
          </p>
        </header>

        {/* Blocks Column */}
        <div className="mobile-achieve-blocks">
          {/* Block 1: Achievements */}
          <div
            ref={(el) => (blocksRef.current[0] = el)}
            className="mobile-achieve-block"
          >
            <div className="mobile-block-title-row">
              <div className="mobile-block-icon-badge">
                <FaTrophy />
              </div>
              <h3 className="mobile-block-title">Achievements</h3>
            </div>

            <div className="mobile-items-list">
              {achievementsList.map((item) => (
                <div key={item.id} className="mobile-item-card">
                  <div className={`mobile-item-icon-box ${item.colorClass}`}>
                    {item.icon}
                  </div>
                  <div className="mobile-item-details">
                    <div className="mobile-item-count-row">
                      <span className="mobile-item-count">{item.count}</span>
                      <span className={`mobile-item-badge ${item.badgeClass}`}>
                        {item.tag}
                      </span>
                    </div>
                    <span className="mobile-item-label">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/achievements" className="mobile-achieve-cta-btn">
              <span>View All Achievements</span>
              <FaArrowRight />
            </Link>
          </div>

          {/* Block 2: Certifications */}
          <div
            ref={(el) => (blocksRef.current[1] = el)}
            className="mobile-achieve-block cert-block"
          >
            <div className="mobile-block-title-row">
              <div className="mobile-block-icon-badge cert">
                <FaCertificate />
              </div>
              <h3 className="mobile-block-title">Certifications</h3>
            </div>

            <div className="mobile-cert-summary">
              <div className="mobile-cert-icon-wrapper">
                {certificationsSummary.icon}
              </div>
              <div className="mobile-cert-content">
                <div className="mobile-cert-stat-badge">
                  {certificationsSummary.count}
                </div>
                <h4 className="mobile-cert-heading">{certificationsSummary.label}</h4>
                <p className="mobile-cert-desc">{certificationsSummary.description}</p>
              </div>
            </div>

            <Link href="/achievements/certificates" className="mobile-achieve-cta-btn cert-btn">
              <span>View All Certifications</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
