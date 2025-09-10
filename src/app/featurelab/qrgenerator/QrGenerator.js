"use client";

import React, { useState, useRef } from "react";
import "./styles/QrGenerator.css";

export default function QrGenerator() {
  const [url, setUrl] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);

  const generateQr = async () => {
    if (!url.trim()) return;
    
    setIsLoading(true);
    try {
      const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url.trim())}`;
      setQrUrl(apiUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQrCode = async () => {
    if (!qrUrl) return;

    try {
      // Create a canvas to convert the QR code to downloadable image
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas dimensions
      canvas.width = 300;
      canvas.height = 300;
      
      // Create image object
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        // Clear canvas with white background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw the QR code image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'qr-code.png';
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 'image/png');
      };
      
      img.src = qrUrl;
    } catch (error) {
      console.error("Error downloading QR code:", error);
      // Fallback: open in new tab
      window.open(qrUrl, '_blank');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateQr();
    }
  };

  return (
    <div className="qr-generator-container">
      <div className="qr-generator-wrapper">
        <div className="qr-generator-header">
          <h1 className="qr-generator-title">QR Code Generator</h1>
          <p className="qr-generator-subtitle">
            Enter any URL or text to generate a professional QR code
          </p>
        </div>

        <div className="qr-generator-form">
          <div className="qr-input-wrapper">
            <input
              type="text"
              placeholder="Enter URL or text..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              className="qr-input-field"
              disabled={isLoading}
            />
          </div>

          <button
            onClick={generateQr}
            disabled={!url.trim() || isLoading}
            className={`qr-generate-btn ${(!url.trim() || isLoading) ? 'qr-generate-btn-disabled' : ''}`}
          >
            {isLoading ? (
              <span className="qr-loading-spinner"></span>
            ) : (
              'Generate QR Code'
            )}
          </button>
        </div>

        {qrUrl && (
          <div className="qr-result-container">
            <div className="qr-image-wrapper">
              <img 
                src={qrUrl} 
                alt="Generated QR Code" 
                className="qr-code-image"
                loading="lazy"
              />
            </div>
            
            <div className="qr-actions">
              <button
                onClick={downloadQrCode}
                className="qr-download-btn"
              >
                <svg className="qr-download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download QR Code
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
}