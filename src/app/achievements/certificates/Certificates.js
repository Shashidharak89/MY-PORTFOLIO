'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { certificatesData } from './Data';
import './styles/Certificates.css';

const Certificates = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [imageDimensions, setImageDimensions] = useState({});
  const [isDragging, setIsDragging] = useState({});
  const [slideDirection, setSlideDirection] = useState({});
  const [imageLoading, setImageLoading] = useState({});
  
  // Cache to track loaded images - this persists across component renders
  const loadedImagesCache = useRef(new Set());
  const containerRefs = useRef({});
  const autoSlideTimeouts = useRef({});

  // Initialize image indices and loading states
  useEffect(() => {
    const initialIndices = {};
    const initialLoadingStates = {};
    
    certificatesData.reverse().forEach(certificate => {
      initialIndices[certificate.id] = 0;
      // Show preloader for 1 second on page load
      initialLoadingStates[certificate.id] = true;
    });
    
    setCurrentImageIndex(initialIndices);
    setImageLoading(initialLoadingStates);

    // Hide all preloaders after 1 second
    const hidePreloadersTimer = setTimeout(() => {
      setImageLoading(prev => {
        const newState = {};
        Object.keys(prev).forEach(id => {
          newState[id] = false;
        });
        return newState;
      });
    }, 1000);

    return () => clearTimeout(hidePreloadersTimer);
  }, []);

  // Auto-slide functionality (only for certificates with multiple images)
  useEffect(() => {
    const startAutoSlide = (certificateId) => {
      const certificate = certificatesData.find(c => c.id === certificateId);
      if (!certificate || certificate.images.length <= 1) return;

      if (autoSlideTimeouts.current[certificateId]) {
        clearTimeout(autoSlideTimeouts.current[certificateId]);
      }
      
      autoSlideTimeouts.current[certificateId] = setTimeout(() => {
        setCurrentImageIndex(prev => {
          const currentIndex = prev[certificateId] || 0;
          const nextIndex = (currentIndex + 1) % certificate.images.length;
          
          return { ...prev, [certificateId]: nextIndex };
        });
        startAutoSlide(certificateId);
      }, 5000);
    };

    certificatesData.forEach(certificate => {
      if (certificate.images.length > 1) {
        startAutoSlide(certificate.id);
      }
    });

    return () => {
      Object.values(autoSlideTimeouts.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);

  // Handle image load to determine dimensions
  const handleImageLoad = (certificateId, imgElement, imageUrl) => {
    const { naturalWidth, naturalHeight } = imgElement;
    const isVertical = naturalHeight > naturalWidth;
    
    // Add to cache
    loadedImagesCache.current.add(imageUrl);
    
    setImageDimensions(prev => ({
      ...prev,
      [certificateId]: {
        isVertical,
        aspectRatio: naturalWidth / naturalHeight
      }
    }));
  };

  // Handle manual sliding
  const handleSlide = (certificateId, direction) => {
    const certificate = certificatesData.find(c => c.id === certificateId);
    if (!certificate || certificate.images.length <= 1) return;

    // Calculate new index
    const currentIndex = currentImageIndex[certificateId] || 0;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % certificate.images.length;
    } else {
      newIndex = currentIndex === 0 ? certificate.images.length - 1 : currentIndex - 1;
    }

    // Set slide direction for animation
    setSlideDirection(prev => ({
      ...prev,
      [certificateId]: direction
    }));

    setCurrentImageIndex(prev => ({
      ...prev,
      [certificateId]: newIndex
    }));

    // Clear slide direction after animation
    setTimeout(() => {
      setSlideDirection(prev => {
        const newState = { ...prev };
        delete newState[certificateId];
        return newState;
      });
    }, 600);

    // Reset auto-slide timer
    if (autoSlideTimeouts.current[certificateId]) {
      clearTimeout(autoSlideTimeouts.current[certificateId]);
    }
    
    if (certificate.images.length > 1) {
      autoSlideTimeouts.current[certificateId] = setTimeout(() => {
        setCurrentImageIndex(prev => {
          const currentIndex = prev[certificateId] || 0;
          const nextIndex = (currentIndex + 1) % certificate.images.length;
          
          return { ...prev, [certificateId]: nextIndex };
        });
      }, 5000);
    }
  };

  // Handle indicator click
  const handleIndicatorClick = (certificateId, index) => {
    const currentIndex = currentImageIndex[certificateId] || 0;
    if (index !== currentIndex) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [certificateId]: index
      }));
    }
  };

  // Touch and mouse event handlers
  const handleStart = (certificateId, clientX) => {
    const certificate = certificatesData.find(c => c.id === certificateId);
    if (!certificate || certificate.images.length <= 1) return;

    setIsDragging(prev => ({
      ...prev,
      [certificateId]: { startX: clientX, moved: false }
    }));
  };

  const handleMove = (certificateId, clientX) => {
    if (!isDragging[certificateId]) return;
    
    const diff = clientX - isDragging[certificateId].startX;
    if (Math.abs(diff) > 10) {
      setIsDragging(prev => ({
        ...prev,
        [certificateId]: { ...prev[certificateId], moved: true }
      }));
    }
  };

  const handleEnd = (certificateId, clientX) => {
    if (!isDragging[certificateId]) return;
    
    const diff = clientX - isDragging[certificateId].startX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold && isDragging[certificateId].moved) {
      if (diff > 0) {
        handleSlide(certificateId, 'prev');
      } else {
        handleSlide(certificateId, 'next');
      }
    }
    
    setIsDragging(prev => {
      const newState = { ...prev };
      delete newState[certificateId];
      return newState;
    });
  };

  // Preload all images in the background for better UX
  useEffect(() => {
    const preloadImages = () => {
      certificatesData.forEach(certificate => {
        certificate.images.forEach(imageUrl => {
          if (!loadedImagesCache.current.has(imageUrl)) {
            const img = new Image();
            img.onload = () => {
              loadedImagesCache.current.add(imageUrl);
            };
            img.src = imageUrl;
          }
        });
      });
    };

    // Preload images after a short delay to not interfere with initial load
    const preloadTimer = setTimeout(preloadImages, 1000);
    return () => clearTimeout(preloadTimer);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      // No additional cleanup needed
    };
  }, []);

  return (
    <div className="cert-portfolio-main-container">
      <div className="cert-portfolio-header-section">
        <h1 className="cert-portfolio-main-title">My Certificates</h1>
        <p className="cert-portfolio-subtitle">
          Professional certifications and credentials earned through continuous learning
        </p>
        <Link href="/achievements" className="cert-portfolio-back-button">
          ← Back to Achievements
        </Link>
      </div>

      <div className="cert-portfolio-cards-grid">
        {certificatesData.map((certificate) => {
          const currentIndex = currentImageIndex[certificate.id] || 0;
          const dimensions = imageDimensions[certificate.id];
          const hasMultipleImages = certificate.images.length > 1;
          const isLoading = imageLoading[certificate.id];
          const currentImageUrl = certificate.images[currentIndex];
          
          return (
            <div key={certificate.id} className="cert-portfolio-single-card">
              <div 
                className={`cert-portfolio-img-wrapper ${hasMultipleImages ? 'multiple-images' : 'single-image'}`}
                ref={el => containerRefs.current[certificate.id] = el}
                onMouseDown={hasMultipleImages ? (e) => handleStart(certificate.id, e.clientX) : undefined}
                onMouseMove={hasMultipleImages ? (e) => handleMove(certificate.id, e.clientX) : undefined}
                onMouseUp={hasMultipleImages ? (e) => handleEnd(certificate.id, e.clientX) : undefined}
                onMouseLeave={hasMultipleImages ? (e) => handleEnd(certificate.id, e.clientX) : undefined}
                onTouchStart={hasMultipleImages ? (e) => handleStart(certificate.id, e.touches[0].clientX) : undefined}
                onTouchMove={hasMultipleImages ? (e) => handleMove(certificate.id, e.touches[0].clientX) : undefined}
                onTouchEnd={hasMultipleImages ? (e) => handleEnd(certificate.id, e.changedTouches[0].clientX) : undefined}
              >
                {/* Image Preloader - only show if actually loading */}
                {isLoading && (
                  <div className="cert-image-preloader">
                    <div className="cert-preloader-spinner">
                      <div className="cert-spinner-ring"></div>
                      <div className="cert-spinner-ring"></div>
                      <div className="cert-spinner-ring"></div>
                    </div>
                    <p className="cert-preloader-text">Loading certificate...</p>
                  </div>
                )}

                <img
                  src={currentImageUrl}
                  alt={certificate.title}
                  className={`cert-portfolio-display-image ${dimensions?.isVertical ? 'vertical-image' : 'horizontal-image'} ${
                    slideDirection[certificate.id] === 'next' ? 'sliding-left' : 
                    slideDirection[certificate.id] === 'prev' ? 'sliding-right' : ''
                  } ${isLoading ? 'image-loading' : 'image-loaded'}`}
                  onLoad={(e) => handleImageLoad(certificate.id, e.target, currentImageUrl)}
                  draggable={false}
                />
                
                {hasMultipleImages && !isLoading && (
                  <>
                    <button 
                      className="cert-img-nav-btn cert-img-nav-prev"
                      onClick={() => handleSlide(certificate.id, 'prev')}
                    >
                      ‹
                    </button>
                    <button 
                      className="cert-img-nav-btn cert-img-nav-next"
                      onClick={() => handleSlide(certificate.id, 'next')}
                    >
                      ›
                    </button>
                    
                    <div className="cert-img-indicators">
                      {certificate.images.map((_, index) => (
                        <div 
                          key={index}
                          className={`cert-img-indicator ${index === currentIndex ? 'active' : ''}`}
                          onClick={() => handleIndicatorClick(certificate.id, index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="cert-portfolio-content-area">
                <div className="cert-portfolio-header-info">
                  <span className="cert-portfolio-date-tag">{certificate.date}</span>
                  <span className="cert-portfolio-issuer-tag">{certificate.issuer}</span>
                </div>
                
                <h3 className="cert-portfolio-card-title">{certificate.title}</h3>
                
                <p className="cert-portfolio-desc-text">
                  {certificate.description}
                </p>
                
                <div className="cert-portfolio-skills-area">
                  <div className="cert-skills-heading">Skills Covered</div>
                  <div className="cert-skills-tags-container">
                    {certificate.skills.map((skill, index) => (
                      <span key={index} className="cert-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Certificates;