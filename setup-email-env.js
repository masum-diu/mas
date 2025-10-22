const fs = require('fs');
const path = require('path');

// Email configuration
const emailConfig = {
  // Private environment variables (server-side only)
  EMAIL_USER: 'info@masoutfits.com',
  EMAIL_PASS: 'Mas@2015',
  EMAIL_HOST: 'mail.masoutfits.com',
  EMAIL_PORT: '465',
  
  // Public environment variables (accessible on client-side)
  NEXT_PUBLIC_EMAIL_USER: 'info@masoutfits.com',
  NEXT_PUBLIC_EMAIL_HOST: 'mail.masoutfits.com',
  NEXT_PUBLIC_EMAIL_PORT: '465'
};

// Create .env.local file
const envContent = Object.entries(emailConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

const envPath = path.join(process.cwd(), '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('📧 Email configuration:');
  console.log('   - Host:', emailConfig.EMAIL_HOST);
  console.log('   - Port:', emailConfig.EMAIL_PORT);
  console.log('   - User:', emailConfig.EMAIL_USER);
  console.log('   - Password: [HIDDEN]');
  console.log('\n🚀 Public variables are now available for client-side use!');
  console.log('   - NEXT_PUBLIC_EMAIL_HOST:', emailConfig.NEXT_PUBLIC_EMAIL_HOST);
  console.log('   - NEXT_PUBLIC_EMAIL_PORT:', emailConfig.NEXT_PUBLIC_EMAIL_PORT);
  console.log('   - NEXT_PUBLIC_EMAIL_USER:', emailConfig.NEXT_PUBLIC_EMAIL_USER);
} catch (error) {
  console.error('❌ Error creating .env.local file:', error.message);
  console.log('\n📝 Please create .env.local manually with the following content:');
  console.log(envContent);
}
