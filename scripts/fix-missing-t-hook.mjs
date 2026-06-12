/**
 * fix-missing-t-hook.mjs
 * 
 * For every TSX/TS file that:
 *   - imports useTranslation from react-i18next
 *   - calls t(...) somewhere
 *   - does NOT have const { t } = useTranslation() called
 * 
 * This script injects the hook call inside the component.
 * Handles two patterns:
 *   A) Arrow function with block body:   const Foo = (...) => {
 *   B) Arrow function with implicit return: const Foo = (...) => (
 *      converted to block body with hook injected
 *   C) Regular function declaration: function Foo(...) {
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, extname } from 'path';

const SRC = 'src';
let fixed = 0;
let skipped = 0;

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    const ext = extname(entry.name);
    if (ext !== '.tsx' && ext !== '.ts') continue;
    processFile(full);
  }
}

function processFile(filePath) {
  const src = readFileSync(filePath, 'utf8');

  // Only care about files that import useTranslation
  if (!src.includes('useTranslation')) return;

  // Check if t() is actually used
  if (!/\bt\s*\(/.test(src)) return;

  // Check if hook is already called
  const hookCalled =
    /const\s*\{[^}]*\bt\b[^}]*\}\s*=\s*useTranslation\s*\(/.test(src) ||
    /const\s*\{[^}]*\bt\b[^}]*\}\s*=\s*useI18nTranslation\s*\(/.test(src);

  if (hookCalled) return;

  let result = src;
  let changed = false;

  // --- Pattern A & C: block body ---
  // Match: const Foo = (...) => {   OR   function Foo(...) {
  // We need to insert const { t } = useTranslation(); right after the opening brace
  // of the first component-level function that uses t().
  
  // Find all block-body component patterns and inject after their opening {
  // Strategy: find the FIRST opening { of a top-level arrow or function component
  // that is followed eventually by a JSX return / t( call.
  
  // We'll use a line-by-line approach for reliability.
  const lines = src.split('\n');
  
  // Find the hook injection line (const { t } = useTranslation();)
  const hookLine = '  const { t } = useTranslation();';

  // Pattern A: Arrow function with block body
  // const ComponentName = (...): ReturnType => {
  // const ComponentName = (...) => {
  const arrowBlockPattern = /^(export\s+)?(const|let)\s+\w+\s*[=:][^=\n]*=>\s*\{/;
  
  // Pattern C: Regular function declaration
  // function ComponentName(...) {
  // export function ComponentName(...) {
  const funcDeclPattern = /^(export\s+)?(default\s+)?function\s+\w+\s*\([^)]*\)\s*(\:\s*\S+)?\s*\{/;

  // Pattern B: Arrow function with implicit return
  // const ComponentName = (...) => (
  const arrowImplicitPattern = /^(export\s+)?(const|let)\s+(\w+)\s*[=:][^=\n]*=>\s*\($/;

  let injected = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!injected) {
      if (arrowBlockPattern.test(line) || funcDeclPattern.test(line)) {
        // Insert hook call right after this opening brace line
        lines.splice(i + 1, 0, hookLine);
        injected = true;
        changed = true;
        break;
      }

      if (arrowImplicitPattern.test(line)) {
        // Convert implicit return to block body
        // const Foo = (...) => (   →   const Foo = (...) => {
        lines[i] = lines[i].replace(/=>\s*\(\s*$/, '=> {');
        lines.splice(i + 1, 0, hookLine);
        lines.splice(i + 2, 0, '  return (');
        injected = true;
        changed = true;

        // Now find the matching closing ) and replace with );  }
        // Walk forward to find the closing paren of the implicit return
        let depth = 1;
        let j = i + 3;
        while (j < lines.length && depth > 0) {
          for (const ch of lines[j]) {
            if (ch === '(') depth++;
            else if (ch === ')') { depth--; if (depth === 0) break; }
          }
          j++;
        }
        // j-1 is the line with the closing )
        // Replace trailing ); or ) with   );
        // Then add closing }
        const closingLineIdx = j - 1;
        lines[closingLineIdx] = lines[closingLineIdx].replace(/\)\s*;?\s*$/, '  );');
        lines.splice(closingLineIdx + 1, 0, '};');
        break;
      }
    }
  }

  if (!changed) {
    skipped++;
    return;
  }

  const output = lines.join('\n');
  writeFileSync(filePath, output, 'utf8');
  fixed++;
  console.log(' ✓ Fixed:', filePath.replace(/\\/g, '/'));
}

walk(SRC);
console.log(`\nDone. Fixed ${fixed} file(s). Skipped ${skipped} (couldn't auto-fix pattern).`);
