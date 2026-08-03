'use client';

import { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import FeaturedProjectsSection from './FeaturedProjectsSection';
import ToolkitSection from './ToolkitSection';
import BlogsNavSection from './BlogsNavSection';
import './styles/portfolio-dashboard.css';

const PortfolioDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="portfolio-dashboard-container">
      <div className={`portfolio-dashboard-main ${isVisible ? 'portfolio-dashboard-visible' : 'portfolio-dashboard-hidden'}`}>
        <HeroSection />
        <StatsSection />
        <FeaturedProjectsSection />
        <ToolkitSection />
        <BlogsNavSection />
      </div>
    </div>
  );
};

export default PortfolioDashboard;
