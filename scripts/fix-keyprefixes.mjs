/**
 * fix-keyprefixes.mjs
 * 
 * For every TSX/TS file inside src/app/APPSLUG/_src/ that:
 *   - has const { t } = useTranslation() WITHOUT a keyPrefix
 *   - calls t('some.key') where 'some.key' does NOT exist at translation root
 *     but DOES exist under translation[APPSLUG]
 * 
 * → Replace `useTranslation()` with `useTranslation(undefined, { keyPrefix: 'APPSLUG' })`
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, extname } from 'path';

// Load translation file
const translation = JSON.parse(readFileSync('public/locales/en/translation.json', 'utf8'));
const rootKeys = new Set(Object.keys(translation));

// Map from app folder name to translation namespace key
// Most are identical; handle the hyphenated ones
const APP_TO_NS = {
  'anxiety_cycle': 'anxiety_cycle',
  'brave_steps': 'brave_steps',
  'clutter_journal': 'clutter_journal',
  'cognitive_distortions': 'cognitive_distortions',
  'contamination_ocd': 'contamination_ocd',
  'daily_life': 'daily_life',
  'did_you_know': 'did_you_know',
  'discard_it': 'discard_it',
  'fear_ladder': 'fear_ladder',
  'feelings_fact': 'feelings_fact',
  'gratitude_logs': 'gratitude_logs',
  'grounded_techniques': 'grounded_techniques',
  'guided_imagery': 'guided_imagery',
  'hoarding_ocd': 'hoarding_ocd',
  'letter_to_ocd': 'letter_to_ocd',
  'metta_heart_guide': 'metta_heart_guide',
  'mirror_moments': 'mirror_moments',
  'mood_tracker': 'mood_tracker',
  'ocd-treatment-guide': 'ocd-treatment-guide',
  'ocd_cycle': 'ocd_cycle',
  'ocd_moments': 'ocd_moments',
  'ocd_success_stories': 'ocd_success_stories',
  'ocd_tips': 'ocd_tips',
  'one_thing_out': 'one_thing_out',
  'pure_ocd': 'pure_ocd',
  'quiet-focus-tool': 'quiet-focus-tool',
  'reassurance_resistance': 'reassurance_resistance',
  'reframe_thoughts': 'reframe_thoughts',
  'response_guide': 'response_guide',
  'ritual_cost': 'ritual_cost',
  'self_compassion': 'self_compassion',
  'thought_diffusion': 'thought_diffusion',
  'thought_surfing': 'thought_surfing',
  'thought_truth': 'thought_truth',
  'tricho_ocd': 'tricho_ocd',
  'trigger_map': 'trigger_map',
  'truth_seeker_quiz': 'truth_seeker_quiz',
  'uncertainity_acceptance': 'uncertainity_acceptance',
  'uncertainity_tolerance': 'uncertainity_tolerance',
  'urge_surfing': 'urge_surfing',
  'what_is_health_ocd': 'what_is_health_ocd',
};

// Extract all t('...') key calls from source (first segment only)
function extractTKeys(src) {
  const keys = new Set();
  // Match t('key...) t("key...") t(`key...`)
  const re = /\bt\s*\(\s*['"`]([^'"`\s]+?)['"`\s]/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const fullKey = m[1];
    // Get first segment
    const firstSeg = fullKey.split('.')[0];
    if (firstSeg) keys.add(firstSeg);
  }
  return keys;
}

// Check if a keyPrefix is needed: any key's first segment exists in ns but not in rootKeys
function needsKeyPrefix(tKeys, ns) {
  const nsKeys = translation[ns] ? Object.keys(translation[ns]) : [];
  for (const key of tKeys) {
    if (!rootKeys.has(key) && nsKeys.includes(key)) return true;
  }
  return false;
}

// Bare useTranslation() pattern (no keyPrefix)
const bareHookRe = /const\s*\{\s*t\s*[^}]*\}\s*=\s*useTranslation\s*\(\s*\)/;
// Already has keyPrefix
const prefixHookRe = /const\s*\{\s*t\s*[^}]*\}\s*=\s*useTranslation\s*\([^)]*keyPrefix/;

let fixed = 0;
let checked = 0;

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
  // Determine app slug from path
  const normalized = filePath.replace(/\\/g, '/');
  const match = normalized.match(/src\/app\/([^/]+)\/_src\//);
  if (!match) return;
  const appSlug = match[1];
  const ns = APP_TO_NS[appSlug];
  if (!ns) return;

  const src = readFileSync(filePath, 'utf8');
  checked++;

  // Skip if already has keyPrefix
  if (prefixHookRe.test(src)) return;
  // Skip if no bare hook
  if (!bareHookRe.test(src)) return;
  // Skip if t() not used
  if (!/\bt\s*\(/.test(src)) return;

  const tKeys = extractTKeys(src);
  if (tKeys.size === 0) return;

  if (!needsKeyPrefix(tKeys, ns)) return;

  // Replace bare useTranslation() with prefixed version
  // Handle both:  const { t } = useTranslation()  and  const { t, i18n } = useTranslation()
  const fixed_src = src.replace(
    /(const\s*\{[^}]*\}\s*=\s*useTranslation\s*\()\s*\)/g,
    `$1undefined, { keyPrefix: '${ns}' })`
  );

  if (fixed_src === src) return; // no change

  writeFileSync(filePath, fixed_src, 'utf8');
  fixed++;
  console.log(` ✓ [${ns}] ${normalized.split('/src/app/')[1]}`);
}

// Walk all app _src directories
const appsDir = 'src/app';
for (const appEntry of readdirSync(appsDir, { withFileTypes: true })) {
  if (!appEntry.isDirectory()) continue;
  const srcDir = join(appsDir, appEntry.name, '_src');
  try { statSync(srcDir); } catch { continue; }
  walk(srcDir);
}

console.log(`\nChecked ${checked} files. Fixed ${fixed} missing keyPrefix(es).`);
