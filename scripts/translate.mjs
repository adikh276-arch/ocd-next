import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const AZURE_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_REGION = process.env.AZURE_TRANSLATOR_REGION || "eastus";

if (!AZURE_KEY) {
  console.error("Missing AZURE_TRANSLATOR_KEY environment variable. Exiting...");
  process.exit(1);
}

const TARGET_LANGS = [
  "es", "fr", "pt", "de", "ar", "hi", "bn", "zh-CN", "ja", 
  "id", "tr", "vi", "ko", "ru", "it", "pl", "th", "tl"
];

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

async function translateText(texts, targetLang) {
  if (!texts.length) return [];
  
  let toLang = targetLang;
  if (toLang === "tl") toLang = "fil";
  if (toLang === "zh-CN") toLang = "zh-Hans";
  
  const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${toLang}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': AZURE_KEY,
      'Ocp-Apim-Subscription-Region': AZURE_REGION
    },
    body: JSON.stringify(texts.map(text => ({ text })))
  });
  
  const data = await res.json();
  if (data.error) {
    throw new Error(`Azure API Error: ${data.error.message}`);
  }
  return data.map(d => d.translations[0].text);
}

function flattenObject(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      Object.assign(acc, flattenObject(val, fullKey));
    } else {
      acc[fullKey] = val;
    }
    return acc;
  }, {});
}

function unflattenObject(data) {
  const result = {};
  for (const key in data) {
    const keys = key.split('.');
    keys.reduce((acc, k, i) => {
      if (i === keys.length - 1) {
        acc[k] = data[key];
      } else {
        acc[k] = acc[k] || {};
      }
      return acc[k];
    }, result);
  }
  return result;
}

async function processApp(appPath) {
  const enPath = path.join(appPath, 'locales', 'en', 'translation.json');
  if (!fs.existsSync(enPath)) return;

  console.log(`\nProcessing App: ${path.relative(PUBLIC_DIR, appPath)}`);
  const enContent = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  const flattened = flattenObject(enContent);
  const keys = Object.keys(flattened);
  const values = Object.values(flattened);

  for (const lang of TARGET_LANGS) {
    const langDir = path.join(appPath, 'locales', lang);
    const langFilePath = path.join(langDir, 'translation.json');

    let existing = {};
    if (fs.existsSync(langFilePath)) {
      try {
        existing = JSON.parse(fs.readFileSync(langFilePath, 'utf-8'));
        existing = flattenObject(existing);
      } catch (e) {}
    }

    const missingKeys = keys.filter(k => !(k in existing));
    const missingValues = missingKeys.map(k => flattened[k]);

    if (missingKeys.length === 0) {
      console.log(`  - [SKIP] ${lang} fully cached.`);
      continue;
    }

    console.log(`  - [TRANSLATING] ${lang} (${missingKeys.length} new keys)...`);
    try {
      if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });
      
      const translatedValues = await translateText(missingValues, lang);
      const translatedFlattened = { ...existing };
      missingKeys.forEach((key, i) => {
        translatedFlattened[key] = translatedValues[i];
      });
      
      const translatedContent = unflattenObject(translatedFlattened);
      fs.writeFileSync(langFilePath, JSON.stringify(translatedContent, null, 2));
    } catch (e) {
      console.error(`    [ERROR] Failed ${lang}:`, e.message);
    }
  }
}

async function run() {
  const items = fs.readdirSync(PUBLIC_DIR);
  for (const item of items) {
    const fullPath = path.join(PUBLIC_DIR, item);
    if (fs.statSync(fullPath).isDirectory()) {
      const localesPath = path.join(fullPath, 'locales');
      if (fs.existsSync(localesPath)) {
        await processApp(fullPath);
      }
    }
  }
  console.log('\n--- ALL DONE ---');
}

run();
