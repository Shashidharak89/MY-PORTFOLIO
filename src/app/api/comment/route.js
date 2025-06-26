import { addComment, getComments } from '../../../backend/controllers/blogController.js';

export async function PUT(req) {
  return await addComment(req);
}

export async function POST(req) {
  return await getComments(req);
}
