'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaGooglePlay, FaUpRightFromSquare, FaRocket, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollVelocity } from '../hooks/useScrollVelocity';
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
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const orbProjectsRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoDirection, setAutoDirection] = useState('forward');
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useScrollVelocity(sectionRef, { maxSkew: 0.8, maxOffset: 10 });

  const featuredProjects = [
    {
      id: 'learnix',
      title: 'LEARNIX Mobile App & Web',
      category: 'Education Platform & Android App',
      shortDesc: 'A comprehensive learning portal for students to access study notes, materials, and academic resources with an Android app on Google Play Store.',
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

  // Section Scroll Timeline
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
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

  // Strict Directional Card Transition Handler (No Shaking)
  const animateCardTransition = (targetIndex, direction) => {
    if (!cardRef.current || isAnimating) return;
    setIsAnimating(true);
    gsap.killTweensOf(cardRef.current);

    // Direction 'forward': Moving right-to-left (Current exits left -90px, Next enters from right +90px)
    // Direction 'reverse': Moving left-to-right (Current exits right +90px, Next enters from left -90px)
    const slideOutX = direction === 'forward' ? -90 : 90;
    const slideInX = direction === 'forward' ? 90 : -90;

    gsap.to(cardRef.current, {
      x: slideOutX,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setCurrentIndex(targetIndex);
        gsap.fromTo(
          cardRef.current,
          { x: slideInX, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.32, 
            ease: 'power2.out',
            clearProps: 'transform',
            onComplete: () => setIsAnimating(false) 
          }
        );
      }
    });
  };

  const goToNext = () => {
    if (isAnimating || currentIndex >= featuredProjects.length - 1) return;
    setAutoDirection('forward');
    animateCardTransition(currentIndex + 1, 'forward');
  };

  const goToPrev = () => {
    if (isAnimating || currentIndex <= 0) return;
    setAutoDirection('reverse');
    animateCardTransition(currentIndex - 1, 'reverse');
  };

  // 3-Second Auto Loop with Strict Directional Movements
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (isAnimating) return;

      let nextIdx = currentIndex;
      let dir = autoDirection;

      if (autoDirection === 'forward') {
        if (currentIndex < featuredProjects.length - 1) {
          nextIdx = currentIndex + 1;
          dir = 'forward';
        } else {
          // Hit the last project! Turn around to reverse
          nextIdx = currentIndex - 1;
          dir = 'reverse';
          setAutoDirection('reverse');
        }
      } else {
        if (currentIndex > 0) {
          nextIdx = currentIndex - 1;
          dir = 'reverse';
        } else {
          // Hit the first project! Turn around to forward
          nextIdx = currentIndex + 1;
          dir = 'forward';
          setAutoDirection('forward');
        }
      }

      animateCardTransition(nextIdx, dir);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, autoDirection, isHovered, isAnimating, featuredProjects.length]);

  const currentProject = featuredProjects[currentIndex];
  const prevProject = currentIndex > 0 ? featuredProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < featuredProjects.length - 1 ? featuredProjects[currentIndex + 1] : null;

  return (
    <section 
      ref={sectionRef} 
      className="home-snap-section projects-snap-section"
      style={{ backgroundImage: `url(${sectionprojectsBg.src})` }}
    >
      <div className="section-projects-bg-overlay"></div>
      <div ref={orbProjectsRef} className="projects-floating-orb"></div>

      <div ref={wrapperRef} className="portfolio-dashboard-projects-wrapper">
        
        {/* Header */}
        <div className="featured-projects-header">
          <div className="featured-projects-pill">
            <FaRocket />
            <span>Handpicked Work ({currentIndex + 1} / {featuredProjects.length})</span>
          </div>
          <h2 className="featured-projects-title">Featured Projects</h2>
        </div>

        {/* Carousel Container (Strict Directional Animations, Zero Shaking) */}
        <div 
          className="single-card-carousel-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* Left Arrow Button */}
          {currentIndex > 0 && (
            <button 
              className="carousel-arrow-btn left-arrow-btn"
              onClick={goToPrev}
              aria-label="Previous Project"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* Previous Project Peek Thumbnail (Desktop) */}
          {prevProject && (
            <div className="side-project-preview prev-preview-card" onClick={goToPrev} title={prevProject.title}>
              <Image src={prevProject.image} alt={prevProject.title} className="side-preview-img" />
              <div className="side-preview-overlay"></div>
            </div>
          )}

          {/* Center Active Project Card */}
          <div ref={cardRef} className="single-featured-card">
            <div className="compact-card-media">
              <Image 
                src={currentProject.image} 
                alt={currentProject.title}
                className="compact-card-img"
                placeholder="blur"
                priority
              />

              {/* Default Visible Title Banner at Bottom */}
              <div className="compact-title-banner">
                <h3 className="compact-banner-title">{currentProject.title}</h3>
                <span className="compact-banner-category">{currentProject.category}</span>
              </div>

              {/* Smooth Hover Overlay */}
              <div className="compact-hover-overlay">
                <h3 className="overlay-title">{currentProject.title}</h3>
                <p className="overlay-desc">{currentProject.shortDesc}</p>
                
                <div className="overlay-tech-list">
                  {currentProject.technologies.map((tech) => (
                    <span key={tech} className="overlay-tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="overlay-action-buttons">
                  {currentProject.playStoreLink && (
                    <a 
                      href={currentProject.playStoreLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="overlay-btn playstore"
                    >
                      <FaGooglePlay />
                      <span>Play Store</span>
                    </a>
                  )}

                  {currentProject.liveLink && (
                    <a 
                      href={currentProject.liveLink} 
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

          {/* Next Project Peek Thumbnail (Desktop) */}
          {nextProject && (
            <div className="side-project-preview next-preview-card" onClick={goToNext} title={nextProject.title}>
              <Image src={nextProject.image} alt={nextProject.title} className="side-preview-img" />
              <div className="side-preview-overlay"></div>
            </div>
          )}

          {/* Right Arrow Button */}
          {currentIndex < featuredProjects.length - 1 && (
            <button 
              className="carousel-arrow-btn right-arrow-btn"
              onClick={goToNext}
              aria-label="Next Project"
            >
              <FaChevronRight />
            </button>
          )}

        </div>

        {/* View All Projects Footer Link */}
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
