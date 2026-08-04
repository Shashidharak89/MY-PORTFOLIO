'use client';

import { useState } from 'react';
import { FaFilePdf, FaFileImage, FaDownload, FaArrowUpRightFromSquare, FaCheck, FaCircleInfo, FaEye } from 'react-icons/fa6';
import resumeImage from './ShashidharaK-Resume-BNP-2026.docx_page-0001.jpg';
import './styles/ResumePage.css';

const ResumePage = () => {
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingImage, setIsDownloadingImage] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const pdfUrl = '/resume/ShashidharaK-Resume-BNP-2026.docx.pdf';
  const imageUrl = '/resume/resume.png';

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error('PDF download failed');
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'ShashidharaK_Resume_2026.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('PDF Download error:', error);
      // Fallback direct link trigger
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'ShashidharaK_Resume_2026.pdf';
      link.target = '_blank';
      link.click();
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 800);
    }
  };

  const handleDownloadImage = async () => {
    setIsDownloadingImage(true);
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Image download failed');
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'ShashidharaK_Resume_2026.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Image Download error:', error);
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'ShashidharaK_Resume_2026.png';
      link.target = '_blank';
      link.click();
    } finally {
      setTimeout(() => setIsDownloadingImage(false), 800);
    }
  };

  return (
    <div className="resume-page-container">
      <div className="resume-page-header">
        <h1 className="resume-page-title">Curriculum Vitae</h1>
        <p className="resume-page-subtitle">
          Professional achievements, technical skillsets, & engineering experience
        </p>
      </div>

      <div className="resume-display-section">
        {/* Left Side: High Resolution Resume Image Preview */}
        <div className="resume-image-wrapper">
          {!imageLoaded && (
            <div className="resume-image-skeleton">
              <div className="skeleton-content">
                <div className="skeleton-line skeleton-line-long"></div>
                <div className="skeleton-line skeleton-line-medium"></div>
                <div className="skeleton-line skeleton-line-short"></div>
              </div>
            </div>
          )}

          <img
            src={resumeImage.src || '/resume/ShashidharaK-Resume-BNP-2026.docx_page-0001.jpg'}
            alt="Shashidhara K Resume 2026"
            className={`resume-display-image ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
            onLoad={() => setImageLoaded(true)}
            width="595"
            height="842"
          />
        </div>

        {/* Right Side: Action Panel & Resume File Options */}
        <div className="resume-actions-panel">
          <div className="download-buttons-group">
            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="download-resume-btn pdf-btn"
            >
              <FaFilePdf className="btn-icon-svg" />
              <span>{isDownloadingPdf ? 'Downloading PDF...' : 'Download PDF Resume'}</span>
            </button>

            {/* Download PNG Button */}
            <button
              onClick={handleDownloadImage}
              disabled={isDownloadingImage}
              className="download-resume-btn image-btn"
            >
              <FaFileImage className="btn-icon-svg" />
              <span>{isDownloadingImage ? 'Downloading Image...' : 'Download PNG Image'}</span>
            </button>

            {/* View PDF in Browser Tab */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="view-pdf-btn"
            >
              <FaEye className="btn-icon-svg" />
              <span>Open PDF Document</span>
              <FaArrowUpRightFromSquare className="external-link-icon" />
            </a>
          </div>

          {/* Detailed Specifications Card */}
          <div className="resume-info-card">
            <h3 className="info-card-title">
              <FaCircleInfo className="info-title-icon" /> Document Details
            </h3>
            <div className="info-item">
              <span className="info-label">Version:</span>
              <span className="info-value highlight">2026 Updated Edition</span>
            </div>
            <div className="info-item">
              <span className="info-label">PDF File:</span>
              <span className="info-value">ShashidharaK-Resume-BNP-2026.pdf</span>
            </div>
            <div className="info-item">
              <span className="info-label">Image Preview:</span>
              <span className="info-value">High Res Page Preview</span>
            </div>
            <div className="info-item">
              <span className="info-label">Page Layout:</span>
              <span className="info-value">A4 Standard Format</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className="info-value status-available">
                <FaCheck /> Ready for Review
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;