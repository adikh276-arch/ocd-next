import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

function auditShareActivity(slug) {
  const srcDir = path.join(APPS_DIR, slug, '_src');
  if (!fs.existsSync(srcDir)) return null;

  let hasShare = false;
  
  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const p = path.join(dir, file);
      if (fs.statSync(p).isDirectory()) {
        walk(p);
      } else if (file.endsWith('.tsx')) {
        const content = fs.readFileSync(p, 'utf8');
        if (content.includes('<ShareActivity') || content.includes('ShareActivity />')) {
          hasShare = true;
        }
      }
    }
  }

  walk(srcDir);
  return hasShare ? null : slug;
}

const apps = fs.readdirSync(APPS_DIR).filter(f => fs.statSync(path.join(APPS_DIR, f)).isDirectory());
const missing = [];

for (const slug of apps) {
  if (slug.startsWith('[') || slug.startsWith('_')) continue;
  const result = auditShareActivity(slug);
  if (result) missing.push(result);
}

console.log('--- APPS MISSING SHARE CTA ---');
console.log(missing.join('\n'));
console.log(`\nTotal missing: ${missing.length}`);
