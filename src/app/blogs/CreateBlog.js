'use client';

import { useState } from 'react';

const CreateBlog = () => {
  const [blogname, setBlogname] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!blogname || !description) {
      setMessage('❌ Please fill all fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogname, description }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Blog created successfully!');
        setBlogname('');
        setDescription('');
      } else {
        setMessage(`❌ ${data.error || 'Something went wrong.'}`);
      }
    } catch (error) {
      setMessage('❌ Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-900 p-6 rounded-xl text-white shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Name"
          value={blogname}
          onChange={(e) => setBlogname(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-600"
          rows="4"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded font-semibold transition ${
            loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Creating Blog...' : 'Create Blog'}
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm">{message}</p>}
    </div>
  );
};

export default CreateBlog;
