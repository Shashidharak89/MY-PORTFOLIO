'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FaGooglePlay,
  FaUpRightFromSquare,
  FaRocket,
  FaArrowRight,
  FaWandMagicSparkles
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
  const finaleRef = useRef(null);
  const finaleBlurRef = useRef(null);
  const finaleCardRef = useRef(null);
  const orbProjectsRef = useRef(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

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
    const totalPhases = numProjects + 1; // 3 projects + 1 finale phase

    if (!section) return;

    const ctx = gsap.context(() => {
      const pinDistance = 3500; // Pinned scroll length for 4 phases

      // Master Pinned ScrollTrigger Timeline
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
            const rawIndex = p * (totalPhases - 1);
            const idx = Math.min(totalPhases - 1, Math.max(0, Math.round(rawIndex)));
            setActiveStageIndex(idx);
          }
        }
      });

      const phaseDuration = 1.0;

      // Initial setup for Finale Stage (Phase 4)
      if (finaleRef.current && finaleBlurRef.current && finaleCardRef.current) {
        gsap.set(finaleRef.current, { opacity: 0, visibility: 'hidden' });
        gsap.set(finaleBlurRef.current, { opacity: 0, scale: 0.9, filter: 'blur(20px)' });
        gsap.set(finaleCardRef.current, { opacity: 0, scale: 0.9, y: 30, filter: 'blur(8px)' });
      }

      // Projects 1, 2, 3 Timelines (Phases 1, 2, 3)
      featuredProjects.forEach((proj, i) => {
        const itemEl = projectItemsRef.current[i];
        const imgBox = imageBoxesRef.current[i];
        const contentBox = contentBoxesRef.current[i];

        if (!itemEl || !imgBox || !contentBox) return;

        const startTime = i * phaseDuration;
        const isShiftRight = proj.shiftDirection === 'right';

        const targetImgX = isShiftRight ? '22vw' : '-22vw';
        const initialContentX = isShiftRight ? '-30px' : '30px';

        // Initial setup for all project layers
        if (i === 0) {
          gsap.set(itemEl, { opacity: 1, visibility: 'visible' });
          gsap.set(imgBox, { scale: 1.25, x: '0vw', opacity: 1 });
          gsap.set(contentBox, { opacity: 0, x: initialContentX, scale: 0.94, filter: 'blur(4px)' });
        } else {
          gsap.set(itemEl, { opacity: 0, visibility: 'hidden' });
          gsap.set(imgBox, { scale: 1.25, x: '0vw', opacity: 0 });
          gsap.set(contentBox, { opacity: 0, x: initialContentX, scale: 0.94, filter: 'blur(4px)' });
        }

        // Project i Entrance (for i > 0)
        if (i > 0) {
          masterTl
            .to(itemEl, { visibility: 'visible', opacity: 1, duration: 0.15, ease: 'none' }, startTime)
            .fromTo(imgBox,
              { scale: 1.25, x: '0vw', opacity: 0 },
              { scale: 1.25, x: '0vw', opacity: 1, duration: 0.25, ease: 'power1.out' },
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

        // Phase 3: Hold plateau
        masterTl.to([imgBox, contentBox], { duration: 0.20 }, startTime + 0.65);

        // Phase 4: Soft fade out
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
          .to(itemEl, { visibility: 'hidden', opacity: 0, duration: 0.01 }, startTime + 0.99);
      });

      // Phase 4: Finale View All Projects CTA (starts at t = 3.0)
      const finaleStartTime = numProjects * phaseDuration;

      if (finaleRef.current && finaleBlurRef.current && finaleCardRef.current) {
        masterTl
          .to(finaleRef.current, {
            visibility: 'visible',
            opacity: 1,
            duration: 0.15,
            ease: 'none'
          }, finaleStartTime)
          .to(finaleBlurRef.current, {
            opacity: 0.55,
            scale: 0.98,
            filter: 'blur(14px)',
            duration: 0.35,
            ease: 'power1.out'
          }, finaleStartTime + 0.10)
          .to(finaleCardRef.current, {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.35,
            ease: 'power2.out'
          }, finaleStartTime + 0.15)
          .to([finaleBlurRef.current, finaleCardRef.current], {
            duration: 0.30
          }, finaleStartTime + 0.50)
          .to(finaleCardRef.current, {
            opacity: 0,
            y: -30,
            filter: 'blur(6px)',
            duration: 0.20,
            ease: 'power1.in'
          }, finaleStartTime + 0.80)
          .to(finaleBlurRef.current, {
            opacity: 0,
            duration: 0.20,
            ease: 'power1.in'
          }, finaleStartTime + 0.80)
          .to(finaleRef.current, {
            visibility: 'hidden',
            opacity: 0,
            duration: 0.01
          }, finaleStartTime + 0.99);
      }

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

          {/* Phase 4: Blurred Background Collage + Center View All Projects CTA */}
          <div ref={finaleRef} className="projects-finale-stage">
            {/* Background Blurred Thumbnails Collage */}
            <div ref={finaleBlurRef} className="finale-blur-collage">
              {featuredProjects.map((proj) => (
                <div key={`blur-${proj.id}`} className="finale-blur-thumb">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    className="finale-blur-img"
                    placeholder="blur"
                  />
                </div>
              ))}
            </div>

            {/* Foreground Glassmorphic CTA Card */}
            <div ref={finaleCardRef} className="finale-cta-card">
              <div className="finale-badge">
                <FaWandMagicSparkles />
                <span>CURATED PORTFOLIO</span>
              </div>
              <h3 className="finale-heading">Explore All Projects</h3>
              <p className="finale-desc">
                Discover complete web applications, Android apps, open-source repositories & engineering case studies.
              </p>
              <Link href="/projects" className="finale-cta-btn">
                <span>View More Projects</span>
                <FaArrowRight className="btn-arrow" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Progress Bar (4 Dots: 3 Projects + 1 Finale) */}
        <div className="projects-pinned-footer">
          <div className="projects-progress-box">
            <div className="projects-progress-dots">
              {[0, 1, 2, 3].map((dotIdx) => (
                <div
                  key={dotIdx}
                  className={`projects-progress-dot ${dotIdx === activeStageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
