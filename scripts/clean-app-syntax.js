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
      if (file.endsWith('App.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src/app');

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Look for the specific broken pattern I created: => { const { t } = useTranslation(); return ( ... );
  // And it's missing the closing }
  
  if (content.includes('const { t } = useTranslation(); return (') && !content.includes('return (\n    <div') && !content.includes('})')) {
     // Re-standardize App.tsx
     const lines = content.split('\n');
     let startIndex = lines.findIndex(l => l.includes('const App =') && l.includes('=>'));
     if (startIndex !== -1) {
        // Simple rewrite for standardization
        let newContent = lines.slice(0, startIndex).join('\n') + '\n';
        newContent += 'const App = ({ initialPath }: { initialPath?: string }) => {\n';
        newContent += '  const { t } = useTranslation();\n';
        newContent += '  return (\n';
        
        let inRoutes = false;
        for (let i = startIndex + 1; i < lines.length; i++) {
            let line = lines[i];
            if (line.includes('<Routes>') || line.includes('<div') || line.includes('<MemoryRouter')) {
                inRoutes = true;
            }
            if (inRoutes) {
                // If it was the old closing line of the concise arrow: );
                if (line.trim() === ');') {
                    newContent += '  );\n};\n';
                } else if (line.trim() === '};' || line.trim() === '}') {
                    // Skip if it somehow already has one
                    continue;
                } else {
                    newContent += line + '\n';
                }
            }
        }
        // Cleanup extra closing braces if they exist at the end
        newContent = newContent.trimEnd() + '\n\nexport default App;\n';
        
        // Ensure useTranslation is imported
        if (!newContent.includes('import { useTranslation } from "react-i18next"')) {
            newContent = 'import { useTranslation } from "react-i18next";\n' + newContent;
        }

        fs.writeFileSync(f, newContent);
        console.log('Cleaned and Fixed App.tsx in:', f);
     }
  }
});
