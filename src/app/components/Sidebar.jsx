import React, { useState } from 'react';

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
        .portfolio-sidebar-container {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 280px;
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
          border-right: 1px solid #e5e7eb;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.08);
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(0);
        }

        .portfolio-sidebar-container.mobile-hidden {
          transform: translateX(-100%);
        }

        .portfolio-sidebar-header {
          padding: 2rem 1.5rem 1.5rem;
          border-bottom: 1px solid #f3f4f6;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          position: relative;
          overflow: hidden;
        }

        .portfolio-sidebar-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="white" opacity="0.1"/><circle cx="90" cy="90" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="30" r="1" fill="white" opacity="0.1"/><circle cx="20" cy="80" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') repeat;
          opacity: 0.3;
        }

        .portfolio-sidebar-brand {
          position: relative;
          z-index: 1;
        }

        .portfolio-brand-title {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          letter-spacing: -0.025em;
        }

        .portfolio-brand-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          font-weight: 400;
          margin: 0;
          opacity: 0.95;
        }

        .portfolio-sidebar-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
          z-index: 2;
        }

        .portfolio-sidebar-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        .portfolio-sidebar-nav {
          padding: 1.5rem 0;
          flex: 1;
          overflow-y: auto;
        }

        .portfolio-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .portfolio-nav-item {
          margin: 0.25rem 0;
        }

        .portfolio-nav-link {
          display: flex;
          align-items: center;
          padding: 0.875rem 1.5rem;
          color: #374151;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .portfolio-nav-link:hover::before,
        .portfolio-nav-link.active::before {
          transform: scaleY(1);
        }

        .portfolio-nav-link:hover {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.05) 0%, rgba(185, 28, 28, 0.05) 100%);
          color: #dc2626;
          padding-left: 2rem;
        }

        .portfolio-nav-link.active {
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%);
          color: #dc2626;
          font-weight: 600;
          padding-left: 2rem;
        }

        .portfolio-nav-icon {
          font-size: 1.1rem;
          margin-right: 0.75rem;
          transition: transform 0.2s ease;
        }

        .portfolio-nav-link:hover .portfolio-nav-icon,
        .portfolio-nav-link.active .portfolio-nav-icon {
          transform: scale(1.1);
        }

        .portfolio-sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid #f3f4f6;
          background: #fafafa;
        }

        .portfolio-footer-text {
          font-size: 0.75rem;
          color: #6b7280;
          text-align: center;
          margin: 0;
          line-height: 1.4;
        }

        .portfolio-footer-highlight {
          color: #dc2626;
          font-weight: 600;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .portfolio-sidebar-container {
            width: 100%;
            max-width: 320px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          }

          .portfolio-sidebar-close {
            display: flex;
          }
        }

        /* Large Screen Styles */
        @media (min-width: 769px) {
          .portfolio-sidebar-container {
            position: fixed;
            transform: translateX(0) !important;
          }
        }

        /* Smooth scrollbar */
        .portfolio-sidebar-nav::-webkit-scrollbar {
          width: 4px;
        }

        .portfolio-sidebar-nav::-webkit-scrollbar-track {
          background: transparent;
        }

        .portfolio-sidebar-nav::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.2);
          border-radius: 2px;
        }

        .portfolio-sidebar-nav::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.3);
        }

        /* Animation for mobile toggle */
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .portfolio-sidebar-container.animate-in {
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <div className={`portfolio-sidebar-container ${!isOpen ? 'mobile-hidden' : ''}`}>
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
                    // You can add navigation logic here
                    console.log(`Navigate to ${item.label}`);
                  }}
                >
                  <span className="portfolio-nav-icon">{item.icon}</span>
                  {item.label}
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

export default Sidebar;