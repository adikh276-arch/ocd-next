const fs = require('fs');
const path = require('path');

const appsDir = './src/app';
const apps = fs.readdirSync(appsDir);

const results = {};

const keywords = ['Closing', 'Completion', 'WrapUp', 'EndScreen', 'Summary', 'Finish', 'Done', 'Reflection', 'Reflect', 'BreakCycle', 'WellDone', 'Success', 'Result', 'Congrats', 'ClosingScreen', 'Wrap-up'];

apps.forEach(app => {
    const appPath = path.join(appsDir, app);
    if (!fs.statSync(appPath).isDirectory()) return;

    const srcPath = path.join(appPath, '_src');
    if (!fs.existsSync(srcPath)) return;

    function findClosingScreen(dir) {
        let files = [];
        try {
            files = fs.readdirSync(dir);
        } catch(e) { return null; }

        let potential = null;
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                const sub = findClosingScreen(fullPath);
                if (sub) return sub;
            } else if (file.endsWith('.tsx')) {
                const isClosing = keywords.some(k => file.toLowerCase().includes(k.toLowerCase()));
                if (isClosing) {
                    potential = fullPath;
                }
            }
        }
        return potential;
    }

    results[app] = findClosingScreen(srcPath);
});

// For those still null, search within the Index.tsx or App.tsx for "Closing" or "Summary" strings
Object.keys(results).forEach(app => {
    if (!results[app]) {
         const indexFile = path.join(appsDir, app, '_src', 'pages', 'Index.tsx');
         if (fs.existsSync(indexFile)) {
             const content = fs.readFileSync(indexFile, 'utf8');
             if (content.includes('Closing') || content.includes('Summary') || content.includes('Final')) {
                 results[app] = indexFile + ' (In-page)';
             }
         }
    }
});

console.log(JSON.stringify(results, null, 2));
