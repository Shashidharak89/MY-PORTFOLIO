'use client';

import React, { useEffect, useRef, useState } from 'react';
import './styles/ImageSlider.css';

const ImageSlider = () => {
  const scrollRef = useRef(null);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  const intervalId = useRef(null);

  const slides = [
    {
      type: 'image',
      src: 'https://th.bing.com/th/id/OIP.tLotgCDtzgTdwJcTiXWRCwHaEK?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3',
      alt: 'Slide 1',
    },
    {
      type: 'image',
      src: 'https://aimst.edu.my/wp-content/uploads/2023/04/artificial-intelligence-new-technology-science-futuristic-abstract-human-brain-ai-technology-cpu-central-processor-unit-chipset-big-data-machine-learning-cyber-mind-domination-generative-ai.jpg',
      alt: 'Slide 2',
    },
    {
      type: 'video',
      thumbnail: 'https://img.youtube.com/vi/ECFNE4gCT7s/maxresdefault.jpg',
      videoSrc: 'https://www.youtube.com/embed/ECFNE4gCT7s?autoplay=1&rel=0',
      title: 'YouTube Video',
    },
  ];

  const startAutoScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    let currentIndex = 0;
    intervalId.current = setInterval(() => {
      if (isVideoPopupOpen) return;
      currentIndex = (currentIndex + 1) % slides.length;
      container.scrollTo({
        left: container.children[currentIndex].offsetLeft,
        behavior: 'smooth',
      });
    }, 3000);
  };

  const handlePlayClick = () => {
    setIsVideoPopupOpen(true);
    if (intervalId.current) clearInterval(intervalId.current);
  };

  const closeVideoPopup = () => {
    setIsVideoPopupOpen(false);
    startAutoScroll();
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

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
                <img
                  src={slide.thumbnail}
                  alt={slide.title}
                  className="video-thumb-image-shashi"
                  draggable="false"
                />
                <div className="play-button-overlay-shashi">▶</div>
              </div>
            )}
          </div>
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
              title="YouTube Video"
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
