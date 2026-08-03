'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHouse, 
  FaUser, 
  FaRocket, 
  FaBolt, 
  FaFileLines, 
  FaPenToSquare, 
  FaGlobe, 
  FaFlask, 
  FaTrophy, 
  FaEnvelope,
  FaHeart
} from 'react-icons/fa6';
import './styles/Navbar.css';

const Sidebar = React.memo(({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState('home');

  const navigationItems = useMemo(() => [
    { id: 'home', label: 'Home', icon: <FaHouse />, route: '/' },
    { id: 'about', label: 'About', icon: <FaUser />, route: '/about' },
    { id: 'projects', label: 'Projects', icon: <FaRocket />, route: '/projects' },
    { id: 'skills', label: 'Skills', icon: <FaBolt />, route: '/skills' },
    { id: 'resume', label: 'Resume', icon: <FaFileLines />, route: '/resume' },
    { id: 'blogs', label: 'Blogs', icon: <FaPenToSquare />, route: '/blogs' },
    { id: 'handles', label: 'Handles', icon: <FaGlobe />, route: '/handles' },
    { id: 'featurelab', label: 'Feature Lab', icon: <FaFlask />, route: '/featurelab' },
    { id: 'achievements', label: 'Achievements', icon: <FaTrophy />, route: '/achievements' },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope />, route: '/contact' }
  ], []);

  const routeToIdMap = useMemo(() => ({
    '/': 'home',
    '/about': 'about',
    '/projects': 'projects',
    '/skills': 'skills',
    '/resume': 'resume',
    '/blogs': 'blogs',
    '/handles': 'handles',
    '/featurelab': 'featurelab',
    '/achievements': 'achievements',
    '/contact': 'contact'
  }), []);

  // Set active item based on current pathname
  useEffect(() => {
    const newActiveItem = routeToIdMap[pathname] || 'home';
    if (newActiveItem !== activeItem) {
      setActiveItem(newActiveItem);
    }
  }, [pathname, routeToIdMap, activeItem]);

  const handleNavClick = useCallback((itemId) => {
    setActiveItem(itemId);
    toggleSidebar();
  }, [toggleSidebar]);

  return (
    <>
      <div
        className={`portfolio-sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={toggleSidebar}
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
        data-lenis-prevent
      />

      <div 
        className={`portfolio-sidebar-container ${isOpen ? 'active' : ''}`}
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div className="portfolio-sidebar-header">
          <div className="portfolio-sidebar-brand">
            <h1 className="portfolio-brand-title">Portfolio</h1>
            <p className="portfolio-brand-subtitle">Full Stack Developer</p>
          </div>
          <button
            className="portfolio-sidebar-close"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="portfolio-sidebar-nav" data-lenis-prevent>
          <ul className="portfolio-nav-list">
            {navigationItems.map((item, index) => (
              <li 
                key={item.id} 
                className="portfolio-nav-item" 
                style={{ '--animation-delay': `${(index + 1) * 0.1}s` }}
              >
                <Link
                  href={item.route}
                  className={`portfolio-nav-link ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="portfolio-nav-icon">{item.icon}</span>
                  <span className="portfolio-nav-text">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="portfolio-sidebar-footer">
          <p className="portfolio-footer-text">
            Built with <span className="portfolio-footer-highlight">passion <FaHeart style={{ color: '#dc2626', display: 'inline', fontSize: '0.8rem', marginLeft: '3px' }} /></span><br />
            & modern technologies
          </p>
        </div>
      </div>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at top of page
      if (currentScrollY <= 10) {
        setIsVisible(true);
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
        // Scroll DOWN -> Hide navbar smoothly
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setIsVisible(false);
        }
        // Scroll UP -> Show navbar smoothly
        else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on escape key and control scroll locking
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`modern-portfolio-navbar ${isScrolled ? 'scrolled' : ''} ${!isVisible && !isOpen ? 'nav-hidden' : ''}`}>
        <div className="modern-navbar-container">
          <Link
            href="/"
            className="modern-navbar-brand"
          >
            <div className="modern-brand-logo">
              S
            </div>
            <div className="modern-brand-text">
              <h1 className="modern-brand-title">Portfolio</h1>
              <span className="modern-brand-subtitle">Shashidhara K</span>
            </div>
          </Link>

          <div className="modern-navbar-actions">
            <Link
              href="/contact"
              className="modern-navbar-cta"
            >
              Lets Connect
            </Link>

            <button
              className={`modern-hamburger-menu ${isOpen ? 'active' : ''}`}
              onClick={toggleSidebar}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <div className="modern-hamburger-line"></div>
              <div className="modern-hamburger-line"></div>
              <div className="modern-hamburger-line"></div>
            </button>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isOpen} toggleSidebar={closeSidebar} />
    </>
  );
};

export default Navbar;