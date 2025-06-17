'use client';
import React from 'react';

const Footer = () => {
  return (
    <>
      <style jsx>{`
        .portfolio-footer {
          background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
          border-top: 1px solid #e5e7eb;
          box-shadow: 0 -4px 20px rgba(220, 38, 38, 0.08);
          padding: 3rem 2rem;
          position: relative;
          overflow: hidden;
          animation: slideInBottom 0.8s cubic-bezier(0.33, 0, 0, 1) forwards;
          will-change: transform, opacity;
        }

        .portfolio-footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .portfolio-footer-top {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          opacity: 0;
          animation: fadeIn 1s cubic-bezier(0.33, 0, 0, 1) forwards;
          animation-delay: 0.2s;
        }

        .portfolio-footer-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .portfolio-footer-title {
          color: #374151;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
          letter-spacing: -0.025em;
        }

        .portfolio-footer-nav {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .portfolio-footer-nav-item {
          margin: 0;
        }

        .portfolio-footer-nav-link {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          display: inline-block;
        }

        .portfolio-footer-nav-link::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .portfolio-footer-nav-link:hover {
          color: #dc2626;
          transform: translateY(-2px);
        }

        .portfolio-footer-nav-link:hover::before {
          width: 100%;
        }

        .portfolio-footer-social {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .portfolio-footer-social-title {
          color: #374151;
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 0.5rem;
          letter-spacing: -0.025em;
        }

        .portfolio-footer-social-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          gap: 1rem;
        }

        .portfolio-footer-social-item {
          margin: 0;
        }

        .portfolio-footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%);
          border-radius: 8px;
          color: #dc2626;
          font-size: 1.2rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .portfolio-footer-social-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          transform: scale(0);
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 8px;
        }

        .portfolio-footer-social-link:hover {
          color: white;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.25);
        }

        .portfolio-footer-social-link:hover::before {
          transform: scale(1);
        }

        .portfolio-footer-social-link span {
          position: relative;
          z-index: 1;
        }

        .portfolio-footer-bottom {
          border-top: 1px solid #f3f4f6;
          padding-top: 1.5rem;
          text-align: center;
          opacity: 0;
          animation: fadeIn 1s cubic-bezier(0.33, 0, 0, 1) forwards;
          animation-delay: 0.4s;
        }

        .portfolio-footer-copyright {
          color: #6b7280;
          font-size: 0.85rem;
          margin: 0;
          line-height: 1.5;
        }

        .portfolio-footer-highlight {
          color: #dc2626;
          font-weight: 600;
        }

        @keyframes slideInBottom {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (min-width: 768px) {
          .portfolio-footer-container {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
          }

          .portfolio-footer-top {
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
          }

          .portfolio-footer-links {
            flex: 1;
          }

          .portfolio-footer-social {
            flex: 1;
            align-items: flex-end;
          }

          .portfolio-footer-social-list {
            justify-content: flex-end;
          }
        }

        @media (max-width: 767px) {
          .portfolio-footer {
            padding: 2rem 1.5rem;
          }

          .portfolio-footer-nav-link {
            font-size: 0.9rem;
            padding: 0.5rem 0.75rem;
          }

          .portfolio-footer-social-link {
            width: 36px;
            height: 36px;
            font-size: 1.1rem;
          }

          .portfolio-footer-copyright {
            font-size: 0.8rem;
          }
        }
      `}</style>

      <footer className="portfolio-footer">
        <div className="portfolio-footer-container">
          <div className="portfolio-footer-top">
            <div className="portfolio-footer-links">
              <h3 className="portfolio-footer-title">Navigation</h3>
              <ul className="portfolio-footer-nav">
                {['Home', 'About', 'Projects', 'Skills', 'Resume', 'Contact'].map((item) => (
                  <li key={item} className="portfolio-footer-nav-item">
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="portfolio-footer-nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(`Navigate to ${item}`);
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="portfolio-footer-social">
              <h3 className="portfolio-footer-social-title">Connect</h3>
              <ul className="portfolio-footer-social-list">
                <li className="portfolio-footer-social-item">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-footer-social-link"
                    aria-label="GitHub"
                  >
                    <span>🐙</span>
                  </a>
                </li>
                <li className="portfolio-footer-social-item">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-footer-social-link"
                    aria-label="LinkedIn"
                  >
                    <span>💼</span>
                  </a>
                </li>
                <li className="portfolio-footer-social-item">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-footer-social-link"
                    aria-label="Twitter"
                  >
                    <span>🐦</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="portfolio-footer-bottom">
            <p className="portfolio-footer-copyright">
              © {new Date().getFullYear()} Shashidhara K. Built with{' '}
              <span className="portfolio-footer-highlight">passion</span> & modern technologies.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;