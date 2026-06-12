const fs = require('fs');
const path = require('path');

const publicLocalesDir = path.join(process.cwd(), 'public', 'locales');
const languages = fs.readdirSync(publicLocalesDir);

languages.forEach(lang => {
  const file = path.join(publicLocalesDir, lang, 'translation.json');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Clean up known unicode corruption artifacts explicitly
    content = content.replace(/dYTO/g, '')
                     .replace(/dYO/g, '')
                     .replace(/dYO/g, '')
                     .replace(/\uFFFD\?"/g, '"')
                     .replace(/\uFFFD\?'/g, "'")
                     .replace(/\uFFFD\?/g, '-')
                     .replace(/\uFFFD\+'/g, '')
                     .replace(/\uFFFD\+\?/g, '')
                     .replace(/\uFFFD/g, '');

    // Cleanup some possible double spaces left behind
    content = content.replace(/ \./g, '.').replace(/ ,/g, ',').replace(/\s+-/g, ' -').replace(/\s{2,}/g, ' ');

    fs.writeFileSync(file, content);
    console.log(`Cleaned unicode in ${lang}/translation.json`);
  }
});
