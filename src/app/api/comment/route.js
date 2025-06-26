import { commentBlog } from '../../../backend/controllers/blogController.js';

export async function PUT(req) {
  return await commentBlog(req);
}
