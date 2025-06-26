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

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
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
    if (isLiking[id]) return;
    
    setIsLiking(prev => ({ ...prev, [id]: true }));
    
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
    }, 1500);

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
      }, 800);
    } catch (error) {
      console.error('Error liking post:', error);
      setIsLiking(prev => ({ ...prev, [id]: false }));
    }
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
  };

  // Close detailed view
  const closeDetailedView = () => {
    setSelectedBlog(null);
  };

  // Handle key press for comment input
  const handleKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      handleCommentSubmit(id);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="portfolio-bl-container">
        <div className="portfolio-bl-header">
          <h1 className="portfolio-bl-title">Latest Blog Posts</h1>
          <div className="portfolio-bl-title-underline"></div>
        </div>
        
        <div className="portfolio-bl-posts-grid">
          {blogs.map((blog, index) => (
            <article 
              key={blog._id} 
              className={`portfolio-bl-card portfolio-bl-card-${index % 3}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="portfolio-bl-card-header" onClick={() => handleBlogClick(blog)}>
                <h2 className="portfolio-bl-blogname">{blog.blogname}</h2>
                <div className="portfolio-bl-card-decorator"></div>
              </div>

              {/* Blog Image */}
              {blog.imageurl && blog.imageurl.length > 0 && blog.imageurl[0] !== 'xyz.jpg' && (
                <div className="portfolio-bl-image-container" onClick={() => handleBlogClick(blog)}>
                  <img 
                    src={blog.imageurl[0]} 
                    alt={blog.blogname}
                    className="portfolio-bl-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="portfolio-bl-image-overlay">
                    <span className="portfolio-bl-image-zoom">🔍</span>
                  </div>
                </div>
              )}
              
              <div className="portfolio-bl-content" onClick={() => handleBlogClick(blog)}>
                <div className="portfolio-bl-description">
                  {blog.description.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="portfolio-bl-paragraph">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="portfolio-bl-meta">
                  <time className="portfolio-bl-date">
                    {new Date(blog.posted).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
              
              <div className="portfolio-bl-actions">
                <div className="portfolio-bl-likes-section">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(blog._id, e);
                    }}
                    className={`portfolio-bl-like-btn ${isLiking[blog._id] ? 'portfolio-bl-liking' : ''}`}
                    disabled={isLiking[blog._id]}
                  >
                    <span className="portfolio-bl-heart">❤️</span>
                    <span className="portfolio-bl-like-text">
                      {isLiking[blog._id] ? 'Liking...' : 'Like'}
                    </span>
                  </button>
                  <span className="portfolio-bl-likes-count">{blog.likes}</span>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleComments(blog._id);
                  }}
                  className="portfolio-bl-comments-btn"
                >
                  💬 Comments
                </button>
              </div>
              
              {showComments[blog._id] && (
                <div className="portfolio-bl-comments-section">
                  <div className="portfolio-bl-comment-form">
                    <input
                      type="text"
                      placeholder="Share your thoughts..."
                      value={newComment[blog._id] || ''}
                      onChange={(e) =>
                        setNewComment((prev) => ({ ...prev, [blog._id]: e.target.value }))
                      }
                      onKeyPress={(e) => handleKeyPress(e, blog._id)}
                      className="portfolio-bl-comment-input"
                      disabled={isCommenting[blog._id]}
                    />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCommentSubmit(blog._id);
                      }}
                      className={`portfolio-bl-comment-submit ${isCommenting[blog._id] ? 'portfolio-bl-sending' : ''}`}
                      disabled={isCommenting[blog._id] || !newComment[blog._id]?.trim()}
                    >
                      {isCommenting[blog._id] ? (
                        <span className="portfolio-bl-loading-spinner"></span>
                      ) : (
                        '🚀'
                      )}
                    </button>
                  </div>
                  
                  {comments[blog._id] && comments[blog._id].length > 0 && (
                    <div className="portfolio-bl-comments-list">
                      {comments[blog._id]
                        .slice(0, visibleComments[blog._id] || 5)
                        .map((comment, idx) => (
                          <div 
                            key={idx} 
                            className={`portfolio-bl-comment-item ${comment.isTemp ? 'portfolio-bl-temp-comment' : ''}`}
                          >
                            <div className="portfolio-bl-comment-content">
                              <div className="portfolio-bl-comment-text">
                                {comment.text.split('\n').map((line, lineIdx) => (
                                  <p key={lineIdx}>{line}</p>
                                ))}
                              </div>
                              <time className="portfolio-bl-comment-time">
                                {new Date(comment.time).toLocaleString()}
                              </time>
                            </div>
                          </div>
                        ))
                      }
                      
                      {comments[blog._id].length > (visibleComments[blog._id] || 5) && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            loadMoreComments(blog._id);
                          }}
                          className="portfolio-bl-load-more-btn"
                        >
                          View more comments ({comments[blog._id].length - (visibleComments[blog._id] || 5)} remaining)
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Floating Hearts Animation */}
      {heartAnimations.map(heart => (
        <div
          key={heart.id}
          className="portfolio-bl-floating-heart"
          style={{
            left: heart.x,
            top: heart.y,
          }}
        >
          ❤️
        </div>
      ))}

      {/* Detailed Blog View Modal */}
      {selectedBlog && (
        <div className="portfolio-bl-modal-overlay" onClick={closeDetailedView}>
          <div className="portfolio-bl-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="portfolio-bl-modal-close" onClick={closeDetailedView}>✕</button>
            <div className="portfolio-bl-modal-header">
              <h1 className="portfolio-bl-modal-title">{selectedBlog.blogname}</h1>
              <time className="portfolio-bl-modal-date">
                {new Date(selectedBlog.posted).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            {/* Modal Image */}
            {selectedBlog.imageurl && selectedBlog.imageurl.length > 0 && selectedBlog.imageurl[0] !== 'xyz.jpg' && (
              <div className="portfolio-bl-modal-image-container">
                <img 
                  src={selectedBlog.imageurl[0]} 
                  alt={selectedBlog.blogname}
                  className="portfolio-bl-modal-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="portfolio-bl-modal-body">
              <div className="portfolio-bl-modal-description">
                {selectedBlog.description.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="portfolio-bl-modal-paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="portfolio-bl-modal-stats">
                <span className="portfolio-bl-modal-likes">❤️ {selectedBlog.likes} likes</span>
                <span className="portfolio-bl-modal-comments">
                  💬 {comments[selectedBlog._id]?.length || 0} comments
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogList;