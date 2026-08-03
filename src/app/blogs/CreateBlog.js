'use client';

import { useState } from 'react';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    blogname: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setStatus('❌ Please select a valid image file.');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setStatus('');
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    try {
      let uploadedImageUrl = null;

      // 1. Upload photo to Cloudinary via /api/upload if a file was selected
      if (imageFile) {
        setStatus('⏳ Uploading photo to Cloudinary...');
        const uploadData = new FormData();
        uploadData.append('file', imageFile);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(uploadResult.error || 'Failed to upload photo to Cloudinary');
        }

        uploadedImageUrl = uploadResult.url;
      }

      // 2. Submit blog post with image URL
      setStatus('⏳ Creating blog post...');
      const payload = {
        ...formData,
        imageurl: uploadedImageUrl ? [uploadedImageUrl] : [],
      };

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong while creating blog');

      setStatus('✅ Blog created successfully with Cloudinary photo!');
      setFormData({ blogname: '', description: '' });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create New Blog</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="blogname"
          placeholder="Blog Title / Name"
          value={formData.blogname}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="description"
          placeholder="Blog Description / Content"
          value={formData.description}
          onChange={handleChange}
          required
          rows="5"
          style={styles.textarea}
        />

        <div style={styles.uploadSection}>
          <label htmlFor="blog-photo-upload" style={styles.uploadLabel}>
            📸 {imageFile ? 'Change Photo' : 'Upload Cover Photo (Cloudinary)'}
          </label>
          <input
            id="blog-photo-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />

          {imagePreview && (
            <div style={styles.previewContainer}>
              <img src={imagePreview} alt="Preview" style={styles.previewImage} />
              <button type="button" onClick={handleRemoveImage} style={styles.removeBtn}>
                ✕ Remove Photo
              </button>
            </div>
          )}
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Processing...' : 'Create Blog'}
        </button>
      </form>
      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '550px',
    margin: '40px auto',
    padding: '24px',
    border: '1px solid #333',
    borderRadius: '12px',
    background: '#121212',
    color: '#fff',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
  },
  heading: {
    marginBottom: '18px',
    fontSize: '22px',
    fontWeight: '600',
    borderBottom: '1px solid #222',
    paddingBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  input: {
    padding: '12px',
    fontSize: '15px',
    borderRadius: '6px',
    border: '1px solid #444',
    background: '#1e1e1e',
    color: '#fff',
    outline: 'none',
  },
  textarea: {
    padding: '12px',
    fontSize: '15px',
    borderRadius: '6px',
    border: '1px solid #444',
    background: '#1e1e1e',
    color: '#fff',
    outline: 'none',
    resize: 'vertical',
  },
  uploadSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  uploadLabel: {
    padding: '10px 14px',
    fontSize: '14px',
    background: '#2a2a2a',
    color: '#e0e0e0',
    border: '1px dashed #555',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s',
  },
  previewContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '10px',
    background: '#1a1a1a',
    borderRadius: '6px',
    border: '1px solid #333',
  },
  previewImage: {
    maxHeight: '200px',
    maxWidth: '100%',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  removeBtn: {
    padding: '4px 10px',
    fontSize: '12px',
    background: '#d32f2f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    background: '#388e3c',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '6px',
  },
  status: {
    marginTop: '15px',
    fontSize: '14px',
    fontWeight: '500',
  },
};

export default CreateBlog;
