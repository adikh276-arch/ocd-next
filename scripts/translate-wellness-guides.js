const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const AZURE_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_REGION = process.env.AZURE_TRANSLATOR_REGION || "eastus";
const AZURE_ENDPOINT = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0";

if (!AZURE_KEY) {
  console.error("Missing AZURE_TRANSLATOR_KEY environment variable. Exiting...");
  process.exit(1);
}

const LANGUAGES = [
  "en", "es", "fr", "de", "pt", "ru", "zh-Hans", "zh-Hant", "ja", "ko",
  "ar", "hi", "bn", "id", "tr", "vi", "it", "pl", "th", "tl", "nl", "sv",
  "no", "da", "fi", "cs", "el", "ro", "hu", "uk", "he", "ms", "ta", "te", "ur"
];

const CATEGORY_MAP = {
  'health-ocd': 'health_ocd',
  'hoarding-ocd': 'hoarding_ocd',
  'trichotillomania': 'trichotillomania',
  'pure-o-ocd': 'pure_o_ocd',
  'contamination-ocd': 'contamination_ocd'
};

async function translateText(texts, targetLang) {
  if (!texts.length) return [];

  let toLang = targetLang;
  if (toLang === "tl") toLang = "fil";
  if (toLang === "zh-CN" || toLang === "zh-Hans") toLang = "zh-Hans";
  if (toLang === "zh-Hant") toLang = "zh-Hant";

  const url = `${AZURE_ENDPOINT}&to=${toLang}`;
  const response = await axios({
    url,
    method: "post",
    headers: {
      "Ocp-Apim-Subscription-Key": AZURE_KEY,
      "Ocp-Apim-Subscription-Region": AZURE_REGION,
      "Content-Type": "application/json"
    },
    data: texts.map(text => ({ text }))
  });

  if (response.data.error) {
    throw new Error(`Azure API Error: ${response.data.error.message}`);
  }

  return response.data.map(d => d.translations[0].text);
}

async function run() {
  console.log("Loading wellnessData.ts...");
  const tsFilePath = path.join(process.cwd(), 'src/app/dashboard_data/wellnessData.ts');
  if (!fs.existsSync(tsFilePath)) {
    console.error(`wellnessData.ts not found at ${tsFilePath}`);
    process.exit(1);
  }

  const tsContent = fs.readFileSync(tsFilePath, 'utf8');
  let jsContent = tsContent
    .replace(/export interface ContentItem {[\s\S]*?}/g, '')
    .replace(/export interface OCDCategory {[\s\S]*?}/g, '')
    .replace(/: Record<string, OCDCategory>/g, '')
    .replace(/: ContentItem\[\]/g, '')
    .replace(/export const wellnessData/g, 'const wellnessData')
    + '\nmodule.exports = { wellnessData };';

  const tempJsPath = path.join(process.cwd(), 'scripts/temp-wellnessData.js');
  fs.writeFileSync(tempJsPath, jsContent, 'utf8');

  let wellnessData;
  try {
    const tempModule = require(tempJsPath);
    wellnessData = tempModule.wellnessData;
  } catch (e) {
    console.error("Failed to load and evaluate temp-wellnessData.js:", e);
    process.exit(1);
  } finally {
    try {
      fs.unlinkSync(tempJsPath);
    } catch (e) {}
  }

  // Extract all the keys and values from the TS structure
  const wellnessKeys = {};
  for (const [rawCategory, categoryData] of Object.entries(wellnessData)) {
    const categoryPrefix = CATEGORY_MAP[rawCategory];
    if (!categoryPrefix) continue;

    const contentTypes = ['tips', 'myths', 'articles', 'stories'];
    for (const contentType of contentTypes) {
      const items = categoryData[contentType] || [];
      const singularType = contentType === 'stories' ? 'story' : contentType.slice(0, -1);
      
      for (const item of items) {
        const titleKey = `${categoryPrefix}_${singularType}_${item.id}_title`;
        wellnessKeys[titleKey] = item.title;

        if (item.content && Array.isArray(item.content)) {
          item.content.forEach((paragraph, index) => {
            const paragraphKey = `${categoryPrefix}_${singularType}_${item.id}_content_${index}`;
            wellnessKeys[paragraphKey] = paragraph;
          });
        }
      }
    }
  }

  console.log(`Extracted ${Object.keys(wellnessKeys).length} dynamic keys from wellnessData.ts`);

  // First, update en.json
  const i18nDir = path.join(process.cwd(), 'src/app/ocd-self-care/_src/i18n');
  const enPath = path.join(i18nDir, 'en.json');
  let enContent = {};
  if (fs.existsSync(enPath)) {
    try {
      enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    } catch (e) {
      console.warn("Failed to parse en.json, starting fresh for en:", e);
    }
  }
  // Update/merge
  const updatedEnContent = { ...enContent, ...wellnessKeys };
  fs.writeFileSync(enPath, JSON.stringify(updatedEnContent, null, 2), 'utf8');
  console.log("Successfully updated en.json");

  // Now, translate and save other languages
  for (const lang of LANGUAGES) {
    if (lang === "en") continue;

    console.log(`Processing ${lang}...`);
    const langPath = path.join(i18nDir, `${lang}.json`);
    let langContent = {};
    if (fs.existsSync(langPath)) {
      try {
        langContent = JSON.parse(fs.readFileSync(langPath, 'utf8'));
      } catch (e) {
        console.warn(`Failed to parse ${lang}.json, starting fresh for ${lang}:`, e);
      }
    }

    const keysToTranslate = [];
    const valuesToTranslate = [];

    for (const [key, englishValue] of Object.entries(wellnessKeys)) {
      const currentVal = langContent[key];
      // Condition 1: Missing entirely
      // Condition 2: Untranslated (identical to English template value)
      if (!currentVal || currentVal === englishValue) {
        keysToTranslate.push(key);
        valuesToTranslate.push(englishValue);
      }
    }

    if (keysToTranslate.length === 0) {
      console.log(`  ✓ ${lang} is already fully translated (cached).`);
      continue;
    }

    console.log(`  Translating ${keysToTranslate.length} keys for ${lang}...`);

    try {
      // Add slight delay to avoid initial burst limits
      await new Promise(resolve => setTimeout(resolve, 200));

      for (let i = 0; i < valuesToTranslate.length; i += 50) {
        const chunkValues = valuesToTranslate.slice(i, i + 50);
        const chunkKeys = keysToTranslate.slice(i, i + 50);

        let retries = 0;
        let success = false;
        while (retries < 4 && !success) {
          try {
            const translatedValues = await translateText(chunkValues, lang);
            for (let j = 0; j < translatedValues.length; j++) {
              langContent[chunkKeys[j]] = translatedValues[j];
            }
            success = true;
          } catch (err) {
            console.error(`    Error translating chunk for ${lang} (retry ${retries + 1}/4):`, err.message);
            const wait = (retries + 1) * 5000;
            console.log(`    Waiting ${wait / 1000}s...`);
            await new Promise(resolve => setTimeout(resolve, wait));
            retries++;
          }
        }

        if (!success) {
          throw new Error(`Failed to translate chunk for ${lang} after all retries.`);
        }
      }

      // Write merged translations back
      fs.writeFileSync(langPath, JSON.stringify(langContent, null, 2), 'utf8');
      console.log(`  ✓ Successfully updated and saved ${lang}.json`);
    } catch (e) {
      console.error(`  ✗ Failed to translate ${lang}:`, e.message);
    }
  }

  console.log("\nWellness Guides Translation Complete!");
}

run().catch(console.error);
