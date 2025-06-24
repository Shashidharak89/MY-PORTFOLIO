'use client';

import { useState } from 'react';
import './styles/ResumePage.css';

const ResumePage = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const resumeImageUrl = 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750778574/Resume-ShashidharaK-April2025_updated-1_dovyix.png';
  const fallbackImageUrl = 'https://res.cloudinary.com/dsojdpkgh/image/upload/v1750778574/Resume-ShashidharaK-April2025_updated-1_dovyix.png';

  const handleDownloadResume = async () => {
    setIsDownloading(true);
    
    try {
      const response = await fetch(resumeImageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      const blob = await response.blob();
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = 'Resume.png';
      
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download resume. Please try again later.');
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    console.error('Failed to load resume image');
  };

  return (
    <div className="resume-page-container">
      <div className="resume-page-header">
        <h1 className="resume-page-title">My Resume</h1>
        <p className="resume-page-subtitle">
          Professional overview and qualifications
        </p>
      </div>

      <div className="resume-display-section">
        <div className="resume-image-wrapper">
          {!imageLoaded && !imageError && (
            <div className="resume-image-skeleton">
              <div className="skeleton-content">
                <div className="skeleton-line skeleton-line-long"></div>
                <div className="skeleton-line skeleton-line-medium"></div>
                <div className="skeleton-line skeleton-line-short"></div>
              </div>
            </div>
          )}
          
          <img
            src={imageError ? fallbackImageUrl : resumeImageUrl}
            alt="Professional Resume"
            className={`resume-display-image ${imageLoaded && !imageError ? 'image-loaded' : 'image-loading'}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            width="595"
            height="842"
          />
          
          {imageError && imageLoaded && (
            <div className="image-error-message">
              Unable to load resume image. Displaying fallback image.
            </div>
          )}
        </div>

        <div className="resume-actions-panel">
          <button
            onClick={handleDownloadResume}
            disabled={isDownloading || (!imageLoaded && !imageError)}
            className={`download-resume-btn ${isDownloading ? 'btn-downloading' : ''}`}
            aria-label="Download resume as PNG file"
          >
            <span className="btn-icon">
              {isDownloading ? (
                <svg className="download-spinner" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v10l3-3m-6 0l3 3" />
                </svg>
              ) : (
                <svg className="download-icon" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              )}
            </span>
            <span className="btn-text">
              {isDownloading ? 'Downloading...' : 'Download Resume'}
            </span>
          </button>

          <div className="resume-info-card">
            <h3 className="info-card-title">Resume Details</h3>
            <div className="info-item">
              <span className="info-label">Format:</span>
              <span className="info-value">PNG Image</span>
            </div>
            <div className="info-item">
              <span className="info-label">Size:</span>
              <span className="info-value">A4 Portrait (1653×2339 px)</span>
            </div>
            <div className="info-item">
              <span className="info-label">Quality:</span>
              <span className="info-value">High Resolution</span>
            </div>
            <div className="info-item">
              <span className="info-label">File Size:</span>
              <span className="info-value">422.6 KB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;