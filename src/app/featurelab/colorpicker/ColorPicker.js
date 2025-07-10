'use client';

import React, { useState } from 'react';
import { HslColorPicker } from 'react-colorful';
import './colorpicker.css';

export default function ColorPicker() {
  const [color, setColor] = useState({ h: 0, s: 100, l: 50 });
  const [copied, setCopied] = useState('');

  const hslToRgb = ({ h, s, l }) => {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4)),
    };
  };

  const rgb = hslToRgb(color);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hex = `#${[rgb.r, rgb.g, rgb.b]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')}`;

  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(''), 1500);
    } catch {
      alert('Failed to copy');
    }
  };

  return (
    <div className="cpicker-container">
      <h2 className="cpicker-title">🎨 Pick a Color</h2>

      <div className="cpicker-wrapper">
        <HslColorPicker color={color} onChange={setColor} />

        <div className="cpicker-values">
          <div className="cpicker-row">
            <label>HEX:</label>
            <span>{hex}</span>
            <button
              className="cpicker-copy"
              onClick={() => copyToClipboard(hex, 'hex')}
            >
              📋
            </button>
            {copied === 'hex' && <span className="cpicker-tooltip">Copied!</span>}
          </div>

          <div className="cpicker-row">
            <label>RGB:</label>
            <span>{rgbString}</span>
            <button
              className="cpicker-copy"
              onClick={() => copyToClipboard(rgbString, 'rgb')}
            >
              📋
            </button>
            {copied === 'rgb' && <span className="cpicker-tooltip">Copied!</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
