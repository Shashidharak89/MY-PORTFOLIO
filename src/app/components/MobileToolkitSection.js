'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaJava,
  FaNodeJs,
  FaGithub,
  FaLinux,
  FaPython,
  FaCode,
  FaServer,
  FaDatabase,
  FaWrench,
  FaTerminal,
  FaWandMagicSparkles,
  FaArrowRight
} from 'react-icons/fa6';
import {
  SiNextdotjs,
  SiSpringboot,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiC,
  SiPostman
} from 'react-icons/si';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/MobileToolkitSection.css';
import toolkitBg from './images/toolkitsection.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MobileToolkitSection() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);

  const toolkitCategories = [
    {
      id: 'frontend',
      tabLabel: 'Frontend',
      title: 'Frontend & UI Engineering',
      subtitle: 'Responsive, accessible & high-performance modern user interfaces',
      icon: <FaCode />,
      accentColor: '#dc2626',
      skills: [
        { name: 'React.js', level: 'Advanced', icon: <FaReact style={{ color: '#0ea5e9' }} /> },
        { name: 'Next.js', level: 'Advanced', icon: <SiNextdotjs style={{ color: '#111827' }} /> },
        { name: 'JavaScript (ES6+)', level: 'Advanced', icon: <FaJs style={{ color: '#eab308' }} /> },
        { name: 'HTML5', level: 'Expert', icon: <FaHtml5 style={{ color: '#f97316' }} /> },
        { name: 'CSS3 / Modern CSS', level: 'Advanced', icon: <FaCss3Alt style={{ color: '#3b82f6' }} /> }
      ]
    },
    {
      id: 'backend',
      tabLabel: 'Backend',
      title: 'Server & API Systems',
      subtitle: 'Robust backend APIs, microservices & scalable business logic',
      icon: <FaServer />,
      accentColor: '#2563eb',
      skills: [
        { name: 'Java', level: 'Advanced', icon: <FaJava style={{ color: '#ea580c' }} /> },
        { name: 'Spring Boot', level: 'Proficient', icon: <SiSpringboot style={{ color: '#16a34a' }} /> },
        { name: 'Node.js', level: 'Advanced', icon: <FaNodeJs style={{ color: '#22c55e' }} /> },
        { name: 'Express.js', level: 'Advanced', icon: <SiExpress style={{ color: '#374151' }} /> }
      ]
    },
    {
      id: 'databases',
      tabLabel: 'Databases',
      title: 'Databases & Storage',
      subtitle: 'Relational schemas, NoSQL stores & performant query optimization',
      icon: <FaDatabase />,
      accentColor: '#059669',
      skills: [
        { name: 'PostgreSQL', level: 'Advanced', icon: <SiPostgresql style={{ color: '#0284c7' }} /> },
        { name: 'MongoDB', level: 'Proficient', icon: <SiMongodb style={{ color: '#16a34a' }} /> },
        { name: 'MySQL', level: 'Advanced', icon: <SiMysql style={{ color: '#0369a1' }} /> }
      ]
    },
    {
      id: 'programming',
      tabLabel: 'Core Languages',
      title: 'Core Programming & DSA',
      subtitle: 'Data structures, algorithmic thinking & object-oriented programming',
      icon: <FaTerminal />,
      accentColor: '#7c3aed',
      skills: [
        { name: 'Java', level: 'Expert', icon: <FaJava style={{ color: '#ea580c' }} /> },
        { name: 'JavaScript', level: 'Advanced', icon: <FaJs style={{ color: '#eab308' }} /> },
        { name: 'Python', level: 'Proficient', icon: <FaPython style={{ color: '#0284c7' }} /> },
        { name: 'C Language', level: 'Foundational', icon: <SiC style={{ color: '#64748b' }} /> }
      ]
    },
    {
      id: 'tools',
      tabLabel: 'DevOps & Tools',
      title: 'DevOps & Ecosystem',
      subtitle: 'Version control, API testing, Linux environments & dev workflows',
      icon: <FaWrench />,
      accentColor: '#ea580c',
      skills: [
        { name: 'Git & GitHub', level: 'Advanced', icon: <FaGithub style={{ color: '#111827' }} /> },
        { name: 'Linux OS', level: 'Proficient', icon: <FaLinux style={{ color: '#f59e0b' }} /> },
        { name: 'Postman', level: 'Advanced', icon: <SiPostman style={{ color: '#f97316' }} /> }
      ]
    }
  ];

  const currentCategory = toolkitCategories[activeTab];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 600px)', () => {
      // Floating ambient orb
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: -25,
          x: 20,
          scale: 1.15,
          duration: 4,
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

      // Card entrance
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
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
      className="mobile-toolkit-section"
      aria-label="My Toolkit"
      style={{ backgroundImage: `url(${toolkitBg.src})` }}
    >
      <div className="mobile-toolkit-overlay" />
      <div ref={orbRef} className="mobile-toolkit-orb" aria-hidden="true" />

      <div className="mobile-toolkit-wrapper">
        {/* Header */}
        <header ref={headerRef} className="mobile-toolkit-header">
          <div className="mobile-toolkit-pill">
            <FaWandMagicSparkles />
            <span>Tech Stack</span>
          </div>
          <h2 className="mobile-toolkit-title">My Toolkit</h2>
          <p className="mobile-toolkit-subtitle">
            Technologies &amp; frameworks I use to build scalable products
          </p>
        </header>

        {/* Category Tabs */}
        <div className="mobile-toolkit-tabs-wrapper">
          <div className="mobile-toolkit-tabs" role="tablist">
            {toolkitCategories.map((cat, idx) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={idx === activeTab}
                className={`mobile-toolkit-tab ${idx === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                <span>{cat.tabLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Category Skills Card */}
        <div
          ref={cardRef}
          className="mobile-toolkit-card"
          style={{ '--card-accent': currentCategory.accentColor }}
        >
          <div className="mobile-card-top-header">
            <div
              className="mobile-card-icon-box"
              style={{
                background: `${currentCategory.accentColor}15`,
                color: currentCategory.accentColor
              }}
            >
              {currentCategory.icon}
            </div>
            <div className="mobile-card-title-group">
              <h3 className="mobile-card-heading">{currentCategory.title}</h3>
              <p className="mobile-card-desc">{currentCategory.subtitle}</p>
            </div>
          </div>

          <div className="mobile-skills-grid">
            {currentCategory.skills.map((skill) => (
              <div key={skill.name} className="mobile-skill-item">
                <div className="mobile-skill-left">
                  <span className="mobile-skill-icon">{skill.icon}</span>
                  <span className="mobile-skill-name">{skill.name}</span>
                </div>
                <span className="mobile-skill-tag">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Full Skills Page */}
        <Link href="/skills" className="mobile-toolkit-cta">
          <span>Explore Detailed Skills</span>
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}
