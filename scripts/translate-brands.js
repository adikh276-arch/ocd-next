const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const azureKey = process.env.AZURE_TRANSLATOR_KEY;
const azureRegion = process.env.AZURE_TRANSLATOR_REGION || 'eastus';

async function translate() {
  const texts = ['WhatsApp', 'LinkedIn', 'Instagram'];
  const langs = ['es', 'fr', 'de', 'pt', 'ru', 'zh-Hans', 'zh-Hant', 'ja', 'ko', 'ar', 'hi', 'bn', 'id', 'tr', 'vi', 'it', 'pl', 'th', 'tl', 'nl', 'sv', 'no', 'da', 'fi', 'cs', 'el', 'ro', 'hu', 'uk', 'he', 'ms', 'ta', 'te', 'ur'];
  
  for (const lang of langs) {
    let target = lang;
    if (target === 'tl') target = 'fil';
    
    try {
      const res = await axios.post(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${target}`, 
        texts.map(t => ({text: t})), 
        { 
          headers: { 
            'Ocp-Apim-Subscription-Key': azureKey, 
            'Ocp-Apim-Subscription-Region': azureRegion, 
            'Content-Type': 'application/json' 
          } 
        }
      );
      
      const translations = res.data.map(d => d.translations[0].text);
      const file = path.join(process.cwd(), 'public', 'locales', lang, 'common.json');
      
      if(fs.existsSync(file)) {
        const data = JSON.parse(fs.readFileSync(file));
        data.whatsapp = translations[0];
        data.linkedin = translations[1];
        data.instagram = translations[2];
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
        console.log(`Translated ${lang}:`, translations);
      }
    } catch(e) {
      console.error(`Error ${lang}:`, e.message);
    }
    await new Promise(r => setTimeout(r, 200));
  }
}
translate();
