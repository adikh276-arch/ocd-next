import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

function repairFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Remove the corrupted hook injection that splits words or is inside template strings
  // The corrupted injection pattern: \n  const { t } = useTranslation(undefined, { keyPrefix: '...' });
  const corruptedRegex = /\n\s*const\s+\{\s*t\s*\}\s*=\s*useTranslation\(undefined,\s*\{\s*keyPrefix:\s*'[^']*'\s*\}\);/g;
  
  // We want to remove it IF it looks like it's in a bad place.
  // One way is to remove ALL of them and then re-inject properly.
  // Since I know I added them all recently, this is safer.
  
  if (content.match(corruptedRegex)) {
    content = content.replace(corruptedRegex, '');
    changed = true;
    console.log(`Cleaned: ${filePath}`);
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (file.endsWith('.tsx')) {
      repairFile(p);
    }
  }
}

console.log('--- STARTING REPAIR ---');
walk(APPS_DIR);
console.log('--- REPAIR COMPLETE ---');
