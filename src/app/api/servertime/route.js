import { sendServerTimeEmail } from '../../../backend/controllers/serverTimeController.js';

export async function GET() {
  return await sendServerTimeEmail();
}
