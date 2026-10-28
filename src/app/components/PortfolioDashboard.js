'use client';

import { useState, useEffect } from 'react';
import PortfolioDashboardDesktop from './PortfolioDashboardDesktop';
import PortfolioDashboardMobile from './PortfolioDashboardMobile';

export default function PortfolioDashboard() {
  // Device mode decided once on initial page load
  const [isMobileDevice, setIsMobileDevice] = useState(null);

  useEffect(() => {
    // Check viewport width once when the home screen is being loaded
    const isMobile = window.innerWidth <= 600;
    setIsMobileDevice(isMobile);
  }, []);

  // While deciding on initial load (covered by Preloader), render clean container matching SSR
  if (isMobileDevice === null) {
    return (
      <div
        className="portfolio-dashboard-container"
        style={{ minHeight: '100vh', background: '#fafafa' }}
      />
    );
  }

  // Load purely desktop OR purely mobile - no duplicate DOM trees or conflicting scroll drivers
  return isMobileDevice ? (
    <PortfolioDashboardMobile />
  ) : (
    <PortfolioDashboardDesktop />
  );
}
