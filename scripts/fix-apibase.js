const fs = require('fs');
const path = require('path');

// Since next.config.ts always uses basePath: '/ocd' (both dev AND prod),
// all API calls must go to /ocd/api — not /api in dev mode.
// Fix: replace the env-conditional apiBase with a fixed '/ocd/api'

const OLD_PATTERN = `process.env.NODE_ENV === 'production' ? '/ocd/api' : '/api'`;
const NEW_VALUE = `'/ocd/api'`;

let totalFixed = 0;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(OLD_PATTERN)) {
    const updated = content.replaceAll(OLD_PATTERN, NEW_VALUE);
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`  Fixed: ${filePath}`);
    totalFixed++;
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules and .next
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      walkDir(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

console.log('Fixing apiBase across all modules...\n');
walkDir(path.join(__dirname, '../src'));
console.log(`\nDone. Fixed ${totalFixed} file(s).`);
