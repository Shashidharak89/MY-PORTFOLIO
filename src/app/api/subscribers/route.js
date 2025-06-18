import { createSubscriber, getAllSubscribers } from '../../../backend/controllers/subscribersController.js';

export async function POST(req) {
  return await createSubscriber(req);
}

export async function GET() {
  return await getAllSubscribers();
}