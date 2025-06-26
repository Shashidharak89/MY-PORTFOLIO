import Blog from '../models/Blog.js';
import connectDB from '../utils/db.js';

// Create Blog
export const createBlog = async (req) => {
  try {
    await connectDB();

    const { blogname, description } = await req.json();

    if (!blogname?.trim() || !description?.trim()) {
      return new Response(JSON.stringify({ error: 'Blogname and description are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const blog = new Blog({
      blogname,
      description,
      imageurl: ['xyz.jpg'], // static image
    });

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

// Get All Blogs
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

// Like Blog (+1)
export const likeBlog = async (req) => {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'Blog ID required' }), {
        status: 400,
      });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), {
        status: 404,
      });
    }

    blog.likes += 1;
    await blog.save();

    return new Response(JSON.stringify({ message: 'Blog liked', likes: blog.likes }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error liking blog:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
};

// Add Comment
export const commentBlog = async (req) => {
  try {
    await connectDB();
    const { id, comment } = await req.json();

    if (!id || !comment?.trim()) {
      return new Response(JSON.stringify({ error: 'Blog ID and comment required' }), {
        status: 400,
      });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), {
        status: 404,
      });
    }

    blog.comments.push(comment);
    await blog.save();

    return new Response(JSON.stringify({ message: 'Comment added', comments: blog.comments }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error commenting blog:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
};
