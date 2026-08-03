'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBookOpenReader, FaLaptopCode, FaBrain, FaLightbulb, FaArrowRight } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollVelocity } from '../hooks/useScrollVelocity';
import './styles/BlogsNavSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogsNavSection() {
  const section3Ref = useRef(null);
  const section3TitleRef = useRef(null);
  const section3IconsRef = useRef(null);
  const orbBlogsRef = useRef(null);

  useScrollVelocity(section3Ref, { maxSkew: 0.8, maxOffset: 10 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Title Reveal with Blur Removal
      gsap.fromTo(
        section3TitleRef.current,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      );

      // 2. Icon Badges Stagger Reveal
      const visualIcons = section3IconsRef.current?.children;
      if (visualIcons) {
        gsap.fromTo(
          visualIcons,
          { opacity: 0, scale: 0.85, y: 25 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section3Ref.current,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 0.5,
            }
          }
        );
      }

      // 3. Floating Orb Parallax Movement
      gsap.to(orbBlogsRef.current, {
        y: -90,
        x: -40,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: section3Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section3Ref} className="home-snap-section blogs-snap-section">
      {/* Floating Ambient Background Orb */}
      <div ref={orbBlogsRef} className="blogs-floating-orb"></div>

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
