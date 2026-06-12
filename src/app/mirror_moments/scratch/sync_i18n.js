import fs from 'fs';
import path from 'path';

const i18nDir = 'src/app/mirror_moments/_src/i18n';
const enPath = path.join(i18nDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const files = fs.readdirSync(i18nDir);

files.forEach(file => {
  if (file === 'en.json' || !file.endsWith('.json')) return;
  
  const filePath = path.join(i18nDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  let updated = false;
  Object.keys(enData).forEach(key => {
    if (!data[key]) {
      data[key] = enData[key]; // Fallback to English value
      updated = true;
    }
  });
  
  if (updated) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${file}`);
  }
});
