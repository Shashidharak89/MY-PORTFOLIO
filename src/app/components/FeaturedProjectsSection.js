'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaGooglePlay,
  FaUpRightFromSquare,
  FaRocket,
  FaArrowRight
} from 'react-icons/fa6';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/FeaturedProjectsSection.css';

import sectionprojectsBg from './images/sectionprojects.jpeg';
import learnixImg from './images/projects/learnix.jpeg';
import cipherImg from './images/projects/cipher2k25.jpeg';
import shopxImg from './images/projects/shopx.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedProjectsSection() {
  const sectionRef = useRef(null);
  const projectItemsRef = useRef([]);
  const imageBoxesRef = useRef([]);
  const contentBoxesRef = useRef([]);
  const orbProjectsRef = useRef(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const featuredProjects = [
    {
      id: 'learnix',
      number: '01',
      title: 'LEARNIX Mobile App & Web',
      category: 'Education Platform & Android App',
      shortDesc: 'A comprehensive learning portal for students to access study notes, materials, and academic resources with an Android app published on Google Play Store.',
      technologies: ['Next.js', 'Node.js', 'Cloudinary', 'MongoDB', 'Android'],
      image: learnixImg,
      shiftDirection: 'right', // Image moves RIGHT, content reveals on LEFT
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.shashidharak.learnix',
      liveLink: 'https://learnix.shashi-k.in',
    },
    {
      id: 'cipher2k25',
      number: '02',
      title: 'CIPHER 2K25',
      category: 'Annual IT Fest Platform',
      shortDesc: 'Official digital hub for CIPHER 2K25 IT Fest featuring registrations, event schedules, sponsor highlights, and dynamic tech visuals.',
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary'],
      image: cipherImg,
      shiftDirection: 'left', // Image moves LEFT, content reveals on RIGHT
      liveLink: 'https://ciphen-2k25.vercel.app/',
    },
    {
      id: 'shopx',
      number: '03',
      title: 'ShopX E-Commerce Platform',
      category: 'Full-Stack Shopping Experience',
      shortDesc: 'Full-stack MERN e-commerce web application featuring seamless product browsing, cart management, checkout workflows, and admin panel.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      image: shopxImg,
      shiftDirection: 'right', // Image moves RIGHT, content reveals on LEFT
      liveLink: 'https://e-commerce-mern-beta.vercel.app',
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const numProjects = featuredProjects.length;

    if (!section) return;

    const ctx = gsap.context(() => {
      const pinDistance = 2800; // Smooth, balanced pin distance matching ToolkitSection

      // Master Pinned ScrollTrigger Timeline (Identical scroll feel to ToolkitSection)
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${pinDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 1, // Smooth inertia scrubbing
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const rawIndex = p * (numProjects - 1);
            const idx = Math.min(numProjects - 1, Math.max(0, Math.round(rawIndex)));
            setActiveProjectIndex(idx);
          }
        }
      });

      const projectDuration = 1.0;

      featuredProjects.forEach((proj, i) => {
        const itemEl = projectItemsRef.current[i];
        const imgBox = imageBoxesRef.current[i];
        const contentBox = contentBoxesRef.current[i];

        if (!itemEl || !imgBox || !contentBox) return;

        const startTime = i * projectDuration;
        const isShiftRight = proj.shiftDirection === 'right';

        const targetImgX = isShiftRight ? '22vw' : '-22vw';
        const initialContentX = isShiftRight ? '-30px' : '30px';

        // Initial setup for all project layers
        if (i === 0) {
          gsap.set(itemEl, { opacity: 1 });
          gsap.set(imgBox, { scale: 1.25, x: '0vw', opacity: 1 });
          gsap.set(contentBox, { opacity: 0, x: initialContentX, scale: 0.94, filter: 'blur(4px)' });
        } else {
          gsap.set(itemEl, { opacity: 0 });
          gsap.set(imgBox, { scale: 1.25, x: '0vw', opacity: 0 });
          gsap.set(contentBox, { opacity: 0, x: initialContentX, scale: 0.94, filter: 'blur(4px)' });
        }

        // Project i Entrance (for i > 0)
        if (i > 0) {
          masterTl
            .to(itemEl, { opacity: 1, duration: 0.2, ease: 'power1.out' }, startTime)
            .fromTo(imgBox,
              { scale: 1.25, x: '0vw', opacity: 0 },
              { scale: 1.25, x: '0vw', opacity: 1, duration: 0.3, ease: 'power1.out' },
              startTime
            );
        }

        // Phase 2: Huge Image shrinks smoothly (scale 1.25 -> 0.65) AND shifts to side, Content reveals!
        masterTl
          .to(imgBox, {
            scale: 0.65,
            x: targetImgX,
            duration: 0.45,
            ease: 'power1.inOut'
          }, startTime + 0.20)
          .to(contentBox, {
            opacity: 1,
            x: '0px',
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.45,
            ease: 'power1.out'
          }, startTime + 0.25);

        // Phase 3: Hold fully visible plateau
        masterTl.to([imgBox, contentBox], {
          duration: 0.20
        }, startTime + 0.65);

        // Phase 4: Soft, fluid fade out before next project or unpinning
        masterTl
          .to(contentBox, {
            opacity: 0,
            x: initialContentX,
            scale: 0.94,
            filter: 'blur(4px)',
            duration: 0.20,
            ease: 'power1.in'
          }, startTime + 0.80)
          .to(imgBox, {
            opacity: 0,
            scale: 0.55,
            filter: 'blur(6px)',
            duration: 0.20,
            ease: 'power1.in'
          }, startTime + 0.80)
          .to(itemEl, {
            opacity: 0,
            duration: 0.05
          }, startTime + 0.98);
      });

      // Floating Orb Motion
      if (orbProjectsRef.current) {
        gsap.to(orbProjectsRef.current, {
          y: -120,
          x: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      }

      // Refresh ScrollTrigger after mount for Lenis sync
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    });

    return () => ctx.revert();
  }, [featuredProjects.length]);

  return (
    <section 
      ref={sectionRef} 
      className="projects-pinned-section"
      style={{ backgroundImage: `url(${sectionprojectsBg.src})` }}
    >
      <div className="section-projects-bg-overlay"></div>
      <div ref={orbProjectsRef} className="projects-floating-orb"></div>

      <div className="projects-pinned-viewport">
        
        {/* Minimal Header */}
        <div className="featured-projects-header">
          <div className="featured-projects-pill">
            <FaRocket />
            <span>HANDPICKED WORK</span>
          </div>
          <h2 className="featured-projects-title">Featured Projects</h2>
        </div>

        {/* Center Stage Area */}
        <div className="projects-stage-area">
          {featuredProjects.map((proj, idx) => {
            const isShiftRight = proj.shiftDirection === 'right';
            return (
              <div
                key={proj.id}
                ref={(el) => (projectItemsRef.current[idx] = el)}
                className="project-stage-item"
              >
                {/* Clean Hero Image Box (Zero Text Overlays) */}
                <div
                  ref={(el) => (imageBoxesRef.current[idx] = el)}
                  className="project-hero-image-box"
                >
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    className="project-hero-img"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    placeholder="blur"
                    priority
                  />
                </div>

                {/* Pure Borderless Content Box */}
                <div
                  ref={(el) => (contentBoxesRef.current[idx] = el)}
                  className={`project-stage-content-box ${
                    isShiftRight ? 'stage-content-left' : 'stage-content-right'
                  }`}
                >
                  <span className="stage-project-category">{proj.category}</span>
                  <h3 className="stage-project-heading">{proj.title}</h3>
                  <p className="stage-project-desc">{proj.shortDesc}</p>

                  <div className="stage-tech-stack-row">
                    {proj.technologies.map((tech) => (
                      <span key={tech} className="stage-tech-pill">{tech}</span>
                    ))}
                  </div>

                  <div className="stage-actions-row">
                    {proj.playStoreLink && (
                      <a
                        href={proj.playStoreLink}
                        target="_blank"
                        rel="noreferrer"
                        className="stage-action-btn playstore"
                      >
                        <FaGooglePlay />
                        <span>Play Store</span>
                      </a>
                    )}

                    {proj.liveLink && (
                      <a
                        href={proj.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="stage-action-btn live"
                      >
                        <FaUpRightFromSquare />
                        <span>Visit Project</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Progress & View All Projects Link */}
        <div className="projects-pinned-footer">
          <div className="projects-progress-box">
            <div className="projects-progress-dots">
              {featuredProjects.map((proj, i) => (
                <div
                  key={proj.id}
                  className={`projects-progress-dot ${i === activeProjectIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="featured-projects-footer-cta">
            <Link href="/projects" className="view-all-projects-link">
              <button className="view-all-projects-btn">
                <span>View All Projects</span>
                <FaArrowRight className="btn-arrow" />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
