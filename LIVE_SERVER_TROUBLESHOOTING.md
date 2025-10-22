# Live Server Email Troubleshooting Guide

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

```bash
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
```

#### 2. Test Environment Variables

```bash
# Test if environment variables are loaded
node -e "
require('dotenv').config({ path: '.env.local' });
console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');
"
```

#### 3. Test SMTP Connection

```bash
# Run the diagnostic script
node diagnose-live-server.js
```

#### 4. Test Email Endpoint

Visit: `https://yourdomain.com/api/test-live-email`

This will show you:
- Environment variables status
- SMTP connection test
- Email sending test

#### 5. Check Server Logs

```bash
# View PM2 logs
pm2 logs 6

# View specific error logs
pm2 logs 6 --err

# Monitor logs in real-time
pm2 logs 6 --follow
```

### Alternative Solutions:

#### 1. Use Different SMTP Port
Try port 587 instead of 465:

```javascript
const transporter = nodemailer.createTransport({
  host: "mail.masoutfits.com",
  port: 587,
  secure: false, // Use STARTTLS
  auth: {
    user: "info@masoutfits.com",
    pass: "Mas@2015",
  }
});
```

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

```bash
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
```