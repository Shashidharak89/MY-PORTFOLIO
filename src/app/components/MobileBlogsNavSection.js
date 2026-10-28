'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaBookOpenReader, FaLaptopCode, FaCompass, FaBrain, FaArrowRight, FaFeatherPointed } from 'react-icons/fa6';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/MobileBlogsNavSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MobileBlogsNavSection() {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const cardRef = useRef(null);
  const topicsRef = useRef(null);

  const blogTopics = [
    {
      id: 'web-tech',
      title: 'Full Stack & Web Dev',
      desc: 'Tutorials & modern architecture patterns',
      icon: <FaLaptopCode />,
      color: '#dc2626',
      tag: 'Tech'
    },
    {
      id: 'stories',
      title: 'Life & Travel Stories',
      desc: 'Personal experiences & life journey',
      icon: <FaCompass />,
      color: '#2563eb',
      tag: 'Stories'
    },
    {
      id: 'dsa',
      title: 'DSA & Algorithmic Insights',
      desc: 'Problem solving approaches & tips',
      icon: <FaBrain />,
      color: '#7c3aed',
      tag: 'Algorithms'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    mm.add('(max-width: 600px)', () => {
      // Ambient floating orb
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: -20,
          x: 20,
          scale: 1.15,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Card entrance
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 88%',
              once: true
            }
          }
        );
      }

      // Topic items staggered
      const items = topicsRef.current ? Array.from(topicsRef.current.children) : [];
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: topicsRef.current,
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
      className="mobile-blogs-section"
      aria-label="Read My Blogs"
    >
      <div ref={orbRef} className="mobile-blogs-orb" aria-hidden="true" />

      <div className="mobile-blogs-wrapper">
        <div ref={cardRef} className="mobile-blogs-card">
          <div className="mobile-blogs-card-glow" />

          {/* Header */}
          <div className="mobile-blogs-header">
            <div className="mobile-blogs-pill">
              <FaFeatherPointed />
              <span>Articles &amp; Stories</span>
            </div>

            <div className="mobile-blogs-main-icon">
              <FaBookOpenReader />
            </div>

            <h2 className="mobile-blogs-title">Read My Blogs</h2>
            <p className="mobile-blogs-description">
              Explore tech tutorials, daily life activities, personal experiences, travel stories, and engineering insights.
            </p>
          </div>

          {/* Topic Cards List */}
          <div ref={topicsRef} className="mobile-blogs-topics">
            {blogTopics.map((topic) => (
              <div key={topic.id} className="mobile-blog-topic-item">
                <div
                  className="mobile-topic-icon-box"
                  style={{ color: topic.color, background: `${topic.color}14` }}
                >
                  {topic.icon}
                </div>
                <div className="mobile-topic-info">
                  <div className="mobile-topic-header-row">
                    <h3 className="mobile-topic-title">{topic.title}</h3>
                    <span
                      className="mobile-topic-tag"
                      style={{ color: topic.color, borderColor: `${topic.color}30` }}
                    >
                      {topic.tag}
                    </span>
                  </div>
                  <p className="mobile-topic-desc">{topic.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/blogs" className="mobile-blogs-cta">
            <span>Explore All Blogs</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
