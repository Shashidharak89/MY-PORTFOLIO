'use client';

import React, { useState } from 'react';
import './styles/Hash.css';

export default function Hash() {
  const [text, setText] = useState('');
  const [salt, setSalt] = useState(true);
  const [pepper, setPepper] = useState(false);
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleHash = async () => {
    if (!text.trim()) return alert('Please enter text');

    setLoading(true);
    setHash('');
    try {
      const res = await fetch('/api/hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, salt, pepper }),
      });

      const data = await res.json();
      setHash(data.hash || 'Failed to generate hash');
    } catch (error) {
      setHash('Something went wrong');
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleHash();
    }
  };

  return (
    <div className="hash-main-container">
      <div className="hash-content-wrapper">
        <div className="hash-header-section">
          <h1 className="hash-main-title">🔐 Bcrypt Hash Generator</h1>
          <p className="hash-subtitle">Secure text hashing with salt and pepper options</p>
        </div>

        <div className="hash-form-container">
          <div className="hash-input-section">
            <label className="hash-input-label">Enter Text to Hash</label>
            <textarea
              className="hash-text-input"
              placeholder="Type your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={3}
            />
          </div>

          <div className="hash-options-section">
            <div className="hash-toggle-group">
              <label className="hash-toggle-label">Salt Protection</label>
              <button
                className={`hash-toggle-btn ${salt ? 'hash-toggle-active' : 'hash-toggle-inactive'}`}
                onClick={() => setSalt(!salt)}
              >
                <span className="hash-toggle-slider"></span>
                <span className="hash-toggle-text">{salt ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            <div className="hash-toggle-group">
              <label className="hash-toggle-label">Pepper Protection</label>
              <button
                className={`hash-toggle-btn ${pepper ? 'hash-toggle-active' : 'hash-toggle-inactive'}`}
                onClick={() => setPepper(!pepper)}
              >
                <span className="hash-toggle-slider"></span>
                <span className="hash-toggle-text">{pepper ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          <button 
            className="hash-generate-button" 
            onClick={handleHash} 
            disabled={loading || !text.trim()}
          >
            {loading ? (
              <span className="hash-loading-content">
                <span className="hash-spinner"></span>
                Hashing...
              </span>
            ) : (
              'Generate Hash'
            )}
          </button>

          {hash && (
            <div className="hash-result-section">
              <div className="hash-result-header">
                <label className="hash-result-label">🔑 Generated Hash</label>
                <button
                  className={`hash-copy-btn ${copied ? 'hash-copy-success' : ''}`}
                  onClick={handleCopy}
                >
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div className="hash-result-content">
                <pre className="hash-result-text">{hash}</pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}