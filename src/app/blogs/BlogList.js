'use client';
import { useEffect, useState } from 'react';
import './styles/BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [visibleComments, setVisibleComments] = useState({});
  const [showComments, setShowComments] = useState({});
  const [isLiking, setIsLiking] = useState({});
  const [isCommenting, setIsCommenting] = useState({});
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [heartAnimations, setHeartAnimations] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState(new Set());
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // Format time to relative format (e.g., "4 minutes ago")
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - commentDate) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  };

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

  // Get comments for a specific blog (already included in blog data)
  const getBlogComments = (blogId) => {
    const blog = blogs.find(b => b._id === blogId);
    if (!blog || !blog.comments) return [];
    
    // Sort comments by time (latest first)
    return [...blog.comments].sort((a, b) => {
      const timeA = new Date(a.time || a.posted);
      const timeB = new Date(b.time || b.posted);
      return timeB - timeA;
    });
  };

  // Get comment count for a blog
  const getCommentCount = (blogId) => {
    const blog = blogs.find(b => b._id === blogId);
    return blog?.comments?.length || 0;
  };

  // Handle like with animation
  const handleLike = async (id, event) => {
    if (isLiking[id] || likedBlogs.has(id)) return;
    
    setIsLiking(prev => ({ ...prev, [id]: true }));
    setLikedBlogs(prev => new Set([...prev, id]));
    
    // Update likes count immediately for better UX
    setBlogs(prev => prev.map(blog => 
      blog._id === id ? { ...blog, likes: blog.likes + 1 } : blog
    ));
    
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
      
      setTimeout(() => {
        setIsLiking(prev => ({ ...prev, [id]: false }));
      }, 1000);
    } catch (error) {
      console.error('Error liking post:', error);
      // Revert the like count if API call fails
      setBlogs(prev => prev.map(blog => 
        blog._id === id ? { ...blog, likes: Math.max(0, blog.likes - 1) } : blog
      ));
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
        _id: `temp_${Date.now()}`,
        isTemp: true
      };
      
      // Add temporary comment to the blog's comments array
      setBlogs(prev => prev.map(blog => {
        if (blog._id === id) {
          return {
            ...blog,
            comments: [tempComment, ...(blog.comments || [])]
          };
        }
        return blog;
      }));
      
      await fetch('/api/comment', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, comment: commentText }),
      });
      
      setNewComment(prev => ({ ...prev, [id]: '' }));
      
      // Refresh blogs to get the real comment
      setTimeout(() => {
        fetchBlogs();
        setIsCommenting(prev => ({ ...prev, [id]: false }));
      }, 500);
      
    } catch (error) {
      console.error('Error posting comment:', error);
      // Remove temporary comment if API call fails
      setBlogs(prev => prev.map(blog => {
        if (blog._id === id) {
          return {
            ...blog,
            comments: blog.comments?.filter(comment => !comment.isTemp) || []
          };
        }
        return blog;
      }));
      setIsCommenting(prev => ({ ...prev, [id]: false }));
    }
  };

  // Toggle comments visibility
  const toggleComments = (id) => {
    setShowComments(prev => ({ ...prev, [id]: !prev[id] }));
    if (!visibleComments[id]) {
      setVisibleComments(prev => ({ ...prev, [id]: 5 }));
    }
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
    if (!visibleComments[blog._id]) {
      setVisibleComments(prev => ({ ...prev, [blog._id]: 5 }));
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
    const allComments = getBlogComments(selectedBlog._id);
    const commentsToShow = allComments.slice(0, visibleComments[selectedBlog._id] || 5);
    const hasMoreComments = (visibleComments[selectedBlog._id] || 5) < allComments.length;
    const currentBlog = blogs.find(b => b._id === selectedBlog._id) || selectedBlog;

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
            <h1 className="crimson-detail-title">{currentBlog.blogname}</h1>
            <div className="crimson-detail-meta">
              <span className="crimson-meta-badge">
                <span className="crimson-heart-icon">❤️</span>
                {currentBlog.likes} likes
              </span>
              <span className="crimson-meta-badge">
                <span className="crimson-comment-icon">💬</span>
                {getCommentCount(currentBlog._id)} comments
              </span>
              <span className="crimson-meta-badge">
                <span className="crimson-date-icon">📅</span>
                {new Date(currentBlog.posted).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
          
          {currentBlog.imageurl && currentBlog.imageurl.length > 0 && currentBlog.imageurl[0] !== 'xyz.jpg' && (
            <div className="crimson-image-showcase">
              <img 
                src={currentBlog.imageurl[0]} 
                alt={currentBlog.blogname}
                className="crimson-detail-image" 
              />
              <div className="crimson-image-actions">
                <button 
                  className={`crimson-image-like-btn ${likedBlogs.has(currentBlog._id) ? 'crimson-liked' : ''}`}
                  onClick={(e) => handleLike(currentBlog._id, e)}
                  disabled={isLiking[currentBlog._id]}
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
                {currentBlog.description.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="crimson-description-text">{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="crimson-actions-bar">
              <button 
                className={`crimson-action-btn crimson-like-action ${isLiking[currentBlog._id] ? 'crimson-liking' : ''} ${likedBlogs.has(currentBlog._id) ? 'crimson-just-liked' : ''}`}
                onClick={(e) => handleLike(currentBlog._id, e)}
                disabled={isLiking[currentBlog._id]}
              >
                <span className="crimson-btn-icon">❤️</span>
                <span className="crimson-btn-text">
                  {isLiking[currentBlog._id] ? 'Liking...' : 'Like Post'}
                </span>
                <div className="crimson-btn-ripple"></div>
              </button>
              
              <div className="crimson-stats-display">
                <div className="crimson-stat-item">
                  <span className="crimson-stat-number">{currentBlog.likes}</span>
                  <span className="crimson-stat-label">Likes</span>
                </div>
                <div className="crimson-stat-divider"></div>
                <div className="crimson-stat-item">
                  <span className="crimson-stat-number">{getCommentCount(currentBlog._id)}</span>
                  <span className="crimson-stat-label">Comments</span>
                </div>
              </div>
            </div>
          </div>

          <div className="crimson-comments-section">
            <div className="crimson-comments-header">
              <h3 className="crimson-comments-title">
                Comments ({getCommentCount(currentBlog._id)})
              </h3>
              {allComments.length > 0 && (
                <span className="crimson-comments-sort">Latest First</span>
              )}
            </div>
            
            <div className="crimson-comment-composer">
              <div className="crimson-composer-container">
                <textarea
                  className="crimson-comment-textarea"
                  placeholder="Share your thoughts... (Ctrl+Enter to send)"
                  value={newComment[currentBlog._id] || ''}
                  onChange={(e) => setNewComment(prev => ({ ...prev, [currentBlog._id]: e.target.value }))}
                  onKeyPress={(e) => handleKeyPress(e, currentBlog._id)}
                  disabled={isCommenting[currentBlog._id]}
                  rows="3"
                  maxLength="500"
                />
                <div className="crimson-composer-footer">
                  <span className="crimson-char-counter">
                    {(newComment[currentBlog._id] || '').length}/500
                  </span>
                  <button 
                    className={`crimson-send-btn ${isCommenting[currentBlog._id] ? 'crimson-sending' : ''}`}
                    onClick={() => handleCommentSubmit(currentBlog._id)}
                    disabled={isCommenting[currentBlog._id] || !newComment[currentBlog._id]?.trim()}
                  >
                    {isCommenting[currentBlog._id] ? (
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
                        key={comment._id || `${comment.text}-${idx}`} 
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
                              {formatTimeAgo(comment.time || comment.posted)}
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
                      onClick={() => loadMoreComments(currentBlog._id)}
                    >
                      <span className="crimson-load-icon">⬇️</span>
                      <span>Load {Math.min(5, allComments.length - (visibleComments[currentBlog._id] || 5))} more comments</span>
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
            <style>{`
              .crimson-loading-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 60px 20px;
              }
              
              .crimson-modern-loader {
                position: relative;
                width: 80px;
                height: 80px;
                margin-bottom: 30px;
              }
              
              .crimson-loader-ring {
                position: absolute;
                border: 4px solid #ffebee;
                border-top: 4px solid #e53e3e;
                border-radius: 50%;
                animation: crimson-spin 1s linear infinite;
              }
              
              .crimson-ring-1 {
                width: 80px;
                height: 80px;
                animation-duration: 1s;
              }
              
              .crimson-ring-2 {
                width: 60px;
                height: 60px;
                top: 10px;
                left: 10px;
                border-top-color: #fc8181;
                animation-duration: 0.8s;
                animation-direction: reverse;
              }
              
              .crimson-ring-3 {
                width: 40px;
                height: 40px;
                top: 20px;
                left: 20px;
                border-top-color: #feb2b2;
                animation-duration: 0.6s;
              }
              
              @keyframes crimson-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              
              .crimson-loading-text {
                color: #e53e3e;
                font-size: 18px;
                font-weight: 600;
                text-align: center;
                animation: crimson-pulse 1.5s ease-in-out infinite;
              }
              
              .crimson-loading-subtext {
                color: #a0a0a0;
                font-size: 14px;
                margin-top: 8px;
                text-align: center;
              }
              
              @keyframes crimson-pulse {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
              }
              
              .crimson-floating-dots {
                display: flex;
                gap: 8px;
                margin-top: 20px;
              }
              
              .crimson-dot {
                width: 12px;
                height: 12px;
                background: linear-gradient(45deg, #e53e3e, #fc8181);
                border-radius: 50%;
                animation: crimson-bounce 1.4s ease-in-out infinite both;
              }
              
              .crimson-dot:nth-child(1) { animation-delay: -0.32s; }
              .crimson-dot:nth-child(2) { animation-delay: -0.16s; }
              .crimson-dot:nth-child(3) { animation-delay: 0s; }
              
              @keyframes crimson-bounce {
                0%, 80%, 100% {
                  transform: scale(0.8);
                  opacity: 0.5;
                }
                40% {
                  transform: scale(1.2);
                  opacity: 1;
                }
              }
            `}</style>
            <div className="crimson-modern-loader">
              <div className="crimson-loader-ring crimson-ring-1"></div>
              <div className="crimson-loader-ring crimson-ring-2"></div>
              <div className="crimson-loader-ring crimson-ring-3"></div>
            </div>
            <div className="crimson-loading-text">Loading Amazing Content</div>
            <div className="crimson-loading-subtext">Fetching the latest blog posts for you...</div>
            <div className="crimson-floating-dots">
              <div className="crimson-dot"></div>
              <div className="crimson-dot"></div>
              <div className="crimson-dot"></div>
            </div>
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
                      <span className="crimson-overlay-stat">💬 {getCommentCount(blog._id)}</span>
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
                      <span className="crimson-stat-count">{getCommentCount(blog._id)}</span>
                    </span>
                  </div>
                  <div className="crimson-read-time">
                    <span className="crimson-time-icon">📅</span>
                    <span className="crimson-time-text">
                      {formatTimeAgo(blog.posted)}
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