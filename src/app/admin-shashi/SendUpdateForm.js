'use client';
import { useState } from 'react';
import './styles/SendUpdateForm.css';

const SendUpdateForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    date: '',
    description: '',
    projectlink: ''
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/subscribers/send-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('✅ Email sent to all subscribers successfully!');
        setFormData({ projectName: '', date: '', description: '', projectlink: '' });
      } else {
        setStatus(`❌ Failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ Something went wrong while sending.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="send-update-container">
      <div className="send-update-card">
        <div className="card-header">
          <h2 className="card-title">Send Project Update</h2>
          <p className="card-subtitle">Share your latest project with all subscribers</p>
        </div>
        
        <form onSubmit={handleSubmit} className="update-form">
          <div className="input-group">
            <label htmlFor="projectName" className="input-label">Project Name</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              className="form-input"
              placeholder="Enter your project name"
              value={formData.projectName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="date" className="input-label">Project Date</label>
            <input
              type="date"
              id="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="description" className="input-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              placeholder="Describe your project and its key features..."
              rows="5"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="projectlink" className="input-label">Project Link</label>
            <input
              type="text"
              id="projectlink"
              name="projectlink"
              className="form-input"
              placeholder="https://your-project.com"
              value={formData.projectlink}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            <span className="button-icon">📤</span>
            <span className="button-text">
              {isSubmitting ? 'Sending...' : 'Send Update'}
            </span>
          </button>
        </form>

        {status && (
          <div className={`status-message ${status.includes('✅') ? 'success' : 'error'}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default SendUpdateForm;