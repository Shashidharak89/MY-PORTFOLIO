'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
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
    { label: 'Projects Completed', value: '20+', icon: '🚀' },
    { label: 'Years Experience', value: '2+', icon: '⏰' },
    { label: 'Technologies', value: '10+', icon: '💻' },
    { label: 'Happy Clients', value: '5+', icon: '😊' }
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
              I craft modern web applications with cutting-edge technologies, 
              focusing on user experience, performance, and scalable solutions. 
              Welcome to my digital portfolio where creativity meets functionality.
            </p>
            <div className="portfolio-dashboard-cta">
              <Link href="/portfolio">
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
      </div>
    </div>
  );
};

export default PortfolioDashboard;
