'use client';
import { useEffect, useState } from 'react';
import './styles/ViewSubscribers.css';

const ViewSubscribers = () => {
  const [allSubscribers, setAllSubscribers] = useState([]);
  const [displayedSubscribers, setDisplayedSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for newest first, 'asc' for oldest first
  
  const SUBSCRIBERS_PER_PAGE = 5;

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('/api/subscribers');
        
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        
        const data = await res.json();
        const validData = Array.isArray(data) ? data : [];
        setAllSubscribers(validData);
      } catch (err) {
        console.error('Failed to fetch subscribers:', err);
        setError('Failed to load subscribers. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  useEffect(() => {
    // Sort and paginate subscribers whenever allSubscribers, sortOrder, or currentPage changes
    if (allSubscribers.length > 0) {
      const sortedSubscribers = [...allSubscribers].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        
        if (sortOrder === 'desc') {
          return dateB - dateA; // Newest first
        } else {
          return dateA - dateB; // Oldest first
        }
      });

      const startIndex = 0;
      const endIndex = currentPage * SUBSCRIBERS_PER_PAGE;
      setDisplayedSubscribers(sortedSubscribers.slice(startIndex, endIndex));
    }
  }, [allSubscribers, sortOrder, currentPage]);

  const handleSortToggle = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleViewMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreSubscribers = () => {
    return currentPage * SUBSCRIBERS_PER_PAGE < allSubscribers.length;
  };

  const getRemainingCount = () => {
    return allSubscribers.length - (currentPage * SUBSCRIBERS_PER_PAGE);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (err) {
      return 'Invalid Date';
    }
  };

  const getSubscriberCount = () => {
    return allSubscribers.length;
  };

  const getSortButtonText = () => {
    return sortOrder === 'desc' ? 'Newest First' : 'Oldest First';
  };

  const getSortIcon = () => {
    return sortOrder === 'desc' ? '↓' : '↑';
  };

  return (
    <div className="subscribers-container">
      <div className="subscribers-card">
        <div className="card-header">
          <div className="header-content">
            <h2 className="card-title">
              <span className="title-icon">📧</span>
              All Subscribers
            </h2>
            <div className="header-actions">
              {!loading && allSubscribers.length > 0 && (
                <button 
                  className="sort-button"
                  onClick={handleSortToggle}
                  title={`Sort by ${sortOrder === 'desc' ? 'oldest' : 'newest'} first`}
                >
                  <span className="sort-icon">{getSortIcon()}</span>
                  <span className="sort-text">{getSortButtonText()}</span>
                </button>
              )}
              {!loading && (
                <div className="subscriber-count">
                  <span className="count-badge">
                    {getSubscriberCount()} {getSubscriberCount() === 1 ? 'Subscriber' : 'Subscribers'}
                  </span>
                </div>
              )}
            </div>
          </div>
          <p className="card-subtitle">Manage and view your email subscribers</p>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading subscribers...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <div className="error-icon">❌</div>
              <p className="error-text">{error}</p>
              <button 
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : allSubscribers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3 className="empty-title">No Subscribers Yet</h3>
              <p className="empty-text">
                Your subscriber list is empty. Share your newsletter to get your first subscribers!
              </p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="subscribers-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell email-header">
                      <div className="header-content-cell">
                        <span>Email Address</span>
                      </div>
                    </th>
                    <th className="table-header-cell date-header">
                      <div className="header-content-cell">
                        <span>Subscribed Date</span>
                        <span className="sort-indicator">{getSortIcon()}</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {displayedSubscribers.map((subscriber, index) => (
                    <tr 
                      key={subscriber._id || index} 
                      className="table-row"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="table-cell email-cell">
                        <div className="email-content">
                          <span className="email-icon">✉️</span>
                          <span className="email-text">{subscriber.email}</span>
                        </div>
                      </td>
                      <td className="table-cell date-cell">
                        <div className="date-content">
                          <span className="date-icon">📅</span>
                          <span className="date-text">{formatDate(subscriber.createdAt)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {allSubscribers.length > 0 && (
          <div className="table-footer">
            <div className="footer-content">
              <p className="footer-text">
                Showing {displayedSubscribers.length} of {allSubscribers.length} {allSubscribers.length === 1 ? 'subscriber' : 'subscribers'}
                {sortOrder === 'desc' ? ' (newest first)' : ' (oldest first)'}
              </p>
              {hasMoreSubscribers() && (
                <button 
                  className="view-more-button"
                  onClick={handleViewMore}
                >
                  <span className="view-more-icon">👀</span>
                  <span className="view-more-text">
                    View More ({Math.min(SUBSCRIBERS_PER_PAGE, getRemainingCount())} remaining)
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSubscribers;