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
  console.log("Starting email send process...");

  // Try multiple SMTP configurations
  const configs = [
    // Config 1: Port 587 with STARTTLS
    {
      host: "mail.masoutfits.com",
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: "info@masoutfits.com",
        pass: "Mas@2015",
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      tls: {
        rejectUnauthorized: false
      }
    },
    // Config 2: Port 25 (fallback)
    {
      host: "mail.masoutfits.com",
      port: 25,
      secure: false,
      auth: {
        user: "info@masoutfits.com",
        pass: "Mas@2015",
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      tls: {
        rejectUnauthorized: false
      }
    },
    // Config 3: Port 2525 (alternative)
    {
      host: "mail.masoutfits.com",
      port: 2525,
      secure: false,
      auth: {
        user: "info@masoutfits.com",
        pass: "Mas@2015",
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      tls: {
        rejectUnauthorized: false
      }
    }
  ];

  for (let i = 0; i < configs.length; i++) {
    try {
      console.log(`Trying SMTP config ${i + 1} (port ${configs[i].port})...`);
      
      const transporter = nodemailer.createTransport(configs[i]);
      
      // Verify connection
      await transporter.verify();
      console.log(`✅ SMTP connection successful with port ${configs[i].port}`);

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
      console.log(`❌ SMTP config ${i + 1} failed: ${error.message}`);
      if (i === configs.length - 1) {
        throw new Error(`All SMTP configurations failed. Last error: ${error.message}`);
      }
    }
  }
}