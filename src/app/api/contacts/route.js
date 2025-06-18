import { createContact, getAllContacts } from '../../../backend/controllers/contactsController.js';

export async function POST(req) {
  return await createContact(req);
}

export async function GET() {
  return await getAllContacts();
}