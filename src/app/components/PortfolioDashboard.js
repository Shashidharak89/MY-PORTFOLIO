'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FaRocket, FaLaptopCode, FaGithub, FaBookOpenReader, FaBrain, FaLightbulb, FaArrowRight } from 'react-icons/fa6';
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
        <section className="portfolio-dashboard-hero">
          <div className="portfolio-dashboard-profile">
            <div className="portfolio-dashboard-avatar"></div>
            <h2 className="portfolio-dashboard-name">Shashidhara K</h2>
            <div className="portfolio-dashboard-title">
              <span className="portfolio-dashboard-skill" key={currentSkill}>
                {skills[currentSkill]}
              </span>
            </div>
            <p className="portfolio-dashboard-bio">
              Passionate about creating exceptional digital experiences through innovative solutions.
            </p>
          </div>

          <div className="portfolio-dashboard-content">
            <p className="portfolio-dashboard-greeting">Hello, I&apos;m</p>
            <h1 className="portfolio-dashboard-headline">
              Building Digital
              <br />
              <span className="portfolio-dashboard-headline-accent">Experiences</span>
            </h1>
            <p className="portfolio-dashboard-description">
              Blending full-stack development and app creation with a passion for problem-solving, clean code, and scalable design. Driven by a strong DSA foundation and curiosity for innovation, every line of code transforms ideas into purposeful, high-impact digital solutions — where logic meets creativity and every interaction delivers meaning.            </p>
            <div className="portfolio-dashboard-cta">
              <Link href="/projects">
                <button className="portfolio-dashboard-button portfolio-dashboard-button-primary">
                  View My Work
                </button>
              </Link>
              <Link href="/contact">
                <button className="portfolio-dashboard-button portfolio-dashboard-button-secondary">
                  Get In Touch
                </button>
              </Link>
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
