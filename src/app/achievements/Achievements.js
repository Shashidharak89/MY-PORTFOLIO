'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { achievementsData } from './Data';
import './styles/Achievements.css';

const Achievements = () => {
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
    
    achievementsData.reverse().forEach(achievement => {
      initialIndices[achievement.id] = 0;
      // Show preloader for 1 second on page load
      initialLoadingStates[achievement.id] = true;
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

  // Function to preload image dimensions without showing loader
  const preloadImageDimensions = (achievementId, imageUrl) => {
    const img = new Image();
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      const isVertical = naturalHeight > naturalWidth;
      
      setImageDimensions(prev => ({
        ...prev,
        [achievementId]: {
          isVertical,
          aspectRatio: naturalWidth / naturalHeight
        }
      }));
    };
    img.src = imageUrl;
  };

  // Auto-slide functionality
  useEffect(() => {
    const startAutoSlide = (achievementId) => {
      if (autoSlideTimeouts.current[achievementId]) {
        clearTimeout(autoSlideTimeouts.current[achievementId]);
      }
      
      autoSlideTimeouts.current[achievementId] = setTimeout(() => {
        setCurrentImageIndex(prev => {
          const achievement = achievementsData.find(a => a.id === achievementId);
          if (!achievement) return prev;
          
          const currentIndex = prev[achievementId] || 0;
          const nextIndex = (currentIndex + 1) % achievement.images.length;
          
          return { ...prev, [achievementId]: nextIndex };
        });
        startAutoSlide(achievementId);
      }, 4000);
    };

    achievementsData.forEach(achievement => {
      startAutoSlide(achievement.id);
    });

    return () => {
      Object.values(autoSlideTimeouts.current).forEach(timeout => {
        clearTimeout(timeout);
      });
    };
  }, []);

  // Handle image load to determine dimensions
  const handleImageLoad = (achievementId, imgElement, imageUrl) => {
    const { naturalWidth, naturalHeight } = imgElement;
    const isVertical = naturalHeight > naturalWidth;
    
    // Add to cache
    loadedImagesCache.current.add(imageUrl);
    
    setImageDimensions(prev => ({
      ...prev,
      [achievementId]: {
        isVertical,
        aspectRatio: naturalWidth / naturalHeight
      }
    }));
  };

  // Handle manual sliding
  const handleSlide = (achievementId, direction) => {
    const achievement = achievementsData.find(a => a.id === achievementId);
    if (!achievement) return;

    // Calculate new index
    const currentIndex = currentImageIndex[achievementId] || 0;
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % achievement.images.length;
    } else {
      newIndex = currentIndex === 0 ? achievement.images.length - 1 : currentIndex - 1;
    }

    // Set slide direction for animation
    setSlideDirection(prev => ({
      ...prev,
      [achievementId]: direction
    }));

    setCurrentImageIndex(prev => ({
      ...prev,
      [achievementId]: newIndex
    }));

    // Clear slide direction after animation
    setTimeout(() => {
      setSlideDirection(prev => {
        const newState = { ...prev };
        delete newState[achievementId];
        return newState;
      });
    }, 600);

    // Reset auto-slide timer
    if (autoSlideTimeouts.current[achievementId]) {
      clearTimeout(autoSlideTimeouts.current[achievementId]);
    }
    
    autoSlideTimeouts.current[achievementId] = setTimeout(() => {
      setCurrentImageIndex(prev => {
        const currentIndex = prev[achievementId] || 0;
        const nextIndex = (currentIndex + 1) % achievement.images.length;
        
        return { ...prev, [achievementId]: nextIndex };
      });
    }, 4000);
  };

  // Handle indicator click
  const handleIndicatorClick = (achievementId, index) => {
    const currentIndex = currentImageIndex[achievementId] || 0;
    if (index !== currentIndex) {
      setCurrentImageIndex(prev => ({
        ...prev,
        [achievementId]: index
      }));
    }
  };

  // Touch and mouse event handlers
  const handleStart = (achievementId, clientX) => {
    setIsDragging(prev => ({
      ...prev,
      [achievementId]: { startX: clientX, moved: false }
    }));
  };

  const handleMove = (achievementId, clientX) => {
    if (!isDragging[achievementId]) return;
    
    const diff = clientX - isDragging[achievementId].startX;
    if (Math.abs(diff) > 10) {
      setIsDragging(prev => ({
        ...prev,
        [achievementId]: { ...prev[achievementId], moved: true }
      }));
    }
  };

  const handleEnd = (achievementId, clientX) => {
    if (!isDragging[achievementId]) return;
    
    const diff = clientX - isDragging[achievementId].startX;
    const threshold = 50;
    
    if (Math.abs(diff) > threshold && isDragging[achievementId].moved) {
      if (diff > 0) {
        handleSlide(achievementId, 'prev');
      } else {
        handleSlide(achievementId, 'next');
      }
    }
    
    setIsDragging(prev => {
      const newState = { ...prev };
      delete newState[achievementId];
      return newState;
    });
  };

  // Preload all images in the background for better UX
  useEffect(() => {
    const preloadImages = () => {
      achievementsData.forEach(achievement => {
        achievement.images.forEach(imageUrl => {
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
    <div className="port-achievements-main-container">
      <div className="port-achievements-header-section">
        <h1 className="port-achievements-main-title">My Achievements</h1>
        <p className="port-achievements-subtitle">
          Celebrating milestones and accomplishments in my journey
        </p>
        <Link href="/achievements/certificates" className="port-achievements-cert-button">
          View All Certificates
        </Link>
      </div>

      <div className="port-achievements-cards-grid">
        {achievementsData.map((achievement) => {
          const currentIndex = currentImageIndex[achievement.id] || 0;
          const dimensions = imageDimensions[achievement.id];
          const isLoading = imageLoading[achievement.id];
          const currentImageUrl = achievement.images[currentIndex];
          
          return (
            <div key={achievement.id} className="port-achievement-single-card">
              <div 
                className="port-achievement-img-wrapper"
                ref={el => containerRefs.current[achievement.id] = el}
                onMouseDown={(e) => handleStart(achievement.id, e.clientX)}
                onMouseMove={(e) => handleMove(achievement.id, e.clientX)}
                onMouseUp={(e) => handleEnd(achievement.id, e.clientX)}
                onMouseLeave={(e) => handleEnd(achievement.id, e.clientX)}
                onTouchStart={(e) => handleStart(achievement.id, e.touches[0].clientX)}
                onTouchMove={(e) => handleMove(achievement.id, e.touches[0].clientX)}
                onTouchEnd={(e) => handleEnd(achievement.id, e.changedTouches[0].clientX)}
              >
                {/* Image Preloader - only show if actually loading */}
                {isLoading && (
                  <div className="port-achievement-image-preloader">
                    <div className="port-achievement-preloader-spinner">
                      <div className="port-achievement-spinner-ring"></div>
                      <div className="port-achievement-spinner-ring"></div>
                      <div className="port-achievement-spinner-ring"></div>
                    </div>
                    <p className="port-achievement-preloader-text">Loading achievement...</p>
                  </div>
                )}

                <img
                  src={currentImageUrl}
                  alt={achievement.title}
                  className={`port-achievement-display-image ${dimensions?.isVertical ? 'vertical-image' : 'horizontal-image'} ${
                    slideDirection[achievement.id] === 'next' ? 'sliding-left' : 
                    slideDirection[achievement.id] === 'prev' ? 'sliding-right' : ''
                  } ${isLoading ? 'image-loading' : 'image-loaded'}`}
                  onLoad={(e) => handleImageLoad(achievement.id, e.target, currentImageUrl)}
                  draggable={false}
                />
                
                {achievement.images.length > 1 && !isLoading && (
                  <>
                    <button 
                      className="port-img-nav-btn port-img-nav-prev"
                      onClick={() => handleSlide(achievement.id, 'prev')}
                    >
                      ‹
                    </button>
                    <button 
                      className="port-img-nav-btn port-img-nav-next"
                      onClick={() => handleSlide(achievement.id, 'next')}
                    >
                      ›
                    </button>
                    
                    <div className="port-img-indicators">
                      {achievement.images.map((_, index) => (
                        <div 
                          key={index}
                          className={`port-img-indicator ${index === currentIndex ? 'active' : ''}`}
                          onClick={() => handleIndicatorClick(achievement.id, index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="port-achievement-content-area">
                <span className="port-achievement-date-tag">{achievement.date}</span>
                
                <h3 className="port-achievement-card-title">{achievement.title}</h3>
                
                <p className="port-achievement-desc-text">
                  {achievement.description}
                </p>
                
                <div className="port-achievement-participants-area">
                  <div className="port-participants-heading">Participants</div>
                  <div className="port-participants-tags-container">
                    {achievement.participants.map((participant, index) => (
                      <span key={index} className="port-participant-tag">
                        {participant}
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

export default Achievements;