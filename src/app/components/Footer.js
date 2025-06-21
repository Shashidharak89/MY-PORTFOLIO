'use client';

import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import styles from './styles/Footer.module.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footerElement = document.querySelector(`.${styles['crimson-footer-container']}`);
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async () => {
    if (!email) {
      setSubscribeStatus({ message: 'Please enter an email address', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setSubscribeStatus({ message: '', type: '' });

    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubscribeStatus({ message: 'Subscribed successfully!', type: 'success' });
      setEmail('');
    } catch (error) {
      setSubscribeStatus({ message: error.message || 'Something went wrong', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: '#', color: '#FFD700' },
    { icon: Linkedin, label: 'LinkedIn', url: '#', color: '#FFD700' },
    { icon: Mail, label: 'Email', url: '#', color: '#FFD700' },
    { icon: Phone, label: 'Phone', url: '#', color: '#FFD700' },
  ];

  return (
    <footer
      className={`${styles['crimson-footer-container']} ${isVisible ? styles['crimson-footer-animate-in'] : ''}`}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Waves */}
      <div className={styles['crimson-bg-animation']}>
        <div className={`${styles['crimson-wave']} ${styles['crimson-wave-1']}`}></div>
        <div className={`${styles['crimson-wave']} ${styles['crimson-wave-2']}`}></div>
        <div className={`${styles['crimson-wave']} ${styles['crimson-wave-3']}`}></div>
        <div className={`${styles['crimson-wave']} ${styles['crimson-wave-4']}`}></div>
      </div>

      {/* Floating Particles */}
      <div className={styles['crimson-particles']}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={styles['crimson-particle']}
            style={{
              '--delay': `${i * 0.3}s`,
              '--duration': `${4 + (i % 4)}s`,
              '--size': `${2 + (i % 3)}px`,
            }}
          ></div>
        ))}
      </div>

      {/* Golden Orbs */}
      <div className={styles['crimson-golden-orbs']}>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={styles['crimson-golden-orb']}
            style={{
              '--delay': `${i * 0.8}s`,
              '--x-offset': `${(i % 4) * 25}%`,
              '--y-offset': `${Math.floor(i / 4) * 50}%`,
            }}
          ></div>
        ))}
      </div>

      {/* Mouse Follower Effect */}
      <div
        className={styles['crimson-mouse-glow']}
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      ></div>

      <div className={styles['crimson-content-wrapper']}>
        <div className={styles['crimson-main-content']}>
          {/* Brand Section */}
          <div className={styles['crimson-brand-section']}>
            <div className={styles['crimson-logo-container']}>
              <div className={styles['crimson-logo-text']}>Portfolio</div>
              <div className={styles['crimson-logo-pulse']}></div>
              <div className={styles['crimson-logo-ring']}></div>
            </div>
            <p className={styles['crimson-brand-tagline']}>
              Crafting digital experiences with passion and precision
            </p>
            <div className={styles['crimson-social-links']}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={styles['crimson-social-link']}
                  style={{ '--hover-color': social.color }}
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                  <div className={styles['crimson-social-ripple']}></div>
                  <span className={styles['crimson-social-tooltip']}>{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className={styles['crimson-contact-section']}>
            <h3 className={styles['crimson-section-title']}>Get In Touch</h3>
            <div className={styles['crimson-contact-info']}>
              <div className={styles['crimson-contact-item']}>
                <div className={styles['crimson-contact-icon']}>
                  <Mail size={18} />
                </div>
                <span>hello@portfolio.com</span>
              </div>
              <div className={styles['crimson-contact-item']}>
                <div className={styles['crimson-contact-icon']}>
                  <Phone size={18} />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles['crimson-contact-item']}>
                <div className={styles['crimson-contact-icon']}>
                  <MapPin size={18} />
                </div>
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className={styles['crimson-newsletter-section']}>
            <h3 className={styles['crimson-section-title']}>Stay Updated</h3>
            <p className={styles['crimson-newsletter-text']}>
              Subscribe to get notified about new projects and updates
            </p>
            <div className={styles['crimson-newsletter-form']}>
              <div className={styles['crimson-input-wrapper']}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles['crimson-newsletter-input']}
                  disabled={isSubmitting}
                />
                <div className={styles['crimson-input-glow']}></div>
              </div>
              <button
                onClick={handleSubscribe}
                className={styles['crimson-newsletter-btn']}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
                <div className={styles['crimson-btn-glow']}></div>
                <div className={styles['crimson-btn-particles']}></div>
              </button>
            </div>
            {subscribeStatus.message && (
              <p
                className={`${styles['crimson-newsletter-status']} ${
                  subscribeStatus.type === 'success'
                    ? styles['crimson-newsletter-success']
                    : styles['crimson-newsletter-error']
                }`}
              >
                {subscribeStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles['crimson-bottom-bar']}>
          <div className={styles['crimson-bottom-content']}>
            <p className={styles['crimson-copyright']}>
              © 2025 Portfolio. Made with{' '}
              <Heart size={16} className={styles['crimson-heart']} /> by Developer
            </p>
            <div className={styles['crimson-bottom-links']}>
              <a href="#" className={styles['crimson-bottom-link']}>
                Privacy Policy
              </a>
              <a href="#" className={styles['crimson-bottom-link']}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={styles['crimson-scroll-top']}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
          <div className={styles['crimson-scroll-glow']}></div>
          <div className={styles['crimson-scroll-ring']}></div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;