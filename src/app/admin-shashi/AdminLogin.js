'use client';

import { useState } from 'react';
import { FaLock, FaKey, FaShieldHalved, FaEye, FaEyeSlash } from 'react-icons/fa6';
import './styles/AdminLogin.css';

const AdminLogin = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Store plain password in localStorage as requested
        if (typeof window !== 'undefined') {
          localStorage.setItem('admin_password', password);
        }
        onLoginSuccess(password);
      } else {
        setErrorMsg(data.error || 'Invalid admin password. Access denied.');
      }
    } catch (err) {
      setErrorMsg('Authentication error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-lock-icon-box">
            <FaShieldHalved />
          </div>
          <h2 className="admin-login-title">Admin Portal Authentication</h2>
          <p className="admin-login-subtitle">
            Enter your admin security password to access control panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="password-input-wrapper">
            <span className="input-icon"><FaKey /></span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {errorMsg && <div className="admin-error-banner">{errorMsg}</div>}

          <button type="submit" disabled={loading} className="admin-login-submit-btn">
            {loading ? 'Verifying Credentials...' : 'Unlock Admin Panel'}
          </button>
        </form>

        <div className="admin-login-footer">
          <span className="security-note">🔒 Password verified against secure Bcrypt hash</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
