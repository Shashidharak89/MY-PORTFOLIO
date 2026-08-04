'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  FaReact, 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaJava, 
  FaNodeJs, 
  FaGitAlt, 
  FaGithub, 
  FaLinux, 
  FaPython, 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaWrench, 
  FaTerminal,
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
import { useScrollVelocity } from '../hooks/useScrollVelocity';
import './styles/ToolkitSection.css';
import toolkitBg from './images/toolkit.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ToolkitSection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const pinRef = useRef(null);
  const trackOuterRef = useRef(null);
  const trackRef = useRef(null);
  const gridRef = useRef(null);
  const orbToolkitRef = useRef(null);

  useScrollVelocity(sectionRef, { maxSkew: 0.8, maxOffset: 10 });

  const toolkitCategories = [
    {
      id: 'frontend',
      title: 'Frontend',
      icon: <FaCode />,
      skills: [
        { name: 'React', icon: <FaReact className="react-color" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="next-color" /> },
        { name: 'JavaScript', icon: <FaJs className="js-color" /> },
        { name: 'HTML5', icon: <FaHtml5 className="html-color" /> },
        { name: 'CSS3', icon: <FaCss3Alt className="css-color" /> },
      ]
    },
    {
      id: 'backend',
      title: 'Backend',
      icon: <FaServer />,
      skills: [
        { name: 'Java', icon: <FaJava className="java-color" /> },
        { name: 'Spring Boot', icon: <SiSpringboot className="springboot-color" /> },
        { name: 'Node.js', icon: <FaNodeJs className="node-color" /> },
        { name: 'Express.js', icon: <SiExpress className="express-color" /> },
      ]
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: <FaDatabase />,
      skills: [
        { name: 'PostgreSQL', icon: <SiPostgresql className="postgres-color" /> },
        { name: 'MongoDB', icon: <SiMongodb className="mongo-color" /> },
        { name: 'MySQL', icon: <SiMysql className="mysql-color" /> },
      ]
    },
    {
      id: 'programming',
      title: 'Programming',
      icon: <FaTerminal />,
      skills: [
        { name: 'Java', icon: <FaJava className="java-color" /> },
        { name: 'JavaScript', icon: <FaJs className="js-color" /> },
        { name: 'Python', icon: <FaPython className="python-color" /> },
        { name: 'C', icon: <SiC className="c-color" /> },
      ]
    },
    {
      id: 'tools',
      title: 'Tools & DevOps',
      icon: <FaWrench />,
      skills: [
        { name: 'Git & GitHub', icon: <FaGithub className="github-color" /> },
        { name: 'Linux', icon: <FaLinux className="linux-color" /> },
        { name: 'Postman', icon: <SiPostman className="postman-color" /> },
      ]
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion: simple fade-in only, no pinning, no horizontal drive
    if (prefersReducedMotion) {
      const ctx = gsap.context(() => {
        gsap.set(wrapperRef.current, { opacity: 1, y: 0, scale: 1 });
        const cardElements = gridRef.current?.children;
        if (cardElements && cardElements.length > 0) {
          gsap.fromTo(
            cardElements,
            { opacity: 0 },
            {
              opacity: 1,
              stagger: 0.05,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
              }
            }
          );
        }
      });
      return () => ctx.revert();
    }

    const mm = gsap.matchMedia();

    // Desktop / tablet: pinned section, vertical scroll drives horizontal card movement
    mm.add('(min-width: 769px)', () => {
      const ctx = gsap.context(() => {
        const cardElements = gridRef.current?.children;
        if (!cardElements || cardElements.length === 0) return;

        // Wrapper entrance (fade/scale only, no rotation — keeps perf high)
        gsap.fromTo(
          wrapperRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: pinRef.current,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.4,
            }
          }
        );

        // Compute the horizontal distance the track needs to travel
        const getScrollDistance = () => {
          const trackWidth = trackRef.current.scrollWidth;
          const viewportWidth = trackOuterRef.current.offsetWidth;
          return Math.max(0, trackWidth - viewportWidth);
        };

        const horizontalTween = gsap.to(trackRef.current, {
          x: () => -getScrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: () => `+=${getScrollDistance() + window.innerHeight * 0.4}`,
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // Per-card fade / scale / parallax as they enter and leave the pinned viewport
        Array.from(cardElements).forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0.3, scale: 0.88, y: 18 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: 'left 100%',
                end: 'left 62%',
                scrub: true,
              }
            }
          );

          gsap.to(card, {
            opacity: 0.3,
            scale: 0.88,
            y: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: 'right 38%',
              end: 'right 0%',
              scrub: true,
            }
          });

          // Subtle stagger-driven parallax between the icon header and skill list
          const header = card.querySelector('.toolkit-card-header');
          const skills = card.querySelector('.toolkit-skills-list');
          if (header && skills) {
            gsap.fromTo(
              header,
              { x: 10 },
              {
                x: -10,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: 'left 90%',
                  end: 'right 10%',
                  scrub: true,
                }
              }
            );
          }
        });

        // Parallax floating orb tied to the pinned scroll range
        gsap.to(orbToolkitRef.current, {
          x: -80,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top',
            end: () => `+=${getScrollDistance() + window.innerHeight * 0.4}`,
            scrub: 0.8,
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    // Mobile: simplified vertical fade/stagger, no pinning, no horizontal drive
    mm.add('(max-width: 768px)', () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          wrapperRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.4,
            }
          }
        );

        const cardElements = gridRef.current?.children;
        if (cardElements && cardElements.length > 0) {
          gsap.fromTo(
            cardElements,
            { opacity: 0, y: 24, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: gridRef.current,
                start: 'top 90%',
                end: 'top 55%',
                scrub: 0.5,
              }
            }
          );
        }

        gsap.to(orbToolkitRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="home-snap-section toolkit-snap-section"
      style={{ backgroundImage: `url(${toolkitBg.src})` }}
    >
      <div className="toolkit-bg-overlay"></div>
      <div ref={orbToolkitRef} className="toolkit-floating-orb"></div>

      <div ref={pinRef} className="toolkit-pin-viewport">
        <div ref={wrapperRef} className="portfolio-dashboard-toolkit-wrapper">
          
          {/* Header */}
          <div className="toolkit-header">
            <h2 className="toolkit-title">My Toolkit</h2>
            <p className="toolkit-subtitle">Technologies I work with</p>
          </div>

          {/* Horizontally-scroll-driven track on desktop, normal grid on mobile */}
          <div ref={trackOuterRef} className="toolkit-track-outer">
            <div ref={trackRef} className="toolkit-track">
              <div ref={gridRef} className="toolkit-grid">
                {toolkitCategories.map((cat) => (
                  <div key={cat.id} className="toolkit-card">
                    <div className="toolkit-card-header">
                      <span className="toolkit-card-icon">{cat.icon}</span>
                      <h3 className="toolkit-card-title">{cat.title}</h3>
                    </div>
                    <div className="toolkit-skills-list">
                      {cat.skills.map((skill) => (
                        <div key={skill.name} className="toolkit-skill-item">
                          <span className="skill-icon">{skill.icon}</span>
                          <span className="skill-name">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* View All Skills Link */}
          <div className="toolkit-footer-cta">
            <Link href="/skills" className="view-all-skills-link">
              <button className="view-all-skills-btn">
                <span>Explore All Skills</span>
                <FaArrowRight className="btn-arrow" />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}