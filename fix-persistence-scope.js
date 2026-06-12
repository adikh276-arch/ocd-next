const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const appDir = path.resolve(process.cwd(), 'src/app');
const files = getAllFiles(appDir).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

const SNIPPET = "const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;";

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('/ocd/api/logs')) return;

  // Split content into lines to analyze scopes roughly
  const lines = content.split('\n');
  let changed = false;
  
  // Strategy: For every line that has 'user_id: ocd_user_id', 
  // check if ocd_user_id is defined in the previous ~20 lines.
  // If not, try to find the start of the current function and inject it.
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('user_id: ocd_user_id') || lines[i].includes('user_id=${ocd_user_id}')) {
      // Look backwards for declaration
      let found = false;
      for (let j = Math.max(0, i - 15); j < i; j++) {
        if (lines[j].includes('sessionStorage.getItem(\'user_id\')')) {
          found = true;
          break;
        }
      }
      
      if (!found) {
        // Find a good place to inject. Usually after the start of 'try {' or the start of the function.
        // We'll look back for 'async' or '=>' or '{'
        for (let j = i - 1; j >= 0; j--) {
          if (lines[j].includes('try {') || lines[j].includes('async') || lines[j].includes('=> {')) {
            lines.splice(j + 1, 0, `    ${SNIPPET}`);
            changed = true;
            i++; // shift index as we added a line
            break;
          }
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, lines.join('\n'), 'utf8');
    console.log(`Fixed scope in: ${file}`);
  }
});
