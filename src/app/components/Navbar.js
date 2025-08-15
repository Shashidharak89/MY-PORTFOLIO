'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './styles/Navbar.css';

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
      '/blogs': 'blogs',
      '/handles': 'handles',
      '/featurelab': 'featurelab',
      '/achievements': 'achievements',
      '/contact': 'contact'
    };
    setActiveItem(routeToId[pathname] || 'home');
  }, [pathname]);

  const navigationItems = [
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
  ];

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
              <li key={item.id} className="portfolio-nav-item" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                <Link
                  href={item.route}
                  className={`portfolio-nav-link ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveItem(item.id);
                    toggleSidebar();
                    console.log(`Navigate to ${item.label}`);
                  }}
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
      <nav className={`modern-portfolio-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="modern-navbar-container">
          <Link
            href="/"
            className="modern-navbar-brand"
            onClick={() => console.log('Navigate to Home')}
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
              onClick={() => console.log('Navigate to Contact')}
            >
              Lets Connect
            </Link>

            <button
              className={`modern-hamburger-menu ${isOpen ? 'active' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
            >
              <div className="modern-hamburger-line"></div>
              <div className="modern-hamburger-line"></div>
              <div className="modern-hamburger-line"></div>
            </button>
          </div>
        </div>
      </nav>

      {isOpen && <Sidebar isOpen={isOpen} toggleSidebar={() => setIsOpen(false)} />}
    </>
  );
};

export default Navbar;