'use client';

import React, { useEffect, useRef } from 'react';
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
  FaArrowRight
} from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/MobileFinalCtaSection.css';
import ctaBg from './images/section3bg.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MobileFinalCtaSection() {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const cardRef = useRef(null);

  const quickConnectLinks = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/shashidhara-kumbara',
      label: 'LinkedIn'
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/Shashidharak89',
      label: 'GitHub'
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: 'mailto:shashidharak334@gmail.com',
      label: 'Email'
    },
    {
      name: 'Call',
      icon: <FaPhone />,
      url: 'tel:+917760770725',
      label: 'Call'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 600px)', () => {
      // Floating orb
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: -20,
          x: -15,
          scale: 1.15,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Card entrance animation
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
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
      className="mobile-final-cta-section"
      aria-label="Let's Build Something Together"
      style={{ backgroundImage: `url(${ctaBg.src})` }}
    >
      <div className="mobile-final-cta-overlay" />
      <div ref={orbRef} className="mobile-final-cta-orb" aria-hidden="true" />

      <div className="mobile-final-cta-wrapper">
        <div ref={cardRef} className="mobile-final-cta-card">
          <div className="mobile-final-cta-card-glow" />

          {/* Top handshake icon */}
          <div className="mobile-cta-top-icon-box">
            <FaHandshake className="mobile-cta-top-icon" />
          </div>

          {/* Title */}
          <h2 className="mobile-final-cta-heading">
            Let’s Build Something <span className="highlight-red">Together</span>
          </h2>

          {/* Topic Pills */}
          <div className="mobile-cta-pills">
            <span className="mobile-cta-pill">
              <FaBriefcase className="pill-ico" /> Opportunities
            </span>
            <span className="mobile-pill-dot">•</span>
            <span className="mobile-cta-pill">
              <FaRocket className="pill-ico" /> Projects
            </span>
            <span className="mobile-pill-dot">•</span>
            <span className="mobile-cta-pill">
              <FaHandshake className="pill-ico" /> Collaborations
            </span>
          </div>

          {/* Subtitle / Quote */}
          <p className="mobile-cta-quote">
            Have an exciting idea or an engineering opportunity? <strong>Let’s connect.</strong>
          </p>

          {/* Action buttons */}
          <div className="mobile-cta-actions">
            <Link href="/contact" className="mobile-cta-btn primary">
              <FaMessage className="btn-ico" />
              <span>Let’s Connect</span>
              <FaArrowRight className="btn-arrow" />
            </Link>

            <a
              href="/resume/ShashidharaK-Resume-BNP-2026.docx.pdf"
              download="ShashidharaK_Resume_2026.pdf"
              className="mobile-cta-btn secondary"
            >
              <FaDownload className="btn-ico" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Quick Connect Row */}
          <div className="mobile-quick-connect">
            <span className="mobile-quick-connect-label">Quick Connect:</span>
            <div className="mobile-quick-connect-grid">
              {quickConnectLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target={item.url.startsWith('http') ? '_blank' : '_self'}
                  rel={item.url.startsWith('http') ? 'noreferrer' : undefined}
                  className="mobile-quick-item"
                  title={item.name}
                >
                  <span className="quick-ico">{item.icon}</span>
                  <span className="quick-lbl">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
