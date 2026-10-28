'use client';

import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import MobileStatsSection from './MobileStatsSection';
import MobileProjectsSection from './MobileProjectsSection';
import AchievementsNavSection from './AchievementsNavSection';
import ToolkitSection from './ToolkitSection';
import BeyondTheCodeSection from './BeyondTheCodeSection';
import BlogsNavSection from './BlogsNavSection';
import FinalCtaSection from './FinalCtaSection';
import './styles/portfolio-dashboard.css';

export default function PortfolioDashboardMobile() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="portfolio-dashboard-container portfolio-dashboard-mobile">
      <div className={`portfolio-dashboard-main ${isVisible ? 'portfolio-dashboard-visible' : 'portfolio-dashboard-hidden'}`}>
        <HeroSection />
        <MobileStatsSection />
        <MobileProjectsSection />
        <AchievementsNavSection />
        <ToolkitSection />
        <BeyondTheCodeSection />
        <BlogsNavSection />
        <FinalCtaSection />
      </div>
    </div>
  );
}
