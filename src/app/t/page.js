'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import FooterC from '../components/FooterC';
import {
  FaGooglePlay,
  FaUpRightFromSquare,
  FaRocket,
  FaArrowRight,
  FaArrowDown,
  FaWandMagicSparkles
} from 'react-icons/fa6';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './t.css';

import learnixImg from '../components/images/projects/learnix.jpeg';
import cipherImg from '../components/images/projects/cipher2k25.jpeg';
import shopxImg from '../components/images/projects/shopx.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PinnedProjectsDemoPage() {
  const outerRef = useRef(null);
  const projectItemsRef = useRef([]);
  const imageBoxesRef = useRef([]);
  const contentBoxesRef = useRef([]);
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

    const outer = outerRef.current;
    const numProjects = featuredProjects.length;

    if (!outer) return;

    const ctx = gsap.context(() => {
      const pinDistance = 2400; // Snappy scroll distance with zero dead scroll delay

      // Master ScrollTrigger Timeline
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: 'top top',
          end: `+=${pinDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
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

        // Target X shift: 22vw
        const targetImgX = isShiftRight ? '22vw' : '-22vw';
        const initialContentX = isShiftRight ? '-30px' : '30px';

        // Initial setup for all project layers (starts invisible)
        gsap.set(itemEl, { opacity: 0, visibility: 'hidden' });
        gsap.set(imgBox, { scale: 1.05, x: '0vw', opacity: 0, filter: 'blur(8px)' });
        gsap.set(contentBox, { opacity: 0, x: initialContentX, scale: 0.94, filter: 'blur(4px)' });

        // Project i Entrance (Smooth fade-in & focus scale up from blur)
        masterTl
          .to(itemEl, { visibility: 'visible', opacity: 1, duration: 0.15, ease: 'none' }, startTime)
          .to(imgBox, {
            scale: 1.25,
            x: '0vw',
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.22,
            ease: 'power2.out'
          }, startTime);

        // Phase 2: Huge Image shrinks smoothly (scale 1.25 -> 0.65) AND shifts to side, Content reveals!
        masterTl
          .to(imgBox, {
            scale: 0.65,
            x: targetImgX,
            duration: 0.45,
            ease: 'power2.inOut'
          }, startTime + 0.20)
          .to(contentBox, {
            opacity: 1,
            x: '0px',
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.45,
            ease: 'power2.out'
          }, startTime + 0.25);

        // Phase 3: Hold fully visible plateau for user to read content
        masterTl.to([imgBox, contentBox], {
          duration: 0.20
        }, startTime + 0.65);

        // Phase 4: Fade/slide project OUT (including final Project 3 before unpinning)
        masterTl
          .to(contentBox, {
            opacity: 0,
            x: initialContentX,
            scale: 0.94,
            filter: 'blur(4px)',
            duration: 0.15,
            ease: 'power2.in'
          }, startTime + 0.85)
          .to(imgBox, {
            opacity: 0,
            scale: 0.5,
            filter: 'blur(6px)',
            duration: 0.15,
            ease: 'power2.in'
          }, startTime + 0.85);

        if (i < numProjects - 1) {
          masterTl.to(itemEl, {
            visibility: 'hidden',
            duration: 0.01
          }, startTime + 1.0);
        }
      });

      // Refresh ScrollTrigger for Lenis sync
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    });

    return () => ctx.revert();
  }, [featuredProjects.length]);

  return (
    <div className="t-page-container">
      <Navbar />

      {/* Intro Section */}
      <section className="t-intro-section">
        <div className="t-badge">
          <FaWandMagicSparkles />
          <span>Interactive Pinned Showcase Demo (`/t`)</span>
        </div>
        <h1 className="t-intro-title">Pinned Featured Projects Showcase</h1>
        <p className="t-intro-subtitle">
          Scroll down below. Images start massive and centered, smoothly shrink, and shift to reveal clean project details with zero image overlays.
        </p>
        <div className="t-scroll-hint">
          <span>Scroll Down To Experience</span>
          <FaArrowDown />
        </div>
      </section>

      {/* Pinned Showcase Container */}
      <section ref={outerRef} className="t-pinned-outer">
        <div className="t-pinned-bg-overlay"></div>

        <div className="t-pinned-viewport">
          
          {/* Minimal Header */}
          <div className="t-pinned-header">
            <div className="t-cat-pill">
              <FaRocket />
              <span>HANDPICKED WORK</span>
            </div>
            <h2 className="t-pinned-title">Featured Projects</h2>
          </div>

          {/* Center Stage Area */}
          <div className="t-stage-area">
            {featuredProjects.map((proj, idx) => {
              const isShiftRight = proj.shiftDirection === 'right';
              return (
                <div
                  key={proj.id}
                  ref={(el) => (projectItemsRef.current[idx] = el)}
                  className="t-project-item"
                >
                  {/* Clean Image Box (Zero Text Overlays) */}
                  <div
                    ref={(el) => (imageBoxesRef.current[idx] = el)}
                    className="t-project-image-box"
                  >
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      className="t-project-img"
                      style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                      placeholder="blur"
                      priority
                    />
                  </div>

                  {/* Clean Content Box */}
                  <div
                    ref={(el) => (contentBoxesRef.current[idx] = el)}
                    className={`t-project-content-box ${
                      isShiftRight ? 't-content-left' : 't-content-right'
                    }`}
                  >
                    <span className="t-project-category">{proj.category}</span>
                    <h3 className="t-project-heading">{proj.title}</h3>
                    <p className="t-project-desc">{proj.shortDesc}</p>

                    <div className="t-tech-stack-row">
                      {proj.technologies.map((tech) => (
                        <span key={tech} className="t-tech-pill">{tech}</span>
                      ))}
                    </div>

                    <div className="t-actions-row">
                      {proj.playStoreLink && (
                        <a
                          href={proj.playStoreLink}
                          target="_blank"
                          rel="noreferrer"
                          className="t-action-btn playstore"
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
                          className="t-action-btn live"
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

          {/* Simple Clean Footer Dots */}
          <div className="t-pinned-footer">
            <div className="t-progress-box">
              <div className="t-progress-dots">
                {featuredProjects.map((proj, i) => (
                  <div
                    key={proj.id}
                    className={`t-progress-dot ${i === activeProjectIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Outro Section */}
      <section className="t-outro-section">
        <h2 className="t-outro-title">Showcase Complete</h2>
        <p className="t-outro-desc">
          After Project 03 completes, the section unpins and normal vertical scrolling continues seamlessly.
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
