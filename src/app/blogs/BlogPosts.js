'use client';

import { useEffect, useState } from 'react';
import './styles/BlogPosts.css';

const BlogPosts = () => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

  // Fetch all blogs
  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  // Fetch comments for a blog
  const fetchComments = async (id) => {
    const res = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    setComments(prev => ({ ...prev, [id]: data }));
  };

  // Handle like
  const handleLike = async (id) => {
    await fetch('/api/like', {
      method: 'PUT',
      body: JSON.stringify({ id }),
    });
    fetchBlogs(); // refresh likes
  };

  // Handle comment submit
  const handleCommentSubmit = async (id) => {
    if (!newComment[id]) return;
    await fetch('/api/comment', {
      method: 'PUT',
      body: JSON.stringify({ id, comment: newComment[id] }),
    });
    setNewComment(prev => ({ ...prev, [id]: '' }));
    fetchComments(id);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="bp-container">
      <h1 className="bp-title">All Blog Posts</h1>

      {blogs.map((blog) => (
        <div key={blog._id} className="bp-card">
          <h2 className="bp-blogname">{blog.blogname}</h2>
          <p className="bp-description">{blog.description}</p>
          <p className="bp-date">Posted on: {new Date(blog.posted).toLocaleString()}</p>

          <div className="bp-likes">
            <button onClick={() => handleLike(blog._id)} className="bp-like-btn">❤️ Like</button>
            <span>{blog.likes} Likes</span>
          </div>

          <div className="bp-comments">
            <button onClick={() => fetchComments(blog._id)} className="bp-show-comments-btn">
              💬 Show Comments
            </button>

            {comments[blog._id] && (
              <div className="bp-comment-list">
                {comments[blog._id].map((c, idx) => (
                  <div key={idx} className="bp-comment-item">
                    <p>{c.text}</p>
                    <span className="bp-comment-time">{new Date(c.time).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="bp-comment-form">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment[blog._id] || ''}
                onChange={(e) =>
                  setNewComment((prev) => ({ ...prev, [blog._id]: e.target.value }))
                }
                className="bp-comment-input"
              />
              <button onClick={() => handleCommentSubmit(blog._id)} className="bp-comment-submit-btn">
                ➤ Post
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
