'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaGooglePlay, FaUpRightFromSquare, FaRocket, FaArrowRight } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollVelocity } from '../hooks/useScrollVelocity';
import './styles/FeaturedProjectsSection.css';

import learnixImg from './images/projects/learnix.jpeg';
import cipherImg from './images/projects/cipher2k25.jpeg';
import shopxImg from './images/projects/shopx.jpeg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturedProjectsSection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardsGridRef = useRef(null);
  const orbProjectsRef = useRef(null);

  useScrollVelocity(sectionRef, { maxSkew: 0.8, maxOffset: 10 });

  const featuredProjects = [
    {
      id: 'learnix',
      title: 'LEARNIX Mobile App & Web',
      category: 'Education & Android App',
      shortDesc: 'A learning portal & Android app for students to access study notes and academic materials.',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Android'],
      image: learnixImg,
      playStoreLink: 'https://play.google.com/store/apps/details?id=com.shashidharak.learnix',
      liveLink: 'https://learnix.shashi-k.in',
    },
    {
      id: 'cipher2k25',
      title: 'CIPHER 2K25',
      category: 'Annual IT Fest Platform',
      description: 'Official digital hub for CIPHER 2K25 IT Fest featuring registrations & event schedules.',
      shortDesc: 'Official digital hub for CIPHER 2K25 IT Fest featuring event schedules & registrations.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Cloudinary'],
      image: cipherImg,
      liveLink: 'https://ciphen-2k25.vercel.app/',
    },
    {
      id: 'shopx',
      title: 'ShopX E-Commerce',
      category: 'Full-Stack Shopping',
      shortDesc: 'Full-stack MERN e-commerce store with product cart management & checkout.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      image: shopxImg,
      liveLink: 'https://e-commerce-mern-beta.vercel.app',
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 3D Perspective Card Stack Unfold Transition
      const projectsTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      projectsTl
        .set(wrapperRef.current, { 
          opacity: 0, 
          y: 70, 
          scale: 0.84, 
          rotationX: 15, 
          transformPerspective: 1000, 
          filter: 'blur(8px)' 
        })
        .to(wrapperRef.current, { 
          opacity: 0, 
          y: 70, 
          scale: 0.84, 
          rotationX: 15, 
          filter: 'blur(8px)', 
          duration: 0.25 
        })
        .to(wrapperRef.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotationX: 0, 
          filter: 'blur(0px)', 
          duration: 0.25, 
          ease: 'power3.out' 
        })
        .to(wrapperRef.current, { opacity: 1, y: 0, scale: 1, rotationX: 0, filter: 'blur(0px)', duration: 0.05 })
        .to(wrapperRef.current, { 
          opacity: 0, 
          y: -50, 
          scale: 0.9, 
          rotationX: -10, 
          filter: 'blur(6px)', 
          duration: 0.20, 
          ease: 'power3.in' 
        })
        .to(wrapperRef.current, { opacity: 0, y: -50, filter: 'blur(6px)', duration: 0.25 });

      // Stagger Cards
      const projectCards = cardsGridRef.current?.children;
      if (projectCards) {
        gsap.fromTo(
          projectCards,
          { opacity: 0, scale: 0.8, y: 35 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
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
      gsap.to(orbProjectsRef.current, {
        y: -120,
        x: 60,
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
    <section ref={sectionRef} className="home-snap-section projects-snap-section">
      <div ref={orbProjectsRef} className="projects-floating-orb"></div>

      <div ref={wrapperRef} className="portfolio-dashboard-projects-wrapper">
        
        {/* Header */}
        <div className="featured-projects-header">
          <div className="featured-projects-pill">
            <FaRocket />
            <span>Handpicked Work</span>
          </div>
          <h2 className="featured-projects-title">Featured Projects</h2>
        </div>

        {/* Compact Image-Only Default Cards with Hover Overlay */}
        <div ref={cardsGridRef} className="featured-projects-grid">
          {featuredProjects.map((project) => (
            <div key={project.id} className="compact-project-card">
              
              {/* Image Container */}
              <div className="compact-card-media">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  className="compact-card-img"
                  placeholder="blur"
                />

                {/* Default Visible Title Banner at Bottom */}
                <div className="compact-title-banner">
                  <h3 className="compact-banner-title">{project.title}</h3>
                  <span className="compact-banner-category">{project.category}</span>
                </div>

                {/* Hover Reveal Overlay (Over the Image) */}
                <div className="compact-hover-overlay">
                  <h3 className="overlay-title">{project.title}</h3>
                  <p className="overlay-desc">{project.shortDesc}</p>
                  
                  <div className="overlay-tech-list">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="overlay-tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="overlay-action-buttons">
                    {project.playStoreLink && (
                      <a 
                        href={project.playStoreLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="overlay-btn playstore"
                      >
                        <FaGooglePlay />
                        <span>Play Store</span>
                      </a>
                    )}

                    {project.liveLink && (
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="overlay-btn live"
                      >
                        <FaUpRightFromSquare />
                        <span>Visit</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* View All Projects Link */}
        <div className="featured-projects-footer-cta">
          <Link href="/projects" className="view-all-projects-link">
            <button className="view-all-projects-btn">
              <span>View All Projects</span>
              <FaArrowRight className="btn-arrow" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}
