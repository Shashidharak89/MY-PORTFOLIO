import Contact from '../models/Contact.js';
import connectDB from '../utils/db.js';

export const createContact = async (req) => {
  try {
    await connectDB();
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Name, email, and message are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contact = new Contact({ name, email, phone, message });
    await contact.save();

    return new Response(JSON.stringify({ message: 'Contact submitted successfully', contact }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const getAllContacts = async () => {
  try {
    await connectDB();
    const contacts = await Contact.find().lean();

    return new Response(JSON.stringify(contacts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};