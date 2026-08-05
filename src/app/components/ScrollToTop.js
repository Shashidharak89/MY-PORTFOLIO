'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';
import './styles/ScrollToTop.css';

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (scrollHeight > 0) {
        const progress = Math.min(1, Math.max(0, scrollTop / scrollHeight));
        setScrollProgress(progress);

        // Show after 10% scroll threshold (0.10)
        if (progress > 0.1) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.scrollTo(0, {
        duration: 2.4,
        easing: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <button
      type="button"
      className={`scroll-to-top-btn ${isVisible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg className="scroll-progress-ring" width="48" height="48" viewBox="0 0 48 48">
        <circle
          className="scroll-progress-bg"
          cx="24"
          cy="24"
          r={radius}
        />
        <circle
          className="scroll-progress-indicator"
          cx="24"
          cy="24"
          r={radius}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <FaArrowUp className="scroll-to-top-icon" />
    </button>
  );
}
