// Runs automatically before `npm run dev` (see the "predev" script).
// Makes sure dependencies are installed in root/, server/ and client/ so the
// dev servers can actually start — the most common cause of:
//   "The server could not be reached (HTTP 502)"

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.join(__dirname, '..');

const targets = [
  { name: 'root dependencies (concurrently)', dir: root },
  { name: 'server dependencies (express, mongoose, ...)', dir: path.join(root, 'server') },
  { name: 'client dependencies (react, vite, ...)', dir: path.join(root, 'client') },
];

for (const { name, dir } of targets) {
  if (!fs.existsSync(path.join(dir, 'node_modules'))) {
    console.log(`\n📦 Installing ${name} — first run only, this may take a minute...`);
    execSync('npm install --no-audit --no-fund', { cwd: dir, stdio: 'inherit' });
  }
}

console.log('\n✅ Dependencies ready — starting dev servers...\n');
