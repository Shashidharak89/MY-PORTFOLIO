import Subscriber from '../models/Subscriber.js';
import connectDB from '../utils/db.js';
import nodemailer from 'nodemailer';

export const createSubscriber = async (req) => {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check for existing subscriber (schema enforces uniqueness, but we check for custom response)
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return new Response(JSON.stringify({ error: 'Email already subscribed' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create and save subscriber (schema handles validation, lowercase, trim)
    const subscriber = new Subscriber({ email });
    await subscriber.save();

    // Set up Nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configure email options for portfolio subscription
    const mailOptions = {
      from: `"Your Portfolio" <${process.env.EMAIL_USER}>`,
      to: subscriber.email,
      subject: 'Welcome to My Portfolio Updates!',
      text: `Hi,\n\nThank you for subscribing to updates from my portfolio! You'll receive notifications about new projects, blog posts, and other exciting updates.\n\nBest regards,\n[Your Name]`,
      html: `
        <h1>Welcome to My Portfolio Updates!</h1>
        <p>Hi,</p>
        <p>Thank you for subscribing to updates from my portfolio! You'll receive notifications about new projects, blog posts, and other exciting updates.</p>
        <p>Best regards,<br>[Your Name]</p>
      `,
    };

    // Send the welcome email
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Continue with success response even if email fails
      return new Response(
        JSON.stringify({
          message: 'Subscribed successfully, but failed to send welcome email',
          subscriber,
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Subscribed successfully and welcome email sent', subscriber }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error creating subscriber:', error);
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Handle duplicate key error (E11000)
    if (error.code === 11000) {
      return new Response(JSON.stringify({ error: 'Email already subscribed' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const getAllSubscribers = async () => {
  try {
    await connectDB();
    const subscribers = await Subscriber.find({}, 'email createdAt').lean();

    return new Response(JSON.stringify(subscribers), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error retrieving subscribers:', error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};