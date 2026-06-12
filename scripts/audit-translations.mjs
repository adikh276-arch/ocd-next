/**
 * audit-translations.mjs
 * 
 * For every tsx/ts file in src/app/SLUG/_src/:
 * 1. Extract all t('key') calls
 * 2. Resolve using keyPrefix if present
 * 3. Check if the fully-qualified key exists in translation.json
 * 4. Report missing keys
 */

import { readdirSync, readFileSync, statSync } from 'fs';
import { join, extname } from 'path';

const translation = JSON.parse(readFileSync('public/locales/en/translation.json', 'utf8'));

// Resolve a dotted path in an object
function getPath(obj, path) {
  const parts = path.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined || typeof cur !== 'object') return undefined;
    cur = cur[p];
  }
  return cur;
}

// Extract keyPrefix from source
function extractKeyPrefix(src) {
  const m = src.match(/useTranslation\s*\(\s*(?:undefined|null|'[^']*'|"[^"]*")\s*,\s*\{\s*keyPrefix\s*:\s*['"`]([^'"`]+)['"`]/);
  return m ? m[1] : null;
}

// Extract all t('...') keys (skip dynamic ones like t(`nodes.${x}.label`))
function extractStaticTKeys(src) {
  const keys = [];
  const re = /\bt\s*\(\s*(['"`])([^'"`${}]+?)\1/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    keys.push(m[2]);
  }
  return keys;
}

const issues = {};

function addIssue(appSlug, file, key) {
  if (!issues[appSlug]) issues[appSlug] = [];
  issues[appSlug].push({ file: file.split('/_src/')[1], key });
}

function processFile(filePath, appSlug) {
  const src = readFileSync(filePath, 'utf8');
  
  if (!/\bt\s*\(/.test(src)) return;

  const keyPrefix = extractKeyPrefix(src);
  const staticKeys = extractStaticTKeys(src);

  for (const key of staticKeys) {
    const fullKey = keyPrefix ? `${keyPrefix}.${key}` : key;
    const value = getPath(translation, fullKey);
    if (value === undefined) {
      addIssue(appSlug, filePath, fullKey);
    }
  }
}

function walk(dir, appSlug) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { walk(full, appSlug); continue; }
    const ext = extname(entry.name);
    if (ext !== '.tsx' && ext !== '.ts') continue;
    processFile(full, appSlug);
  }
}

const appsDir = 'src/app';
for (const appEntry of readdirSync(appsDir, { withFileTypes: true })) {
  if (!appEntry.isDirectory()) continue;
  const srcDir = join(appsDir, appEntry.name, '_src');
  try { statSync(srcDir); } catch { continue; }
  walk(srcDir, appEntry.name);
}

// Report
const appNames = Object.keys(issues).sort();
if (appNames.length === 0) {
  console.log('✅ No missing translation keys found!');
} else {
  console.log(`❌ Missing translation keys in ${appNames.length} app(s):\n`);
  for (const app of appNames) {
    const unique = [...new Set(issues[app].map(i => i.key))];
    console.log(`\n[${app}] — ${unique.length} unique missing key(s):`);
    unique.forEach(k => console.log(`   • ${k}`));
  }
}
