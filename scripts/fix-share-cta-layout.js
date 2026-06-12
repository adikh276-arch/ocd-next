const fs = require('fs');
const path = require('path');

const appsDir = './src/app';

function fixActivityLayout(filePath) {
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Pattern 1: problematic sibling injection in flex containers
    // We want to add flex-col if it has flex and items-center and justify-center
    // Use a regex that allows other classes between flex, items-center, and justify-center
    if (content.includes('<ShareActivity')) {
        const flexRegex = /className="([^"]*flex[^"]*items-center[^"]*justify-center[^"]*)"/g;
        if (flexRegex.test(content)) {
            content = content.replace(flexRegex, (match, classes) => {
                if (!classes.includes('flex-col')) {
                    return `className="${classes} flex-col"`;
                }
                return match;
            });
            changed = true;
        }
    }

    // Pattern 2: remove the redundant white boxes around ShareActivity to make it a standalone CTA
    const redundantBoxRegex = /<div className="px-6 py-(?:4|6|8) bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">\s*<ShareActivity[^>]*\/>\s*<\/div>/g;
    if (redundantBoxRegex.test(content)) {
        content = content.replace(redundantBoxRegex, '<ShareActivity />');
        changed = true;
    }

    // Pattern 3: remove the border-t wrappers that cause side-by-side issues
    const borderTWrapperRegex = /<div className="px-6 py-(?:4|6|8) mt-4 border-t border-slate-100">\s*<ShareActivity[^>]*\/>\s*<\/div>/g;
    if (borderTWrapperRegex.test(content)) {
        content = content.replace(borderTWrapperRegex, '<div className="w-full mt-4"><ShareActivity /></div>');
        changed = true;
    }

    // Remove fixed w-full if present as it's now default
    content = content.replace(/<ShareActivity className="w-full" \/>/g, '<ShareActivity />');

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Refined layout in ${filePath}`);
    }
}

const apps = fs.readdirSync(appsDir);
apps.forEach(app => {
    const appPath = path.join(appsDir, app);
    if (!fs.statSync(appPath).isDirectory()) return;

    function walkSync(dir, filelist = []) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const innerPath = path.join(dir, file);
            if (fs.statSync(innerPath).isDirectory()) {
                if (innerPath.split(path.sep).length < 10) {
                    walkSync(innerPath, filelist);
                }
            } else if (file.endsWith('.tsx')) {
                filelist.push(innerPath);
            }
        });
        return filelist;
    }

    const files = walkSync(appPath);
    files.forEach(file => {
        if (fs.readFileSync(file, 'utf8').includes('ShareActivity')) {
            fixActivityLayout(file);
        }
    });
});

console.log('Refined global layout fix complete.');
