import Blog from '../models/Blog.js';
import connectDB from '../utils/db.js';
import cloudinary from '../utils/cloudinary.js';

// Create a new blog
export const createBlog = async (req) => {
  try {
    await connectDB();
    const { blogname, description, imageurl, image, file } = await req.json();

    if (!blogname || !description) {
      return new Response(JSON.stringify({ error: 'Blog name and description are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let finalImageUrl = [];

    // If imageurl is directly provided (e.g. string or array)
    if (imageurl) {
      if (Array.isArray(imageurl)) {
        finalImageUrl = imageurl.filter(url => url && url.trim() !== '');
      } else if (typeof imageurl === 'string' && imageurl.trim() !== '') {
        finalImageUrl = [imageurl.trim()];
      }
    }

    // If direct base64 image data is provided
    const base64Image = image || file;
    if (base64Image && typeof base64Image === 'string' && base64Image.startsWith('data:image/')) {
      const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: 'portfolio_blogs',
      });
      finalImageUrl.push(uploadResult.secure_url);
    }

    const blogData = {
      blogname,
      description,
    };

    if (finalImageUrl.length > 0) {
      blogData.imageurl = finalImageUrl;
    }

    const blog = new Blog(blogData);
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

// Update an existing blog
export const updateBlog = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    const { id, _id, blogname, description, imageurl, image, file } = body;
    const blogId = id || _id;

    if (!blogId) {
      return new Response(JSON.stringify({ error: 'Blog ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (blogname) blog.blogname = blogname;
    if (description) blog.description = description;

    let finalImageUrl = blog.imageurl || [];

    // If direct image URL(s) provided
    if (imageurl) {
      if (Array.isArray(imageurl) && imageurl.length > 0) {
        finalImageUrl = imageurl.filter(url => url && url.trim() !== '');
      } else if (typeof imageurl === 'string' && imageurl.trim() !== '') {
        finalImageUrl = [imageurl.trim()];
      }
    }

    // If base64 image data provided
    const base64Image = image || file;
    if (base64Image && typeof base64Image === 'string' && base64Image.startsWith('data:image/')) {
      const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: 'portfolio_blogs',
      });
      finalImageUrl = [uploadResult.secure_url];
    }

    blog.imageurl = finalImageUrl;
    await blog.save();

    return new Response(JSON.stringify({ message: 'Blog updated successfully', blog }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// Delete a blog
export const deleteBlog = async (req) => {
  try {
    await connectDB();
    
    let blogId;
    try {
      const body = await req.json();
      blogId = body.id || body._id;
    } catch (e) {
      const { searchParams } = new URL(req.url);
      blogId = searchParams.get('id');
    }

    if (!blogId) {
      return new Response(JSON.stringify({ error: 'Blog ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Blog deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
