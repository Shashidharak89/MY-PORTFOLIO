'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import FooterC from '../components/FooterC';
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
  FaArrowRight,
  FaArrowDown,
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
import './t.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PinnedSkillsPage() {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const toolkitCategories = [
    {
      id: 'frontend',
      number: '01',
      categoryName: 'FRONTEND ARCHITECTURE',
      title: 'Frontend & UI Engineering',
      subtitle: 'Crafting responsive, high-performance & visually interactive interfaces',
      icon: <FaCode />,
      accentColor: '#ef4444',
      badgeText: 'UI / UX & Web',
      skills: [
        { name: 'React', level: 'Advanced', icon: <FaReact style={{ color: '#61dafb' }} /> },
        { name: 'Next.js', level: 'Advanced', icon: <SiNextdotjs style={{ color: '#ffffff' }} /> },
        { name: 'JavaScript (ES6+)', level: 'Advanced', icon: <FaJs style={{ color: '#f59e0b' }} /> },
        { name: 'HTML5', level: 'Expert', icon: <FaHtml5 style={{ color: '#ea580c' }} /> },
        { name: 'CSS3 / Modern CSS', level: 'Advanced', icon: <FaCss3Alt style={{ color: '#3b82f6' }} /> },
      ]
    },
    {
      id: 'backend',
      number: '02',
      categoryName: 'BACKEND ARCHITECTURE',
      title: 'Server & API Systems',
      subtitle: 'Engineering secure, scalable microservices & enterprise backend APIs',
      icon: <FaServer />,
      accentColor: '#3b82f6',
      badgeText: 'REST & Services',
      skills: [
        { name: 'Java', level: 'Advanced', icon: <FaJava style={{ color: '#38bdf8' }} /> },
        { name: 'Spring Boot', level: 'Proficient', icon: <SiSpringboot style={{ color: '#4ade80' }} /> },
        { name: 'Node.js', level: 'Advanced', icon: <FaNodeJs style={{ color: '#22c55e' }} /> },
        { name: 'Express.js', level: 'Advanced', icon: <SiExpress style={{ color: '#ffffff' }} /> },
      ]
    },
    {
      id: 'databases',
      number: '03',
      categoryName: 'DATABASE MANAGEMENT',
      title: 'Databases & Storage',
      subtitle: 'Architecting relational schemas, NoSQL stores & optimized queries',
      icon: <FaDatabase />,
      accentColor: '#10b981',
      badgeText: 'Relational & NoSQL',
      skills: [
        { name: 'PostgreSQL', level: 'Advanced', icon: <SiPostgresql style={{ color: '#60a5fa' }} /> },
        { name: 'MongoDB', level: 'Proficient', icon: <SiMongodb style={{ color: '#34d399' }} /> },
        { name: 'MySQL', level: 'Advanced', icon: <SiMysql style={{ color: '#38bdf8' }} /> },
      ]
    },
    {
      id: 'programming',
      number: '04',
      categoryName: 'CORE COMPUTING',
      title: 'Programming Foundations',
      subtitle: 'Data Structures, Algorithms, Object-Oriented Design & Problem Solving',
      icon: <FaTerminal />,
      accentColor: '#8b5cf6',
      badgeText: 'DSA & OOP',
      skills: [
        { name: 'Java', level: 'Expert', icon: <FaJava style={{ color: '#38bdf8' }} /> },
        { name: 'JavaScript', level: 'Advanced', icon: <FaJs style={{ color: '#f59e0b' }} /> },
        { name: 'Python', level: 'Proficient', icon: <FaPython style={{ color: '#60a5fa' }} /> },
        { name: 'C Language', level: 'Foundational', icon: <SiC style={{ color: '#94a3b8' }} /> },
      ]
    },
    {
      id: 'tools',
      number: '05',
      categoryName: 'DEVOPS & TOOLS',
      title: 'Tools & Ecosystem',
      subtitle: 'Version control, shell automation, API testing & dev workflows',
      icon: <FaWrench />,
      accentColor: '#f97316',
      badgeText: 'Workflow & Tools',
      skills: [
        { name: 'Git & GitHub', level: 'Advanced', icon: <FaGithub style={{ color: '#f87171' }} /> },
        { name: 'Linux OS', level: 'Proficient', icon: <FaLinux style={{ color: '#fbbf24' }} /> },
        { name: 'Postman', level: 'Advanced', icon: <SiPostman style={{ color: '#fb923c' }} /> },
      ]
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const outer = outerRef.current;
    const track = trackRef.current;
    const cards = cardsRef.current.filter(Boolean);
    const numCards = toolkitCategories.length;

    if (!outer || !track || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const getBounds = () => {
        const card = cards[0];
        const cardWidth = card ? card.offsetWidth : 580;
        const gap = 40;
        const vw = window.innerWidth;
        const startX = (vw - cardWidth) / 2;
        const totalDist = (numCards - 1) * (cardWidth + gap);
        const endX = startX - totalDist;
        return { startX, endX, cardWidth, gap };
      };

      const bounds = getBounds();
      gsap.set(track, { x: bounds.startX });

      const pinDistance = (numCards - 1) * 900;

      // Pin Timeline
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: 'top top',
          end: `+=${pinDistance}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const raw = p * (numCards - 1);
            const idx = Math.min(numCards - 1, Math.max(0, Math.round(raw)));
            setActiveIndex(idx);
          }
        }
      });

      pinTl.to(track, {
        x: () => getBounds().endX,
        ease: 'none'
      });

      // Individual Card Focus Transformations
      cards.forEach((card, i) => {
        const targetProgress = i / (numCards - 1);
        const step = 1 / (numCards - 1);

        const startP = Math.max(0, targetProgress - step * 0.75);
        const endP = Math.min(1, targetProgress + step * 0.75);

        gsap.fromTo(
          card,
          {
            scale: i === 0 ? 1.05 : 0.86,
            opacity: i === 0 ? 1 : 0.4,
            filter: i === 0 ? 'blur(0px)' : 'blur(5px)',
            y: i === 0 ? 0 : 25
          },
          {
            scale: 1.05,
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: outer,
              start: () => `top+=${startP * pinDistance} top`,
              end: () => `top+=${targetProgress * pinDistance} top`,
              scrub: 0.6
            }
          }
        );

        if (i < numCards - 1) {
          gsap.to(card, {
            scale: 0.86,
            opacity: 0.4,
            filter: 'blur(5px)',
            y: 25,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: outer,
              start: () => `top+=${targetProgress * pinDistance} top`,
              end: () => `top+=${endP * pinDistance} top`,
              scrub: 0.6
            }
          });
        }
      });
    });

    return () => ctx.revert();
  }, [toolkitCategories.length]);

  const activeCategory = toolkitCategories[activeIndex] || toolkitCategories[0];

  return (
    <div className="t-page-container">
      <Navbar />

      {/* Intro Section */}
      <section className="t-intro-section">
        <div className="t-badge">
          <FaWandMagicSparkles />
          <span>Interactive Pinned Scroll Showcase</span>
        </div>
        <h1 className="t-intro-title">Pinned Horizontal Skills Scroll</h1>
        <p className="t-intro-subtitle">
          Scroll down below. The page pins fixed in the viewport while skills cards move smoothly 
          <strong> one-by-one from right to left</strong> through a focused spotlight position.
        </p>
        <div className="t-scroll-hint">
          <span>Scroll Down</span>
          <FaArrowDown />
        </div>
      </section>

      {/* Pinned Horizontal Card-Scroll Section */}
      <section ref={outerRef} className="t-pinned-outer">
        <div className="t-pinned-bg-overlay"></div>

        <div className="t-pinned-viewport">
          
          {/* Header */}
          <div className="t-pinned-header">
            <div className="t-cat-pill">
              <FaWandMagicSparkles />
              <span>DOMAINS</span>
              <span>•</span>
              <span className="t-cat-active-name">{activeCategory.categoryName}</span>
            </div>
            <h2 className="t-pinned-title">Core Skills Spotlight</h2>
            <p className="t-pinned-subtitle">
              Cards transition smooth right-to-left as you scroll vertically
            </p>
          </div>

          {/* Track */}
          <div className="t-track-container">
            <div ref={trackRef} className="t-horizontal-track">
              {toolkitCategories.map((cat, idx) => {
                const isFocused = idx === activeIndex;
                return (
                  <div
                    key={cat.id}
                    ref={(el) => (cardsRef.current[idx] = el)}
                    className={`t-spotlight-card ${isFocused ? 'is-focused' : ''}`}
                    style={{ '--card-accent': cat.accentColor }}
                  >
                    <div className="t-card-top-bar">
                      <span className="t-card-num">{cat.number}</span>
                      <span className="t-card-badge">{cat.badgeText}</span>
                    </div>

                    <div className="t-card-header">
                      <div className="t-card-icon" style={{ background: `${cat.accentColor}20`, color: cat.accentColor }}>
                        {cat.icon}
                      </div>
                      <div>
                        <h3 className="t-card-title">{cat.title}</h3>
                        <p className="t-card-sub">{cat.subtitle}</p>
                      </div>
                    </div>

                    <div className="t-skills-grid">
                      {cat.skills.map((s) => (
                        <div key={s.name} className="t-skill-pill">
                          <div className="t-skill-left">
                            <span className="t-skill-icon">{s.icon}</span>
                            <span className="t-skill-name">{s.name}</span>
                          </div>
                          <span className="t-skill-tag">{s.level}</span>
                        </div>
                      ))}
                    </div>

                    <div className="t-card-glow-bar"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="t-pinned-footer">
            <div className="t-progress-box">
              <span className="t-progress-num">
                {String(activeIndex + 1).padStart(2, '0')} / {String(toolkitCategories.length).padStart(2, '0')}
              </span>
              <div className="t-progress-dots">
                {toolkitCategories.map((cat, i) => (
                  <div
                    key={cat.id}
                    className={`t-progress-dot ${i === activeIndex ? 'active' : ''}`}
                    style={i === activeIndex ? { backgroundColor: cat.accentColor } : {}}
                  />
                ))}
              </div>
            </div>

            <Link href="/skills" className="t-home-btn">
              <span>View All Skills</span>
              <FaArrowRight />
            </Link>
          </div>

        </div>
      </section>

      {/* Outro Section */}
      <section className="t-outro-section">
        <h2 className="t-outro-title">Spotlight Scroll Complete</h2>
        <p className="t-outro-desc">
          After the 5th card completes, the page unpins and normal vertical scrolling continues seamlessly.
        </p>
        <Link href="/" className="t-home-btn">
          <span>Return to Homepage</span>
          <FaArrowRight />
        </Link>
      </section>

      <FooterC />
    </div>
  );
}
