import { createBlog, getAllBlogs, updateBlog, deleteBlog } from '../../../backend/controllers/blogController.js';

export async function POST(req) {
  return await createBlog(req);
}

export async function GET() {
  return await getAllBlogs();
}

export async function PUT(req) {
  return await updateBlog(req);
}

export async function DELETE(req) {
  return await deleteBlog(req);
}
