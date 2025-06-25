'use client';
import { useEffect, useState } from 'react';
import './styles/ViewSubscribers.css';

const ViewSubscribers = () => {
  const [allSubscribers, setAllSubscribers] = useState([]);
  const [displayedSubscribers, setDisplayedSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc'); // Date sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [emailSortOrder, setEmailSortOrder] = useState(null); // Email sorting: null | 'asc' | 'desc'

  const SUBSCRIBERS_PER_PAGE = 5;

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('/api/subscribers');
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data = await res.json();
        setAllSubscribers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load subscribers. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, []);

  useEffect(() => {
    if (allSubscribers.length === 0) return;

    let filtered = allSubscribers.filter(sub =>
      sub.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Date sort
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    // Email alphabetical sort
    if (emailSortOrder) {
      filtered = filtered.sort((a, b) => {
        const emailA = a.email.toLowerCase();
        const emailB = b.email.toLowerCase();
        return emailSortOrder === 'asc'
          ? emailA.localeCompare(emailB)
          : emailB.localeCompare(emailA);
      });
    }

    const startIndex = 0;
    const endIndex = currentPage * SUBSCRIBERS_PER_PAGE;
    setDisplayedSubscribers(filtered.slice(startIndex, endIndex));
  }, [allSubscribers, sortOrder, currentPage, searchTerm, emailSortOrder]);

  const handleSortToggle = () => {
    setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
    setCurrentPage(1);
  };

  const handleEmailSortToggle = () => {
    if (!emailSortOrder) setEmailSortOrder('asc');
    else if (emailSortOrder === 'asc') setEmailSortOrder('desc');
    else setEmailSortOrder(null);
    setCurrentPage(1);
  };

  const handleViewMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreSubscribers = () =>
    currentPage * SUBSCRIBERS_PER_PAGE < allSubscribers.length;

  const getRemainingCount = () =>
    allSubscribers.length - displayedSubscribers.length;

  const formatDate = dateString => {
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? 'Invalid Date'
      : date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
  };

  return (
    <div className="subscribers-container">
      <div className="subscribers-card">
        <div className="card-header">
          <div className="header-content">
            <h2 className="card-title">
              <span className="title-icon">📧</span> All Subscribers
            </h2>
            <div className="header-actions">
              <input
                type="text"
                placeholder="Search email..."
                className="search-input"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />

              {!loading && allSubscribers.length > 0 && (
                <>
                  <button
                    className="sort-button"
                    onClick={handleSortToggle}
                    title={`Sort by ${
                      sortOrder === 'desc' ? 'oldest' : 'newest'
                    }`}
                  >
                    📅 {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
                  </button>

                  <button
                    className="sort-button"
                    onClick={handleEmailSortToggle}
                    title="Sort email alphabetically"
                  >
                    🔤{' '}
                    {emailSortOrder === 'asc'
                      ? 'A → Z'
                      : emailSortOrder === 'desc'
                      ? 'Z → A'
                      : 'Reset'}
                  </button>
                </>
              )}

              {!loading && (
                <div className="subscriber-count">
                  <span className="count-badge">
                    {allSubscribers.length}{' '}
                    {allSubscribers.length === 1
                      ? 'Subscriber'
                      : 'Subscribers'}
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
          ) : displayedSubscribers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3 className="empty-title">No Subscribers Found</h3>
              <p className="empty-text">
                No results matched your search term.
              </p>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="subscribers-table">
                <thead className="table-header">
                  <tr>
                    <th className="table-header-cell">Email</th>
                    <th className="table-header-cell">Subscribed On</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {displayedSubscribers.map((subscriber, index) => (
                    <tr
                      key={subscriber._id || index}
                      className="table-row"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="table-cell">{subscriber.email}</td>
                      <td className="table-cell">
                        {formatDate(subscriber.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {displayedSubscribers.length > 0 && hasMoreSubscribers() && (
          <div className="table-footer">
            <div className="footer-content">
              <p className="footer-text">
                Showing {displayedSubscribers.length} of{' '}
                {allSubscribers.length} subscribers
              </p>
              <button className="view-more-button" onClick={handleViewMore}>
                👀 View More ({Math.min(SUBSCRIBERS_PER_PAGE, getRemainingCount())}{' '}
                remaining)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSubscribers;
