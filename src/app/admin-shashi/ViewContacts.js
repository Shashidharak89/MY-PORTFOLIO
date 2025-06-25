'use client';
import { useEffect, useState } from 'react';
import './styles/ViewContacts.css';

const ViewContacts = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [displayedContacts, setDisplayedContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' for newest first, 'asc' for oldest first
  const [itemsToShow, setItemsToShow] = useState(5);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('/api/contacts');
        const data = await res.json();
        setAllContacts(data);
      } catch (err) {
        console.error('Failed to fetch contacts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    if (allContacts.length > 0) {
      // Sort contacts based on sortOrder
      const sortedContacts = [...allContacts].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      });

      // Display only the required number of contacts
      setDisplayedContacts(sortedContacts.slice(0, itemsToShow));
    }
  }, [allContacts, sortOrder, itemsToShow]);

  const handleSortToggle = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
    setItemsToShow(ITEMS_PER_PAGE); // Reset to first page when sorting
  };

  const handleViewMore = () => {
    setItemsToShow(prev => prev + ITEMS_PER_PAGE);
  };

  const remainingCount = allContacts.length - displayedContacts.length;
  const hasMoreItems = remainingCount > 0;

  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <h2 className="contacts-title">📥 Contact Messages</h2>
        
        {allContacts.length > 0 && (
          <div className="contacts-controls">
            <button 
              onClick={handleSortToggle}
              className="sort-button"
              title={`Currently showing ${sortOrder === 'desc' ? 'newest' : 'oldest'} first`}
            >
              <span>Sort by Date</span>
              <span className="sort-icon">{sortOrder === 'desc' ? '↓' : '↑'}</span>
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading contacts...</p>
        </div>
      ) : allContacts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No contact messages found.</p>
        </div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="contacts-table">
              <thead>
                <tr className="table-header-row">
                  <th className="table-header">Name</th>
                  <th className="table-header">Email</th>
                  <th className="table-header">Phone</th>
                  <th className="table-header">Message</th>
                  <th className="table-header">Date</th>
                </tr>
              </thead>
              <tbody>
                {displayedContacts.map((contact, index) => (
                  <tr 
                    key={contact._id} 
                    className="table-row"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="table-cell name-cell">{contact.name}</td>
                    <td className="table-cell email-cell">
                      <a href={`mailto:${contact.email}`} className="email-link">
                        {contact.email}
                      </a>
                    </td>
                    <td className="table-cell phone-cell">
                      {contact.phone && (
                        <a href={`tel:${contact.phone}`} className="phone-link">
                          {contact.phone}
                        </a>
                      )}
                    </td>
                    <td className="table-cell message-cell">
                      <div className="message-content">
                        {contact.message}
                      </div>
                    </td>
                    <td className="table-cell date-cell">
                      <div className="date-content">
                        <div className="date-text">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </div>
                        <div className="time-text">
                          {new Date(contact.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {hasMoreItems && (
            <div className="view-more-container">
              <button 
                onClick={handleViewMore}
                className="view-more-button"
              >
                <span>View More</span>
                <span className="remaining-count">({remainingCount} remaining)</span>
              </button>
            </div>
          )}

          <div className="stats-container">
            <span className="stats-text">
              Showing <span className="stats-highlight">{displayedContacts.length}</span> of <span className="stats-highlight">{allContacts.length}</span> contacts
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewContacts;