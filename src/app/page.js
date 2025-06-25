'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import * as gtag from '../lib/gtag';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PortfolioDashboard from './components/PortfolioDashboard';
import Preloader from './components/Preloader';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gtag.pageview(pathname);
    }
  }, [pathname]);

  return (
    <>
      <Navbar />
      <PortfolioDashboard />
      <Preloader />
      <Footer />
    </>
  );
}
