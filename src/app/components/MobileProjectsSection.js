'use client';

import React, { useEffect, useRef } from 'react';
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
import './styles/MobileProjectsSection.css';

import learnixImg from './images/projects/learnix.jpeg';
import cipherImg from './images/projects/cipher2k25.jpeg';
import shopxImg from './images/projects/shopx.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MobileProjectsSection() {
  const sectionRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);
  const ctaCardRef = useRef(null);

  const featuredProjects = [
    {
      id: 'learnix',
      title: 'LEARNIX Mobile App & Web',
      category: 'Education Platform & Android App',
      shortDesc: 'A comprehensive learning portal for students to access study notes, materials, and academic resources with an Android app published on Google Play Store.',
      technologies: ['Next.js', 'Node.js', 'Cloudinary', 'MongoDB', 'Android'],
      image: learnixImg,
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.shashidharak.learnix',
      liveLink: 'https://learnix.shashi-k.in',
    },
    {
      id: 'cipher2k25',
      title: 'CIPHER 2K25',
      category: 'Annual IT Fest Platform',
      shortDesc: 'Official digital hub for CIPHER 2K25 IT Fest featuring registrations, event schedules, sponsor highlights, and dynamic tech visuals.',
      technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Cloudinary'],
      image: cipherImg,
      liveLink: 'https://ciphen-2k25.vercel.app/',
    },
    {
      id: 'shopx',
      title: 'ShopX E-Commerce Platform',
      category: 'Full-Stack Shopping Experience',
      shortDesc: 'Full-stack MERN e-commerce web application featuring seamless product browsing, cart management, checkout workflows, and admin panel.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      image: shopxImg,
      liveLink: 'https://e-commerce-mern-beta.vercel.app',
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 600px)', () => {
      // 1. Ambient Background Orb Animations
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          y: 35,
          x: 20,
          scale: 1.15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          y: -30,
          x: -15,
          scale: 1.12,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // 2. Header Entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: -22 },
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

      // 3. Staggered Card Reveals as each card enters viewport
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 38,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true
            }
          }
        );
      });

      // 4. Finale CTA Card Entrance
      if (ctaCardRef.current) {
        gsap.fromTo(
          ctaCardRef.current,
          { opacity: 0, y: 35, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: ctaCardRef.current,
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
      className="mobile-projects-section"
      id="mobile-projects"
      aria-label="Featured Projects"
    >
      {/* Ambient background glowing orbs */}
      <div ref={orb1Ref} className="mobile-projects-orb-1" aria-hidden="true" />
      <div ref={orb2Ref} className="mobile-projects-orb-2" aria-hidden="true" />

      {/* Header */}
      <header ref={headerRef} className="mobile-projects-header">
        <div className="mobile-projects-pill">
          <span className="mobile-projects-pill-dot" />
          <span>Featured Work</span>
        </div>
        <h2 className="mobile-projects-title">Selected Projects</h2>
        <p className="mobile-projects-subtitle">
          Real-world applications built with clean code and modern engineering
        </p>
      </header>

      {/* Orderly Vertically Scrollable Project Cards */}
      <div className="mobile-projects-list">
        {featuredProjects.map((proj, idx) => (
          <article
            key={proj.id}
            ref={(el) => (cardRefs.current[idx] = el)}
            className="mobile-project-card"
          >
            {/* Top Image Box */}
            <div className="mobile-project-image-box">
              <Image
                src={proj.image}
                alt={proj.title}
                className="mobile-project-img"
                placeholder="blur"
              />
              <div className="mobile-project-badge-row">
                <span className="mobile-project-cat-badge">{proj.category}</span>
              </div>
            </div>

            {/* Below Description & Actions */}
            <div className="mobile-project-content">
              <h3 className="mobile-project-heading">{proj.title}</h3>
              <p className="mobile-project-desc">{proj.shortDesc}</p>

              <div className="mobile-project-tech-row">
                {proj.technologies.map((tech) => (
                  <span key={tech} className="mobile-project-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mobile-project-actions">
                {proj.playStoreLink && (
                  <a
                    href={proj.playStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-project-btn playstore"
                  >
                    <FaGooglePlay />
                    <span>Play Store</span>
                  </a>
                )}

                {proj.liveLink && (
                  <a
                    href={proj.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-project-btn live"
                  >
                    <FaUpRightFromSquare />
                    <span>Visit Live</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}

        {/* Finale Call-To-Action Card */}
        <div
          ref={ctaCardRef}
          className="mobile-projects-cta-card"
        >
          <div className="mobile-cta-icon-circle" aria-hidden="true">
            <FaRocket />
          </div>
          <h3 className="mobile-cta-title">Want to see more work?</h3>
          <p className="mobile-cta-desc">
            Browse all my projects with live demos, full architectures, and case studies.
          </p>
          <Link href="/projects" className="mobile-cta-button">
            <span>Explore All Projects</span>
            <FaArrowRight className="mobile-cta-arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
