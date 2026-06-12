const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src/app');

files.forEach(f => {
  // Never touch global layout or global components
  if (f.includes('layout.tsx') || f.includes('src/components/')) return;
  
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Match: import LanguageSwitcher from '...'
  // Match: import { LanguageSwitcher } from '...'
  content = content.replace(/^import\s*\{?\s*LanguageSwitcher\s*\}?\s*from\s+['"].*?['"];?\r?\n/gm, '');

  // Remove <LanguageSwitcher /> 
  content = content.replace(/<LanguageSwitcher\s*\/>/g, '');

  if (content !== original) {
    fs.writeFileSync(f, content);
    console.log('Cleaned:', f);
  }
});
