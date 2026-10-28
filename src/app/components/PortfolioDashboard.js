'use client';

import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import MobileStatsSection from './MobileStatsSection';
import FeaturedProjectsSection from './FeaturedProjectsSection';
import AchievementsNavSection from './AchievementsNavSection';
import ToolkitSection from './ToolkitSection';
import BeyondTheCodeSection from './BeyondTheCodeSection';
import BlogsNavSection from './BlogsNavSection';
import FinalCtaSection from './FinalCtaSection';
import './styles/portfolio-dashboard.css';

const PortfolioDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setIsMounted(true);

    const mediaQuery = window.matchMedia('(max-width: 600px)');
    const updateMatch = (e) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateMatch);
    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, []);

  // When switching between mobile and desktop dynamically, refresh ScrollTrigger
  useEffect(() => {
    if (isMounted) {
      const timer = setTimeout(() => {
        import('gsap/ScrollTrigger')
          .then(({ ScrollTrigger }) => {
            ScrollTrigger.refresh();
          })
          .catch(() => {});
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isMounted]);

  return (
    <div className="portfolio-dashboard-container">
      <div className={`portfolio-dashboard-main ${isVisible ? 'portfolio-dashboard-visible' : 'portfolio-dashboard-hidden'}`}>
        <HeroSection />
        {isMounted && isMobile ? <MobileStatsSection /> : <StatsSection />}
        <FeaturedProjectsSection />
        <AchievementsNavSection />
        <ToolkitSection />
        <BeyondTheCodeSection />
        <BlogsNavSection />
        <FinalCtaSection />
      </div>
    </div>
  );
};

export default PortfolioDashboard;
