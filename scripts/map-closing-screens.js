const fs = require('fs');
const path = require('path');

const appsDir = './src/app';
const apps = fs.readdirSync(appsDir);

const results = {};

apps.forEach(app => {
    const appPath = path.join(appsDir, app);
    if (!fs.statSync(appPath).isDirectory()) return;

    // Search for closing screen keywords
    const keywords = ['Closing', 'Completion', 'WrapUp', 'EndScreen', 'Summary', 'Finish', 'Done', 'Reflection'];
    const srcPath = path.join(appPath, '_src');
    if (!fs.existsSync(srcPath)) return;

    function findClosingScreen(dir) {
        let found = null;
        const list = fs.readdirSync(dir);
        for (const file of list) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                const sub = findClosingScreen(fullPath);
                if (sub) return sub;
            } else if (file.endsWith('.tsx')) {
                const isClosing = keywords.some(k => file.toLowerCase().includes(k.toLowerCase()));
                if (isClosing) return fullPath;
            }
        }
        return null;
    }

    results[app] = findClosingScreen(srcPath);
});

console.log(JSON.stringify(results, null, 2));
