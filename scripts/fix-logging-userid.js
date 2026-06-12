const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'app');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(srcDir);
let fixedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Pattern to find fetch calls to the logs API
    // We look for fetch('/ocd/api/logs', { ... body: JSON.stringify({ ... }) ... })
    if (content.includes("fetch('/ocd/api/logs'") && !content.includes('user_id:')) {
        console.log(`Fixing: ${file}`);
        
        // 1. Inject the user_id retrieval logic before the fetch
        // We use a safe check for sessionStorage to avoid SSR issues
        const userIdLogic = "const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('ocd_user_id') : null;";
        
        // Find the line containing the fetch
        const lines = content.split('\n');
        const newLines = [];
        let injected = false;
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes("fetch('/ocd/api/logs'") && !injected) {
                // Add the logic before the current line
                newLines.push(`    ${userIdLogic}`);
                injected = true;
            }
            
            // 2. Inject user_id into the body object
            if (lines[i].includes('activity_slug:')) {
                 lines[i] = lines[i].replace('activity_slug:', 'user_id: ocd_user_id, activity_slug:');
            }
            
            newLines.push(lines[i]);
        }
        
        fs.writeFileSync(file, newLines.join('\n'), 'utf8');
        fixedCount++;
    }
});

console.log(`Done! Fixed ${fixedCount} files.`);
