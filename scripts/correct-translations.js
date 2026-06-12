/**
 * correct-translations.js
 *
 * Targeted fix for underscore-keyed translations.
 * Only translates keys where the value is still the raw key (underscore form).
 * Never touches values that are already properly translated.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const AZURE_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_REGION = process.env.AZURE_TRANSLATOR_REGION || 'eastus';
const AZURE_ENDPOINT = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';

if (!AZURE_KEY) {
  console.error('❌ Missing AZURE_TRANSLATOR_KEY in .env. Exiting.');
  process.exit(1);
}

// ─── The 17 keys that need fixing, grouped by module namespace ────────────────
const CORRECTIONS = {
  daily_life: {
    daily_life: 'Daily Life',
  },
  fear_ladder: {
    fear_ladder: 'Fear Ladder',
  },
  letter_to_ocd: {
    letter_to_ocd: 'Letter to OCD',
  },
  mirror_moments: {
    mirror_moments: 'Mirror Moments',
  },
  reassurance_resistance: {
    reassurance_resistance: 'Reassurance Resistance',
  },
  response_guide: {
    clench_both_fists: 'Clench both fists',
    press_palms_flat_on_thighs: 'Press palms flat on thighs',
    tuck_fingers_under_arms: 'Tuck fingers under arms',
    hold_a_stress_ball: 'Hold a stress ball',
    press_fingertips_together: 'Press fingertips together',
    hold_a_pen_or_object: 'Hold a pen or object',
  },
  thought_diffusion: {
    much_less_powerful: 'Much less powerful',
    a_little_less_powerful: 'A little less powerful',
    about_the_same: 'About the same',
    harder_at_first: 'Harder at first',
  },
  uncertainity_tolerance: {
    uncertainity_tolerance: 'Uncertainty Tolerance',
  },
  what_is_health_ocd: {
    what_is_health_ocd: 'What is Health OCD?',
  },
};

// All 34 non-English target languages
const TARGET_LANGS = [
  'es', 'fr', 'de', 'pt', 'ru', 'zh-Hans', 'zh-Hant', 'ja', 'ko',
  'ar', 'hi', 'bn', 'id', 'tr', 'vi', 'it', 'pl', 'th', 'tl', 'nl', 'sv',
  'no', 'da', 'fi', 'cs', 'el', 'ro', 'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur',
];

/**
 * Returns true if a translation value is still "untranslated" —
 * i.e. it matches the key itself, or contains underscores without any spaces.
 */
function isUntranslated(key, val) {
  if (!val || typeof val !== 'string') return true;
  const trimmed = val.trim();
  // Value equals the key verbatim
  if (trimmed === key) return true;
  // Value has underscores but no spaces (classic snake_case leak)
  if (trimmed.includes('_') && !trimmed.includes(' ') && trimmed.length > 3) return true;
  return false;
}

async function translateBatch(texts, targetLang) {
  if (!texts.length) return [];

  let target = targetLang;
  if (target === 'tl') target = 'fil';
  if (target === 'zh-Hans') target = 'zh-Hans';
  if (target === 'zh-Hant') target = 'zh-Hant';

  let retries = 0;
  while (retries < 4) {
    try {
      const response = await axios({
        url: `${AZURE_ENDPOINT}&to=${target}`,
        method: 'post',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_KEY,
          'Ocp-Apim-Subscription-Region': AZURE_REGION,
          'Content-Type': 'application/json',
        },
        data: texts.map(text => ({ text })),
      });
      return response.data.map(d => d.translations[0].text);
    } catch (err) {
      if (err.response?.status === 429 || err.response?.status === 403) {
        const wait = (retries + 1) * 5000;
        console.log(`  ⏳ Rate-limited on ${targetLang}, waiting ${wait / 1000}s...`);
        await new Promise(r => setTimeout(r, wait));
        retries++;
      } else {
        throw err;
      }
    }
  }
  throw new Error(`Failed to translate batch for ${targetLang} after retries.`);
}

async function processModule(namespace, keyMap) {
  const i18nDir = path.join(process.cwd(), 'src', 'app', namespace, '_src', 'i18n');

  if (!fs.existsSync(i18nDir)) {
    console.warn(`⚠️  i18n dir not found: ${i18nDir} — skipping.`);
    return;
  }

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`📦 Module: ${namespace} (${Object.keys(keyMap).length} keys)`);
  console.log(`${'─'.repeat(60)}`);

  for (const lang of TARGET_LANGS) {
    const filePath = path.join(i18nDir, `${lang}.json`);

    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️  ${lang}: file missing — skipping.`);
      continue;
    }

    let content;
    try {
      content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      console.error(`  ❌ ${lang}: failed to parse JSON — skipping.`);
      continue;
    }

    // Find which keys still need translating in this locale
    const keysToFix = [];
    const englishValues = [];

    for (const [key, englishText] of Object.entries(keyMap)) {
      const currentVal = content[key];
      if (isUntranslated(key, currentVal)) {
        keysToFix.push(key);
        englishValues.push(englishText);
      }
    }

    if (keysToFix.length === 0) {
      console.log(`  ✅ ${lang}: all keys already translated — skipped.`);
      continue;
    }

    process.stdout.write(`  🔄 ${lang}: translating ${keysToFix.length} key(s) [${keysToFix.join(', ')}]... `);

    try {
      await new Promise(r => setTimeout(r, 200)); // small delay between langs
      const translated = await translateBatch(englishValues, lang);

      for (let i = 0; i < keysToFix.length; i++) {
        content[keysToFix[i]] = translated[i];
      }

      fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
      console.log('✅');
    } catch (err) {
      console.error(`\n  ❌ ${lang}: error — ${err.message}`);
    }
  }
}

async function run() {
  console.log('🚀 Starting targeted translation fix...\n');
  console.log('📋 Namespaces to fix:', Object.keys(CORRECTIONS).join(', '));

  for (const [namespace, keyMap] of Object.entries(CORRECTIONS)) {
    await processModule(namespace, keyMap);
  }

  console.log('\n' + '═'.repeat(60));
  console.log('✅ Done! All targeted translations have been patched.');
  console.log('═'.repeat(60));
}

run().catch(err => {
  console.error('💥 Fatal error:', err.message);
  process.exit(1);
});
