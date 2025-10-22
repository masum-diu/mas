// Live Server Email Diagnostic Tool
// This script helps identify why email works locally but not on live server

const nodemailer = require("nodemailer");
const fs = require("fs");

console.log("🔍 Live Server Email Diagnostic Tool");
console.log("====================================");

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
    secure: true,
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
      rejectUnauthorized: false,
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

// Create live server fix
function createLiveServerFix() {
  console.log("\n🔧 Creating Live Server Fix...");

  // Create a simple test API endpoint
  const testAPI = `export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      message: 'Live server test endpoint working',
      timestamp: new Date().toISOString(),
      environment: {
        EMAIL_HOST: process.env.EMAIL_HOST || 'NOT SET',
        EMAIL_PORT: process.env.EMAIL_PORT || 'NOT SET',
        EMAIL_USER: process.env.EMAIL_USER || 'NOT SET',
        EMAIL_PASS: process.env.EMAIL_PASS ? 'SET' : 'NOT SET',
        NEXT_PUBLIC_EMAIL_HOST: process.env.NEXT_PUBLIC_EMAIL_HOST || 'NOT SET',
        NEXT_PUBLIC_EMAIL_PORT: process.env.NEXT_PUBLIC_EMAIL_PORT || 'NOT SET',
        NEXT_PUBLIC_EMAIL_USER: process.env.NEXT_PUBLIC_EMAIL_USER || 'NOT SET'
      }
    });
  }

  if (req.method === 'POST') {
    const { name, email, phone, message, appointmentDate } = req.body;

    try {
      // Test email sending
      const nodemailer = require('nodemailer');
      
      const transporter = nodemailer.createTransport({
        host: process.env.NEXT_PUBLIC_EMAIL_HOST || process.env.EMAIL_HOST || "mail.masoutfits.com",
        port: parseInt(process.env.NEXT_PUBLIC_EMAIL_PORT || process.env.EMAIL_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.NEXT_PUBLIC_EMAIL_USER || process.env.EMAIL_USER || "info@masoutfits.com",
          pass: process.env.EMAIL_PASS || "Mas@2015",
        },
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 30000,
        tls: {
          rejectUnauthorized: false
        }
      });

      // Verify connection
      await transporter.verify();
      
      // Send test email
      const result = await transporter.sendMail({
        from: process.env.NEXT_PUBLIC_EMAIL_USER || process.env.EMAIL_USER || "info@masoutfits.com",
        to: process.env.NEXT_PUBLIC_EMAIL_USER || process.env.EMAIL_USER || "info@masoutfits.com",
        subject: \`Test Email from Live Server - \${name}\`,
        html: \`
          <h2>Test Email from Live Server</h2>
          <p><strong>Name:</strong> \${name}</p>
          <p><strong>Email:</strong> \${email}</p>
          <p><strong>Phone:</strong> \${phone}</p>
          <p><strong>Message:</strong> \${message}</p>
          <p><strong>Timestamp:</strong> \${new Date().toISOString()}</p>
        \`
      });

      return res.status(200).json({
        message: 'Test email sent successfully from live server',
        messageId: result.messageId,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Live server email error:', error);
      return res.status(500).json({
        message: 'Failed to send email from live server',
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}`;

  fs.writeFileSync("pages/api/test-live-email.js", testAPI);
  console.log("✅ Created test endpoint: /api/test-live-email");
}

// Create environment setup script for live server
function createLiveServerEnvSetup() {
  console.log("\n🌐 Creating Live Server Environment Setup...");

  const envSetup = `#!/bin/bash
# Live Server Environment Setup Script
# Run this on your live server to set up environment variables

echo "🔧 Setting up environment variables for live server..."

# Create .env.local file
cat > .env.local << 'EOF'
EMAIL_HOST=mail.masoutfits.com
EMAIL_PORT=465
EMAIL_USER=info@masoutfits.com
EMAIL_PASS=Mas@2015
NEXT_PUBLIC_EMAIL_HOST=mail.masoutfits.com
NEXT_PUBLIC_EMAIL_PORT=465
NEXT_PUBLIC_EMAIL_USER=info@masoutfits.com
EOF

echo "✅ Created .env.local file"

# Create .env.production file
cat > .env.production << 'EOF'
EMAIL_HOST=mail.masoutfits.com
EMAIL_PORT=465
EMAIL_USER=info@masoutfits.com
EMAIL_PASS=Mas@2015
NEXT_PUBLIC_EMAIL_HOST=mail.masoutfits.com
NEXT_PUBLIC_EMAIL_PORT=465
NEXT_PUBLIC_EMAIL_USER=info@masoutfits.com
EOF

echo "✅ Created .env.production file"

# Set file permissions
chmod 600 .env.local .env.production

echo "✅ Set proper file permissions"

# Test environment variables
echo "🧪 Testing environment variables..."
node -e "
require('dotenv').config({ path: '.env.local' });
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
console.log('NEXT_PUBLIC_EMAIL_HOST:', process.env.NEXT_PUBLIC_EMAIL_HOST);
console.log('NEXT_PUBLIC_EMAIL_PORT:', process.env.NEXT_PUBLIC_EMAIL_PORT);
console.log('NEXT_PUBLIC_EMAIL_USER:', process.env.NEXT_PUBLIC_EMAIL_USER);
"

echo "🎯 Environment setup complete!"
echo "📋 Next steps:"
echo "1. Restart your PM2 process: pm2 restart 6"
echo "2. Test the contact form on your live website"
echo "3. Check server logs: pm2 logs 6"
echo "4. Test the diagnostic endpoint: https://yourdomain.com/api/test-live-email"
`;

  fs.writeFileSync("setup-live-server-env.sh", envSetup);
  console.log("✅ Created setup script: setup-live-server-env.sh");
}

// Create troubleshooting guide for live server
function createLiveServerTroubleshooting() {
  const guide = `# Live Server Email Troubleshooting Guide

## Problem: Email works locally but not on live server

### Common Causes:

1. **Environment Variables Not Set**
   - Live server doesn't have .env.local file
   - Environment variables not loaded properly
   - Different environment variable names

2. **SMTP Server Blocking**
   - Hosting provider blocks SMTP port 465
   - Firewall restrictions
   - IP address not whitelisted

3. **SSL/TLS Issues**
   - Certificate verification fails
   - TLS version mismatch
   - Hosting provider SSL restrictions

4. **Node.js Version Differences**
   - Different Node.js versions
   - Missing dependencies
   - Package version conflicts

### Solutions:

#### 1. Set Environment Variables on Live Server

\`\`\`bash
# SSH into your live server
ssh root@your-server-ip

# Navigate to your project directory
cd /var/www/mas

# Create .env.local file
cat > .env.local << 'EOF'
EMAIL_HOST=mail.masoutfits.com
EMAIL_PORT=465
EMAIL_USER=info@masoutfits.com
EMAIL_PASS=Mas@2015
NEXT_PUBLIC_EMAIL_HOST=mail.masoutfits.com
NEXT_PUBLIC_EMAIL_PORT=465
NEXT_PUBLIC_EMAIL_USER=info@masoutfits.com
EOF

# Set proper permissions
chmod 600 .env.local

# Restart PM2 process
pm2 restart 6
\`\`\`

#### 2. Test Environment Variables

\`\`\`bash
# Test if environment variables are loaded
node -e "
require('dotenv').config({ path: '.env.local' });
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
"
\`\`\`

#### 3. Test SMTP Connection

\`\`\`bash
# Run the diagnostic script
node diagnose-live-server.js
\`\`\`

#### 4. Test Email Endpoint

Visit: \`https://yourdomain.com/api/test-live-email\`

This will show you:
- Environment variables status
- SMTP connection test
- Email sending test

#### 5. Check Server Logs

\`\`\`bash
# View PM2 logs
pm2 logs 6

# View specific error logs
pm2 logs 6 --err

# Monitor logs in real-time
pm2 logs 6 --follow
\`\`\`

### Alternative Solutions:

#### 1. Use Different SMTP Port
Try port 587 instead of 465:

\`\`\`javascript
const transporter = nodemailer.createTransport({
  host: "mail.masoutfits.com",
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: "info@masoutfits.com",
    pass: "Mas@2015",
  }
});
\`\`\`

#### 2. Use Email Service Provider
Consider using:
- SendGrid
- Mailgun
- AWS SES
- Nodemailer with Gmail

#### 3. Use Serverless Functions
Deploy email functionality as:
- Vercel Functions
- Netlify Functions
- AWS Lambda

### Testing Checklist:

- [ ] Environment variables set on live server
- [ ] .env.local file exists and has correct permissions
- [ ] PM2 process restarted after environment changes
- [ ] SMTP connection test passes
- [ ] Test email endpoint works
- [ ] Server logs show no errors
- [ ] Contact form submission works
- [ ] Email delivery confirmed

### Debug Commands:

\`\`\`bash
# Check if .env.local exists
ls -la .env.local

# Check file permissions
ls -la .env.local

# Test environment loading
node -e "require('dotenv').config({ path: '.env.local' }); console.log(process.env.EMAIL_HOST);"

# Test SMTP connection
node diagnose-live-server.js

# Check PM2 status
pm2 status

# View detailed logs
pm2 logs 6 --lines 100
\`\`\``;

  fs.writeFileSync("LIVE_SERVER_TROUBLESHOOTING.md", guide);
  console.log(
    "✅ Created troubleshooting guide: LIVE_SERVER_TROUBLESHOOTING.md"
  );
}

// Main execution
async function main() {
  console.log("\n🔧 Running diagnostics...");

  const smtpWorking = await testSMTPConnection();

  if (!smtpWorking) {
    console.log("\n⚠️  SMTP connection failed on live server!");
    console.log("📋 This is likely why emails aren't working on live server.");
  }

  createLiveServerFix();
  createLiveServerEnvSetup();
  createLiveServerTroubleshooting();

  console.log("\n🎯 Next Steps for Live Server:");
  console.log("1. SSH into your live server");
  console.log(
    "2. Run: chmod +x setup-live-server-env.sh && ./setup-live-server-env.sh"
  );
  console.log("3. Test: https://yourdomain.com/api/test-live-email");
  console.log("4. Check PM2 logs: pm2 logs 6");
  console.log("5. Restart PM2: pm2 restart 6");
}

main().catch(console.error);
