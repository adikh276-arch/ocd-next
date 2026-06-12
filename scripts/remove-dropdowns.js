const fs = require('fs');
const path = require('path');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Remove import
      const importRegex = /import\s*{\s*LanguageDropdown\s*}\s*from\s*["']@\/components\/LanguageDropdown["'];?\s*/g;
      if (importRegex.test(content)) {
        content = content.replace(importRegex, '');
        modified = true;
      }

      // Remove component usage
      const usageRegex = /<LanguageDropdown\s*\/>\s*/g;
      if (usageRegex.test(content)) {
        content = content.replace(usageRegex, '');
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

const appsDir = path.join(__dirname, '../src/app');
processDirectory(appsDir);
console.log('Cleanup complete.');
