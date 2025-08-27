import React, { useState, useEffect } from 'react';

const ImageSlider = ({ slides, title, isActive, projectLink, sourceCode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingStates, setLoadingStates] = useState({});
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Initialize loading states
  useEffect(() => {
    const initialLoadingStates = {};
    slides.forEach((slide, index) => {
      if (slide.type === 'image') {
        initialLoadingStates[index] = true;
      }
    });
    setLoadingStates(initialLoadingStates);
  }, [slides]);

  // Preload images
  useEffect(() => {
    slides.forEach((slide, index) => {
      if (slide.type === 'image' && !loadedImages.has(index)) {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, index]));
          setLoadingStates(prev => ({
            ...prev,
            [index]: false
          }));
        };
        img.onerror = () => {
          setLoadingStates(prev => ({
            ...prev,
            [index]: false
          }));
        };
        img.src = slide.src;
      }
    });
  }, [slides, loadedImages]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set([...prev, index]));
    setLoadingStates(prev => ({
      ...prev,
      [index]: false
    }));
  };

  const handleImageError = (index) => {
    setLoadingStates(prev => ({
      ...prev,
      [index]: false
    }));
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="image-slider-wrapper">
        <div className="image-preloader-unique">
          <div className="preloader-spinner-unique"></div>
        </div>
      </div>
    );
  }

  const currentSlide = slides[currentIndex];
  const isLoading = loadingStates[currentIndex];

  return (
    <div className="image-slider-wrapper">
      {/* Preloader */}
      {isLoading && currentSlide?.type === 'image' && (
        <div className="image-preloader-unique">
          <div className="preloader-spinner-unique"></div>
        </div>
      )}

      {/* Current Slide Content */}
      {currentSlide?.type === 'image' ? (
        <img
          src={currentSlide.src}
          alt={currentSlide.title || title}
          className={`slider-image ${isLoading ? 'loading' : 'loaded'}`}
          onLoad={() => handleImageLoad(currentIndex)}
          onError={() => handleImageError(currentIndex)}
          loading="lazy"
        />
      ) : currentSlide?.type === 'video' ? (
        <div className="video-container">
          <iframe
            src={currentSlide.videoSrc}
            title={currentSlide.title || title}
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : null}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button 
            className="slider-nav-button prev" 
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            ←
          </button>
          <button 
            className="slider-nav-button next" 
            onClick={goToNext}
            aria-label="Next slide"
          >
            →
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {slides.length > 1 && (
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="slide-counter">
          {currentIndex + 1} / {slides.length}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;