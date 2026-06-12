const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const globalLocalesDir = path.join(publicDir, 'locales');

const languages = [
  'en', 'es', 'fr', 'pt', 'de', 'ar', 'hi', 'bn', 'zh-CN', 'ja', 
  'id', 'tr', 'vi', 'ko', 'ru', 'it', 'pl', 'th', 'tl'
];

if (!fs.existsSync(globalLocalesDir)) {
  fs.mkdirSync(globalLocalesDir, { recursive: true });
}

const masterDict = {};
languages.forEach(lang => {
  masterDict[lang] = {};
  const langDir = path.join(globalLocalesDir, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }
});

const items = fs.readdirSync(publicDir);
items.forEach(appFolder => {
  if (appFolder === 'locales') return;

  const appLocalesDir = path.join(publicDir, appFolder, 'locales');
  if (fs.existsSync(appLocalesDir) && fs.statSync(appLocalesDir).isDirectory()) {
    
    languages.forEach(lang => {
      const jsonPath = path.join(appLocalesDir, lang, 'translation.json');
      if (fs.existsSync(jsonPath)) {
        try {
          const dict = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
          
          // NEST the dictionary under the app slug!
          // This prevents collisions like welcome.title
          masterDict[lang][appFolder] = dict;

          // Also keep the flat version for backward compatibility where possible, 
          // but prefixed would be better.
          // For now, let's see if we can just use the nested structure.
          
        } catch (e) {
          console.error(`Error parsing ${jsonPath}`);
        }
      }
    });

  }
});

// Save master dictionaries
languages.forEach(lang => {
  const destPath = path.join(globalLocalesDir, lang, 'translation.json');
  fs.writeFileSync(destPath, JSON.stringify(masterDict[lang], null, 2));
  console.log(`Saved master dictionary for ${lang} with ${Object.keys(masterDict[lang]).length} app namespaces.`);
});
