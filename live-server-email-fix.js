// Live Server Email Configuration Fix
// This script helps diagnose and fix email issues on live servers

const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

console.log("🔍 Live Server Email Diagnostics");
console.log("================================");

// Check environment variables
console.log("\n📋 Environment Variables Check:");
console.log("EMAIL_HOST:", process.env.EMAIL_HOST || "NOT SET");
console.log("EMAIL_PORT:", process.env.EMAIL_PORT || "NOT SET");
console.log("EMAIL_USER:", process.env.EMAIL_USER || "NOT SET");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET (hidden)" : "NOT SET");
console.log(
  "NEXT_PUBLIC_EMAIL_HOST:",
  process.env.NEXT_PUBLIC_EMAIL_HOST || "NOT SET"
);
console.log(
  "NEXT_PUBLIC_EMAIL_PORT:",
  process.env.NEXT_PUBLIC_EMAIL_PORT || "NOT SET"
);
console.log(
  "NEXT_PUBLIC_EMAIL_USER:",
  process.env.NEXT_PUBLIC_EMAIL_USER || "NOT SET"
);

// Test SMTP connection
async function testSMTPConnection() {
  console.log("\n🔧 Testing SMTP Connection...");

  const transporter = nodemailer.createTransport({
    host:
      process.env.NEXT_PUBLIC_EMAIL_HOST ||
      process.env.EMAIL_HOST ||
      "mail.masoutfits.com",
    port:
      parseInt(process.env.NEXT_PUBLIC_EMAIL_PORT || process.env.EMAIL_PORT) ||
      465,
    secure: true, // Use SSL for port 465
    auth: {
      user:
        process.env.NEXT_PUBLIC_EMAIL_USER ||
        process.env.EMAIL_USER ||
        "info@masoutfits.com",
      pass: process.env.EMAIL_PASS || "Mas@2015",
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP connection successful!");
    return true;
  } catch (error) {
    console.log("❌ SMTP connection failed:", error.message);
    console.log("🔍 Error details:", {
      code: error.code,
      response: error.response,
      command: error.command,
    });
    return false;
  }
}

// Generate production environment configuration
function generateProductionConfig() {
  console.log("\n📝 Production Environment Configuration:");
  console.log("==========================================");

  const config = {
    // For Vercel
    vercel: {
      EMAIL_HOST: "mail.masoutfits.com",
      EMAIL_PORT: "465",
      EMAIL_USER: "info@masoutfits.com",
      EMAIL_PASS: "Mas@2015",
      NEXT_PUBLIC_EMAIL_HOST: "mail.masoutfits.com",
      NEXT_PUBLIC_EMAIL_PORT: "465",
      NEXT_PUBLIC_EMAIL_USER: "info@masoutfits.com",
    },
    // For Netlify
    netlify: {
      EMAIL_HOST: "mail.masoutfits.com",
      EMAIL_PORT: "465",
      EMAIL_USER: "info@masoutfits.com",
      EMAIL_PASS: "Mas@2015",
      NEXT_PUBLIC_EMAIL_HOST: "mail.masoutfits.com",
      NEXT_PUBLIC_EMAIL_PORT: "465",
      NEXT_PUBLIC_EMAIL_USER: "info@masoutfits.com",
    },
    // For cPanel/Shared Hosting
    cpanel: {
      EMAIL_HOST: "mail.masoutfits.com",
      EMAIL_PORT: "465",
      EMAIL_USER: "info@masoutfits.com",
      EMAIL_PASS: "Mas@2015",
      NEXT_PUBLIC_EMAIL_HOST: "mail.masoutfits.com",
      NEXT_PUBLIC_EMAIL_PORT: "465",
      NEXT_PUBLIC_EMAIL_USER: "info@masoutfits.com",
    },
  };

  console.log("\n🚀 For Vercel Deployment:");
  console.log("Add these environment variables in Vercel Dashboard:");
  Object.entries(config.vercel).forEach(([key, value]) => {
    console.log(`${key}=${value}`);
  });

  console.log("\n🌐 For Netlify Deployment:");
  console.log("Add these environment variables in Netlify Dashboard:");
  Object.entries(config.netlify).forEach(([key, value]) => {
    console.log(`${key}=${value}`);
  });

  console.log("\n🏠 For cPanel/Shared Hosting:");
  console.log("Create a .env file in your project root:");
  Object.entries(config.cpanel).forEach(([key, value]) => {
    console.log(`${key}=${value}`);
  });
}

// Create improved contact API for live server
function createImprovedContactAPI() {
  const improvedAPI = `import nodemailer from "nodemailer";
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
      const filename = \`contact-\${Date.now()}.json\`;
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

  // Enhanced SMTP configuration for live servers
  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_EMAIL_HOST || process.env.EMAIL_HOST || "mail.masoutfits.com",
    port: parseInt(process.env.NEXT_PUBLIC_EMAIL_PORT || process.env.EMAIL_PORT) || 465,
    secure: true, // Use SSL for port 465
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER || process.env.EMAIL_USER || "info@masoutfits.com",
      pass: process.env.EMAIL_PASS || "Mas@2015",
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
    // Additional options for live servers
    tls: {
      rejectUnauthorized: false // For some hosting providers
    },
    pool: true, // Use connection pooling
    maxConnections: 1,
    maxMessages: 1,
  });

  // Verify connection configuration
  try {
    await transporter.verify();
    console.log("SMTP server connection verified successfully");
  } catch (verifyError) {
    console.error("SMTP verification failed:", verifyError.message);
    throw verifyError;
  }

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_USER || process.env.EMAIL_USER || "info@masoutfits.com",
    to: process.env.NEXT_PUBLIC_EMAIL_USER || process.env.EMAIL_USER || "info@masoutfits.com",
    replyTo: email,
    subject: \`New Contact Form Submission from \${name}\`,
    html: \`
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Name:</strong> \${name}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:\${email}">\${email}</a></p>
          <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:\${phone}">\${phone}</a></p>
          <p style="margin: 10px 0;"><strong>Appointment Date:</strong> \${
            appointmentDate || "Not specified"
          }</p>
        </div>
        <div style="background-color: #fff; padding: 20px; border-left: 4px solid #007bff;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #555;">\${message}</p>
        </div>
        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px; font-size: 12px; color: #666;">
          <p>This email was sent from the MAS Outfits contact form.</p>
          <p>Timestamp: \${new Date().toLocaleString()}</p>
        </div>
      </div>
    \`,
  };

  try {
    console.log("Attempting to send email...");
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;
  } catch (sendError) {
    console.error("Failed to send email:", {
      error: sendError.message,
      code: sendError.code,
      response: sendError.response,
    });
    throw sendError;
  } finally {
    // Close the transporter connection
    transporter.close();
  }
}`;

  fs.writeFileSync("pages/api/contact-improved.js", improvedAPI);
  console.log(
    "\n✅ Created improved contact API: pages/api/contact-improved.js"
  );
}

// Main execution
async function main() {
  await testSMTPConnection();
  generateProductionConfig();
  createImprovedContactAPI();

  console.log("\n🎯 Next Steps for Live Server:");
  console.log("1. Set environment variables in your hosting platform");
  console.log("2. Test the contact form");
  console.log("3. Check server logs for any errors");
  console.log("4. Consider using the improved contact API if issues persist");
}

main().catch(console.error);
