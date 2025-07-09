'use client';

import React, { useState } from 'react';
import './styles/Hash.css';

export default function Hash() {
  const [text, setText] = useState('');
  const [salt, setSalt] = useState(true);
  const [pepper, setPepper] = useState(false);
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="hash-container">
      <h2 className="hash-title">🔐 Text to Bcrypt Hash Generator</h2>

      <div className="hash-form">
        <input
          className="hash-input"
          type="text"
          placeholder="Enter your text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="hash-options">
          <label className="hash-checkbox">
            <input type="checkbox" checked={salt} onChange={() => setSalt(!salt)} />
            Use Salt
          </label>
          <label className="hash-checkbox">
            <input type="checkbox" checked={pepper} onChange={() => setPepper(!pepper)} />
            Use Pepper
          </label>
        </div>

        <button className="hash-generate-btn" onClick={handleHash} disabled={loading}>
          {loading ? 'Hashing...' : 'Generate Hash'}
        </button>

        {hash && (
          <div className="hash-result animate">
            <label>🔑 Hashed Output:</label>
            <pre>{hash}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
