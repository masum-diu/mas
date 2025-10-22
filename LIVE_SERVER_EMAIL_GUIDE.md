# Live Server Email Troubleshooting Guide

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
- Add `tls: { rejectUnauthorized: false }` to transporter config
- Use port 465 with secure: true

### 5. Authentication Issues
**Problem**: SMTP authentication fails.
**Solution**: 
- Verify email credentials
- Check if hosting provider blocks SMTP
- Use app-specific passwords if required

## Testing Steps

1. **Test Environment Variables**:
   ```bash
   node -e "console.log(process.env.EMAIL_HOST)"
   ```

2. **Test SMTP Connection**:
   ```bash
   node fix-live-server-email.js
   ```

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
4. **Third-party APIs**: Formspree, Netlify Forms