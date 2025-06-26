import { addLike, getLikes } from '../../../backend/controllers/blogController.js';

export async function PUT(req) {
  return await addLike(req);
}

export async function POST(req) {
  return await getLikes(req);
}
