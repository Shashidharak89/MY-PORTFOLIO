'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; // Import Next.js Image component

const ImageSlider = ({ slides, title, isActive }) => {
  const scrollRef = useRef(null);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  const intervalId = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startAutoScroll = () => {
    const container = scrollRef.current;
    if (!container || !isActive || isVideoPopupOpen) return;

    const nextIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(nextIndex);
    container.scrollTo({
      left: container.children[nextIndex].offsetLeft,
      behavior: 'smooth',
    });
  };

  const handlePlayClick = () => {
    setIsVideoPopupOpen(true);
    if (intervalId.current) clearInterval(intervalId.current);
  };

  const closeVideoPopup = () => {
    setIsVideoPopupOpen(false);
  };

  useEffect(() => {
    if (isActive && !isVideoPopupOpen) {
      intervalId.current = setInterval(startAutoScroll, 3000);
      return () => clearInterval(intervalId.current);
    }
  }, [isActive, isVideoPopupOpen, currentIndex, startAutoScroll]); // Added startAutoScroll to dependencies

  return (
    <div className="carousel-wrapper-shashi">
      <div className="carousel-scroll-container-shashi" ref={scrollRef}>
        {slides.map((slide, idx) => (
          <div className="carousel-item-shashi" key={idx}>
            {slide.type === 'image' ? (
              <div
                className="carousel-content-shashi"
                style={{ backgroundImage: `url(${slide.src})` }}
              />
            ) : (
              <div
                className="carousel-content-shashi video-thumbnail-shashi"
                onClick={handlePlayClick}
              >
                <Image // Replaced img with Image
                  src={slide.thumbnail}
                  alt={slide.title}
                  className="video-thumb-image-shashi"
                  width={200} // Add appropriate width
                  height={120} // Add appropriate height
                  style={{ objectFit: 'cover' }}
                  draggable={false}
                />
                <div className="play-button-overlay-shashi">▶</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="carousel-indicators-shashi">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`carousel-indicator-shashi ${i === currentIndex ? 'carousel-indicator-active-shashi' : ''}`}
          />
        ))}
      </div>

      {isVideoPopupOpen && (
        <div className="video-modal-overlay-shashi">
          <div className="video-modal-container-shashi">
            <button className="video-close-button-shashi" onClick={closeVideoPopup}>
              ×
            </button>
            <iframe
              className="video-iframe-shashi"
              src={slides.find((s) => s.type === 'video').videoSrc}
              title={title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;