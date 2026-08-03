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
      // Creative Section 3 Timeline:
      // 0% -> 20%: hidden
      // 20% -> 50%: Creative Scale & Spring Entrance (opacity 0 -> 1, y 70px -> 0, scale 0.86 -> 1, blur 8px -> 0px)
      // 50% -> 60%: Full Visibility Plateau (opacity 1)
      // 60% -> 90%: Fade Out (opacity 1 -> 0, y 0 -> -50px, scale 1 -> 0.94, blur 0px -> 8px)
      // 90% -> 100%: hidden
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
        // 0% -> 20%
        .set(wrapper3Ref.current, { opacity: 0, y: 70, scale: 0.86, filter: 'blur(8px)' })
        .to(wrapper3Ref.current, { opacity: 0, y: 70, scale: 0.86, filter: 'blur(8px)', duration: 0.20 })
        
        // 20% -> 50%: Creative entrance with spring scale + unblur
        .to(wrapper3Ref.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: 'blur(0px)', 
          duration: 0.30, 
          ease: 'back.out(1.2)' 
        })
        
        // 50% -> 60%: Plateau
        .to(wrapper3Ref.current, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.10 })
        
        // 60% -> 90%: Fade out starts at 60% and ends at 90%
        .to(wrapper3Ref.current, { 
          opacity: 0, 
          y: -50, 
          scale: 0.94, 
          filter: 'blur(8px)', 
          duration: 0.30, 
          ease: 'power2.in' 
        })
        
        // 90% -> 100%: Hold hidden
        .to(wrapper3Ref.current, { opacity: 0, y: -50, scale: 0.94, filter: 'blur(8px)', duration: 0.10 });

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
            stagger: 0.08,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: section3Ref.current,
              start: 'top 70%',
              end: 'top 35%',
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
