'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import * as gtag from '../lib/gtag';

import Navbar from './components/Navbar';
import PortfolioDashboard from './components/PortfolioDashboard';
import Preloader from './components/Preloader';
import FooterC from './components/FooterC';
import ChatWidget from './components/ChatWidget';

export default function Home() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gtag.pageview(pathname);
    }
  }, [pathname]);

  return (
    <>
      {/* Google AdSense Script */}
      <Script
        id="adsense-script"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4934238485595915"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Your Components */}
      <Navbar />
      <PortfolioDashboard />
      <Preloader />
      <ChatWidget />
      <FooterC />

    
    </>
  );
}
