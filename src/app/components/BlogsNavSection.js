'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBookOpenReader, FaLaptopCode, FaBrain, FaLightbulb, FaArrowRight } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/BlogsNavSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogsNavSection() {
  const section3Ref = useRef(null);
  const section3TitleRef = useRef(null);
  const section3IconsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section3TitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      const visualIcons = section3IconsRef.current?.children;
      if (visualIcons) {
        gsap.fromTo(
          visualIcons,
          { opacity: 0, scale: 0.85, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: section3Ref.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section3Ref} className="home-snap-section">
      <div className="portfolio-dashboard-blogs-section">
        <div className="visual-blogs-card">
          <div className="visual-glow-bg"></div>

          <div className="visual-blogs-hero">
            <div ref={section3TitleRef} className="visual-blogs-header">
              <div className="visual-main-icon-box">
                <FaBookOpenReader className="visual-main-icon" />
              </div>
              <div className="visual-blogs-titles">
                <h2 className="visual-blogs-heading">Read My Tech Blogs</h2>
                <p className="visual-blogs-description">
                  Discover practical tutorials, system architecture breakdowns, and algorithm solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Standalone Big Visual Icons Row */}
          <div ref={section3IconsRef} className="visual-icons-row">
            <div className="visual-icon-pill" title="Full Stack Web & Cloud">
              <FaLaptopCode />
            </div>
            <div className="visual-icon-pill" title="DSA & Algorithms">
              <FaBrain />
            </div>
            <div className="visual-icon-pill" title="Tech Articles & Insights">
              <FaLightbulb />
            </div>
          </div>

          {/* Grand CTA Button */}
          <div className="visual-blogs-action">
            <Link href="/blogs" className="visual-blogs-link">
              <button className="visual-grand-blogs-btn">
                <span>Explore All Blogs</span>
                <FaArrowRight className="btn-arrow-icon" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
