'use client';

import Link from 'next/link';
import {
  FaHandshake,
  FaBriefcase,
  FaRocket,
  FaMessage,
  FaDownload,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaCode,
  FaWandMagicSparkles,
  FaArrowRight
} from 'react-icons/fa6';
import './styles/FinalCtaSection.css';

const FinalCtaSection = () => {
  const quickConnectLinks = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/shashidhara-k-a2374b31b/',
      label: 'LinkedIn',
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/Shashidharak89',
      label: 'GitHub',
    },
    {
      name: 'Email',
      icon: <FaEnvelope />,
      url: 'mailto:shashidharak334@gmail.com',
      label: 'Email',
    },
    {
      name: 'Call',
      icon: <FaPhone />,
      url: 'tel:+917760770725',
      label: 'Call',
    },
  ];

  return (
    <section className="final-cta-section">
      {/* Background Decorative Tech Accents & Connection Lines */}
      <div className="cta-bg-graphics">
        <div className="cta-grid-pattern"></div>
        <div className="cta-glow-orb"></div>
        
        {/* Floating tech badges */}
        <div className="cta-floating-badge float-top-left">
          <FaCode /> &lt;/&gt;
        </div>
        <div className="cta-floating-badge float-top-right">
          &#123; &#125;
        </div>
        <div className="cta-floating-badge float-bottom-left">
          <FaRocket />
        </div>
        <div className="cta-floating-badge float-bottom-right">
          <FaWandMagicSparkles />
        </div>

        {/* Decorative Connection Line SVG */}
        <svg className="cta-connection-svg" viewBox="0 0 1200 400" fill="none" preserveAspectRatio="none">
          <path d="M0,200 Q300,50 600,200 T1200,200" stroke="rgba(220, 38, 38, 0.12)" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M0,100 Q400,350 800,100 T1200,300" stroke="rgba(220, 38, 38, 0.08)" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="4" fill="#dc2626" opacity="0.4" />
          <circle cx="600" cy="200" r="6" fill="#dc2626" opacity="0.6" />
          <circle cx="1000" cy="120" r="4" fill="#dc2626" opacity="0.4" />
        </svg>
      </div>

      <div className="final-cta-container">
        {/* Header Icon */}
        <div className="cta-top-icon-box">
          <FaHandshake className="cta-top-icon" />
        </div>

        {/* Large Heading with "Together" in Crimson Red */}
        <h2 className="final-cta-heading">
          Let’s Build Something <span className="highlight-red">Together</span>
        </h2>

        {/* Bullet Pills Row */}
        <div className="cta-pills-row">
          <span className="cta-pill">
            <FaBriefcase className="pill-icon" /> Opportunities
          </span>
          <span className="pill-dot">•</span>
          <span className="cta-pill">
            <FaRocket className="pill-icon" /> Projects
          </span>
          <span className="pill-dot">•</span>
          <span className="cta-pill">
            <FaHandshake className="pill-icon" /> Collaborations
          </span>
        </div>

        {/* Quote Blockquote */}
        <blockquote className="cta-quote">
          Have an idea or opportunity? <strong>Let’s connect.</strong>
        </blockquote>

        {/* Action Buttons Row */}
        <div className="cta-buttons-row">
          <Link href="/contact" className="cta-action-btn primary-btn">
            <FaMessage className="btn-icon" />
            <span>Let’s Connect</span>
            <FaArrowRight className="btn-arrow" />
          </Link>

          <a
            href="/resume/ShashidharaK-Resume-BNP-2026.docx.pdf"
            download="ShashidharaK_Resume_2026.pdf"
            className="cta-action-btn secondary-btn"
          >
            <FaDownload className="btn-icon" />
            <span>Download Resume</span>
          </a>
        </div>

        {/* Quick-Connect Icon Row */}
        <div className="quick-connect-container">
          <span className="quick-connect-label">Quick Connect:</span>
          <div className="quick-connect-links">
            {quickConnectLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target={item.url.startsWith('http') ? '_blank' : '_self'}
                rel={item.url.startsWith('http') ? 'noreferrer' : undefined}
                className="quick-connect-item"
                title={`${item.name} - ${item.url}`}
              >
                <span className="quick-icon">{item.icon}</span>
                <span className="quick-name">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
