import Blog from '../models/Blog.js';
import connectDB from '../utils/db.js';

// Create a new blog
export const createBlog = async (req) => {
  try {
    await connectDB();
    const { blogname, description } = await req.json();

    if (!blogname || !description) {
      return new Response(JSON.stringify({ error: 'Blog name and description are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const blog = new Blog({ blogname, description });
    await blog.save();

    return new Response(JSON.stringify({ message: 'Blog created successfully', blog }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Get all blogs
export const getAllBlogs = async () => {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ posted: -1 }).lean();

    return new Response(JSON.stringify(blogs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error retrieving blogs:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Increment like count
export const addLike = async (req) => {
  try {
    await connectDB();
    const { id } = await req.json();

    const blog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });

    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Like added', likes: blog.likes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding like:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Get likes count
export const getLikes = async (req) => {
  try {
    await connectDB();
    const { id } = await req.json();

    const blog = await Blog.findById(id).select('likes');

    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ likes: blog.likes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error getting likes:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Add a comment
export const addComment = async (req) => {
  try {
    await connectDB();
    const { id, comment } = await req.json();

    if (!id || !comment) {
      return new Response(JSON.stringify({ error: 'Blog ID and comment are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    blog.comments.push({ text: comment });
    await blog.save();

    return new Response(JSON.stringify({ message: 'Comment added', comments: blog.comments }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Get comments
export const getComments = async (req) => {
  try {
    await connectDB();
    const { id } = await req.json();

    const blog = await Blog.findById(id).select('comments');

    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(blog.comments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error retrieving comments:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
