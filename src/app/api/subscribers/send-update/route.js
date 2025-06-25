// /app/api/subscribers/send-update/route.js
import { sendProjectUpdateEmail } from '../../../../backend/controllers/subscribersController';

export async function POST(req) {
  return await sendProjectUpdateEmail(req);
}
