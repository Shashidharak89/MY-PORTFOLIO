'use client';
import { useEffect, useState } from 'react';
import './styles/BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [visibleComments, setVisibleComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [isLiking, setIsLiking] = useState({});
  const [isCommenting, setIsCommenting] = useState({});
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [heartAnimations, setHeartAnimations] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState(new Set());
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
      setLoadingBlogs(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoadingBlogs(false);
    }
  };

  // Fetch comments for a blog
  const fetchComments = async (id) => {
    try {
      const res = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      setComments(prev => ({ ...prev, [id]: data }));
      setVisibleComments(prev => ({ ...prev, [id]: 5 }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Handle like with animation
  const handleLike = async (id, event) => {
    if (isLiking[id] || likedBlogs.has(id)) return;
    
    setIsLiking(prev => ({ ...prev, [id]: true }));
    setLikedBlogs(prev => new Set([...prev, id]));
    
    // Create heart animation
    const rect = event.currentTarget.getBoundingClientRect();
    const heartId = Date.now() + Math.random();
    const newHeart = {
      id: heartId,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    
    setHeartAnimations(prev => [...prev, newHeart]);
    
    // Remove heart after animation
    setTimeout(() => {
      setHeartAnimations(prev => prev.filter(heart => heart.id !== heartId));
    }, 2500);

    try {
      await fetch('/api/like', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      // Update likes count locally for immediate feedback
      setBlogs(prev => prev.map(blog => 
        blog._id === id ? { ...blog, likes: blog.likes + 1 } : blog
      ));
      
      setTimeout(() => {
        setIsLiking(prev => ({ ...prev, [id]: false }));
      }, 1000);
    } catch (error) {
      console.error('Error liking post:', error);
      setIsLiking(prev => ({ ...prev, [id]: false }));
    }

    // Remove from liked set after animation
    setTimeout(() => {
      setLikedBlogs(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 2000);
  };

  // Handle comment submit with animation
  const handleCommentSubmit = async (id) => {
    if (!newComment[id]?.trim() || isCommenting[id]) return;
    
    setIsCommenting(prev => ({ ...prev, [id]: true }));
    
    try {
      const commentText = newComment[id];
      const tempComment = {
        text: commentText,
        time: new Date().toISOString(),
        isTemp: true
      };
      
      // Add temporary comment for immediate feedback
      setComments(prev => ({
        ...prev,
        [id]: [tempComment, ...(prev[id] || [])]
      }));
      
      await fetch('/api/comment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, comment: commentText }),
      });
      
      setNewComment(prev => ({ ...prev, [id]: '' }));
      
      // Refresh comments to get the real comment
      setTimeout(() => {
        fetchComments(id);
        setIsCommenting(prev => ({ ...prev, [id]: false }));
      }, 500);
      
    } catch (error) {
      console.error('Error posting comment:', error);
      setIsCommenting(prev => ({ ...prev, [id]: false }));
    }
  };

  // Toggle comments visibility
  const toggleComments = (id) => {
    if (!showComments[id]) {
      fetchComments(id);
    }
    setShowComments(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Load more comments
  const loadMoreComments = (id) => {
    setVisibleComments(prev => ({
      ...prev,
      [id]: (prev[id] || 5) + 5
    }));
  };

  // Handle blog post click
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    if (!showComments[blog._id]) {
      fetchComments(blog._id);
    }
  };

  // Close detailed view
  const closeDetailedView = () => {
    setSelectedBlog(null);
  };

  // Handle key press for comment input
  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleCommentSubmit(id);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Detailed view (similar to sample design)
  if (selectedBlog) {
    const commentsToShow = comments[selectedBlog._id] ? 
      comments[selectedBlog._id].slice(0, visibleComments[selectedBlog._id] || 5) : [];
    const hasMoreComments = comments[selectedBlog._id] && 
      (visibleComments[selectedBlog._id] || 5) < comments[selectedBlog._id].length;

    return (
      <div className="crimson-blogdetail-wrapper">
        {/* Floating Hearts Container */}
        <div className="crimson-floating-hearts-container">
          {heartAnimations.map(heart => (
            <div
              key={heart.id}
              className="crimson-floating-heart"
              style={{
                left: `${heart.x}px`,
                top: `${heart.y}px`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
        
        <div className="crimson-detail-header">
          <button 
            onClick={closeDetailedView}
            className="crimson-back-btn"
          >
            <span className="crimson-back-icon">←</span>
            <span>Back to Posts</span>
          </button>
        </div>
        
        <div className="crimson-blogdetail-content">
          <div className="crimson-detail-hero">
            <h1 className="crimson-detail-title">{selectedBlog.blogname}</h1>
            <div className="crimson-detail-meta">
              <span className="crimson-meta-badge">
                <span className="crimson-heart-icon">❤️</span>
                {selectedBlog.likes} likes
              </span>
              <span className="crimson-meta-badge">
                <span className="crimson-comment-icon">💬</span>
                {comments[selectedBlog._id]?.length || 0} comments
              </span>
              <span className="crimson-meta-badge">
                <span className="crimson-date-icon">📅</span>
                {new Date(selectedBlog.posted).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
          
          {selectedBlog.imageurl && selectedBlog.imageurl.length > 0 && selectedBlog.imageurl[0] !== 'xyz.jpg' && (
            <div className="crimson-image-showcase">
              <img 
                src={selectedBlog.imageurl[0]} 
                alt={selectedBlog.blogname}
                className="crimson-detail-image" 
              />
              <div className="crimson-image-actions">
                <button 
                  className={`crimson-image-like-btn ${likedBlogs.has(selectedBlog._id) ? 'crimson-liked' : ''}`}
                  onClick={(e) => handleLike(selectedBlog._id, e)}
                  disabled={isLiking[selectedBlog._id]}
                >
                  <span className="crimson-heart-bounce">❤️</span>
                </button>
              </div>
            </div>
          )}
          
          <div className="crimson-content-section">
            <div className="crimson-description-box">
              <h3 className="crimson-section-title">About This Post</h3>
              <div className="crimson-description-content">
                {selectedBlog.description.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="crimson-description-text">{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="crimson-actions-bar">
              <button 
                className={`crimson-action-btn crimson-like-action ${isLiking[selectedBlog._id] ? 'crimson-liking' : ''} ${likedBlogs.has(selectedBlog._id) ? 'crimson-just-liked' : ''}`}
                onClick={(e) => handleLike(selectedBlog._id, e)}
                disabled={isLiking[selectedBlog._id]}
              >
                <span className="crimson-btn-icon">❤️</span>
                <span className="crimson-btn-text">
                  {isLiking[selectedBlog._id] ? 'Liking...' : 'Like Post'}
                </span>
                <div className="crimson-btn-ripple"></div>
              </button>
              
              <div className="crimson-stats-display">
                <div className="crimson-stat-item">
                  <span className="crimson-stat-number">{selectedBlog.likes}</span>
                  <span className="crimson-stat-label">Likes</span>
                </div>
                <div className="crimson-stat-divider"></div>
                <div className="crimson-stat-item">
                  <span className="crimson-stat-number">{comments[selectedBlog._id]?.length || 0}</span>
                  <span className="crimson-stat-label">Comments</span>
                </div>
              </div>
            </div>
          </div>

          <div className="crimson-comments-section">
            <div className="crimson-comments-header">
              <h3 className="crimson-comments-title">
                Comments ({comments[selectedBlog._id]?.length || 0})
              </h3>
              {comments[selectedBlog._id] && comments[selectedBlog._id].length > 0 && (
                <span className="crimson-comments-sort">Latest First</span>
              )}
            </div>
            
            <div className="crimson-comment-composer">
              <div className="crimson-composer-container">
                <textarea
                  className="crimson-comment-textarea"
                  placeholder="Share your thoughts... (Ctrl+Enter to send)"
                  value={newComment[selectedBlog._id] || ''}
                  onChange={(e) => setNewComment(prev => ({ ...prev, [selectedBlog._id]: e.target.value }))}
                  onKeyPress={(e) => handleKeyPress(e, selectedBlog._id)}
                  disabled={isCommenting[selectedBlog._id]}
                  rows="3"
                  maxLength="500"
                />
                <div className="crimson-composer-footer">
                  <span className="crimson-char-counter">
                    {(newComment[selectedBlog._id] || '').length}/500
                  </span>
                  <button 
                    className={`crimson-send-btn ${isCommenting[selectedBlog._id] ? 'crimson-sending' : ''}`}
                    onClick={() => handleCommentSubmit(selectedBlog._id)}
                    disabled={isCommenting[selectedBlog._id] || !newComment[selectedBlog._id]?.trim()}
                  >
                    {isCommenting[selectedBlog._id] ? (
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
            
            <div className="crimson-comments-list">
              {commentsToShow.length > 0 ? (
                <>
                  <div className="crimson-comments-container">
                    {commentsToShow.map((comment, idx) => (
                      <div 
                        key={`${comment.text}-${idx}`} 
                        className={`crimson-comment-card ${comment.isTemp ? 'crimson-temp-comment' : ''}`}
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="crimson-comment-avatar">
                          <div className="crimson-avatar-circle">
                            <span className="crimson-avatar-icon">👤</span>
                          </div>
                        </div>
                        <div className="crimson-comment-body">
                          <div className="crimson-comment-meta">
                            <span className="crimson-comment-time">
                              {new Date(comment.time).toLocaleString()}
                            </span>
                          </div>
                          <div className="crimson-comment-message">
                            {comment.text.split('\n').map((line, lineIdx) => (
                              <p key={lineIdx}>{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {hasMoreComments && (
                    <button 
                      className="crimson-load-more-comments"
                      onClick={() => loadMoreComments(selectedBlog._id)}
                    >
                      <span className="crimson-load-icon">⬇️</span>
                      <span>Load {Math.min(5, comments[selectedBlog._id].length - (visibleComments[selectedBlog._id] || 5))} more comments</span>
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
        {heartAnimations.map(heart => (
          <div
            key={heart.id}
            className="crimson-floating-heart"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
            }}
          >
            ❤️
          </div>
        ))}
      </div>
      
      <div className="crimson-main-header">
        <div className="crimson-header-content">
          <h1 className="crimson-main-title">
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
              onClick={() => handleBlogClick(blog)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="crimson-card-image-wrapper">
                {blog.imageurl && blog.imageurl.length > 0 && blog.imageurl[0] !== 'xyz.jpg' ? (
                  <img 
                    src={blog.imageurl[0]} 
                    alt={blog.blogname}
                    className="crimson-card-image" 
                  />
                ) : (
                  <div className="crimson-card-placeholder">
                    <span className="crimson-placeholder-icon">📝</span>
                  </div>
                )}
                <div className="crimson-card-overlay">
                  <div className="crimson-overlay-content">
                    <span className="crimson-read-more-text">Read Full Story</span>
                    <div className="crimson-overlay-stats">
                      <span className="crimson-overlay-stat">❤️ {blog.likes}</span>
                      <span className="crimson-overlay-stat">💬 {comments[blog._id]?.length || 0}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  className={`crimson-quick-like-btn ${likedBlogs.has(blog._id) ? 'crimson-quick-liked' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike(blog._id, e);
                  }}
                  disabled={isLiking[blog._id]}
                >
                  <span className="crimson-quick-heart">❤️</span>
                </button>
              </div>
              
              <div className="crimson-card-content">
                <h2 className="crimson-card-title">{blog.blogname}</h2>
                <div className="crimson-card-description">
                  {blog.description.split('\n').slice(0, 2).map((paragraph, idx) => (
                    <p key={idx} className="crimson-card-paragraph">
                      {paragraph.length > 120 ? `${paragraph.substring(0, 120)}...` : paragraph}
                    </p>
                  ))}
                </div>
                
                <div className="crimson-card-footer">
                  <div className="crimson-card-stats">
                    <span className="crimson-card-stat">
                      <span className="crimson-stat-icon">❤️</span>
                      <span className="crimson-stat-count">{blog.likes}</span>
                    </span>
                    <span className="crimson-card-stat">
                      <span className="crimson-stat-icon">💬</span>
                      <span className="crimson-stat-count">{comments[blog._id]?.length || 0}</span>
                    </span>
                  </div>
                  <div className="crimson-read-time">
                    <span className="crimson-time-icon">📅</span>
                    <span className="crimson-time-text">
                      {new Date(blog.posted).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
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