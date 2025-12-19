import nodemailer from "nodemailer";

export const sendServerTimeEmail = async (request) => {
  try {
    /* =======================
       🔐 Cron Security Check
    ======================= */
    const url = new URL(request.url);
    const key = url.searchParams.get("key");

    // Hard-coded secret
    if (key !== "cron123") {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    /* =======================
       ⏰ Server Time
    ======================= */
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const date = `${day}-${month}-${year}`;

    /* =======================
       ✉️ Mail Transporter
    ======================= */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
    });

    /* =======================
       📩 Mail Content
    ======================= */
    const mailOptions = {
      from: `"Server Time Notification" <${process.env.EMAIL_USER}>`,
      to: "dragonak474747@gmail.com",
      subject: "🕐 Server Time Notification",
      text: `Hey Shashi, it's Time: ${time} ${date}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px;">
            <h2>⏰ Server Time Notification</h2>
            <p style="font-size: 18px;">
              Hey Shashi, it's <strong>${time} ${date}</strong>
            </p>
            <hr/>
            <p style="font-size: 14px; color: #777;">
              Automated email from your server.
            </p>
          </div>
        </div>
      `,
    };

    /* =======================
       🚀 Send Mail
    ======================= */
    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Server time email sent successfully",
        serverTime: `${time} ${date}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Cron Email Error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to send server time email",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
