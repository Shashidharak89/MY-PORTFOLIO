'use client';

import { useState, useEffect } from 'react';
import './styles/Preloader.css'; // Import the CSS file

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 500);
          return 100;
        }
        return prevProgress + Math.random() * 15 + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`portfolio-preloader-overlay ${progress >= 100 ? 'portfolio-preloader-hidden' : 'portfolio-preloader-visible'}`}>
      <div className="portfolio-preloader-content">
        <div className="portfolio-preloader-spinner">
          <div className="portfolio-preloader-ring"></div>
          <div className="portfolio-preloader-ring"></div>
          <div className="portfolio-preloader-ring"></div>
        </div>
        
        <div className="portfolio-preloader-text">
          Loading Portfolio
        </div>
        
        <div className="portfolio-preloader-progress-container">
          <div 
            className="portfolio-preloader-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="portfolio-preloader-percentage">
          {Math.round(progress)}%
        </div>
        
        <div className="portfolio-preloader-dots">
          <div className="portfolio-preloader-dot"></div>
          <div className="portfolio-preloader-dot"></div>
          <div className="portfolio-preloader-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;