const fs = require('fs');
const path = require('path');

const appsDir = './src/app';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(fullPath));
        } else {
            if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const allFiles = walk(appsDir);
let fixedCount = 0;

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Patterns to match:
    // import "./i18n";
    // import './i18n';
    // import "../../i18n";
    // import "./i18n.ts";
    // import { something } from "./i18n";
    
    const originalContent = content;
    
    // Remove side-effect imports
    content = content.replace(/^import ["']\.\.?\/.+?\/i18n(.+?)?["'];?\r?\n?/gm, '');
    content = content.replace(/^import ["']\.\/i18n(.+?)?["'];?\r?\n?/gm, '');
    
    // Remove named imports if any (unlikely for these apps but safe to check)
    content = content.replace(/^import \{.+?\} from ["']\.\.?\/.+?\/i18n(.+?)?["'];?\r?\n?/gm, '');
    content = content.replace(/^import \{.+?\} from ["']\.\/i18n(.+?)?["'];?\r?\n?/gm, '');

    if (content !== originalContent) {
        fs.writeFileSync(file, content);
        console.log(`Cleaned local i18n import from ${file}`);
        fixedCount++;
    }
});

console.log(`\nCleanup complete. Fixed ${fixedCount} files.`);
