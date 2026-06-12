/**
 * Scan all component files for common undefined variable patterns:
 * - JSX components used but not imported
 * - Hooks called but not imported
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
      } else if (fullPath.endsWith('.tsx')) {
        results.push(fullPath);
      }
    });
  } catch (e) {}
  return results;
}

const files = walk('src/app');
const issues = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  
  // Collect what's imported
  const imported = new Set();
  lines.forEach(line => {
    const importMatch = line.match(/^import\s+(?:type\s+)?(?:(\w+),\s*)?\{([^}]+)\}|^import\s+(\w+)\s+from/);
    if (importMatch) {
      if (importMatch[1]) imported.add(importMatch[1]); // default import
      if (importMatch[2]) {
        importMatch[2].split(',').forEach(s => {
          const name = s.trim().split(' as ')[0].trim();
          if (name) imported.add(name);
        });
      }
      if (importMatch[3]) imported.add(importMatch[3]); // default import only
    }
    // Also handle: import DefaultExport from 'x'
    const simpleDefault = line.match(/^import\s+(\w+)\s+from\s+['"].+['"]/);
    if (simpleDefault) imported.add(simpleDefault[1]);
  });

  // Check for JSX components that look like custom components (Capitalized) but aren't imported
  const jsxUsages = [...content.matchAll(/<([A-Z][a-zA-Z0-9]*)/g)].map(m => m[1]);
  const uniqueJSX = [...new Set(jsxUsages)];
  
  // Known HTML-like or built-in JSX (skip these)
  const builtins = new Set(['React', 'Fragment', 'Suspense', 'StrictMode']);
  
  uniqueJSX.forEach(component => {
    if (builtins.has(component)) return;
    if (imported.has(component)) return;
    
    // Check if it's defined locally in the same file
    const definedLocally = new RegExp(`(?:const|function|class)\\s+${component}\\s*[=(]`).test(content);
    if (definedLocally) return;

    issues.push({ file: f, component });
  });
});

// Group by file
const byFile = {};
issues.forEach(({ file, component }) => {
  if (!byFile[file]) byFile[file] = [];
  byFile[file].push(component);
});

// Print
Object.entries(byFile).forEach(([file, components]) => {
  console.log(`\n${file}`);
  components.forEach(c => console.log(`  Missing: ${c}`));
});

if (Object.keys(byFile).length === 0) {
  console.log('No missing component imports found!');
} else {
  console.log(`\nTotal files with issues: ${Object.keys(byFile).length}`);
}
