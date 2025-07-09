'use client';

import React, { useState } from 'react';
import './styles/Dashboard.css';
import { useRouter } from 'next/navigation';

const tools = [
  {
    id: 1,
    name: 'Hashing tool',
    description: 'A sample tool to Hash the string using bcryptjs hashing method',
    route: '/featurelab/hash'
  },
  {
    id: 2,
    name: 'Color Picker',
    description: 'Pick a color and get its hex/RGB values instantly.',
    route: '/featurelab/colorpicker'
  },
  {
    id: 3,
    name: 'QR Generator',
    description: 'Generate QR codes for any text or URL in one click.',
    route: '/featurelab/qrgenerator'
  },
  {
    id: 4,
    name: 'Markdown Preview',
    description: 'Preview live markdown as formatted HTML.',
    route: '/featurelab/markdown'
  },
];

export default function Dashboard() {
  const [activeToolId, setActiveToolId] = useState(null);
  const router = useRouter();

  const toggleTool = (id) => {
    setActiveToolId(activeToolId === id ? null : id);
  };

  const handleVisit = (route) => {
    router.push(route);
  };

  return (
    <div className="flab-dashboard-wrapper">
      <div className="flab-dashboard-container">
        <h2 className="flab-dashboard-title">🔧 Feature Lab</h2>
        <div className="flab-dashboard-grid">
          {tools.map((tool) => (
            <div key={tool.id} className="flab-tool-card">
              <button
                className={`flab-tool-header ${activeToolId === tool.id ? 'flab-active' : ''}`}
                onClick={() => toggleTool(tool.id)}
              >
                <span className="flab-tool-name">{tool.name}</span>
                <span className={`flab-chevron ${activeToolId === tool.id ? 'flab-rotated' : ''}`}>
                  ▼
                </span>
              </button>
              <div className={`flab-tool-content ${activeToolId === tool.id ? 'flab-expanded' : ''}`}>
                <div className="flab-tool-inner">
                  <p className="flab-tool-description">{tool.description}</p>
                  <button
                    className="flab-visit-btn"
                    onClick={() => handleVisit(tool.route)}
                  >
                    Visit Tool
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}