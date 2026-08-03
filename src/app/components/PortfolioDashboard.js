'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { 
  FaRocket, 
  FaLaptopCode, 
  FaGithub, 
  FaBookOpenReader, 
  FaBrain, 
  FaLightbulb, 
  FaArrowRight, 
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
import './styles/portfolio-dashboard.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PortfolioDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Animation Refs
  const heroSectionRef = useRef(null);
  const heroLeftRef = useRef(null);
  const heroCenterRef = useRef(null);
  const avatarFrameRef = useRef(null);
  const ringsRef = useRef(null);
  const heroRightRef = useRef(null);

  const section2Ref = useRef(null);
  const section2TitleRef = useRef(null);
  const section2StatsRef = useRef(null);

  const section3Ref = useRef(null);
  const section3TitleRef = useRef(null);
  const section3IconsRef = useRef(null);

  const titleRoles = useMemo(() => [
    { prefix: 'Full Stack', suffix: 'Developer' },
    { prefix: 'App', suffix: 'Developer' },
    { prefix: 'Problem', suffix: 'Solver' }
  ], []);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const stats = [
    { label: 'Projects Completed', value: '10+', icon: <FaRocket /> },
    { label: 'LeetCode Solved', value: '450+', icon: <SiLeetcode /> },
    { label: 'GitHub Contributions', value: '3800+', icon: <FaGithub /> },
    { label: 'Technologies Used', value: '10+', icon: <FaLaptopCode /> }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % titleRoles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titleRoles]);

  // GSAP Scroll-Driven Storytelling Timelines
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Smooth Parallax Storytelling Timeline (Natural Scroll, No Pin Spacers)
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
          invalidateOnRefresh: true,
        }
      });

      // Parallax scroll effects as user scrolls down Section 1
      heroTl
        .to(heroLeftRef.current, { y: -35, opacity: 0.85, ease: 'none' }, 0)
        .to(ringsRef.current, { rotation: 25, y: -20, ease: 'none' }, 0)
        .to(avatarFrameRef.current, { scale: 0.94, ease: 'none' }, 0)
        .to(heroRightRef.current, { y: -45, opacity: 0.85, ease: 'none' }, 0);

      // 2. Section 2: Achievements & Impact Cards Reveal & Stagger
      gsap.fromTo(
        section2TitleRef.current,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const statCards = section2StatsRef.current?.children;
      if (statCards) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 35, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section2Ref.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // 3. Section 3: Read My Tech Blogs Cards & Icons Reveal
      gsap.fromTo(
        section3TitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const visualIcons = section3IconsRef.current?.children;
      if (visualIcons) {
        gsap.fromTo(
          visualIcons,
          { opacity: 0, scale: 0.85, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: section3Ref.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="portfolio-dashboard-container">
      <div className={`portfolio-dashboard-main ${isVisible ? 'portfolio-dashboard-visible' : 'portfolio-dashboard-hidden'}`}>
        
        {/* SECTION 1: 3-Column Hero Storytelling Section */}
        <section ref={heroSectionRef} className="home-snap-section">
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

        {/* SECTION 2: 4 Stats Cards Section */}
        <section ref={section2Ref} className="home-snap-section">
          <div className="portfolio-dashboard-stats-wrapper">
            <h2 ref={section2TitleRef} className="stats-section-title">Achievements & Impact</h2>
            <div ref={section2StatsRef} className="portfolio-dashboard-stats">
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

        {/* SECTION 3: Visual & Spacious Read My Blogs Section */}
        <section ref={section3Ref} className="home-snap-section">
          <div className="portfolio-dashboard-blogs-section">
            <div className="visual-blogs-card">
              <div className="visual-glow-bg"></div>

              <div className="visual-blogs-hero">
                <div ref={section3TitleRef} className="visual-blogs-header">
                  <div className="visual-main-icon-box">
                    <FaBookOpenReader className="visual-main-icon" />
                  </div>
                  <div className="visual-blogs-titles">
                    <h2 className="visual-blogs-heading">Read My Tech Blogs</h2>
                    <p className="visual-blogs-description">
                      Discover practical tutorials, system architecture breakdowns, and algorithm solutions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Standalone Big Visual Icons Row */}
              <div ref={section3IconsRef} className="visual-icons-row">
                <div className="visual-icon-pill" title="Full Stack Web & Cloud">
                  <FaLaptopCode />
                </div>
                <div className="visual-icon-pill" title="DSA & Algorithms">
                  <FaBrain />
                </div>
                <div className="visual-icon-pill" title="Tech Articles & Insights">
                  <FaLightbulb />
                </div>
              </div>

              {/* Grand CTA Button */}
              <div className="visual-blogs-action">
                <Link href="/blogs" className="visual-blogs-link">
                  <button className="visual-grand-blogs-btn">
                    <span>Explore All Blogs</span>
                    <FaArrowRight className="btn-arrow-icon" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
