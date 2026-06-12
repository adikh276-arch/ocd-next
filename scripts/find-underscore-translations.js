const fs = require('fs');
const path = require('path');

function findJsonFiles(dir, results = []) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file === 'node_modules' || file === '.next' || file === '.git') return;
      findJsonFiles(fullPath, results);
    } else if (file.endsWith('.json')) {
      if (fullPath.includes('/i18n/') || fullPath.includes('\\i18n\\') || fullPath.includes('/locales/') || fullPath.includes('\\locales\\')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = findJsonFiles(path.join(process.cwd(), 'src/app'));
console.log(`Found ${files.length} translation json files.`);

const suspects = [];

files.forEach(file => {
  try {
    const content = JSON.parse(fs.readFileSync(file, 'utf8'));
    const relative = path.relative(process.cwd(), file);
    Object.entries(content).forEach(([key, val]) => {
      if (typeof val === 'string') {
        // If the key has underscores and the value equals the key, or contains underscores and no spaces
        if (key.includes('_') && (val === key || (val.includes('_') && !val.includes(' ') && val.length > 3))) {
          suspects.push({ file: relative, key, val });
        }
      }
    });
  } catch (e) {
    console.error(`Error parsing ${file}: ${e.message}`);
  }
});

console.log(`Found ${suspects.length} suspect translations.`);
fs.writeFileSync(path.join(process.cwd(), 'scripts/suspects.json'), JSON.stringify(suspects, null, 2));
console.log("Wrote suspects to scripts/suspects.json");
