import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

function auditCorruption(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let issues = [];

  // 1. Check for word splitting: Alphabetic character immediately before or after the hook injection block
  // The injection typically looks like: \n  const { t } = useTranslation(undefined, { keyPrefix: '...' });
  // We check for [a-zA-Z] followed by \n\s*const { t } or the hook followed by [a-zA-Z]
  const wordSplitRegex = /[a-zA-Z]\s*\n\s*const\s+\{\s*t\s*\}\s*=\s*useTranslation|[useTranslation\(.*?\)\s*;]\s*[a-zA-Z0-9_]/g;
  
  // Real check: does it look like we are mid-expression?
  // We search for our specific hook string and check surrounding characters.
  const hookPattern = /const\s+\{\s*t\s*\}\s*=\s*useTranslation\(undefined,\s*\{\s*keyPrefix:\s*'[^']*'\s*\}\);/;
  const lines = content.split('\n');
  
  lines.forEach((line, i) => {
    if (line.includes('const { t } = useTranslation')) {
      // Check previous line and next line
      const prevLine = lines[i-1] || '';
      const nextLine = lines[i+1] || '';
      
      // If the previous line doesn't end with { or ; or isn't a comment/import/etc.
      // this is a very loose check, let's try something more specific.
      
      // If the hook is NOT on its own line (aside from whitespace)
      if (line.trim() !== line.match(hookPattern)?.[0]) {
          // Unless it's at the end of a line like: const MyComp = () => { const { t } = ...
          if (!line.trim().startsWith('{') && !line.trim().endsWith('{')) {
             // issues.push(`Hook is not on its own line: "${line.trim()}"`);
          }
      }
    }
  });

  // 2. Check for hook inside backticks with ODD count before it
  const hookIndex = content.indexOf('const { t } = useTranslation');
  if (hookIndex !== -1) {
    const before = content.substring(0, hookIndex);
    const backTickCount = (before.match(/`/g) || []).length;
    if (backTickCount % 2 !== 0) {
      issues.push('Hook injected inside UNCLOSED template string!');
    }
  }

  return issues.length > 0 ? issues : null;
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (file.endsWith('.tsx')) {
      const issues = auditCorruption(p);
      if (issues) {
        console.log(`ISSUE in ${p}:`);
        issues.forEach(i => console.log(`  - ${i}`));
      }
    }
  }
}

console.log('--- STARTING SMART CORRUPTION AUDIT ---');
walk(APPS_DIR);
console.log('--- AUDIT COMPLETE ---');
