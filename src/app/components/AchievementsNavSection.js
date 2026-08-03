'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaTrophy, FaMedal, FaLightbulb, FaCertificate, FaArrowRight, FaAward } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollVelocity } from '../hooks/useScrollVelocity';
import './styles/AchievementsNavSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AchievementsNavSection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsGridRef = useRef(null);
  const orbRef = useRef(null);

  useScrollVelocity(sectionRef, { maxSkew: 0.8, maxOffset: 10 });

  const achievementsList = [
    {
      id: 'winner',
      count: '3×',
      label: 'Coding Competition Winner',
      icon: <FaTrophy className="achieve-card-icon gold" />,
      tag: '1st Place',
      badgeClass: 'badge-gold'
    },
    {
      id: 'runner-up',
      count: '2×',
      label: 'Coding Competition Runner-Up',
      icon: <FaMedal className="achieve-card-icon silver" />,
      tag: '2nd Place',
      badgeClass: 'badge-silver'
    },
    {
      id: 'hackathon',
      count: 'Active',
      label: 'Hackathon Participant',
      icon: <FaLightbulb className="achieve-card-icon bronze" />,
      tag: 'Innovation',
      badgeClass: 'badge-bronze'
    }
  ];

  const certificationsSummary = {
    count: '10+',
    label: 'Certifications',
    description: 'Professional certificates across Full-Stack Web Development, Data Structures & Algorithms, and Cloud technologies.',
    icon: <FaCertificate className="cert-main-icon" />
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 3D Perspective Timeline matching existing dashboard sections
      const achTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      achTl
        .set(wrapperRef.current, { 
          opacity: 0, 
          y: 70, 
          scale: 0.84, 
          rotationX: 15, 
          transformPerspective: 1000, 
          filter: 'blur(8px)' 
        })
        .to(wrapperRef.current, { 
          opacity: 0, 
          y: 70, 
          scale: 0.84, 
          rotationX: 15, 
          filter: 'blur(8px)', 
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
          y: -50, 
          scale: 0.9, 
          rotationX: -10, 
          filter: 'blur(6px)', 
          duration: 0.20, 
          ease: 'power3.in' 
        })
        .to(wrapperRef.current, { opacity: 0, y: -50, filter: 'blur(6px)', duration: 0.25 });

      // Cards staggered reveal
      const cards = cardsGridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'top 45%',
              scrub: 0.5
            }
          }
        );
      }

      // Parallax Orb Motion
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: -120,
          x: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="home-snap-section achievements-nav-snap-section">
      <div ref={orbRef} className="achievements-nav-floating-orb"></div>

      <div ref={wrapperRef} className="achievements-nav-wrapper">
        
        {/* Header */}
        <div className="achievements-nav-header">
          <div className="achievements-pill">
            <FaAward />
            <span>Honors & Certifications</span>
          </div>
          <h2 className="achievements-nav-title">Achievements & Certifications</h2>
          <p className="achievements-nav-subtitle">
            Milestones that reflect my learning and competitive spirit.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div ref={cardsGridRef} className="achievements-nav-grid">
          
          {/* Column 1: Achievements Block */}
          <div className="achievements-nav-block">
            <div className="block-header">
              <div className="block-title-box">
                <span className="block-icon-badge crimson">
                  <FaTrophy />
                </span>
                <h3 className="block-title">Achievements</h3>
              </div>
            </div>

            <div className="achievements-list">
              {achievementsList.map((item) => (
                <div key={item.id} className="achievement-item-card">
                  <div className="item-icon-box">
                    {item.icon}
                  </div>
                  <div className="item-details">
                    <div className="item-count-row">
                      <span className="item-count-text">{item.count}</span>
                      <span className={`item-tag-badge ${item.badgeClass}`}>{item.tag}</span>
                    </div>
                    <span className="item-label-text">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="block-cta">
              <Link href="/achievements" className="nav-cta-link">
                <button className="nav-cta-button">
                  <span>View All Achievements</span>
                  <FaArrowRight className="cta-arrow-icon" />
                </button>
              </Link>
            </div>
          </div>

          {/* Column 2: Certifications Block */}
          <div className="achievements-nav-block cert-block">
            <div className="block-header">
              <div className="block-title-box">
                <span className="block-icon-badge cert-badge">
                  <FaCertificate />
                </span>
                <h3 className="block-title">Certifications</h3>
              </div>
            </div>

            <div className="certifications-summary-card">
              <div className="cert-big-icon-wrapper">
                {certificationsSummary.icon}
              </div>
              <div className="cert-stat-badge">{certificationsSummary.count}</div>
              <h4 className="cert-summary-heading">{certificationsSummary.label}</h4>
              <p className="cert-summary-desc">{certificationsSummary.description}</p>
            </div>

            <div className="block-cta">
              <Link href="/achievements/certificates" className="nav-cta-link">
                <button className="nav-cta-button cert-cta-btn">
                  <span>View All Certifications</span>
                  <FaArrowRight className="cta-arrow-icon" />
                </button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
