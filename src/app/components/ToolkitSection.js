'use client';

import { useEffect, useRef, useState } from 'react';
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
  FaWandMagicSparkles
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
import './styles/ToolkitSection.css';
import toolkitBg from './images/toolkitsection.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ToolkitSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const toolkitCategories = [
    {
      id: 'frontend',
      number: '01',
      categoryName: 'FRONTEND STACK',
      title: 'Frontend & UI Engineering',
      subtitle: 'Crafting responsive, high-performance & visually interactive interfaces',
      icon: <FaCode className="cat-icon" />,
      accentColor: '#dc2626',
      badgeText: 'UI / UX & Web',
      skills: [
        { name: 'React', level: 'Advanced', icon: <FaReact className="react-color" /> },
        { name: 'Next.js', level: 'Advanced', icon: <SiNextdotjs className="next-color" /> },
        { name: 'JavaScript (ES6+)', level: 'Advanced', icon: <FaJs className="js-color" /> },
        { name: 'HTML5', level: 'Expert', icon: <FaHtml5 className="html-color" /> },
        { name: 'CSS3 / Modern CSS', level: 'Advanced', icon: <FaCss3Alt className="css-color" /> },
      ]
    },
    {
      id: 'backend',
      number: '02',
      categoryName: 'BACKEND STACK',
      title: 'Server & API Systems',
      subtitle: 'Engineering secure, scalable microservices & enterprise backend APIs',
      icon: <FaServer className="cat-icon" />,
      accentColor: '#2563eb',
      badgeText: 'REST & Services',
      skills: [
        { name: 'Java', level: 'Advanced', icon: <FaJava className="java-color" /> },
        { name: 'Spring Boot', level: 'Proficient', icon: <SiSpringboot className="springboot-color" /> },
        { name: 'Node.js', level: 'Advanced', icon: <FaNodeJs className="node-color" /> },
        { name: 'Express.js', level: 'Advanced', icon: <SiExpress className="express-color" /> },
      ]
    },
    {
      id: 'databases',
      number: '03',
      categoryName: 'DATABASE ENGINE',
      title: 'Databases & Storage',
      subtitle: 'Architecting relational schemas, NoSQL stores & optimized queries',
      icon: <FaDatabase className="cat-icon" />,
      accentColor: '#059669',
      badgeText: 'Relational & NoSQL',
      skills: [
        { name: 'PostgreSQL', level: 'Advanced', icon: <SiPostgresql className="postgres-color" /> },
        { name: 'MongoDB', level: 'Proficient', icon: <SiMongodb className="mongo-color" /> },
        { name: 'MySQL', level: 'Advanced', icon: <SiMysql className="mysql-color" /> },
      ]
    },
    {
      id: 'programming',
      number: '04',
      categoryName: 'CORE PROGRAMMING',
      title: 'Programming Languages',
      subtitle: 'Data Structures, Algorithms, Object-Oriented Design & Logic',
      icon: <FaTerminal className="cat-icon" />,
      accentColor: '#7c3aed',
      badgeText: 'DSA & OOP',
      skills: [
        { name: 'Java', level: 'Expert', icon: <FaJava className="java-color" /> },
        { name: 'JavaScript', level: 'Advanced', icon: <FaJs className="js-color" /> },
        { name: 'Python', level: 'Proficient', icon: <FaPython className="python-color" /> },
        { name: 'C Language', level: 'Foundational', icon: <SiC className="c-color" /> },
      ]
    },
    {
      id: 'tools',
      number: '05',
      categoryName: 'DEVOPS & TOOLS',
      title: 'Tools & Ecosystem',
      subtitle: 'Version control, shell automation, API testing & dev workflows',
      icon: <FaWrench className="cat-icon" />,
      accentColor: '#ea580c',
      badgeText: 'Workflow & Tools',
      skills: [
        { name: 'Git & GitHub', level: 'Advanced', icon: <FaGithub className="github-color" /> },
        { name: 'Linux OS', level: 'Proficient', icon: <FaLinux className="linux-color" /> },
        { name: 'Postman', level: 'Advanced', icon: <SiPostman className="postman-color" /> },
      ]
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const numCards = toolkitCategories.length;

    if (!section || !track || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const getBounds = () => {
        const card = cards[0];
        const cardWidth = card ? card.offsetWidth : 580;
        const gap = 36;
        const vw = window.innerWidth;
        const startX = (vw - cardWidth) / 2;
        const totalTravel = (numCards - 1) * (cardWidth + gap);
        const endX = startX - totalTravel;
        return { startX, endX, cardWidth, gap };
      };

      const bounds = getBounds();
      gsap.set(track, { x: bounds.startX });

      const pinDistance = 3500;
      const totalDuration = numCards - 1; // 4 timeline units

      // Master Pinned ScrollTrigger Timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${pinDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const rawIndex = p * (numCards - 1);
            const idx = Math.min(numCards - 1, Math.max(0, Math.round(rawIndex)));
            setActiveIndex(idx);
          }
        }
      });

      // 1. Move track horizontally from startX to endX
      mainTl.to(track, {
        x: () => getBounds().endX,
        ease: 'none',
        duration: totalDuration
      }, 0);

      // 2. Animate individual card spotlight focus sequence directly inside mainTl keyframes
      cards.forEach((card, i) => {
        const accent = toolkitCategories[i].accentColor;

        // Set initial state for all cards
        if (i === 0) {
          gsap.set(card, {
            scale: 1.06,
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            borderColor: accent,
            boxShadow: `0 22px 55px rgba(0, 0, 0, 0.12), 0 0 35px ${accent}33`
          });
        } else {
          gsap.set(card, {
            scale: 0.86,
            opacity: 0.45,
            filter: 'blur(4px)',
            y: 20,
            borderColor: '#f3f4f6',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.05)'
          });
        }

        // Entrance into spotlight focus
        if (i > 0) {
          mainTl.to(
            card,
            {
              scale: 1.06,
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              borderColor: accent,
              boxShadow: `0 22px 55px rgba(0, 0, 0, 0.12), 0 0 35px ${accent}33`,
              duration: 0.45,
              ease: 'power2.out'
            },
            i - 0.45
          );
        }

        // Exit out of spotlight focus
        if (i < numCards - 1) {
          mainTl.to(
            card,
            {
              scale: 0.86,
              opacity: 0.45,
              filter: 'blur(4px)',
              y: 20,
              borderColor: '#f3f4f6',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.05)',
              duration: 0.45,
              ease: 'power2.in'
            },
            i + 0.1
          );
        }
      });

      // Refresh ScrollTrigger after mount for Lenis sync
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    });

    return () => ctx.revert();
  }, [toolkitCategories.length]);

  const activeCategory = toolkitCategories[activeIndex] || toolkitCategories[0];

  return (
    <section
      ref={sectionRef}
      className="toolkit-pinned-section"
      style={{ backgroundImage: `url(${toolkitBg.src})` }}
    >
      <div className="toolkit-bg-overlay"></div>
      <div className="toolkit-floating-orb"></div>

      <div className="toolkit-pinned-viewport">
        
        {/* Section Header */}
        <div className="toolkit-pinned-header">
          <div className="toolkit-category-pill">
            <FaWandMagicSparkles className="sparkle-icon" />
            <span>MY TOOLKIT</span>
            <span className="dot-divider">•</span>
            <span className="active-cat-name">{activeCategory.categoryName}</span>
          </div>
          <h2 className="toolkit-pinned-title">My Toolkit</h2>
          <p className="toolkit-pinned-subtitle">
            Technologies & Ecosystem I Work With
          </p>
        </div>

        {/* Horizontal Track Container */}
        <div className="toolkit-track-container">
          <div ref={trackRef} className="toolkit-horizontal-track">
            {toolkitCategories.map((cat, idx) => {
              const isFocused = idx === activeIndex;
              return (
                <div
                  key={cat.id}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className={`toolkit-spotlight-card ${isFocused ? 'is-focused' : ''}`}
                  style={{ '--card-accent': cat.accentColor }}
                >
                  <div className="card-top-bar">
                    <span className="card-number">{cat.number}</span>
                    <span className="card-badge">{cat.badgeText}</span>
                  </div>

                  <div className="card-header-main">
                    <div className="card-icon-box" style={{ background: `${cat.accentColor}15`, color: cat.accentColor }}>
                      {cat.icon}
                    </div>
                    <div className="card-title-group">
                      <h3 className="card-title">{cat.title}</h3>
                      <p className="card-subtitle">{cat.subtitle}</p>
                    </div>
                  </div>

                  <div className="card-skills-grid">
                    {cat.skills.map((skill) => (
                      <div key={skill.name} className="skill-pill-item">
                        <div className="skill-pill-left">
                          <span className="skill-icon">{skill.icon}</span>
                          <span className="skill-name">{skill.name}</span>
                        </div>
                        <span className="skill-level-tag">{skill.level}</span>
                      </div>
                    ))}
                  </div>

                  <div className="card-footer-glow"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="toolkit-pinned-footer">
          <div className="toolkit-progress-bar">
            <span className="progress-counter">
              {String(activeIndex + 1).padStart(2, '0')} / {String(toolkitCategories.length).padStart(2, '0')}
            </span>
            <div className="progress-dots">
              {toolkitCategories.map((cat, i) => (
                <div
                  key={cat.id}
                  className={`progress-dot ${i === activeIndex ? 'active' : ''}`}
                  style={i === activeIndex ? { backgroundColor: cat.accentColor } : {}}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
