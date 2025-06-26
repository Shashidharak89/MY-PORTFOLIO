'use client';

import { useEffect, useState } from 'react';
import './styles/BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeBlog, setActiveBlog] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [message, setMessage] = useState('');
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [likedBlogs, setLikedBlogs] = useState(new Set());

  const fetchBlogs = async () => {
    const res = await fetch('/api/blog');
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLike = async (id) => {
    setIsLiking(true);
    setLikedBlogs(prev => new Set([...prev, id]));
    
    await fetch('/api/like', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    
    setTimeout(() => {
      setIsLiking(false);
      setLikedBlogs(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 800);

    fetchBlogs();
    if (activeBlog?._id === id) {
      const updated = blogs.find((b) => b._id === id);
      setActiveBlog(updated);
    }
  };

  const handleComment = async () => {
    if (!commentInput.trim() || !activeBlog) return;
    
    setIsCommenting(true);
    setMessage('💭 Sending comment...');

    const res = await fetch('/api/comment', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: activeBlog._id, comment: commentInput }),
    });

    setTimeout(() => {
      if (res.ok) {
        setCommentInput('');
        setMessage('✅ Comment added successfully!');
        fetchBlogs();
        const updated = blogs.find((b) => b._id === activeBlog._id);
        setActiveBlog(updated);
      } else {
        setMessage('❌ Failed to add comment');
      }
      setIsCommenting(false);
      
      setTimeout(() => setMessage(''), 3000);
    }, 1200);
  };

  if (activeBlog) {
    return (
      <div className="crimson-blogdetail-wrapper">
        <button 
          onClick={() => setActiveBlog(null)} 
          className="crimson-back-btn"
        >
          ← Back to All Posts
        </button>
        
        <div className="crimson-blogdetail-content">
          <h1 className="crimson-blogdetail-title">{activeBlog.blogname}</h1>
          <div className="crimson-image-container">
            <img 
              src={activeBlog.imageurl[0]} 
              alt="Blog" 
              className="crimson-blogdetail-image" 
            />
          </div>
          
          <div className="crimson-description-container">
            <p className="crimson-blogdetail-desc">{activeBlog.description}</p>
          </div>

          <div className="crimson-blogdetail-actions">
            <button 
              className={`crimson-like-btn ${isLiking ? 'crimson-liking' : ''} ${likedBlogs.has(activeBlog._id) ? 'crimson-just-liked' : ''}`}
              onClick={() => handleLike(activeBlog._id)}
              disabled={isLiking}
            >
              <span className="crimson-heart-icon">❤️</span>
              {isLiking ? 'Liking...' : 'Like'}
            </button>
            <span className="crimson-like-count">
              {activeBlog.likes} {activeBlog.likes === 1 ? 'Like' : 'Likes'}
            </span>
          </div>

          <div className="crimson-comment-section">
            <h3 className="crimson-comment-title">
              Comments ({activeBlog.comments.length})
            </h3>
            
            <div className="crimson-comment-list-container">
              {activeBlog.comments.length > 0 ? (
                <ul className="crimson-comment-list">
                  {activeBlog.comments.map((cmt, idx) => (
                    <li key={idx} className="crimson-comment-item">
                      <span className="crimson-comment-icon">💬</span>
                      <span className="crimson-comment-text">{cmt}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="crimson-no-comments">No comments yet. Be the first to comment!</p>
              )}
            </div>
            
            <div className="crimson-comment-input-section">
              <textarea
                className="crimson-comment-input"
                placeholder="Share your thoughts..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                disabled={isCommenting}
              />
              <button 
                className={`crimson-comment-btn ${isCommenting ? 'crimson-commenting' : ''}`}
                onClick={handleComment}
                disabled={isCommenting || !commentInput.trim()}
              >
                {isCommenting ? 'Sending...' : 'Add Comment'}
              </button>
            </div>
            
            {message && (
              <div className={`crimson-comment-message ${message.includes('✅') ? 'crimson-success' : message.includes('❌') ? 'crimson-error' : 'crimson-loading'}`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="crimson-bloglist-container">
      <div className="crimson-header">
        <h1 className="crimson-bloglist-title">Featured Blog Posts</h1>
        <div className="crimson-title-underline"></div>
      </div>
      
      <div className="crimson-bloglist-grid">
        {blogs.map((blog, index) => (
          <div 
            key={blog._id} 
            className="crimson-blog-card" 
            onClick={() => setActiveBlog(blog)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="crimson-card-image-container">
              <img 
                src={blog.imageurl[0]} 
                alt="Blog Image" 
                className="crimson-blog-card-img" 
              />
              <div className="crimson-card-overlay">
                <span className="crimson-read-more">Read More</span>
              </div>
            </div>
            
            <div className="crimson-blog-card-content">
              <h2 className="crimson-blog-card-title">{blog.blogname}</h2>
              <p className="crimson-blog-card-desc">
                {blog.description.length > 120 
                  ? `${blog.description.substring(0, 120)}...` 
                  : blog.description
                }
              </p>
              
              <div className="crimson-blog-card-meta">
                <span className="crimson-meta-item">
                  <span className="crimson-heart-small">❤️</span>
                  {blog.likes}
                </span>
                <span className="crimson-meta-item">
                  <span className="crimson-comment-small">💬</span>
                  {blog.comments.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {blogs.length === 0 && (
        <div className="crimson-loading-container">
          <div className="crimson-loading-spinner"></div>
          <p className="crimson-loading-text">Loading amazing content...</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;