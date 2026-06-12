const fs = require('fs');
const path = require('path');

const replacements = {
    "calm-space-visualizer": "guided_imagery",
    "clutter_and_emotional_journal": "clutter_journal",
    "fear_ladder_newest": "fear_ladder",
    "feelinsvsfact": "feelings_fact",
    "gentle-thoughts": "ocd_tips",
    "mind-path-cards": "cognitive_distortions",
    "ocd_daily_life_new": "daily_life",
    "ocd_moments_tracker_new": "ocd_moments",
    "one_thing_updated": "one_thing_out"
};

function replaceInFile(filePath) {
    let content;
    try {
        content = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        console.error(`Error reading ${filePath}: ${e.message}`);
        return;
    }

    let originalContent = content;
    for (const [oldSlug, newSlug] of Object.entries(replacements)) {
        content = content.split(oldSlug).join(newSlug);
    }

    if (content !== originalContent) {
        try {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        } catch (e) {
            console.error(`Error writing to ${filePath}: ${e.message}`);
        }
    }
}

function walkAndReplace(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkAndReplace(fullPath);
        } else if (stat.isFile()) {
            if (/\.(tsx|ts|js|jsx|json|css)$/.test(item)) {
                replaceInFile(fullPath);
            }
        }
    }
}

console.log("Replacing slugs in src...");
walkAndReplace(path.join(process.cwd(), "src"));
console.log("Replacing slugs in public/locales...");
walkAndReplace(path.join(process.cwd(), "public", "locales"));
console.log("Done.");
