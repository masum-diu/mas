// Fix for Live Server Email Issues
// This script addresses common problems with email on live servers

const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

console.log("🔧 Live Server Email Fix");
console.log("========================");

// Load environment variables manually
require("dotenv").config({ path: ".env.local" });

console.log("\n📋 Environment Variables Status:");
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

// Test SMTP connection with fallback values
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
    tls: {
      rejectUnauthorized: false, // For some hosting providers
    },
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

// Create production-ready contact API
function createProductionContactAPI() {
  const productionAPI = `import nodemailer from "nodemailer";
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

  fs.writeFileSync("pages/api/contact-production.js", productionAPI);
  console.log(
    "\n✅ Created production-ready contact API: pages/api/contact-production.js"
  );
}

// Create environment setup for different hosting platforms
function createHostingConfigs() {
  console.log("\n🌐 Hosting Platform Configurations:");
  console.log("===================================");

  // Vercel configuration
  const vercelConfig = {
    functions: {
      "pages/api/contact.js": {
        maxDuration: 30,
      },
    },
    env: {
      EMAIL_HOST: "mail.masoutfits.com",
      EMAIL_PORT: "465",
      EMAIL_USER: "info@masoutfits.com",
      EMAIL_PASS: "Mas@2015",
      NEXT_PUBLIC_EMAIL_HOST: "mail.masoutfits.com",
      NEXT_PUBLIC_EMAIL_PORT: "465",
      NEXT_PUBLIC_EMAIL_USER: "info@masoutfits.com",
    },
  };

  fs.writeFileSync("vercel.json", JSON.stringify(vercelConfig, null, 2));
  console.log("✅ Created vercel.json for Vercel deployment");

  // Netlify configuration
  const netlifyConfig = `[build.environment]
  EMAIL_HOST = "mail.masoutfits.com"
  EMAIL_PORT = "465"
  EMAIL_USER = "info@masoutfits.com"
  EMAIL_PASS = "Mas@2015"
  NEXT_PUBLIC_EMAIL_HOST = "mail.masoutfits.com"
  NEXT_PUBLIC_EMAIL_PORT = "465"
  NEXT_PUBLIC_EMAIL_USER = "info@masoutfits.com"

[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200`;

  fs.writeFileSync("netlify.toml", netlifyConfig);
  console.log("✅ Created netlify.toml for Netlify deployment");

  // cPanel/Shared Hosting configuration
  const cpanelEnv = `EMAIL_HOST=mail.masoutfits.com
EMAIL_PORT=465
EMAIL_USER=info@masoutfits.com
EMAIL_PASS=Mas@2015
NEXT_PUBLIC_EMAIL_HOST=mail.masoutfits.com
NEXT_PUBLIC_EMAIL_PORT=465
NEXT_PUBLIC_EMAIL_USER=info@masoutfits.com`;

  fs.writeFileSync(".env.production", cpanelEnv);
  console.log("✅ Created .env.production for cPanel/Shared hosting");
}

// Create troubleshooting guide
function createTroubleshootingGuide() {
  const guide = `# Live Server Email Troubleshooting Guide

## Common Issues and Solutions

### 1. Environment Variables Not Loading
**Problem**: Environment variables are not being read on the live server.
**Solution**: 
- For Vercel: Add variables in Dashboard > Settings > Environment Variables
- For Netlify: Add variables in Site Settings > Environment Variables
- For cPanel: Upload .env file to your project root

### 2. SMTP Connection Timeout
**Problem**: Email sending times out on live server.
**Solution**: 
- Increase timeout values in your hosting provider settings
- Use connection pooling
- Add TLS configuration for some providers

### 3. 504 Gateway Timeout
**Problem**: Server returns 504 error before email is sent.
**Solution**: 
- Implement async email sending
- Return response immediately
- Process email in background

### 4. SSL/TLS Issues
**Problem**: SSL certificate verification fails.
**Solution**: 
- Add \`tls: { rejectUnauthorized: false }\` to transporter config
- Use port 465 with secure: true

### 5. Authentication Issues
**Problem**: SMTP authentication fails.
**Solution**: 
- Verify email credentials
- Check if hosting provider blocks SMTP
- Use app-specific passwords if required

## Testing Steps

1. **Test Environment Variables**:
   \`\`\`bash
   node -e "console.log(process.env.EMAIL_HOST)"
   \`\`\`

2. **Test SMTP Connection**:
   \`\`\`bash
   node fix-live-server-email.js
   \`\`\`

3. **Test Contact Form**:
   - Submit a test form
   - Check server logs
   - Verify email delivery

## Production Checklist

- [ ] Environment variables set in hosting platform
- [ ] SMTP credentials are correct
- [ ] Timeout settings configured
- [ ] CORS headers set
- [ ] Error handling implemented
- [ ] Logging enabled for debugging

## Alternative Solutions

If SMTP continues to fail, consider:
1. **Email Service Providers**: SendGrid, Mailgun, AWS SES
2. **Serverless Functions**: Vercel Functions, Netlify Functions
3. **Queue Systems**: Bull/BullMQ for email processing
4. **Third-party APIs**: Formspree, Netlify Forms`;

  fs.writeFileSync("LIVE_SERVER_EMAIL_GUIDE.md", guide);
  console.log("✅ Created troubleshooting guide: LIVE_SERVER_EMAIL_GUIDE.md");
}

// Main execution
async function main() {
  console.log("\n🔧 Running diagnostics...");

  const smtpWorking = await testSMTPConnection();

  if (!smtpWorking) {
    console.log(
      "\n⚠️  SMTP connection failed. This is likely the cause of your live server email issues."
    );
    console.log("📋 Common causes:");
    console.log("   1. Environment variables not set on live server");
    console.log("   2. SMTP server blocking connections");
    console.log("   3. SSL/TLS configuration issues");
    console.log("   4. Firewall blocking SMTP port 465");
  }

  createProductionContactAPI();
  createHostingConfigs();
  createTroubleshootingGuide();

  console.log("\n🎯 Next Steps:");
  console.log("1. Set environment variables in your hosting platform");
  console.log("2. Use the production contact API if issues persist");
  console.log("3. Check the troubleshooting guide for detailed solutions");
  console.log("4. Test the contact form after making changes");
}

main().catch(console.error);
