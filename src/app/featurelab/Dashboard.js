'use client';

import React, { useState } from 'react';
import './styles/Dashboard.css';
import { useRouter } from 'next/navigation';

const tools = [
  {
    id: 1,
    name: 'Sample Tool',
    description: 'A sample tool to demonstrate routing and UI behavior.',
    route: '/featurelab/sample'
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
      <h2 className="flab-dashboard-title">🔧 Feature Lab</h2>
      <div className="flab-dashboard-list">
        {tools.map((tool) => (
          <div key={tool.id} className="flab-tool-block">
            <button
              className={`flab-tool-toggle ${activeToolId === tool.id ? 'active' : ''}`}
              onClick={() => toggleTool(tool.id)}
            >
              {tool.name}
            </button>
            <div className={`flab-tool-dropdown ${activeToolId === tool.id ? 'open' : ''}`}>
              {activeToolId === tool.id && (
                <div className="flab-tool-description">
                  <p>{tool.description}</p>
                  <button
                    className="flab-visit-button"
                    onClick={() => handleVisit(tool.route)}
                  >
                    Visit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
