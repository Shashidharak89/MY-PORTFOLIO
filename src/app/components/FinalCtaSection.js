'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FaHandshake,
  FaBriefcase,
  FaRocket,
  FaMessage,
  FaDownload,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaCode,
  FaWandMagicSparkles,
  FaArrowRight
} from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollVelocity } from '../hooks/useScrollVelocity';
import './styles/FinalCtaSection.css';
import ctaBg from './images/section3bg.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FinalCtaSection = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const orbCtaRef = useRef(null);
  const buttonsRowRef = useRef(null);

  useScrollVelocity(sectionRef, { maxSkew: 0.8, maxOffset: 10 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 3D Entrance & Exit Timeline for Final CTA Section
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      ctaTl
        .set(wrapperRef.current, {
          opacity: 0,
          y: 70,
          scale: 0.84,
          rotationY: -15,
          transformPerspective: 1000,
          filter: 'blur(10px)'
        })
        .to(wrapperRef.current, {
          opacity: 0,
          y: 70,
          scale: 0.84,
          rotationY: -15,
          filter: 'blur(10px)',
          duration: 0.25
        })
        .to(wrapperRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          filter: 'blur(0px)',
          duration: 0.25,
          ease: 'power3.out'
        })
        .to(wrapperRef.current, { opacity: 1, y: 0, scale: 1, rotationY: 0, filter: 'blur(0px)', duration: 0.25 })
        .to(wrapperRef.current, {
          opacity: 0,
          y: -40,
          scale: 0.88,
          rotationY: 15,
          filter: 'blur(8px)',
          duration: 0.25,
          ease: 'power3.in'
        });

      // Ambient Floating Orb Motion
      gsap.to(orbCtaRef.current, {
        y: -90,
        x: -40,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const quickConnectLinks = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/shashidhara-k-a2374b31b/',
      label: 'LinkedIn',
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/Shashidharak89',
      label: 'GitHub',
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: 'mailto:shashidharak334@gmail.com',
      label: 'Email',
    },
    {
      name: 'Call',
      icon: <FaPhone />,
      url: 'tel:+917760770725',
      label: 'Call',
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="home-snap-section final-cta-snap-section"
      style={{ backgroundImage: `url(${ctaBg.src})` }}
    >
      {/* Background Overlay & Ambient Orb */}
      <div className="final-cta-bg-overlay"></div>
      <div ref={orbCtaRef} className="final-cta-floating-orb"></div>

      {/* Background Decorative Tech Accents & Connection Lines */}
      <div className="cta-bg-graphics">
        <div className="cta-grid-pattern"></div>
        
        {/* Floating tech badges */}
        <div className="cta-floating-badge float-top-left">
          <FaCode /> &lt;/&gt;
        </div>
        <div className="cta-floating-badge float-top-right">
          &#123; &#125;
        </div>
        <div className="cta-floating-badge float-bottom-left">
          <FaRocket />
        </div>
        <div className="cta-floating-badge float-bottom-right">
          <FaWandMagicSparkles />
        </div>

        {/* Decorative Connection Line SVG */}
        <svg className="cta-connection-svg" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none">
          <path d="M0,200 Q300,50 600,200 T1200,200" stroke="rgba(220, 38, 38, 0.12)" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M0,100 Q400,350 800,100 T1200,300" stroke="rgba(220, 38, 38, 0.08)" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="4" fill="#dc2626" opacity="0.4" />
          <circle cx="600" cy="200" r="6" fill="#dc2626" opacity="0.6" />
          <circle cx="1000" cy="120" r="4" fill="#dc2626" opacity="0.4" />
        </svg>
      </div>

      <div ref={wrapperRef} className="final-cta-container">
        {/* Header Icon */}
        <div className="cta-top-icon-box">
          <FaHandshake className="cta-top-icon" />
        </div>

        {/* Large Heading with "Together" in Crimson Red */}
        <h2 className="final-cta-heading">
          Let’s Build Something <span className="highlight-red">Together</span>
        </h2>

        {/* Bullet Pills Row */}
        <div className="cta-pills-row">
          <span className="cta-pill">
            <FaBriefcase className="pill-icon" /> Opportunities
          </span>
          <span className="pill-dot">•</span>
          <span className="cta-pill">
            <FaRocket className="pill-icon" /> Projects
          </span>
          <span className="pill-dot">•</span>
          <span className="cta-pill">
            <FaHandshake className="pill-icon" /> Collaborations
          </span>
        </div>

        {/* Quote Blockquote */}
        <blockquote className="cta-quote">
          Have an idea or opportunity? <strong>Let’s connect.</strong>
        </blockquote>

        {/* Action Buttons Row */}
        <div ref={buttonsRowRef} className="cta-buttons-row">
          <Link href="/contact" className="cta-action-btn primary-btn">
            <FaMessage className="btn-icon" />
            <span>Let’s Connect</span>
            <FaArrowRight className="btn-arrow" />
          </Link>

          <a
            href="/resume/ShashidharaK-Resume-BNP-2026.docx.pdf"
            download="ShashidharaK_Resume_2026.pdf"
            className="cta-action-btn secondary-btn"
          >
            <FaDownload className="btn-icon" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Quick-Connect Icon Row */}
        <div className="quick-connect-container">
          <span className="quick-connect-label">Quick Connect:</span>
          <div className="quick-connect-links">
            {quickConnectLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target={item.url.startsWith('http') ? '_blank' : '_self'}
                rel={item.url.startsWith('http') ? 'noreferrer' : undefined}
                className="quick-connect-item"
                title={`${item.name} - ${item.url}`}
              >
                <span className="quick-icon">{item.icon}</span>
                <span className="quick-name">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
