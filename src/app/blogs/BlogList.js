'use client';

import { useEffect, useState, useRef } from 'react';
import './styles/BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeBlog, setActiveBlog] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [message, setMessage] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState(new Set());
  const [displayedComments, setDisplayedComments] = useState(5);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const intervalRef = useRef(null);
  const heartIdRef = useRef(0);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setBlogs(data);
      setLoadingBlogs(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    
    // Real-time updates every 3 seconds
    if (realTimeUpdates) {
      intervalRef.current = setInterval(fetchBlogs, 3000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [realTimeUpdates]);

  const createFloatingHeart = (blogId, event) => {
    const heartId = heartIdRef.current++;
    const rect = event?.target.getBoundingClientRect();
    
    const newHeart = {
      id: heartId,
      blogId,
      x: rect ? rect.left + rect.width / 2 : Math.random() * window.innerWidth,
      y: rect ? rect.top : Math.random() * 200 + 100,
      delay: Math.random() * 0.3,
    };
    
    setFloatingHearts(prev => [...prev, newHeart]);
    
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(heart => heart.id !== heartId));
    }, 2500);
  };

  const handleLike = async (id, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    if (isLiking || likedBlogs.has(id)) return;
    
    setIsLiking(true);
    setLikedBlogs(prev => new Set([...prev, id]));
    
    // Create floating heart animation
    createFloatingHeart(id, event);
    
    try {
      await fetch('/api/like', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      // Update local state immediately for real-time feel
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog._id === id ? { ...blog, likes: blog.likes + 1 } : blog
        )
      );
      
      if (activeBlog?._id === id) {
        setActiveBlog(prev => ({ ...prev, likes: prev.likes + 1 }));
      }
      
    } catch (error) {
      console.error('Error liking post:', error);
    }
    
    setTimeout(() => {
      setIsLiking(false);
    }, 1000);
    
    // Remove from liked set after animation
    setTimeout(() => {
      setLikedBlogs(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 2000);
  };

  const handleComment = async () => {
    if (!commentInput.trim() || !activeBlog || isCommenting) return;
    
    setIsCommenting(true);
    setMessage('💭 Sending your comment...');
    
    const newComment = commentInput.trim();
    
    try {
      const res = await fetch('/api/comment', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: activeBlog._id, comment: newComment }),
      });

      if (res.ok) {
        // Immediately add comment to local state for real-time feel
        const updatedBlog = {
          ...activeBlog,
          comments: [newComment, ...activeBlog.comments]
        };
        
        setActiveBlog(updatedBlog);
        setBlogs(prevBlogs => 
          prevBlogs.map(blog => 
            blog._id === activeBlog._id ? updatedBlog : blog
          )
        );
        
        setCommentInput('');
        setMessage('✅ Comment sent successfully!');
        setDisplayedComments(5); // Reset to show latest comments
        
      } else {
        setMessage('❌ Failed to send comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setMessage('❌ Network error occurred');
    }
    
    setIsCommenting(false);
    setTimeout(() => setMessage(''), 4000);
  };

  const loadMoreComments = () => {
    setDisplayedComments(prev => Math.min(prev + 5, activeBlog.comments.length));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleComment();
    }
  };

  if (activeBlog) {
    const commentsToShow = activeBlog.comments.slice(0, displayedComments);
    const hasMoreComments = displayedComments < activeBlog.comments.length;

    return (
      <div className="crimson-blogdetail-wrapper">
        {/* Floating Hearts Container */}
        <div className="crimson-floating-hearts-container">
          {floatingHearts.map(heart => (
            <div
              key={heart.id}
              className="crimson-floating-heart"
              style={{
                left: `${heart.x}px`,
                top: `${heart.y}px`,
                animationDelay: `${heart.delay}s`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
        
        <div className="crimson-detail-header">
          <button 
            onClick={() => {
              setActiveBlog(null);
              setDisplayedComments(5);
              setMessage('');
              setCommentInput('');
            }} 
            className="crimson-back-btn"
          >
            <span className="crimson-back-icon">←</span>
            <span>Back to Posts</span>
          </button>
          
          <div className="crimson-realtime-status">
            <div className={`crimson-live-indicator ${realTimeUpdates ? 'crimson-live-active' : ''}`}>
              <div className="crimson-live-pulse"></div>
            </div>
            <span className="crimson-live-text">Live Updates</span>
          </div>
        </div>
        
        <div className="crimson-blogdetail-content">
          <div className="crimson-detail-hero">
            <h1 className="crimson-detail-title">{activeBlog.blogname}</h1>
            <div className="crimson-detail-meta">
              <span className="crimson-meta-badge">
                <span className="crimson-heart-icon">❤️</span>
                {activeBlog.likes} likes
              </span>
              <span className="crimson-meta-badge">
                <span className="crimson-comment-icon">💬</span>
                {activeBlog.comments.length} comments
              </span>
            </div>
          </div>
          
          <div className="crimson-image-showcase">
            <img 
              src={activeBlog.imageurl[0]} 
              alt={activeBlog.blogname}
              className="crimson-detail-image" 
            />
            <div className="crimson-image-actions">
              <button 
                className={`crimson-image-like-btn ${likedBlogs.has(activeBlog._id) ? 'crimson-liked' : ''}`}
                onClick={(e) => handleLike(activeBlog._id, e)}
                disabled={isLiking}
              >
                <span className="crimson-heart-bounce">❤️</span>
              </button>
            </div>
          </div>
          
          <div className="crimson-content-section">
            <div className="crimson-description-box">
              <h3 className="crimson-section-title">About This Post</h3>
              <div className="crimson-description-content">
                <p className="crimson-description-text">{activeBlog.description}</p>
              </div>
            </div>

            <div className="crimson-actions-bar">
              <button 
                className={`crimson-action-btn crimson-like-action ${isLiking ? 'crimson-liking' : ''} ${likedBlogs.has(activeBlog._id) ? 'crimson-just-liked' : ''}`}
                onClick={(e) => handleLike(activeBlog._id, e)}
                disabled={isLiking}
              >
                <span className="crimson-btn-icon">❤️</span>
                <span className="crimson-btn-text">
                  {isLiking ? 'Liking...' : 'Like Post'}
                </span>
                <div className="crimson-btn-ripple"></div>
              </button>
              
              <div className="crimson-stats-display">
                <div className="crimson-stat-item">
                  <span className="crimson-stat-number">{activeBlog.likes}</span>
                  <span className="crimson-stat-label">Likes</span>
                </div>
                <div className="crimson-stat-divider"></div>
                <div className="crimson-stat-item">
                  <span className="crimson-stat-number">{activeBlog.comments.length}</span>
                  <span className="crimson-stat-label">Comments</span>
                </div>
              </div>
            </div>
          </div>

          <div className="crimson-comments-section">
            <div className="crimson-comments-header">
              <h3 className="crimson-comments-title">
                Comments ({activeBlog.comments.length})
              </h3>
              {activeBlog.comments.length > 0 && (
                <span className="crimson-comments-sort">Latest First</span>
              )}
            </div>
            
            <div className="crimson-comment-composer">
              <div className="crimson-composer-container">
                <textarea
                  className="crimson-comment-textarea"
                  placeholder="Share your thoughts... (Ctrl+Enter to send)"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isCommenting}
                  rows="3"
                  maxLength="500"
                />
                <div className="crimson-composer-footer">
                  <span className="crimson-char-counter">
                    {commentInput.length}/500
                  </span>
                  <button 
                    className={`crimson-send-btn ${isCommenting ? 'crimson-sending' : ''}`}
                    onClick={handleComment}
                    disabled={isCommenting || !commentInput.trim() || commentInput.length > 500}
                  >
                    {isCommenting ? (
                      <>
                        <div className="crimson-send-spinner"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="crimson-send-icon">💬</span>
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {message && (
              <div className={`crimson-status-message ${
                message.includes('✅') ? 'crimson-success' : 
                message.includes('❌') ? 'crimson-error' : 'crimson-info'
              }`}>
                <span className="crimson-message-text">{message}</span>
              </div>
            )}
            
            <div className="crimson-comments-list">
              {commentsToShow.length > 0 ? (
                <>
                  <div className="crimson-comments-container">
                    {commentsToShow.map((comment, idx) => (
                      <div 
                        key={`${comment}-${idx}`} 
                        className="crimson-comment-card"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="crimson-comment-avatar">
                          <div className="crimson-avatar-circle">
                            <span className="crimson-avatar-icon">👤</span>
                          </div>
                        </div>
                        <div className="crimson-comment-body">
                          <div className="crimson-comment-meta">
                            <span className="crimson-comment-author">Anonymous User</span>
                            <span className="crimson-comment-time">Just now</span>
                          </div>
                          <p className="crimson-comment-message">{comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {hasMoreComments && (
                    <button 
                      className="crimson-load-more-comments"
                      onClick={loadMoreComments}
                    >
                      <span className="crimson-load-icon">⬇️</span>
                      <span>Load {Math.min(5, activeBlog.comments.length - displayedComments)} more comments</span>
                    </button>
                  )}
                </>
              ) : (
                <div className="crimson-empty-comments">
                  <div className="crimson-empty-icon">💭</div>
                  <h4>No comments yet</h4>
                  <p>Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="crimson-bloglist-container">
      {/* Floating Hearts Container */}
      <div className="crimson-floating-hearts-container">
        {floatingHearts.map(heart => (
          <div
            key={heart.id}
            className="crimson-floating-heart"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
              animationDelay: `${heart.delay}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      
      <div className="crimson-main-header">
        <div className="crimson-header-content">
          <h1 className="crimson-main-title">
            <span className="crimson-title-accent">Featured</span>
            <span className="crimson-title-main">Blog Posts</span>
          </h1>
          <div className="crimson-title-decoration">
            <div className="crimson-decoration-line"></div>
            <div className="crimson-decoration-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
          <p className="crimson-main-subtitle">Discover amazing stories and insights from our community</p>
        </div>
        
        <div className="crimson-header-controls">
          <button 
            className={`crimson-realtime-toggle ${realTimeUpdates ? 'crimson-toggle-active' : ''}`}
            onClick={() => setRealTimeUpdates(!realTimeUpdates)}
          >
            <div className="crimson-toggle-switch">
              <div className="crimson-toggle-dot"></div>
            </div>
            <span className="crimson-toggle-label">Real-time Updates</span>
          </button>
        </div>
      </div>
      
      <div className="crimson-blogs-grid">
        {loadingBlogs ? (
          <div className="crimson-loading-state">
            <div className="crimson-loading-spinner-container">
              <div className="crimson-loading-spinner"></div>
              <div className="crimson-loading-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            <p className="crimson-loading-message">Loading amazing content...</p>
          </div>
        ) : (
          blogs.map((blog, index) => (
            <div 
              key={blog._id} 
              className="crimson-blog-card" 
              onClick={() => setActiveBlog(blog)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="crimson-card-image-wrapper">
                <img 
                  src={blog.imageurl[0]} 
                  alt={blog.blogname}
                  className="crimson-card-image" 
                />
                <div className="crimson-card-overlay">
                  <div className="crimson-overlay-content">
                    <span className="crimson-read-more-text">Read Full Story</span>
                    <div className="crimson-overlay-stats">
                      <span className="crimson-overlay-stat">❤️ {blog.likes}</span>
                      <span className="crimson-overlay-stat">💬 {blog.comments.length}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  className={`crimson-quick-like-btn ${likedBlogs.has(blog._id) ? 'crimson-quick-liked' : ''}`}
                  onClick={(e) => handleLike(blog._id, e)}
                  disabled={isLiking}
                >
                  <span className="crimson-quick-heart">❤️</span>
                </button>
              </div>
              
              <div className="crimson-card-content">
                <h2 className="crimson-card-title">{blog.blogname}</h2>
                <p className="crimson-card-description">
                  {blog.description.length > 120 
                    ? `${blog.description.substring(0, 120)}...` 
                    : blog.description
                  }
                </p>
                
                <div className="crimson-card-footer">
                  <div className="crimson-card-stats">
                    <span className="crimson-card-stat">
                      <span className="crimson-stat-icon">❤️</span>
                      <span className="crimson-stat-count">{blog.likes}</span>
                    </span>
                    <span className="crimson-card-stat">
                      <span className="crimson-stat-icon">💬</span>
                      <span className="crimson-stat-count">{blog.comments.length}</span>
                    </span>
                  </div>
                  <div className="crimson-read-time">
                    <span className="crimson-time-icon">📖</span>
                    <span className="crimson-time-text">2 min read</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {blogs.length === 0 && !loadingBlogs && (
        <div className="crimson-empty-state">
          <div className="crimson-empty-icon">📝</div>
          <h3>No posts available</h3>
          <p>Check back later for new content!</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;