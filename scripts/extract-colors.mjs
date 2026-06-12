import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const apps = fs.readdirSync(path.join(rootDir, 'src/app')).filter(f => fs.statSync(path.join(rootDir, 'src/app', f)).isDirectory());

let allColors = {};

for (const slug of apps) {
    if (slug.startsWith('[') || slug.startsWith('_')) continue;
    
    // Look for tailwind.config.ts in the original root folder (if it exists)
    // or in the migrated folder (unlikely to have its own config after migration)
    const legacyConfig = path.join(rootDir, slug, 'tailwind.config.ts');
    if (fs.existsSync(legacyConfig)) {
        console.log(`Extracting from ${slug}...`);
        const content = fs.readFileSync(legacyConfig, 'utf8');
        // Simple regex to find the colors object
        const colorsMatch = content.match(/colors:\s*{([\s\S]*?)},/);
        if (colorsMatch) {
            console.log(`Found colors in ${slug}`);
            // We'll just collect the whole block for manual merging or smarter parsing
            allColors[slug] = colorsMatch[1];
        }
    }
}

fs.writeFileSync('extracted_colors.txt', JSON.stringify(allColors, null, 2));
console.log('Done. Check extracted_colors.txt');
