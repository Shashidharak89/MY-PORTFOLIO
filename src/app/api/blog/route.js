import { createBlog, getAllBlogs } from '../../../backend/controllers/blogController.js';

export async function POST(req) {
  return await createBlog(req);
}

export async function GET() {
  return await getAllBlogs();
}
