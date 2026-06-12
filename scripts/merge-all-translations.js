const fs = require('fs');
const path = require('path');

const appsDir = './src/app';
const globalLocalesDir = './public/locales';

// Supported languages in the monorepo
const supportedLangs = ['en', 'es', 'fr', 'pt', 'de', 'ar', 'hi', 'bn', 'zh-CN', 'ja', 'id', 'tr', 'vi', 'ko', 'ru', 'it', 'pl', 'th', 'tl'];

// Map language codes from apps if they differ
const langMap = {
    'zh': 'zh-CN',
    'fil': 'tl'
};

function getAppLocalesFolders() {
    const folders = [];
    const apps = fs.readdirSync(appsDir);
    
    apps.forEach(app => {
        const appPath = path.join(appsDir, app);
        if (!fs.statSync(appPath).isDirectory()) return;
        
        // Check for common locale folder patterns
        const patterns = [
            path.join(appPath, '_src', 'i18n', 'locales'),
            path.join(appPath, '_src', 'locales')
        ];
        
        for (const p of patterns) {
            if (fs.existsSync(p)) {
                folders.push({ slug: app, path: p });
                break;
            }
        }
    });
    
    return folders;
}

const localeFolders = getAppLocalesFolders();
console.log(`Found ${localeFolders.length} apps with local translations.`);

localeFolders.forEach(folder => {
    const slug = folder.slug;
    const files = fs.readdirSync(folder.path).filter(f => f.endsWith('.json'));
    
    files.forEach(file => {
        let lang = file.replace('.json', '');
        lang = langMap[lang] || lang;
        
        if (!supportedLangs.includes(lang)) {
            console.log(`Skipping unsupported language: ${lang} for ${slug}`);
            return;
        }
        
        const localPath = path.join(folder.path, file);
        const globalPath = path.join(globalLocalesDir, lang, 'translation.json');
        
        if (!fs.existsSync(globalPath)) {
            console.log(`Global translation file missing for ${lang}, skipping.`);
            return;
        }
        
        try {
            const localData = JSON.parse(fs.readFileSync(localPath, 'utf8'));
            const globalData = JSON.parse(fs.readFileSync(globalPath, 'utf8'));
            
            // Re-map common fallback keys if any (like 404, return_to_home)
            // But usually we just overwrite the whole namespace
            globalData[slug] = {
                ...(globalData[slug] || {}), // Keep existing if any (like generic shared keys)
                ...localData
            };
            
            fs.writeFileSync(globalPath, JSON.stringify(globalData, null, 2));
            console.log(`Merged ${lang} translations for ${slug}`);
        } catch (e) {
            console.error(`Error merging ${lang} for ${slug}:`, e.message);
        }
    });
});

console.log('Merge complete.');
