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
      from: `"Shashidhara K - Portfolio" <${process.env.EMAIL_USER}>`,
      to: subscriber.email,
      subject: '🎉 Thank You for Subscribing to Portfolio Updates!',
      text: `Hi,

Thank you for subscribing to updates from my portfolio. You'll now receive notifications about new projects, blogs, and other exciting professional updates.

Best regards,
Shashidhara K`,
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 15px rgba(0,0,0,0.1);">
      <div style="background: linear-gradient(135deg, #8B0000, #B22222); color: #fff; padding: 30px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; animation: fadeInDown 1s ease-in-out;">Welcome to My Portfolio</h1>
        <p style="margin: 10px 0 0; font-size: 16px;">Thank you for joining the journey!</p>
      </div>
      <div style="padding: 30px; animation: fadeInUp 1s ease-in-out;">
        <p style="font-size: 16px; color: #333;">
          Hello,
        </p>
        <p style="font-size: 16px; color: #555;">
          I’m thrilled to have you on board! As a subscriber, you’ll now receive professional updates directly from my portfolio — including new projects, insights, blog posts, and exclusive content.
        </p>
        <p style="font-size: 16px; color: #555;">
          Stay tuned for creative inspiration and exciting developments.
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://your-portfolio-link.com" style="background: linear-gradient(90deg, #FF6347, #FF4500); color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block; transition: background 0.3s ease;">
            Visit My Portfolio
          </a>
        </div>
        <p style="font-size: 16px; color: #555;">Warm regards,</p>
        <p style="font-size: 16px; color: #333;"><strong>Shashidhara K</strong></p>
      </div>
      <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999;">
        You’re receiving this email because you subscribed on my portfolio site.<br>
        If this wasn’t you, you may safely ignore it.
      </div>
    </div>

    <!-- Simulated Animation (works only in some clients that support it) -->
    <style>
      @keyframes fadeInDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
  `
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