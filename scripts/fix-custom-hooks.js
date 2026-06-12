/**
 * This script undoes damage done by patch-all-translations.js:
 * - Removes { keyPrefix: 'appname' } from custom useTranslation hooks that don't support it
 * - Specifically targets apps with their own useTranslation wrapper (grounded_techniques, etc.)
 */

const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = dir + '/' + file;
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(fullPath));
      } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        results.push(fullPath);
      }
    });
  } catch (e) {}
  return results;
}

// Apps that use their own custom useTranslation wrapper instead of react-i18next directly
// These should NOT have keyPrefix injected
const CUSTOM_HOOK_APPS = ['grounded_techniques'];

CUSTOM_HOOK_APPS.forEach(appSlug => {
  const appDir = path.join('src', 'app', appSlug);
  if (!fs.existsSync(appDir)) return;

  const files = walk(appDir);
  files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let modified = false;

    // Remove keyPrefix that was wrongly injected into custom useTranslation calls
    // Pattern: useTranslation(undefined, { keyPrefix: 'xxx' })  -> useTranslation()
    const fixed = content.replace(
      /useTranslation\(undefined,\s*\{\s*keyPrefix:\s*['"][^'"]*['"]\s*\}\)/g,
      'useTranslation()'
    );
    
    if (fixed !== content) {
      fs.writeFileSync(f, fixed);
      console.log('Fixed custom hook in:', f);
      modified = true;
    }
  });
});

// Fix grounded_techniques App.tsx specifically - it uses the custom hook so no keyPrefix needed
const gtApp = 'src/app/grounded_techniques/_src/App.tsx';
if (fs.existsSync(gtApp)) {
  let content = fs.readFileSync(gtApp, 'utf8');
  // Remove keyPrefix from App.tsx
  const fixed = content.replace(
    /useTranslation\(undefined,\s*\{\s*keyPrefix:\s*['"][^'"]*['"]\s*\}\)/g,
    'useTranslation()'
  );
  if (fixed !== content) {
    fs.writeFileSync(gtApp, fixed);
    console.log('Fixed grounded_techniques App.tsx');
  }
}

console.log('Done!');
