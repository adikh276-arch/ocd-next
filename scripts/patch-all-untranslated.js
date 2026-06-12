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

const NON_LATIN_LANGS = new Set([
  "ko", "ja", "zh-Hans", "zh-Hant", "hi", "ar", "el", "ru", "uk", "he", "ta", "te", "ur", "bn", "th"
]);

function normalize(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[\r\n]+/g, " ")
    .replace(/['"“”‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isUntranslatedEnglish(key, val, enVal, lang) {
  if (!val || typeof val !== "string") return false;
  if (!enVal || typeof enVal !== "string") return false;
  
  const normVal = normalize(val);
  const normEn = normalize(enVal);
  
  if (normVal === "") return true;
  
  // If it's a non-English language, and matches English template
  if (lang !== "en" && normVal === normEn) {
    return true;
  }
  
  // If it's a non-Latin script language, and only contains ASCII letters, spaces, and punctuation
  if (NON_LATIN_LANGS.has(lang)) {
    const hasLetters = /[a-zA-Z]/.test(val);
    // Standard ASCII characters and typical typographic quotes/dashes
    const isAscii = /^[\u0000-\u007F\u2013\u2014\u201C\u201D\u2018\u2019]*$/.test(val);
    const isShortAcronym = val.length < 5 && /^[A-Z\s]+$/.test(val);
    if (hasLetters && isAscii && !isShortAcronym) {
      return true;
    }
  }
  
  return false;
}

async function translateTexts(texts, targetLang) {
  if (!texts.length) return [];
  
  let target = targetLang;
  if (target === "tl") target = "fil";
  if (target === "zh-CN" || target === "zh-Hans") target = "zh-Hans";
  if (target === "zh-Hant") target = "zh-Hant";

  const url = `${AZURE_ENDPOINT}&to=${target}`;
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

function findI18nFolders(dir, results = []) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file === 'node_modules' || file === '.next' || file === '.git') return;
      findI18nFolders(fullPath, results);
    } else if (file === 'en.json' && (dir.endsWith('i18n') || dir.endsWith('locales'))) {
      if (!results.includes(dir)) {
        results.push(dir);
      }
    }
  });
  return results;
}

async function run() {
  console.log("Scanning workspace for i18n/locales folders under src/app/...");
  const srcAppDir = path.join(process.cwd(), 'src/app');
  if (!fs.existsSync(srcAppDir)) {
    console.error("src/app directory not found!");
    process.exit(1);
  }

  const i18nFolders = findI18nFolders(srcAppDir);
  console.log(`Found ${i18nFolders.length} translation directories to check.`);

  for (const folder of i18nFolders) {
    const enPath = path.join(folder, 'en.json');
    if (!fs.existsSync(enPath)) continue;

    console.log(`\n------------------------------------------------------------`);
    console.log(`Checking translation folder: ${path.relative(process.cwd(), folder)}`);
    console.log(`------------------------------------------------------------`);

    let enContent = {};
    try {
      enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    } catch (e) {
      console.error(`Failed to parse en.json in ${folder}:`, e.message);
      continue;
    }

    const files = fs.readdirSync(folder).filter(f => f.endsWith('.json') && f !== 'en.json');

    for (const file of files) {
      const lang = path.basename(file, '.json');
      const langPath = path.join(folder, file);
      
      let langContent = {};
      try {
        langContent = JSON.parse(fs.readFileSync(langPath, 'utf8'));
      } catch (e) {
        console.error(`  Failed to parse ${file}, skipping:`, e.message);
        continue;
      }

      const keysToTranslate = [];
      const valuesToTranslate = [];

      for (const [key, enVal] of Object.entries(enContent)) {
        const val = langContent[key];
        
        if (!val || isUntranslatedEnglish(key, val, enVal, lang)) {
          keysToTranslate.push(key);
          valuesToTranslate.push(enVal);
        }
      }

      if (keysToTranslate.length === 0) {
        console.log(`  ✓ ${lang}: Already fully translated.`);
        continue;
      }

      console.log(`  - ${lang}: Found ${keysToTranslate.length} untranslated/English keys. Translating...`);

      try {
        // Simple delay to avoid overloading standard rates
        await new Promise(resolve => setTimeout(resolve, 150));

        for (let i = 0; i < valuesToTranslate.length; i += 50) {
          const chunkValues = valuesToTranslate.slice(i, i + 50);
          const chunkKeys = keysToTranslate.slice(i, i + 50);

          let retries = 0;
          let success = false;
          while (retries < 4 && !success) {
            try {
              const translatedValues = await translateTexts(chunkValues, lang);
              for (let j = 0; j < translatedValues.length; j++) {
                langContent[chunkKeys[j]] = translatedValues[j];
              }
              success = true;
            } catch (err) {
              console.error(`    Error translating chunk for ${lang} (retry ${retries + 1}/4):`, err.message);
              const wait = (retries + 1) * 3000;
              await new Promise(resolve => setTimeout(resolve, wait));
              retries++;
            }
          }

          if (!success) {
            throw new Error(`Failed to translate chunk for ${lang} after all retries.`);
          }
        }

        // Save updated translation file
        fs.writeFileSync(langPath, JSON.stringify(langContent, null, 2), 'utf8');
        console.log(`  ✓ ${lang}: Successfully updated.`);

      } catch (e) {
        console.error(`  ✗ ${lang}: Failed to translate:`, e.message);
      }
    }
  }

  console.log("\n============================================================");
  console.log("Translation patching across all modules complete!");
  console.log("============================================================");
}

run().catch(console.error);
