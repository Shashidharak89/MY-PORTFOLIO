'use client';

import React, { useState } from 'react';
import './styles/Dashboard.css';
import Sample from './Sample';

const tools = [
  { id: 1, name: 'Sample Tool', component: <Sample /> },
  { id: 2, name: 'Color Picker', component: <div className="tool-content">🎨 This is a Color Picker</div> },
  { id: 3, name: 'QR Generator', component: <div className="tool-content">📦 This is a QR Code Generator</div> },
  { id: 4, name: 'Markdown Preview', component: <div className="tool-content">📄 This is a Markdown Previewer</div> },
];

export default function Dashboard() {
  const [activeToolId, setActiveToolId] = useState(null);

  const toggleTool = (id) => {
    setActiveToolId(activeToolId === id ? null : id);
  };

  return (
    <div className="flab-dashboard-container">
      <h2 className="flab-heading">🔧 FeatureLab Dashboard</h2>
      <div className="flab-tools-row">
        {tools.map((tool) => (
          <div key={tool.id} className="flab-tool-item">
            <button
              className={`flab-tool-button ${activeToolId === tool.id ? 'active' : ''}`}
              onClick={() => toggleTool(tool.id)}
            >
              {tool.name}
            </button>
            <div className={`flab-tool-dropdown ${activeToolId === tool.id ? 'open' : ''}`}>
              {activeToolId === tool.id && tool.component}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
