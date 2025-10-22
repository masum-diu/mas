#!/bin/bash
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
