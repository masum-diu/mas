import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  // Set CORS headers for live server
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { name, email, phone, message, appointmentDate } = req.body;

    try {
      // Save contact form data to a file
      const contactData = {
        timestamp: new Date().toISOString(),
        name,
        email,
        phone,
        message,
        appointmentDate: appointmentDate || "Not specified",
      };

      // Create contacts directory if it doesn't exist
      const contactsDir = path.join(process.cwd(), "contacts");
      if (!fs.existsSync(contactsDir)) {
        fs.mkdirSync(contactsDir, { recursive: true });
      }

      // Save to file
      const filename = `contact-${Date.now()}.json`;
      const filepath = path.join(contactsDir, filename);
      fs.writeFileSync(filepath, JSON.stringify(contactData, null, 2));

      console.log("Contact form data saved to:", filepath);

      // Send immediate response to prevent timeout
      res.status(200).json({
        message: "Message received successfully! We'll contact you soon.",
      });

      // Send email asynchronously
      sendEmail(name, email, phone, message, appointmentDate)
        .then(() => {
          console.log("Email sent successfully");
        })
        .catch((emailError) => {
          console.log("Email failed but form saved:", emailError.message);
        });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ message: "Failed to process request." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function sendEmail(name, email, phone, message, appointmentDate) {
  console.log("Starting email send process with Gmail SMTP...");

  // Gmail SMTP configuration (more reliable)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'info@masoutfits.com', // Use your Gmail account
      pass: 'your-app-password' // Use Gmail App Password
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  try {
    // Verify connection
    await transporter.verify();
    console.log("✅ Gmail SMTP connection successful");

    const mailOptions = {
      from: "info@masoutfits.com",
      to: "info@masoutfits.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p style="margin: 10px 0;"><strong>Appointment Date:</strong> ${
              appointmentDate || "Not specified"
            }</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border-left: 4px solid #007bff;">
            <h3 style="color: #333; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #555;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #666;">
            <p>This email was sent from the MAS Outfits contact form.</p>
            <p>Timestamp: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;

  } catch (error) {
    console.error("Failed to send email:", error.message);
    throw error;
  }
}