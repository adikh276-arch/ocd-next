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

const REACT_HOOKS = [
  'useState', 'useEffect', 'useCallback', 'useMemo', 'useRef',
  'useContext', 'useReducer', 'useLayoutEffect', 'useImperativeHandle',
  'useDebugValue', 'useDeferredValue', 'useTransition', 'useId',
  'useSyncExternalStore', 'useInsertionEffect'
];

const files = walk('src/app');
let fixedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let modified = false;

  // Find which hooks are used in this file
  const usedHooks = REACT_HOOKS.filter(hook => {
    // Check if hook is actually called (not just mentioned in a comment or string)
    const regex = new RegExp(`\\b${hook}\\s*\\(`, 'g');
    return regex.test(content);
  });

  if (usedHooks.length === 0) return;

  // Find existing React imports
  const reactImportMatch = content.match(/^import React(?:,\s*\{([^}]*)\})?\s*from ['"]react['"];?\r?\n/m);
  const hooksImportMatch = content.match(/^import\s*\{([^}]+)\}\s*from ['"]react['"];?\r?\n/m);

  // Determine which hooks are already imported
  let alreadyImportedHooks = new Set();
  
  if (reactImportMatch && reactImportMatch[1]) {
    reactImportMatch[1].split(',').map(h => h.trim()).forEach(h => alreadyImportedHooks.add(h));
  }
  if (hooksImportMatch) {
    hooksImportMatch[1].split(',').map(h => h.trim()).forEach(h => alreadyImportedHooks.add(h));
  }

  // Determine missing hooks
  const missingHooks = usedHooks.filter(h => !alreadyImportedHooks.has(h));

  if (missingHooks.length === 0) return;

  console.log(`Fixing ${f}: missing [${missingHooks.join(', ')}]`);

  // If there's already a hooks import { ... } from 'react', add to it
  if (hooksImportMatch) {
    const existingHooks = hooksImportMatch[1].split(',').map(h => h.trim()).filter(Boolean);
    const allHooks = [...new Set([...existingHooks, ...missingHooks])].sort();
    const newImport = `import { ${allHooks.join(', ')} } from 'react';`;
    content = content.replace(hooksImportMatch[0].trimEnd(), newImport);
    modified = true;
  } else if (reactImportMatch) {
    // If there's import React from 'react', upgrade it
    const existingHooks = reactImportMatch[1] ? reactImportMatch[1].split(',').map(h => h.trim()).filter(Boolean) : [];
    const allHooks = [...new Set([...existingHooks, ...missingHooks])].sort();
    const newImport = `import React, { ${allHooks.join(', ')} } from 'react';`;
    content = content.replace(reactImportMatch[0].trimEnd(), newImport);
    modified = true;
  } else {
    // No React import at all - add one at the very top
    const hooksStr = missingHooks.sort().join(', ');
    content = `import { ${hooksStr} } from 'react';\n` + content;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(f, content);
    fixedCount++;
  }
});

console.log(`\nDone! Fixed ${fixedCount} files with missing React hook imports.`);
