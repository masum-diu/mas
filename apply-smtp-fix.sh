#!/bin/bash
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
echo "🧪 Test contact form on your website"