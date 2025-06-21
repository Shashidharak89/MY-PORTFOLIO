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
      subject: '🎉 Welcome to My Creative World!',
      text: `Hi,\n\nThanks for joining! You’ll now get updates on new projects, blog posts, and exclusive content straight from my portfolio.\n\nStay tuned!\n\nBest,\n[Your Name]`,
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      <div style="background-color: #8B0000; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">Welcome to My Creative World 🌟</h1>
      </div>
      <div style="padding: 30px;">
        <p style="font-size: 18px; color: #333;">Hi there,</p>
        <p style="font-size: 16px; color: #555;">
          Thank you for subscribing to updates from my portfolio! You're now part of a growing community of creators and dreamers.✨
        </p>
        <p style="font-size: 16px; color: #555;">
          From new <strong>projects</strong> and <strong>case studies</strong> to useful <strong>tips</strong> and behind-the-scenes stories — you’ll be the first to know!
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://your-portfolio-link.com" style="background-color: #FF4500; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">Explore My Work</a>
        </div>
        <p style="font-size: 16px; color: #555;">Welcome aboard!</p>
        <p style="font-size: 16px; color: #555;">Warm regards,<br><strong>[Your Name]</strong></p>
      </div>
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888;">
        You received this email because you subscribed on my portfolio site. 
        <br>If you didn’t, you can safely ignore it.
      </div>
    </div>
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