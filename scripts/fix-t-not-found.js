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
  let content = fs.readFileSync(f, 'utf8');
  const usesT = content.includes('t(');
  const definesT = content.includes('const { t } = useTranslation()') || content.includes('const { t, i18n } = useTranslation()');
  
  if (usesT && !definesT) {
    console.log('Fixing:', f);
    // Find where the component is declared. Typically const App = ({...}) => (
    // We can just convert `=> (` to `=> { const { t } = useTranslation(); return (`
    
    // Convert concise arrow functions returning JSX:
    content = content.replace(/(=>\s*)\(\s*(<div|<main|<MemoryRouter|<Routes)/g, '$1{ const { t } = useTranslation(); return (\n$2');
    // Also close the brace at the end of the Export default. But it's hard to find the end using regex.
    
    // Actually, an easier fix is just removing `{t('not_found')}` from `App.tsx` catch-all routes since it's just a fallback and not needed for translation if it crashes.
    if (f.endsWith('App.tsx') && content.includes('{t(\'not_found\')}')) {
      content = content.replace(/{t\('not_found'\)}/g, 'Not Found');
      // If after removing this, it no longer uses t(), remove the import
      if (!content.includes('t(')) {
         content = content.replace(/import { useTranslation } from "react-i18next";\r?\n/g, '');
      }
      fs.writeFileSync(f, content);
      console.log('Fixed simple catch-all in', f);
      return;
    }
    
    // For other files, let's just log them so we can fix them manually if needed
    console.log('Needs manual fix:', f);
  }
});
