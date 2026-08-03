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
  const orbBlogsRef = useRef(null);

  useScrollVelocity(section3Ref, { maxSkew: 0.8, maxOffset: 10 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Precision Section 3 Scroll Timeline:
      // 0% -> 20%: hidden
      // 20% -> 50%: Fade In (opacity 0 -> 1, y 50px -> 0px, blur 6px -> 0px)
      // 50% -> 75%: Plateau (opacity 1)
      // 75% -> 95%: Fade Out (opacity 1 -> 0, y 0px -> -40px, blur 0px -> 6px)
      // 95% -> 100%: hidden
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
        .set(wrapper3Ref.current, { opacity: 0, y: 55, filter: 'blur(6px)' })
        .to(wrapper3Ref.current, { opacity: 0, y: 55, filter: 'blur(6px)', duration: 0.20 })
        .to(wrapper3Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.30, ease: 'power2.out' })
        .to(wrapper3Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.25 })
        .to(wrapper3Ref.current, { opacity: 0, y: -45, filter: 'blur(6px)', duration: 0.20, ease: 'power2.in' })
        .to(wrapper3Ref.current, { opacity: 0, y: -45, filter: 'blur(6px)', duration: 0.05 });

      // Floating Orb Motion
      gsap.to(orbBlogsRef.current, {
        y: -100,
        x: -50,
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
          <div className="visual-icons-row">
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
