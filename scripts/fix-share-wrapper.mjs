import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

// Remove the wrapper div that was added for mt-auto placement
const wrapperPattern = /const Index = \(\) => \(\n\s*<div className="flex flex-col min-h-screen">\n\s*(<[A-Za-z]+ ?\/>)\n\s*<ShareActivity \/>\n\s*<\/div>\n\);/g;

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const file of fs.readdirSync(dir)) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (file.endsWith('.tsx')) {
      let c = fs.readFileSync(p, 'utf8');
      if (c.includes('flex flex-col min-h-screen') && c.includes('<ShareActivity />')) {
        const newC = c.replace(wrapperPattern, (_, comp) => {
          return `const Index = () => (\n  <>\n    ${comp}\n    <ShareActivity />\n  </>\n);`;
        });
        if (newC !== c) {
          fs.writeFileSync(p, newC);
          console.log(`Cleaned wrapper in: ${p}`);
        }
      }
    }
  }
}

console.log('Cleaning wrapper divs...');
walk(APPS_DIR);
console.log('Done.');
