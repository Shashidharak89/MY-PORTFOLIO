'use client';

import { useEffect, useState } from 'react';
import './styles/BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeBlog, setActiveBlog] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [message, setMessage] = useState('');

  const fetchBlogs = async () => {
    const res = await fetch('/api/blog');
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLike = async (id) => {
    await fetch('/api/like', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchBlogs();
    if (activeBlog?._id === id) {
      const updated = blogs.find((b) => b._id === id);
      setActiveBlog(updated);
    }
  };

  const handleComment = async () => {
    if (!commentInput.trim() || !activeBlog) return;

    const res = await fetch('/api/comment', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: activeBlog._id, comment: commentInput }),
    });

    if (res.ok) {
      setCommentInput('');
      setMessage('✅ Comment added!');
      fetchBlogs();
      const updated = blogs.find((b) => b._id === activeBlog._id);
      setActiveBlog(updated);
    } else {
      setMessage('❌ Failed to add comment');
    }
  };

  if (activeBlog) {
    return (
      <div className="blogdetail-wrapper">
        <button onClick={() => setActiveBlog(null)} className="back-btn">← Back</button>
        <h1 className="blogdetail-title">{activeBlog.blogname}</h1>
        <img src={activeBlog.imageurl[0]} alt="Blog" className="blogdetail-image" />
        <p className="blogdetail-desc">{activeBlog.description}</p>

        <div className="blogdetail-actions">
          <button className="like-btn" onClick={() => handleLike(activeBlog._id)}>❤️ Like</button>
          <span className="like-count">{activeBlog.likes} Likes</span>
        </div>

        <div className="comment-section">
          <h3 className="comment-title">Comments</h3>
          <ul className="comment-list">
            {activeBlog.comments.map((cmt, idx) => (
              <li key={idx} className="comment-item">💬 {cmt}</li>
            ))}
          </ul>
          <textarea
            className="comment-input"
            placeholder="Write a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button className="comment-btn" onClick={handleComment}>Add Comment</button>
          {message && <p className="comment-message">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="bloglist-container">
      <h1 className="bloglist-title">All Blog Posts</h1>
      <div className="bloglist-grid">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-card" onClick={() => setActiveBlog(blog)}>
            <img src={blog.imageurl[0]} alt="Blog Image" className="blog-card-img" />
            <div className="blog-card-content">
              <h2 className="blog-card-title">{blog.blogname}</h2>
              <p className="blog-card-desc">{blog.description.substring(0, 100)}...</p>
              <p className="blog-card-meta">{blog.likes} ❤️ Likes | {blog.comments.length} 💬 Comments</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
