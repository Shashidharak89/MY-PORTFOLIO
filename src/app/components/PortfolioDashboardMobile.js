'use client';

import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import MobileStatsSection from './MobileStatsSection';
import MobileProjectsSection from './MobileProjectsSection';
import MobileAchievementsSection from './MobileAchievementsSection';
import MobileToolkitSection from './MobileToolkitSection';
import MobileBeyondTheCodeSection from './MobileBeyondTheCodeSection';
import MobileBlogsNavSection from './MobileBlogsNavSection';
import MobileFinalCtaSection from './MobileFinalCtaSection';
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
        <MobileAchievementsSection />
        <MobileToolkitSection />
        <MobileBeyondTheCodeSection />
        <MobileBlogsNavSection />
        <MobileFinalCtaSection />
      </div>
    </div>
  );
}
