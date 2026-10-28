'use client';

import { useState, useEffect } from 'react';
import PortfolioDashboardDesktop from './PortfolioDashboardDesktop';
import PortfolioDashboardMobile from './PortfolioDashboardMobile';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PortfolioDashboard() {
  const [isMobileDevice, setIsMobileDevice] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');

    // Set initial device mode on mount
    setIsMobileDevice(mediaQuery.matches);

    // Adapt immediately when user resizes or switches screen width
    const handleChange = (e) => {
      setIsMobileDevice(e.matches);
      // Allow the DOM to mount fresh before refreshing ScrollTrigger
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 100);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
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

  // Keyed mount ensures full clean unmount/mount without any DOM reconciliation collision
  return isMobileDevice ? (
    <PortfolioDashboardMobile key="mobile-dashboard" />
  ) : (
    <PortfolioDashboardDesktop key="desktop-dashboard" />
  );
}
