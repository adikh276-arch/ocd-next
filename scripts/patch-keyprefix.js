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
        if (file.endsWith('App.tsx')) {
          results.push(file);
        }
      }
    });
  } catch (e) {}
  return results;
}

const files = walk('src/app');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  if (content.includes('const App =') && content.includes('=>') && content.includes('useTranslation()')) {
      const appNameMatch = f.match(/src\/app\/([\w-]+)/);
      const appName = appNameMatch ? appNameMatch[1] : path.basename(path.dirname(path.dirname(f)));
      
      console.log('Patching keyPrefix for:', appName);
      
      // Replace the t definition to include the keyPrefix
      content = content.replace(
        /const { t } = useTranslation\(\);/g, 
        `const { t } = useTranslation(undefined, { keyPrefix: '${appName}' });`
      );
      
      fs.writeFileSync(f, content);
  }
});
