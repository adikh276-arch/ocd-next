const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
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
  } catch (e) {}
  return results;
}

const apps = fs.readdirSync('src/app');

apps.forEach(appSlug => {
  const appDir = path.join('src', 'app', appSlug);
  if (!fs.existsSync(appDir) || !fs.statSync(appDir).isDirectory()) return;

  const files = walk(appDir);
  files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    
    // Only patch files that actually call useTranslation()
    if (content.includes('useTranslation()')) {
        console.log(`Patching useTranslation in ${f} with prefix ${appSlug}`);
        
        // Replace: const { t } = useTranslation();
        // With: const { t } = useTranslation(undefined, { keyPrefix: 'appSlug' });
        
        content = content.replace(
          /const \{ (t) \} = useTranslation\(\);/g, 
          `const { $1 } = useTranslation(undefined, { keyPrefix: '${appSlug}' });`
        );

        // Also handle variants: const { t, i18n } = useTranslation();
        content = content.replace(
          /const \{ (t,\s*i18n) \} = useTranslation\(\);/g, 
          `const { $1 } = useTranslation(undefined, { keyPrefix: '${appSlug}' });`
        );
        
        content = content.replace(
          /const \{ (i18n,\s*t) \} = useTranslation\(\);/g, 
          `const { $1 } = useTranslation(undefined, { keyPrefix: '${appSlug}' });`
        );

        fs.writeFileSync(f, content);
    }
  });
});
