import Blog from '../models/Blog.js';
import connectDB from '../utils/db.js';

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
      imageurl: ['xyz.jpg'], // default static image
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
