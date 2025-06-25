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
      replyTo: 'shashidharak334@gmail.com', // Direct replies to this email
      subject: '🎉 Welcome to Shashidhara K\'s Portfolio - Innovation Awaits!',
      text: `Dear Valued Subscriber,

Thank you for joining my professional network! I'm genuinely excited to have you on board and look forward to sharing my journey of innovation and development with you.

As a subscriber, you'll receive exclusive notifications about:
- Latest project developments and technical innovations
- New blog posts and industry insights
- Professional achievements and significant milestones
- Upcoming speaking engagements and collaborative opportunities

I'm committed to delivering valuable content that showcases cutting-edge developments in technology and design.

Have questions or want to connect? Simply reply to this email at shashidharak334@gmail.com - I'd love to hear from you!

Best regards,
Shashidhara K
Software Developer & Innovation Enthusiast`,

      html: `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15); position: relative; animation: slideInUp 1s ease-out;">
      
      <!-- Header Section -->
      <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
        <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px); background-size: 20px 20px; animation: float 20s linear infinite;"></div>
        <h1 style="color: #ffffff; font-size: 2.2em; font-weight: 700; margin: 0 0 10px 0; position: relative; z-index: 2; text-shadow: 0 2px 10px rgba(0,0,0,0.2); animation: titleGlow 2s ease-in-out infinite alternate, pulse 2s ease-in-out infinite;">Welcome to My Portfolio!</h1>
        <p style="color: rgba(255,255,255,0.9); font-size: 1.1em; font-weight: 300; margin: 0; position: relative; z-index: 2;">Innovation • Development • Excellence</p>
      </div>
      
      <!-- Content Section -->
      <div style="padding: 40px 30px; background: #ffffff;">
        <p style="font-size: 1.2em; color: #2c3e50; margin: 0 0 25px 0; font-weight: 600; animation: fadeInLeft 1s ease-out 0.5s both;">Dear Valued Subscriber,</p>
        
        <p style="color: #555; font-size: 1.05em; margin: 0 0 30px 0; line-height: 1.8; animation: fadeInUp 1s ease-out 0.7s both;">
          Thank you for joining my professional network! I'm genuinely excited to have you on board and look forward to sharing my journey of innovation and development with you.
        </p>
        
        <!-- Features Box -->
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 15px; padding: 25px; margin: 25px 0; animation: scaleIn 1s ease-out 1s both;">
          <h3 style="color: #2c3e50; font-size: 1.3em; margin: 0 0 15px 0; font-weight: 600; text-align: center;">What You Can Expect:</h3>
          <ul style="list-style: none; margin: 0; padding: 0;">
            <li style="color: #555; padding: 8px 0; position: relative; padding-left: 25px; animation: slideInRight 0.6s ease-out 1.3s both;"><span style="position: absolute; left: 0; color: #4facfe; font-weight: bold; animation: sparkle 2s ease-in-out infinite;">✦</span>Latest project developments and technical innovations</li>
            <li style="color: #555; padding: 8px 0; position: relative; padding-left: 25px; animation: slideInRight 0.6s ease-out 1.4s both;"><span style="position: absolute; left: 0; color: #4facfe; font-weight: bold; animation: sparkle 2s ease-in-out infinite;">✦</span>New blog posts and industry insights</li>
            <li style="color: #555; padding: 8px 0; position: relative; padding-left: 25px; animation: slideInRight 0.6s ease-out 1.5s both;"><span style="position: absolute; left: 0; color: #4facfe; font-weight: bold; animation: sparkle 2s ease-in-out infinite;">✦</span>Professional achievements and significant milestones</li>
            <li style="color: #555; padding: 8px 0; position: relative; padding-left: 25px; animation: slideInRight 0.6s ease-out 1.6s both;"><span style="position: absolute; left: 0; color: #4facfe; font-weight: bold; animation: sparkle 2s ease-in-out infinite;">✦</span>Upcoming speaking engagements and collaborative opportunities</li>
          </ul>
        </div>
        
        <p style="color: #555; font-size: 1.05em; margin: 0 0 30px 0; line-height: 1.8; animation: fadeInUp 1s ease-out 0.7s both;">
          I'm committed to delivering valuable content that showcases cutting-edge developments in technology and design. Each update will provide meaningful insights into my professional growth and the exciting projects I'm working on.
        </p>
        
        <!-- Reply Section -->
        <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%); border-radius: 15px; padding: 20px; margin: 25px 0; text-align: center; border-left: 4px solid #4facfe; animation: fadeInUp 1s ease-out 1.8s both;">
          <p style="color: #2c3e50; font-size: 1.1em; margin: 0 0 10px 0; font-weight: 600;">💬 Want to Connect?</p>
          <p style="color: #555; font-size: 1em; margin: 0; line-height: 1.6;">
            Have questions or feedback? I'd love to hear from you! Simply reply to this email and it will reach me directly at 
            <a href="mailto:shashidharak334@gmail.com" style="color: #4facfe; text-decoration: none; font-weight: 600; animation: pulse 2s ease-in-out infinite;">shashidharak334@gmail.com</a>
          </p>
        </div>
        
        <!-- Call to Action Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="my-portfolio-s864-shashidharak89s-projects.vercel.app" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: #fff; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 25px; display: inline-block; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(79, 172, 254, 0.3); animation: buttonFloat 3s ease-in-out infinite;">
            🚀 Visit My Portfolio
          </a>
        </div>
        
        <!-- Signature -->
        <div style="margin-top: 35px; padding-top: 25px; border-top: 2px solid #e9ecef; animation: fadeIn 1s ease-out 2s both;">
          <p style="color: #2c3e50; font-weight: 600; font-size: 1.1em; margin: 0 0 5px 0;">Best regards,</p>
          <p style="color: #2c3e50; font-weight: 600; font-size: 1.1em; margin: 0 0 5px 0;">Shashidhara K</p>
          <p style="color: #6c757d; font-style: italic; font-size: 0.95em; margin: 0;">Software Developer & Innovation Enthusiast</p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 20px 30px; text-align: center; color: rgba(255,255,255,0.8); font-size: 0.9em;">
        <p style="margin: 0;">Thank you for being part of my professional journey!</p>
        <p style="margin: 10px 0 0 0; font-size: 0.8em;">You're receiving this because you subscribed to portfolio updates.<br>If this wasn't you, you may safely ignore this email.</p>
      </div>
    </div>
    
    <!-- Advanced CSS Animations -->
    <style>
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes float {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }
      
      @keyframes titleGlow {
        from { text-shadow: 0 2px 10px rgba(0,0,0,0.2); }
        to { text-shadow: 0 2px 20px rgba(255,255,255,0.3), 0 2px 10px rgba(0,0,0,0.2); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      @keyframes fadeInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes scaleIn {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes sparkle {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.2); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes buttonFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      
      /* Responsive Design */
      @media (max-width: 600px) {
        .container {
          margin: 10px !important;
          border-radius: 15px !important;
        }
        
        .header {
          padding: 30px 20px !important;
        }
        
        .welcome-title {
          font-size: 1.8em !important;
        }
        
        .content {
          padding: 30px 20px !important;
        }
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

// *********************************************************************AUTOMATED MAILS****************************************************

export const sendProjectUpdateEmail = async (req) => {
  try {
    await connectDB();

    const { projectName, date, description, projectlink } = await req.json();

    if (!projectName || !date || !description || !projectlink) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const subscribers = await Subscriber.find({}, 'email');

    if (subscribers.length === 0) {
      return new Response(JSON.stringify({ error: 'No subscribers found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const recipientEmails = subscribers.map((sub) => sub.email);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Shashidhara K - Portfolio" <${process.env.EMAIL_USER}>`,
      bcc: recipientEmails,
      replyTo: 'shashidharak334@gmail.com',
      subject: `🚀 New Project Launch: ${projectName} | ${date}`,
      text: `Dear Valued Subscriber,

Exciting news! I've just launched a new project that I'm thrilled to share with you.

🧠 Project Name: ${projectName}
📅 Launch Date: ${date}
📝 Description: ${description}
🔗 Project Link: ${projectlink}

I'd love to hear your thoughts! Feel free to reply to this email or visit my portfolio to explore more of my work.

Portfolio: https://portfolio.gamenexplay.live

Thank you for being part of this incredible journey!

Best regards,
Shashidhara K
Full-Stack Developer & Tech Enthusiast`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">🚀 New Project Launch!</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">From the portfolio of <strong>Shashidhara K</strong></p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #2d3748; font-size: 24px; margin: 0 0 10px 0; font-weight: 600;">Dear Valued Subscriber,</h2>
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">I'm excited to share my latest creation with you!</p>
            </div>

            <!-- Project Card -->
            <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12px; padding: 30px; margin: 30px 0; border-left: 5px solid #4facfe; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
              <div style="text-align: center;">
                <h3 style="color: #2d3748; font-size: 22px; font-weight: 600;">🧠 ${projectName}</h3>
                <p style="color: #718096; font-size: 14px;">📅 Launched on ${date}</p>
              </div>

              <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <h4 style="color: #4a5568; font-size: 16px; margin-bottom: 10px;">📝 Description:</h4>
                <p style="color: #2d3748; font-size: 15px; line-height: 1.7;">${description}</p>

                <h4 style="color: #4a5568; font-size: 16px; margin-top: 20px;">🔗 Project Link:</h4>
                <a href="${projectlink}" target="_blank" style="color: #3182ce; text-decoration: none;">${projectlink}</a>
              </div>
            </div>

            <!-- CTA -->
            <div style="text-align: center; margin: 40px 0;">
              <a href="https://portfolio.gamenexplay.live" style="display: inline-block; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);">
                🌐 Visit My Portfolio
              </a>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">I'd love to hear your thoughts! Feel free to reply to this email with your feedback or questions.</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <h4 style="color: #2d3748; font-size: 18px; font-weight: 600;">Shashidhara K</h4>
            <p style="color: #718096; font-size: 14px;">Full-Stack Developer & Tech Enthusiast</p>
            <p style="color: #a0aec0; font-size: 12px; line-height: 1.5; margin-top: 20px;">
              You're receiving this email because you subscribed to updates from my portfolio.<br>
              Contact: <a href="mailto:shashidharak334@gmail.com" style="color: #4facfe;">shashidharak334@gmail.com</a><br>
              <a href="https://portfolio.gamenexplay.live" style="color: #4facfe;">portfolio.gamenexplay.live</a>
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ message: 'Project update email sent to all subscribers.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending project update email:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
