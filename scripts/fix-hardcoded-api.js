const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Patterns to replace
  const replacements = [
    { from: /'\/api\/logs'/g, to: "'/ocd/api/logs'" },
    { from: /"\/api\/logs"/g, to: '"/ocd/api/logs"' },
    { from: /`\/api\/logs/g, to: '`/ocd/api/logs' }
  ];

  replacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        walk(fullPath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

console.log('Starting migration to /ocd/api/logs...');
walk(path.join(__dirname, '../src'));
console.log('Migration complete.');
