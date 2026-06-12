import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

// These apps used a "mt-auto" wrapper that pushes the share button to the bottom (invisible)
// Replace with inline placement directly in the component
const badPattern = /<div className="mt-auto py-8">\s*<ShareActivity \/>\s*<\/div>/g;
const goodPattern = '<ShareActivity />';

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let c = fs.readFileSync(p, 'utf8');
      if (badPattern.test(c)) {
        badPattern.lastIndex = 0; // reset after test
        c = c.replace(badPattern, goodPattern);
        fs.writeFileSync(p, c);
        console.log(`Fixed mt-auto wrapper in: ${p}`);
      }
    }
  }
}

console.log('Removing hidden mt-auto Share wrappers...');
walk(APPS_DIR);
console.log('Done.');
