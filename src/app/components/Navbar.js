'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './styles/navbar.module.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState('home');

  // Set active item based on current pathname
  useEffect(() => {
    const routeToId = {
      '/': 'home',
      '/about': 'about',
      '/projects': 'projects',
      '/skills': 'skills',
      '/resume': 'resume',
      '/contact': 'contact'
    };
    setActiveItem(routeToId[pathname] || 'home');
  }, [pathname]);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: '🏠', route: '/' },
    { id: 'about', label: 'About', icon: '👤', route: '/about' },
    { id: 'projects', label: 'Projects', icon: '💼', route: '/projects' },
    { id: 'skills', label: 'Skills', icon: '⚡', route: '/skills' },
    { id: 'resume', label: 'Resume', icon: '📄', route: '/resume' },
    { id: 'contact', label: 'Contact', icon: '📧', route: '/contact' }
  ];

  return (
    <>
      <div 
        className={`${styles.portfolioSidebarOverlay} ${isOpen ? styles.active : ''}`} 
        onClick={toggleSidebar}
      />
      
      <div className={`${styles.portfolioSidebarContainer} ${isOpen ? styles.active : ''}`}>
        <div className={styles.portfolioSidebarHeader}>
          <div className={styles.portfolioSidebarBrand}>
            <h1 className={styles.portfolioBrandTitle}>Portfolio</h1>
            <p className={styles.portfolioBrandSubtitle}>Full Stack Developer</p>
          </div>
          <button 
            className={styles.portfolioSidebarClose}
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <nav className={styles.portfolioSidebarNav}>
          <ul className={styles.portfolioNavList}>
            {navigationItems.map((item) => (
              <li key={item.id} className={styles.portfolioNavItem}>
                <Link
                  href={item.route}
                  className={`${styles.portfolioNavLink} ${activeItem === item.id ? styles.active : ''}`}
                  onClick={() => {
                    setActiveItem(item.id);
                    toggleSidebar();
                    console.log(`Navigate to ${item.label}`);
                  }}
                >
                  <span className={styles.portfolioNavIcon}>{item.icon}</span>
                  <span className={styles.portfolioNavText}>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.portfolioSidebarFooter}>
          <p className={styles.portfolioFooterText}>
            Built with <span className={styles.portfolioFooterHighlight}>passion</span><br />
            & modern technologies
          </p>
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.modernPortfolioNavbar} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.modernNavbarContainer}>
          <Link 
            href="/"
            className={styles.modernNavbarBrand}
            onClick={() => console.log('Navigate to Home')}
          >
            <div className={styles.modernBrandLogo}>
              S
            </div>
            <div className={styles.modernBrandText}>
              <h1 className={styles.modernBrandTitle}>Portfolio</h1>
              <span className={styles.modernBrandSubtitle}>Shashidhara K</span>
            </div>
          </Link>

          <div className={styles.modernNavbarActions}>
            <Link
              href="/contact"
              className={styles.modernNavbarCta}
              onClick={() => console.log('Navigate to Contact')}
            >
              {"Let's Connect"}
            </Link>
            
            <button 
              className={`${styles.modernHamburgerMenu} ${isOpen ? styles.active : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              <div className={styles.modernHamburgerLine}></div>
              <div className={styles.modernHamburgerLine}></div>
              <div className={styles.modernHamburgerLine}></div>
            </button>
          </div>
        </div>
      </nav>

      {isOpen && <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(false)} />}
    </>
  );
};

export default Navbar;