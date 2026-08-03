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

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ToolkitSection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
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
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Precision Timeline for Toolkit Section
      const toolkitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      toolkitTl
        .set(wrapperRef.current, { 
          opacity: 0, 
          y: 70, 
          scale: 0.86, 
          filter: 'blur(8px)' 
        })
        .to(wrapperRef.current, { 
          opacity: 0, 
          y: 70, 
          scale: 0.86, 
          filter: 'blur(8px)', 
          duration: 0.25 
        })
        .to(wrapperRef.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: 'blur(0px)', 
          duration: 0.25, 
          ease: 'power3.out' 
        })
        .to(wrapperRef.current, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.10 })
        .to(wrapperRef.current, { 
          opacity: 0, 
          y: -50, 
          scale: 0.9, 
          filter: 'blur(6px)', 
          duration: 0.20, 
          ease: 'power3.in' 
        })
        .to(wrapperRef.current, { opacity: 0, y: -50, filter: 'blur(6px)', duration: 0.20 });

      // Stagger Cards inside Grid
      const categoryCards = gridRef.current?.children;
      if (categoryCards) {
        gsap.fromTo(
          categoryCards,
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'top 45%',
              scrub: 0.5
            }
          }
        );
      }

      // Parallax Orb
      gsap.to(orbToolkitRef.current, {
        y: -110,
        x: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="home-snap-section toolkit-snap-section">
      <div ref={orbToolkitRef} className="toolkit-floating-orb"></div>

      <div ref={wrapperRef} className="portfolio-dashboard-toolkit-wrapper">
        
        {/* Header */}
        <div className="toolkit-header">
          <h2 className="toolkit-title">My Toolkit</h2>
          <p className="toolkit-subtitle">Technologies I work with</p>
        </div>

        {/* All 5 Category Cards in Single Row Grid */}
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
    </section>
  );
}
