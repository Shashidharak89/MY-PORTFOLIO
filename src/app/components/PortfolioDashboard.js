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
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 600;
    }
    return false;
  });

  useEffect(() => {
    setIsVisible(true);
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    const updateMatch = (e) => setIsMobile(e.matches);
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateMatch);
    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, []);

  return (
    <div className="portfolio-dashboard-container">
      <div className={`portfolio-dashboard-main ${isVisible ? 'portfolio-dashboard-visible' : 'portfolio-dashboard-hidden'}`}>
        <HeroSection />
        {isMobile ? <MobileStatsSection /> : <StatsSection />}
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
