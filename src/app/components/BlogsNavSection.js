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
  const wrapper3Ref = useRef(null);
  const iconsRow3Ref = useRef(null);
  const orbBlogsRef = useRef(null);

  useScrollVelocity(section3Ref, { maxSkew: 0.8, maxOffset: 10 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Precision Section 3 Timeline:
      // 0% -> 25%: hidden
      // 25% -> 50%: Entrance Fade-In & 3D Slide (opacity 0 -> 1, x -120px -> 0, rotationY -20deg -> 0, scale 0.82 -> 1, blur 12px -> 0px)
      // 50% -> 55%: Full Visibility Plateau (opacity 1)
      // 55% -> 75%: Exit Fade-Out & 3D Slide Out (opacity 1 -> 0, x 0 -> 120px, rotationY 0 -> 20deg, scale 1 -> 0.82, blur 0px -> 12px)
      // 75% -> 100%: hidden
      const sec3Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section3Ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      sec3Tl
        // 0% -> 25%: Hidden State
        .set(wrapper3Ref.current, { 
          opacity: 0, 
          x: -120, 
          y: 40, 
          scale: 0.82, 
          rotationY: -20, 
          transformPerspective: 1000, 
          filter: 'blur(12px)' 
        })
        .to(wrapper3Ref.current, { 
          opacity: 0, 
          x: -120, 
          y: 40, 
          scale: 0.82, 
          rotationY: -20, 
          filter: 'blur(12px)', 
          duration: 0.25 
        })
        
        // 25% -> 50%: Fade In Entrance
        .to(wrapper3Ref.current, { 
          opacity: 1, 
          x: 0, 
          y: 0, 
          scale: 1, 
          rotationY: 0, 
          filter: 'blur(0px)', 
          duration: 0.25, 
          ease: 'power3.out' 
        })
        
        // 50% -> 55%: Full Visibility Plateau
        .to(wrapper3Ref.current, { opacity: 1, x: 0, y: 0, scale: 1, rotationY: 0, filter: 'blur(0px)', duration: 0.05 })
        
        // 55% -> 75%: Exit Fade Out (starts at 55%, ends at 75%)
        .to(wrapper3Ref.current, { 
          opacity: 0, 
          x: 120, 
          y: -40, 
          scale: 0.82, 
          rotationY: 20, 
          filter: 'blur(12px)', 
          duration: 0.20, 
          ease: 'power3.in' 
        })
        
        // 75% -> 100%: Hold hidden
        .to(wrapper3Ref.current, { opacity: 0, x: 120, filter: 'blur(12px)', duration: 0.25 });

      // Icon Badges Pop Reveal
      const visualIcons = iconsRow3Ref.current?.children;
      if (visualIcons) {
        gsap.fromTo(
          visualIcons,
          { opacity: 0, scale: 0.75, y: 30, rotation: -12 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            stagger: 0.04,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: section3Ref.current,
              start: 'top 75%',
              end: 'top 45%',
              scrub: 0.5
            }
          }
        );
      }

      // Floating Orb Parallax Motion
      gsap.to(orbBlogsRef.current, {
        y: -120,
        x: -60,
        scale: 1.2,
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
      {/* Ambient Floating Background Orb */}
      <div ref={orbBlogsRef} className="blogs-floating-orb"></div>

      <div ref={wrapper3Ref} className="portfolio-dashboard-blogs-section">
        <div className="visual-blogs-card">
          <div className="visual-glow-bg"></div>

          <div className="visual-blogs-hero">
            <div className="visual-blogs-header">
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
          <div ref={iconsRow3Ref} className="visual-icons-row">
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
