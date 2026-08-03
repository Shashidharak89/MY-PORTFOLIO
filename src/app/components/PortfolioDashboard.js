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
  FaEnvelope 
} from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';
import './styles/portfolio-dashboard.css';

const PortfolioDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(0);

  const skills = useMemo(() => [
    'Full Stack Developer',
    'DSA Enthusiast',
    'Problem Solver',
    'Tech Enthusiast'
  ], []);

  const stats = [
    { label: 'Projects Completed', value: '10+', icon: <FaRocket /> },
    { label: 'LeetCode Solved', value: '450+', icon: <SiLeetcode /> },
    { label: 'GitHub Contributions', value: '3800+', icon: <FaGithub /> },
    { label: 'Technologies Used', value: '10+', icon: <FaLaptopCode /> }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [skills]);

  return (
    <div className="portfolio-dashboard-container">
      <div className={`portfolio-dashboard-main ${isVisible ? 'portfolio-dashboard-visible' : 'portfolio-dashboard-hidden'}`}>
        
        {/* 3-Column Hero Section matching reference design */}
        <section className="portfolio-hero-3col">
          
          {/* Left Column: Greeting, Title, Bio, CTAs & Social Links */}
          <div className="hero-left-col">
            <div className="greeting-pill">
              <span className="wave-hand">👋</span>
              <span>Hi, I'm</span>
            </div>

            <h1 className="hero-name-heading">
              Shashidhara <span className="name-accent">K</span>
            </h1>

            <div className="hero-role-heading">
              <span className="role-accent">Full Stack</span>{' '}
              <span className="role-skill-text" key={currentSkill}>
                {skills[currentSkill].includes('Developer') ? 'Developer' : skills[currentSkill]}
              </span>
            </div>

            <p className="hero-short-bio">
              I build fast, scalable and user-friendly web applications using modern technologies. I love solving real-world problems and turning ideas into impactful products.
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
                <a href="https://github.com/Shashidharak89" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="mailto:gamenexplay63@gmail.com" className="social-icon-btn" aria-label="Email">
                  <FaEnvelope />
                </a>
                <a href="https://leetcode.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LeetCode">
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

        </section>

        <section className="portfolio-dashboard-stats">
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
        </section>

        {/* Visual & Spacious Read My Blogs Section */}
        <section className="portfolio-dashboard-blogs-section">
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
        </section>
      </div>
    </div>
  );
};

export default PortfolioDashboard;
