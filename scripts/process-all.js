const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const appsDir = path.join(__dirname, '../src/app');
const modules = fs.readdirSync(appsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && fs.existsSync(path.join(appsDir, dirent.name, '_src')))
  .map(dirent => dirent.name);

console.log(`Processing ${modules.length} modules...`);

for (const moduleName of modules) {
  console.log(`\n========================================`);
  console.log(`Processing module: ${moduleName}`);
  console.log(`========================================`);
  try {
    execSync(`node scripts/i18n-tool.js ${moduleName}`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to process ${moduleName}:`, err.message);
  }
}

console.log('\nAll modules processed!');
