// Fix for SMTP Port Blocked Issue
// This script creates alternative SMTP configurations for blocked hosting providers

const fs = require("fs");

console.log("🔧 Fixing SMTP Port Blocked Issue");
console.log("==================================");

// Create alternative SMTP configurations
function createAlternativeSMTPConfigs() {
  console.log("\n🔧 Creating Alternative SMTP Configurations...");

  // Configuration 1: Use port 587 with STARTTLS
  const config587 = `import nodemailer from "nodemailer";
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
      console.log(\`Trying SMTP config \${i + 1} (port \${configs[i].port})...\`);
      
      const transporter = nodemailer.createTransport(configs[i]);
      
      // Verify connection
      await transporter.verify();
      console.log(\`✅ SMTP connection successful with port \${configs[i].port}\`);

      const mailOptions = {
        from: "info@masoutfits.com",
        to: "info@masoutfits.com",
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

      const result = await transporter.sendMail(mailOptions);
      console.log("Email sent successfully:", result.messageId);
      return result;

    } catch (error) {
      console.log(\`❌ SMTP config \${i + 1} failed: \${error.message}\`);
      if (i === configs.length - 1) {
        throw new Error(\`All SMTP configurations failed. Last error: \${error.message}\`);
      }
    }
  }
}`;

  fs.writeFileSync("pages/api/contact-alternative.js", config587);
  console.log(
    "✅ Created alternative contact API: pages/api/contact-alternative.js"
  );

  // Create Gmail SMTP configuration
  const gmailConfig = `import nodemailer from "nodemailer";
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

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.messageId);
    return result;

  } catch (error) {
    console.error("Failed to send email:", error.message);
    throw error;
  }
}`;

  fs.writeFileSync("pages/api/contact-gmail.js", gmailConfig);
  console.log("✅ Created Gmail contact API: pages/api/contact-gmail.js");
}

// Create server configuration fix
function createServerConfigFix() {
  console.log("\n🔧 Creating Server Configuration Fix...");

  const serverFix = `# Fix for SMTP Port Blocked Issue

## Problem
Your hosting provider is blocking SMTP port 465, causing "Connection timeout" errors.

## Solutions

### Solution 1: Use Alternative SMTP Ports
Try these ports in order:
1. Port 587 (STARTTLS) - Most reliable
2. Port 25 (Standard SMTP)
3. Port 2525 (Alternative)

### Solution 2: Use Gmail SMTP
1. Create a Gmail account for your business
2. Enable 2-factor authentication
3. Generate an App Password
4. Use Gmail SMTP (more reliable)

### Solution 3: Use Email Service Provider
Consider using:
- SendGrid (Free tier: 100 emails/day)
- Mailgun (Free tier: 5,000 emails/month)
- AWS SES (Very cheap)
- Nodemailer with Gmail

## Quick Fix Commands

### Test Alternative Ports
\`\`\`bash
# Test port 587
telnet mail.masoutfits.com 587

# Test port 25
telnet mail.masoutfits.com 25

# Test port 2525
telnet mail.masoutfits.com 2525
\`\`\`

### Update Contact API
Replace your current contact API with the alternative version:

\`\`\`bash
# Backup current API
cp pages/api/contact.js pages/api/contact-backup.js

# Use alternative API
cp pages/api/contact-alternative.js pages/api/contact.js

# Restart PM2
pm2 restart 6
\`\`\`

### Test the Fix
1. Submit a test contact form
2. Check PM2 logs: \`pm2 logs 6\`
3. Verify email delivery

## Alternative: Use Gmail SMTP

1. Create Gmail account: info@masoutfits.com
2. Enable 2FA in Gmail
3. Generate App Password
4. Update contact API with Gmail credentials
5. Test email sending

## Monitoring

Check logs for successful connections:
\`\`\`bash
pm2 logs 6 | grep "SMTP connection successful"
\`\`\`

## Troubleshooting

If all ports are blocked:
1. Contact your hosting provider
2. Use Gmail SMTP
3. Use email service provider
4. Use serverless functions (Vercel/Netlify)`;

  fs.writeFileSync("SMTP_PORT_BLOCKED_FIX.md", serverFix);
  console.log("✅ Created server configuration fix: SMTP_PORT_BLOCKED_FIX.md");
}

// Create quick fix script
function createQuickFixScript() {
  console.log("\n🔧 Creating Quick Fix Script...");

  const quickFix = `#!/bin/bash
# Quick Fix for SMTP Port Blocked Issue

echo "🔧 Applying SMTP Port Blocked Fix..."

# Backup current contact API
cp pages/api/contact.js pages/api/contact-backup.js
echo "✅ Backed up current contact API"

# Use alternative contact API
cp pages/api/contact-alternative.js pages/api/contact.js
echo "✅ Applied alternative SMTP configuration"

# Restart PM2
pm2 restart 6
echo "✅ Restarted PM2 process"

echo "🎯 Fix applied! Test your contact form now."
echo "📋 Check logs: pm2 logs 6"
echo "🧪 Test contact form on your website"`;

  fs.writeFileSync("apply-smtp-fix.sh", quickFix);
  console.log("✅ Created quick fix script: apply-smtp-fix.sh");
}

// Main execution
function main() {
  createAlternativeSMTPConfigs();
  createServerConfigFix();
  createQuickFixScript();

  console.log("\n🎯 SMTP Port Blocked Fix Complete!");
  console.log("==================================");
  console.log("📋 Next Steps:");
  console.log("1. Run: chmod +x apply-smtp-fix.sh && ./apply-smtp-fix.sh");
  console.log("2. Test your contact form");
  console.log("3. Check PM2 logs: pm2 logs 6");
  console.log("4. If still failing, try Gmail SMTP or email service provider");
}

main();
