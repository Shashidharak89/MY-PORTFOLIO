'use client';

import { useState, useEffect, useMemo } from 'react';
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
import './styles/portfolio-dashboard.css';

const PortfolioDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <div className="portfolio-dashboard-container">
      <div className={`portfolio-dashboard-main ${isVisible ? 'portfolio-dashboard-visible' : 'portfolio-dashboard-hidden'}`}>
        {/* SECTION 1: 3-Column Hero Section matching reference design */}
        <section className="home-snap-section">
          <div className="portfolio-hero-3col">
            
            {/* Left Column: Greeting, Title, Bio, CTAs & Social Links */}
            <div className="hero-left-col">
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
            <div className="hero-center-col">
              <div className="avatar-wrapper">
                <div className="avatar-ambient-glow"></div>
                <div className="avatar-orbit-ring ring-1"></div>
                <div className="avatar-orbit-ring ring-2"></div>
                <div className="orbit-dot dot-1"></div>
                <div className="orbit-dot dot-2"></div>

                <div className="avatar-image-frame"></div>
              </div>
            </div>

            {/* Right Column: Personal Info Card */}
            <div className="hero-right-col">
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
        <section className="home-snap-section">
          <div className="portfolio-dashboard-stats-wrapper">
            <h2 className="stats-section-title">Achievements & Impact</h2>
            <div className="portfolio-dashboard-stats">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="portfolio-dashboard-stat-card"
                  style={{
                    animation: `portfolio-fadeInUp 0.8s ease-out ${0.2 * (index + 1)}s both`
                  }}
                >
                  <span className="portfolio-dashboard-stat-icon">{stat.icon}</span>
                  <div className="portfolio-dashboard-stat-value">{stat.value}</div>
                  <div className="portfolio-dashboard-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Visual & Spacious Read My Blogs Section */}
        <section className="home-snap-section">
          <div className="portfolio-dashboard-blogs-section">
            <div className="visual-blogs-card">
              <div className="visual-glow-bg"></div>

              <div className="visual-blogs-hero">
                <div className="visual-blogs-header">
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
              <div className="visual-icons-row">
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
