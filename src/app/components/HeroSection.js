'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { 
  FaRocket, 
  FaGithub, 
  FaBookOpenReader, 
  FaLocationDot, 
  FaGraduationCap, 
  FaPaperPlane, 
  FaDownload, 
  FaLinkedinIn, 
  FaEnvelope,
  FaPhone 
} from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/HeroSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const heroSectionRef = useRef(null);
  const heroLeftRef = useRef(null);
  const heroCenterRef = useRef(null);
  const avatarFrameRef = useRef(null);
  const ringsRef = useRef(null);
  const heroRightRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  const titleRoles = useMemo(() => [
    { prefix: 'Full Stack', suffix: 'Developer' },
    { prefix: 'App', suffix: 'Developer' },
    { prefix: 'Problem', suffix: 'Solver' }
  ], []);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % titleRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titleRoles]);

  // Hero Scroll-Driven Parallax Storytelling & Floating Objects Timeline
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        }
      });

      heroTl
        .to(heroLeftRef.current, { y: -80, opacity: 0, ease: 'power1.in' }, 0)
        .to(ringsRef.current, { rotation: 45, y: -45, opacity: 0, ease: 'power1.in' }, 0)
        .to(avatarFrameRef.current, { scale: 0.85, opacity: 0, ease: 'power1.in' }, 0)
        .to(heroRightRef.current, { y: -90, opacity: 0, ease: 'power1.in' }, 0)
        .to(orb1Ref.current, { x: 90, y: -140, opacity: 0, ease: 'none' }, 0)
        .to(orb2Ref.current, { x: -80, y: -100, opacity: 0, ease: 'none' }, 0);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroSectionRef} className="home-snap-section home-hero-section">
      {/* Floating Moving Ambient Accent Orbs */}
      <div ref={orb1Ref} className="hero-floating-orb orb-top-left"></div>
      <div ref={orb2Ref} className="hero-floating-orb orb-bottom-right"></div>

      <div className="portfolio-hero-3col">
        
        {/* Left Column: Greeting, Title, Bio, CTAs & Social Links */}
        <div ref={heroLeftRef} className="hero-left-col">
          <div className="greeting-pill">
            <span className="wave-hand">👋</span>
            <span>Hi, I'm</span>
          </div>

          <h1 className="hero-name-heading">
            Shashidhara <span className="name-accent">K</span>
          </h1>

          <div className="hero-role-heading" key={currentRoleIndex}>
            <span className="role-prefix-text">
              {titleRoles[currentRoleIndex].prefix}
            </span>
            <span className="role-suffix-text">
              {titleRoles[currentRoleIndex].suffix}
            </span>
          </div>

          <p className="hero-short-bio">
            Full-Stack & App Developer passionate about building high-performance applications. DSA enthusiast, consistent LeetCode problem solver (450+ solved), and competitive programming winner turning complex logic into impactful products.
          </p>

          <div className="hero-cta-buttons">
            <Link href="/projects">
              <button className="cta-btn primary-btn">
                <FaRocket />
                <span>View Projects</span>
              </button>
            </Link>
            <Link href="/resume">
              <button className="cta-btn secondary-btn">
                <FaDownload />
                <span>Download Resume</span>
              </button>
            </Link>
            <Link href="/contact">
              <button className="cta-btn secondary-btn">
                <FaPaperPlane />
                <span>Hire Me</span>
              </button>
            </Link>
          </div>

          <div className="hero-connect-row">
            <span className="connect-label">Let's connect</span>
            <div className="connect-social-icons">
              <a href="https://github.com/Shashidharak89" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub" title="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/shashidhara-k-a2374b31b/" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn" title="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="mailto:shashidharak334@gmail.com" className="social-icon-btn" aria-label="Email" title="Email: shashidharak334@gmail.com">
                <FaEnvelope />
              </a>
              <a href="tel:+917760770725" className="social-icon-btn" aria-label="Phone" title="Phone: +91 7760770725">
                <FaPhone />
              </a>
              <a href="https://leetcode.com/u/shashidhara_k/" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LeetCode" title="LeetCode">
                <SiLeetcode />
              </a>
            </div>
          </div>
        </div>

        {/* Center Column: Avatar Image with Ambient Glow & Orbit Details */}
        <div ref={heroCenterRef} className="hero-center-col">
          <div className="avatar-wrapper">
            <div className="avatar-ambient-glow"></div>
            
            {/* Parallax Orbiting Rings */}
            <div ref={ringsRef} style={{ position: 'absolute', width: '100%', height: '100%' }}>
              <div className="avatar-orbit-ring ring-1"></div>
              <div className="avatar-orbit-ring ring-2"></div>
              <div className="orbit-dot dot-1"></div>
              <div className="orbit-dot dot-2"></div>
            </div>

            <div ref={avatarFrameRef} className="avatar-image-frame"></div>
          </div>
        </div>

        {/* Right Column: Personal Info Card */}
        <div ref={heroRightRef} className="hero-right-col">
          <div className="info-card">
            <div className="info-card-item">
              <div className="info-icon-box">
                <FaGraduationCap />
              </div>
              <div className="info-text">
                <span className="info-title">NMAM Institute of Technology, Nitte</span>
              </div>
            </div>

            <div className="info-card-item">
              <div className="info-icon-box">
                <FaBookOpenReader />
              </div>
              <div className="info-text">
                <span className="info-title">MCA</span>
                <span className="info-subtitle">CGPA: 9.30</span>
              </div>
            </div>

            <div className="info-card-item">
              <div className="info-icon-box">
                <FaLocationDot />
              </div>
              <div className="info-text">
                <span className="info-title">Mangaluru, Karnataka, India</span>
              </div>
            </div>

            <div className="info-card-item">
              <div className="info-icon-box status-box">
                <span className="green-status-pulse"></span>
              </div>
              <div className="info-text">
                <span className="info-title">Open to</span>
                <span className="info-subtitle">Internship & Full-time</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
