// Quick MongoDB connection check.
// Usage: npm --prefix server run check-db
// (run from the repo root, after filling MONGODB_URI in server/.env)

require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || '';

// Never print the password
const masked = uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');

(async () => {
  console.log(`\nAttempting to connect to:\n  ${masked || '(empty)'}\n`);

  if (!uri) {
    console.error('❌ MONGODB_URI is not set in server/.env');
    process.exit(1);
  }
  if (uri.includes('<db_password>')) {
    console.error('❌ MONGODB_URI still contains the "<db_password>" placeholder.');
    console.error('\nFix: open server/.env and replace <db_password> with your actual database');
    console.error('user password (URL-encode special characters: @ -> %40, # -> %23, etc.).');
    console.error('\nGet the full string from Atlas: Database Deployments -> Connect -> Drivers.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log('✅ Connected to MongoDB Atlas successfully!');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    if (collections.length === 0) {
      console.log('ℹ️  Database is empty (the "users" collection is created automatically');
      console.log('   the first time someone registers).');
    } else {
      console.log(`Collections: ${collections.map(c => c.name).join(', ')}`);
      if (collections.some(c => c.name === 'users')) {
        const count = await db.collection('users').countDocuments();
        console.log(`users collection: ${count} document(s)`);
      }
    }

    console.log('\nYour backend is ready to use this database. Start it with:');
    console.log('  npm run dev   (from the repo root)');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    const msg = (err && err.message) || String(err);

    if (msg.includes('bad auth') || msg.includes('Authentication failed')) {
      console.error('❌ Authentication failed — wrong username or password.');
      console.error('\nCheck in Atlas:');
      console.error('  1. Database Access -> your user exists and password matches');
      console.error('     (the user in the URI: see the masked string above)');
      console.error('  2. Special characters in the password must be URL-encoded');
      console.error('     (@ -> %40, # -> %23, $ -> %24, % -> %25)');
    } else if (
      msg.includes('timed out') ||
      msg.includes('ENOTFOUND') ||
      msg.includes('ECONNREFUSED') ||
      msg.includes('ECONNRESET') ||
      msg.includes('getaddrinfo')
    ) {
      console.error('❌ Could not reach the cluster.');
      console.error('\nCheck in Atlas:');
      console.error('  1. Network Access -> add your IP (or 0.0.0.0/0 to allow anywhere)');
      console.error('  2. The cluster host in the URI matches your cluster');
      console.error('     (Database Deployments -> Connect -> Drivers -> copy the string)');
      console.error('  3. Your own internet/firewall allows port 27017');
    } else {
      console.error('❌ Connection error:', msg);
    }

    process.exit(1);
  }
})();
