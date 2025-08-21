'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './styles/Navbar.css';

const Sidebar = React.memo(({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState('home');

  const navigationItems = useMemo(() => [
    { id: 'home', label: 'Home', icon: '🏡', route: '/' },
    { id: 'about', label: 'About', icon: '👨‍💼', route: '/about' },
    { id: 'projects', label: 'Projects', icon: '🚀', route: '/projects' },
    { id: 'skills', label: 'Skills', icon: '⚡', route: '/skills' },
    { id: 'resume', label: 'Resume', icon: '📋', route: '/resume' },
    { id: 'blogs', label: 'Blogs', icon: '📝', route: '/blogs' },
    { id: 'handles', label: 'Handles', icon: '🌐', route: '/handles' },
    { id: 'featurelab', label: 'Feature Lab', icon: '🧪', route: '/featurelab' },
    { id: 'achievements', label: 'Achievements', icon: '🏆', route: '/achievements' },
    { id: 'contact', label: 'Contact', icon: '📬', route: '/contact' }
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
      />

      <div className={`portfolio-sidebar-container ${isOpen ? 'active' : ''}`}>
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

        <nav className="portfolio-sidebar-nav">
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
            Built with <span className="portfolio-footer-highlight">passion</span><br />
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

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`modern-portfolio-navbar ${isScrolled ? 'scrolled' : ''}`}>
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

      {isOpen && <Sidebar isOpen={isOpen} toggleSidebar={closeSidebar} />}
    </>
  );
};

export default Navbar;