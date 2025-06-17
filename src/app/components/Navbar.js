'use client';
import React, { useState, useEffect } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState('home');

  const navigationItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'resume', label: 'Resume', icon: '📄' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  return (
    <>
      <style jsx>{`
        .portfolio-sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          z-index: 998;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), visibility 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .portfolio-sidebar-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .portfolio-sidebar-container {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 320px;
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
          border-right: 1px solid #e5e7eb;
          box-shadow: 0 10px 40px rgba(220, 38, 38, 0.12);
          z-index: 999;
          transform: translateX(-100%) scale(0.95);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), scale 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
        }

        .portfolio-sidebar-container.active {
          transform: translateX(0) scale(1);
          opacity: 1;
        }

        .portfolio-sidebar-header {
          padding: 2rem 1.5rem 1.5rem;
          border-bottom: 1px solid #f3f4f6;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          position: relative;
          overflow: hidden;
          animation: slideInTop 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .portfolio-sidebar-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%);
          opacity: 0.6;
        }

        .portfolio-sidebar-brand {
          position: relative;
          z-index: 1;
        }

        .portfolio-brand-title {
          color: white;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          letter-spacing: -0.025em;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .portfolio-brand-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
          font-weight: 400;
          margin: 0;
          opacity: 0.95;
        }

        .portfolio-sidebar-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          z-index: 2;
          font-weight: 300;
        }

        .portfolio-sidebar-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          animation: pulse 1.2s infinite;
        }

        .portfolio-sidebar-nav {
          padding: 2rem 0;
          flex: 1;
          overflow-y: auto;
        }

        .portfolio-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .portfolio-nav-item {
          margin: 0.5rem 0;
          opacity: 0;
          transform: translateX(-20px) translateY(10px);
          animation: staggerIn 0.5s ease-in-out forwards;
          animation-delay: calc(var(--delay) * 0.08s);
        }

        .portfolio-nav-item:nth-child(1) { --delay: 1; }
        .portfolio-nav-item:nth-child(2) { --delay: 2; }
        .portfolio-nav-item:nth-child(3) { --delay: 3; }
        .portfolio-nav-item:nth-child(4) { --delay: 4; }
        .portfolio-nav-item:nth-child(5) { --delay: 5; }
        .portfolio-nav-item:nth-child(6) { --delay: 6; }

        .portfolio-nav-link {
          display: flex;
          align-items: center;
          padding: 1rem 1.5rem;
          color: #374151;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 0;
          position: relative;
          overflow: hidden;
        }

        .portfolio-nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          transform: scaleY(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .portfolio-nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.08) 0%, rgba(185, 28, 28, 0.08) 100%);
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .portfolio-nav-link:hover::before,
        .portfolio-nav-link.active::before {
          transform: scaleY(1);
        }

        .portfolio-nav-link:hover::after,
        .portfolio-nav-link.active::after {
          transform: translateX(0);
        }

        .portfolio-nav-link:hover {
          color: #dc2626;
          padding-left: 2rem;
        }

        .portfolio-nav-link.active {
          color: #dc2626;
          font-weight: 600;
          padding-left: 2rem;
        }

        .portfolio-nav-icon {
          font-size: 1.2rem;
          margin-right: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 1;
        }

        .portfolio-nav-link:hover .portfolio-nav-icon,
        .portfolio-nav-link.active .portfolio-nav-icon {
          transform: scale(1.15) rotate(5deg);
        }

        .portfolio-nav-text {
          position: relative;
          z-index: 1;
        }

        .portfolio-sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid #f3f4f6;
          background: linear-gradient(135deg, #fafafa 0%, #f9fafb 100%);
          animation: slideInBottom 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .portfolio-footer-text {
          font-size: 0.8rem;
          color: #6b7280;
          text-align: center;
          margin: 0;
          line-height: 1.5;
        }

        .portfolio-footer-highlight {
          color: #dc2626;
          font-weight: 600;
        }

        .portfolio-sidebar-nav::-webkit-scrollbar {
          width: 4px;
        }

        .portfolio-sidebar-nav::-webkit-scrollbar-track {
          background: transparent;
        }

        .portfolio-sidebar-nav::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.3);
          border-radius: 2px;
        }

        .portfolio-sidebar-nav::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.5);
        }

        @keyframes slideInTop {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slideInBottom {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes staggerIn {
          from { transform: translateX(-20px) translateY(10px); opacity: 0; }
          to { transform: translateX(0) translateY(0); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1.1) rotate(90deg); }
          50% { transform: scale(1.15) rotate(90deg); }
        }
      `}</style>

      <div className={`portfolio-sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      
      <div className={`portfolio-sidebar-container ${isOpen ? 'active' : ''}`}>
        <div className="portfolio-sidebar-header">
          <div className="portfolio-sidebar-brand">
            <h1 className="portfolio-brand-title">Portfolio</h1>
            <p className="portfolio-brand-subtitle">Professional Developer</p>
          </div>
          <button 
            className="portfolio-sidebar-close" 
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <nav className="portfolio-sidebar-nav">
          <ul className="portfolio-nav-list">
            {navigationItems.map((item) => (
              <li key={item.id} className="portfolio-nav-item">
                <a
                  href={`#${item.id}`}
                  className={`portfolio-nav-link ${activeItem === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem(item.id);
                    toggleSidebar();
                    console.log(`Navigate to ${item.label}`);
                  }}
                >
                  <span className="portfolio-nav-icon">{item.icon}</span>
                  <span className="portfolio-nav-text">{item.label}</span>
                </a>
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
      <style jsx>{`
        .modern-portfolio-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 900;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid transparent;
        }

        .modern-portfolio-navbar.scrolled {
          background: rgba(255, 255, 255, 0.98);
          border-bottom: 1px solid rgba(220, 38, 38, 0.1);
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.08);
        }

        .modern-navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          position: relative;
        }

        .modern-navbar-brand {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modern-navbar-brand:hover {
          transform: translateY(-2px);
        }

        .modern-brand-logo {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.75rem;
          font-size: 1.2rem;
          color: white;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .modern-brand-logo::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modern-navbar-brand:hover .modern-brand-logo {
          transform: rotate(5deg) scale(1.05);
          box-shadow: 0 6px 20px rgba(220, 38, 38, 0.35);
        }

        .modern-navbar-brand:hover .modern-brand-logo::before {
          transform: translateX(100%);
        }

        .modern-brand-text {
          display: flex;
          flex-direction: column;
        }

        .modern-brand-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #374151;
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.025em;
          transition: color 0.3s ease;
        }

        .modern-navbar-brand:hover .modern-brand-title {
          color: #dc2626;
        }

        .modern-brand-subtitle {
          font-size: 0.75rem;
          color: #6b7280;
          margin: 0;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.3s ease;
        }

        .modern-navbar-brand:hover .modern-brand-subtitle {
          color: #b91c1c;
        }

        .modern-navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .modern-navbar-cta {
          display: none;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
          position: relative;
          overflow: hidden;
        }

        .modern-navbar-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modern-navbar-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.35);
        }

        .modern-navbar-cta:hover::before {
          transform: translateX(100%);
        }

        .modern-hamburger-menu {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%);
          border: 1px solid rgba(220, 38, 38, 0.2);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          transform: scale(1);
        }

        .modern-hamburger-menu::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.05) 0%, rgba(185, 28, 28, 0.05) 100%);
          transform: scale(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 10px;
        }

        .modern-hamburger-menu:hover {
          transform: scale(1.05);
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(185, 28, 28, 0.15) 100%);
          border-color: rgba(220, 38, 38, 0.3);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
        }

        .modern-hamburger-menu:hover::before {
          transform: scale(1);
        }

        .modern-hamburger-menu.active {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          border-color: #dc2626;
          transform: scale(0.95) rotate(180deg);
          transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .modern-hamburger-line {
          width: 20px;
          height: 2px;
          background: #dc2626;
          margin: 2px 0;
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          border-radius: 1px;
          position: relative;
          z-index: 1;
        }

        .modern-hamburger-menu.active .modern-hamburger-line {
          background: white;
        }

        .modern-hamburger-menu.active .modern-hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .modern-hamburger-menu.active .modern-hamburger-line:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
        }

        .modern-hamburger-menu.active .modern-hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        @media (min-width: 768px) {
          .modern-navbar-container {
            padding: 0 3rem;
          }

          .modern-navbar-cta {
            display: block;
          }

          .modern-brand-title {
            font-size: 1.6rem;
          }
        }

        @media (min-width: 1024px) {
          .modern-navbar-container {
            padding: 0 2rem;
          }
        }

        @media (max-width: 767px) {
          .modern-navbar-container {
            padding: 0 1.5rem;
            height: 70px;
          }

          .modern-brand-logo {
            width: 36px;
            height: 36px;
            margin-right: 0.5rem;
          }

          .modern-brand-title {
            font-size: 1.3rem;
          }

          .modern-brand-subtitle {
            font-size: 0.7rem;
          }

          .modern-hamburger-menu {
            width: 40px;
            height: 40px;
          }

          .modern-hamburger-line {
            width: 18px;
          }
        }
      `}</style>

      <nav className={`modern-portfolio-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="modern-navbar-container">
          <a href="#home" className="modern-navbar-brand">
            <div className="modern-brand-logo">
              S
            </div>
            <div className="modern-brand-text">
              <h1 className="modern-brand-title">Portfolio</h1>
              <span className="modern-brand-subtitle">Shashidhara K</span>
            </div>
          </a>

          <div className="modern-navbar-actions">
            <a href="#contact" className="modern-navbar-cta">
              {"Let's Connect"}
            </a>
            
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