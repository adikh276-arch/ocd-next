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

  // If the file uses useTranslation but does not import it, add it back!
  if (content.includes('useTranslation()') && !content.includes('from "react-i18next"')) {
    // Add import right after import React from 'react' or at top
    content = 'import { useTranslation } from "react-i18next";\n' + content;
    fs.writeFileSync(f, content);
    console.log('Fixed missing import in', f);
  }
});
