'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '../lib/gtag';

import Navbar from './components/Navbar';
import PortfolioDashboard from './components/PortfolioDashboard';
import Preloader from './components/Preloader';
import FooterC from './components/FooterC';
import SmoothScroll from './components/SmoothScroll';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gtag.pageview(pathname);
    }
  }, [pathname]);

  return (
    <SmoothScroll>
      <Navbar />
      <PortfolioDashboard />
      <Preloader />
      <FooterC />
    </SmoothScroll>
  );
}
