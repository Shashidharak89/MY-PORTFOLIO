import nodemailer from 'nodemailer';

export const sendServerTimeEmail = async () => {
  try {
    // Get current server time
    const now = new Date();
    
    // Format time as HH:MM
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;
    
    // Format date as DD-MM-YYYY
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const date = `${day}-${month}-${year}`;
    
    // Set up Nodemailer transporter for Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configure email options
    const mailOptions = {
      from: `"Server Time Notification" <${process.env.EMAIL_USER}>`,
      to: 'dragonak474747@gmail.com',
      subject: '🕐 Server Time Notification',
      text: `Hey Shashi, it's Time: ${time} ${date}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px;">⏰ Server Time Notification</h2>
            <p style="font-size: 18px; color: #555; line-height: 1.6;">
              Hey Shashi, it's <strong>Time: ${time} ${date}</strong>
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 14px; color: #888;">
              This is an automated notification from your portfolio server.
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Server time email sent successfully',
        serverTime: `${time} ${date}`
      }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error sending server time email:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send server time email',
        details: error.message 
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
