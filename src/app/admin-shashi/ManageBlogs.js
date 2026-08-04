'use client';

import { useState, useEffect } from 'react';
import { FaPlus, FaPenToSquare, FaTrashCan, FaArrowsRotate, FaImage, FaHeart, FaEye } from 'react-icons/fa6';
import './styles/ManageBlogs.css';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'create'

  // Create Form State
  const [createData, setCreateData] = useState({ blogname: '', description: '' });
  const [createImageFile, setCreateImageFile] = useState(null);
  const [createImagePreview, setCreateImagePreview] = useState(null);
  const [createStatus, setCreateStatus] = useState('');
  const [submittingCreate, setSubmittingCreate] = useState(false);

  // Edit Modal/Form State
  const [editingBlog, setEditingBlog] = useState(null);
  const [editData, setEditData] = useState({ blogname: '', description: '' });
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [submittingEdit, setSubmittingEdit] = useState(false);

  // Delete State
  const [deletingId, setDeletingId] = useState(null);

  // Fetch All Blogs
  const fetchBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const res = await fetch('/api/blogs');
      if (!res.ok) throw new Error('Failed to fetch blogs');
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoadingBlogs(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // --- Create Blog Handlers ---
  const handleCreateChange = (e) => {
    setCreateData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCreateImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setCreateStatus('❌ Please select a valid image file');
        return;
      }
      setCreateImageFile(file);
      setCreateImagePreview(URL.createObjectURL(file));
      setCreateStatus('');
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setCreateStatus('');
    setSubmittingCreate(true);

    try {
      let uploadedImageUrl = null;

      if (createImageFile) {
        setCreateStatus('⏳ Uploading photo to Cloudinary...');
        const uploadData = new FormData();
        uploadData.append('file', createImageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadResult.error || 'Photo upload failed');
        uploadedImageUrl = uploadResult.url;
      }

      setCreateStatus('⏳ Creating blog post...');
      const payload = {
        ...createData,
        imageurl: uploadedImageUrl ? [uploadedImageUrl] : [],
      };

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create blog');

      setCreateStatus('✅ Blog created successfully!');
      setCreateData({ blogname: '', description: '' });
      setCreateImageFile(null);
      setCreateImagePreview(null);
      fetchBlogs();
      setTimeout(() => {
        setActiveTab('list');
        setCreateStatus('');
      }, 1200);
    } catch (err) {
      setCreateStatus(`❌ ${err.message}`);
    } finally {
      setSubmittingCreate(false);
    }
  };

  // --- Edit Blog Handlers ---
  const handleOpenEdit = (blog) => {
    setEditingBlog(blog);
    setEditData({
      blogname: blog.blogname || '',
      description: blog.description || '',
    });
    setEditImageFile(null);
    setEditImagePreview(blog.imageurl && blog.imageurl.length > 0 ? blog.imageurl[0] : null);
    setEditStatus('');
  };

  const handleCloseEdit = () => {
    setEditingBlog(null);
    setEditData({ blogname: '', description: '' });
    setEditImageFile(null);
    setEditImagePreview(null);
    setEditStatus('');
  };

  const handleEditChange = (e) => {
    setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setEditStatus('❌ Please select a valid image file');
        return;
      }
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
      setEditStatus('');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingBlog) return;
    setEditStatus('');
    setSubmittingEdit(true);

    try {
      let finalImageUrl = editingBlog.imageurl || [];

      if (editImageFile) {
        setEditStatus('⏳ Uploading new photo to Cloudinary...');
        const uploadData = new FormData();
        uploadData.append('file', editImageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadResult.error || 'Photo upload failed');
        finalImageUrl = [uploadResult.url];
      }

      setEditStatus('⏳ Saving changes...');
      const payload = {
        id: editingBlog._id,
        blogname: editData.blogname,
        description: editData.description,
        imageurl: finalImageUrl,
      };

      const res = await fetch('/api/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update blog');

      setEditStatus('✅ Blog updated successfully!');
      fetchBlogs();
      setTimeout(() => {
        handleCloseEdit();
      }, 1000);
    } catch (err) {
      setEditStatus(`❌ ${err.message}`);
    } finally {
      setSubmittingEdit(false);
    }
  };

  // --- Delete Blog Handler ---
  const handleDeleteBlog = async (blogId, blogTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(blogId);
    try {
      const res = await fetch('/api/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: blogId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete blog');

      fetchBlogs();
    } catch (err) {
      alert(`Error deleting blog: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="manage-blogs-container">
      {/* Header & Tabs */}
      <div className="manage-blogs-header">
        <div className="manage-blogs-title-box">
          <h2 className="manage-blogs-heading">Blog Manager</h2>
          <span className="blogs-badge">{blogs.length} Total Posts</span>
        </div>

        <div className="manage-blogs-actions">
          <button 
            className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`} 
            onClick={() => setActiveTab('list')}
          >
            <FaEye /> All Blogs
          </button>
          <button 
            className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`} 
            onClick={() => setActiveTab('create')}
          >
            <FaPlus /> New Blog
          </button>
          <button 
            className="refresh-btn" 
            onClick={fetchBlogs}
            title="Refresh Blogs List"
          >
            <FaArrowsRotate className={loadingBlogs ? 'spin' : ''} />
          </button>
        </div>
      </div>

      {/* Tab 1: All Blogs List with Edit & Delete Options */}
      {activeTab === 'list' && (
        <div className="blogs-list-section">
          {loadingBlogs ? (
            <div className="blogs-loading-state">
              <div className="spinner"></div>
              <p>Loading blogs database...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="blogs-empty-state">
              <p>No blog posts found in database.</p>
              <button className="create-first-btn" onClick={() => setActiveTab('create')}>
                Create First Blog
              </button>
            </div>
          ) : (
            <div className="blogs-grid">
              {blogs.map((blog) => {
                const coverImage = blog.imageurl && blog.imageurl.length > 0 ? blog.imageurl[0] : null;
                const formattedDate = blog.posted ? new Date(blog.posted).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                }) : 'N/A';

                return (
                  <div key={blog._id} className="blog-manage-card">
                    <div className="blog-card-media">
                      {coverImage ? (
                        <img src={coverImage} alt={blog.blogname} className="blog-cover-img" />
                      ) : (
                        <div className="no-image-placeholder">
                          <FaImage />
                          <span>No Cover Photo</span>
                        </div>
                      )}
                      <div className="blog-date-badge">{formattedDate}</div>
                    </div>

                    <div className="blog-card-content">
                      <h3 className="blog-card-title">{blog.blogname}</h3>
                      <p className="blog-card-desc">
                        {blog.description ? blog.description.substring(0, 110) + (blog.description.length > 110 ? '...' : '') : ''}
                      </p>

                      <div className="blog-card-footer">
                        <span className="blog-likes-count">
                          <FaHeart className="heart-icon" /> {blog.likes || 0} Likes
                        </span>

                        <div className="blog-card-actions">
                          <button 
                            className="blog-action-btn edit-btn" 
                            onClick={() => handleOpenEdit(blog)}
                            title="Edit Blog"
                          >
                            <FaPenToSquare /> Edit
                          </button>
                          <button 
                            className="blog-action-btn delete-btn" 
                            onClick={() => handleDeleteBlog(blog._id, blog.blogname)}
                            disabled={deletingId === blog._id}
                            title="Delete Blog"
                          >
                            <FaTrashCan /> {deletingId === blog._id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Create New Blog Form */}
      {activeTab === 'create' && (
        <div className="blog-form-wrapper">
          <h3 className="form-subheading">Create New Blog Post</h3>
          <form onSubmit={handleCreateSubmit} className="blog-admin-form">
            <div className="form-group">
              <label>Blog Title / Name *</label>
              <input
                type="text"
                name="blogname"
                placeholder="Enter compelling blog title..."
                value={createData.blogname}
                onChange={handleCreateChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Blog Content / Description *</label>
              <textarea
                name="description"
                placeholder="Write blog post description or body content..."
                value={createData.description}
                onChange={handleCreateChange}
                required
                rows="6"
              />
            </div>

            <div className="form-group">
              <label>Cover Photo (Cloudinary Upload)</label>
              <label htmlFor="create-photo-input" className="file-upload-box">
                <FaImage />
                <span>{createImageFile ? createImageFile.name : 'Choose Cover Image File'}</span>
              </label>
              <input
                id="create-photo-input"
                type="file"
                accept="image/*"
                onChange={handleCreateImageChange}
                style={{ display: 'none' }}
              />

              {createImagePreview && (
                <div className="image-preview-bar">
                  <img src={createImagePreview} alt="Preview" className="preview-img" />
                  <button type="button" onClick={() => { setCreateImageFile(null); setCreateImagePreview(null); }} className="remove-photo-btn">
                    ✕ Remove Photo
                  </button>
                </div>
              )}
            </div>

            <div className="form-submit-row">
              <button type="submit" disabled={submittingCreate} className="submit-blog-btn">
                {submittingCreate ? 'Processing...' : 'Publish Blog Post'}
              </button>
              <button type="button" onClick={() => setActiveTab('list')} className="cancel-form-btn">
                Cancel
              </button>
            </div>

            {createStatus && <div className="form-status-msg">{createStatus}</div>}
          </form>
        </div>
      )}

      {/* Edit Blog Modal */}
      {editingBlog && (
        <div className="admin-modal-backdrop" onClick={handleCloseEdit}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Blog Post</h3>
              <button className="modal-close-btn" onClick={handleCloseEdit}>✕</button>
            </div>

            <form onSubmit={handleEditSubmit} className="blog-admin-form">
              <div className="form-group">
                <label>Blog Title *</label>
                <input
                  type="text"
                  name="blogname"
                  value={editData.blogname}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description / Content *</label>
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  required
                  rows="6"
                />
              </div>

              <div className="form-group">
                <label>Cover Photo</label>
                <label htmlFor="edit-photo-input" className="file-upload-box">
                  <FaImage />
                  <span>{editImageFile ? editImageFile.name : 'Change Cover Photo'}</span>
                </label>
                <input
                  id="edit-photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handleEditImageChange}
                  style={{ display: 'none' }}
                />

                {editImagePreview && (
                  <div className="image-preview-bar">
                    <img src={editImagePreview} alt="Preview" className="preview-img" />
                    <button type="button" onClick={() => { setEditImageFile(null); setEditImagePreview(null); }} className="remove-photo-btn">
                      ✕ Clear Photo
                    </button>
                  </div>
                )}
              </div>

              <div className="form-submit-row">
                <button type="submit" disabled={submittingEdit} className="submit-blog-btn save-btn">
                  {submittingEdit ? 'Saving Changes...' : 'Save Changes'}
                </button>
                <button type="button" onClick={handleCloseEdit} className="cancel-form-btn">
                  Cancel
                </button>
              </div>

              {editStatus && <div className="form-status-msg">{editStatus}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
