import fs from 'fs';
import path from 'path';

const i18nDir = 'src/app/ocd-self-care/_src/i18n';
const enPath = path.join(i18nDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const files = fs.readdirSync(i18nDir);
let updatedCount = 0;

files.forEach(file => {
  if (file === 'en.json' || !file.endsWith('.json')) return;
  
  const filePath = path.join(i18nDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  let updated = false;
  Object.keys(enData).forEach(key => {
    if (data[key] === undefined) {
      data[key] = enData[key]; // Fallback to English
      updated = true;
    }
  });
  
  if (updated) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${file}`);
    updatedCount++;
  }
});

console.log(`\nDone! Updated ${updatedCount} files.`);
