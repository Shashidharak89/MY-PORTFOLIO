'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FooterC from '../components/FooterC';
import ViewContacts from './ViewContacts';
import ViewSubscribers from './ViewSubscribers';
import SendUpdateForm from './SendUpdateForm';
import ManageBlogs from './ManageBlogs';
import AdminChatBox from './AdminChatBox';
import AdminLogin from './AdminLogin';
import { FaShieldHalved, FaRightFromBracket, FaBlog, FaEnvelope, FaUsers, FaPaperPlane, FaComments } from 'react-icons/fa6';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeSection, setActiveSection] = useState('blogs'); // 'blogs', 'contacts', 'subscribers', 'broadcast', 'chat'

  // Verify stored password on mount
  useEffect(() => {
    const verifyStoredAuth = async () => {
      const storedPassword = typeof window !== 'undefined' ? localStorage.getItem('admin_password') : null;

      if (!storedPassword) {
        setCheckingAuth(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        const res = await fetch('/api/admin/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: storedPassword }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setIsAuthenticated(true);
        } else {
          // Stored password is no longer valid
          localStorage.removeItem('admin_password');
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyStoredAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_password');
    }
    setIsAuthenticated(false);
  };

  return (
    <>
      <Navbar />

      <div style={styles.adminPageContainer}>
        {checkingAuth ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Verifying Admin Session...</p>
          </div>
        ) : !isAuthenticated ? (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div style={styles.adminDashboardContent}>
            {/* Top Admin Header Bar */}
            <div style={styles.topAdminBar}>
              <div style={styles.adminTitleBox}>
                <FaShieldHalved style={styles.adminShieldIcon} />
                <div>
                  <h1 style={styles.adminHeaderTitle}>Admin Control Center</h1>
                  <span style={styles.authBadge}>Authenticated Admin Session</span>
                </div>
              </div>

              <button onClick={handleLogout} style={styles.logoutBtn} title="Sign Out of Admin Portal">
                <FaRightFromBracket /> Logout
              </button>
            </div>

            {/* Quick Section Navigation Bar */}
            <div style={styles.sectionNavGrid}>
              <button 
                onClick={() => setActiveSection('blogs')} 
                style={activeSection === 'blogs' ? { ...styles.sectionNavBtn, ...styles.activeSectionBtn } : styles.sectionNavBtn}
              >
                <FaBlog /> Manage Blogs
              </button>

              <button 
                onClick={() => setActiveSection('contacts')} 
                style={activeSection === 'contacts' ? { ...styles.sectionNavBtn, ...styles.activeSectionBtn } : styles.sectionNavBtn}
              >
                <FaEnvelope /> Contacts
              </button>

              <button 
                onClick={() => setActiveSection('subscribers')} 
                style={activeSection === 'subscribers' ? { ...styles.sectionNavBtn, ...styles.activeSectionBtn } : styles.sectionNavBtn}
              >
                <FaUsers /> Subscribers
              </button>

              <button 
                onClick={() => setActiveSection('broadcast')} 
                style={activeSection === 'broadcast' ? { ...styles.sectionNavBtn, ...styles.activeSectionBtn } : styles.sectionNavBtn}
              >
                <FaPaperPlane /> Broadcast
              </button>

              <button 
                onClick={() => setActiveSection('chat')} 
                style={activeSection === 'chat' ? { ...styles.sectionNavBtn, ...styles.activeSectionBtn } : styles.sectionNavBtn}
              >
                <FaComments /> Support Chat
              </button>
            </div>

            {/* Active Content Panel */}
            <div style={styles.activePanelContainer}>
              {activeSection === 'blogs' && <ManageBlogs />}
              {activeSection === 'contacts' && <ViewContacts />}
              {activeSection === 'subscribers' && <ViewSubscribers />}
              {activeSection === 'broadcast' && <SendUpdateForm />}
              {activeSection === 'chat' && <AdminChatBox />}
            </div>
          </div>
        )}
      </div>

      <FooterC />
    </>
  );
}

const styles = {
  adminPageContainer: {
    minHeight: '85vh',
    width: '100%',
    background: '#fafafa',
    backgroundImage: 'radial-gradient(rgba(220, 38, 38, 0.08) 1px, transparent 1px)',
    backgroundSize: '32px 32px',
    color: '#111827',
    padding: '30px 16px',
    boxSizing: 'border-box',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(220, 38, 38, 0.2)',
    borderTopColor: '#dc2626',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    marginTop: '16px',
    fontSize: '15px',
    color: '#6b7280',
    fontWeight: '500',
  },
  adminDashboardContent: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  topAdminBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    background: '#ffffff',
    borderRadius: '20px',
    border: '1px solid #f3f4f6',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
  },
  adminTitleBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
  },
  adminShieldIcon: {
    fontSize: '32px',
    color: '#dc2626',
  },
  adminHeaderTitle: {
    fontSize: '22px',
    fontWeight: '800',
    margin: '0 0 2px 0',
    color: '#111827',
  },
  authBadge: {
    fontSize: '12px',
    color: '#059669',
    fontWeight: '600',
    background: '#ecfdf5',
    padding: '2px 8px',
    borderRadius: '6px',
    border: '1px solid #a7f3d0',
  },
  logoutBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    background: 'rgba(220, 38, 38, 0.08)',
    color: '#dc2626',
    border: '1px solid rgba(220, 38, 38, 0.2)',
    borderRadius: '12px',
    fontWeight: '700',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  sectionNavGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '24px',
  },
  sectionNavBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    background: '#ffffff',
    color: '#4b5563',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
    transition: 'all 0.25s ease',
  },
  activeSectionBtn: {
    background: '#dc2626',
    color: '#ffffff',
    borderColor: '#dc2626',
    boxShadow: '0 8px 24px rgba(220, 38, 38, 0.25)',
  },
  activePanelContainer: {
    width: '100%',
  },
};
