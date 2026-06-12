const fs = require('fs');
const path = require('path');

const filesToFix = [
  "src/app/anxiety_cycle/_src/components/BreakCycleScreen.tsx",
  "src/app/brave_steps/_src/components/erp/WrapUpScreen.tsx",
  "src/app/calm-space-visualizer/_src/components/activity/ClosingScreen.tsx",
  "src/app/clutter_and_emotional_journal/_src/components/journal/ClosingScreen.tsx",
  "src/app/discard_it/_src/components/discard-exposure/Screen7WellDone.tsx",
  "src/app/fear_ladder_newest/_src/components/FearLadder/CompletionScreen.tsx",
  "src/app/metta_heart_guide/_src/components/meditation/ReflectionSection.tsx",
  "src/app/mind-path-cards/_src/components/FinishCard.tsx",
  "src/app/quiet-focus-tool/_src/components/CompletionScreen.tsx",
  "src/app/reassurance_resistance/_src/components/exercise/Screen8Reflection.tsx",
  "src/app/ritual_cost/_src/components/ritual-calculator/Screen4Completion.tsx",
  "src/app/thought_diffusion/_src/components/screens/Screen5Reflection.tsx",
  "src/app/truth_seeker_quiz/_src/components/quiz/ResultsScreen.tsx",
  "src/app/uncertainity_acceptance/_src/components/uncertainty/Screen4Completion.tsx",
  "src/app/urge_surfing/_src/components/urge-surfing/Screen4Reflect.tsx"
];

const appsDir = './src/app';
const apps = fs.readdirSync(appsDir);
apps.forEach(app => {
    const appPath = path.join(appsDir, app);
    if (!fs.statSync(appPath).isDirectory()) return;
    const camelCased = app.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const paths = [
        `src/app/${app}/_src/pages/${camelCased}.tsx`,
        `src/app/${app}/_src/pages/Index.tsx`
    ];
    paths.forEach(p => { if (fs.existsSync(p)) filesToFix.push(p); });
});

filesToFix.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Make sure we only act if ShareActivity is actually used in the file
    if (content.includes('<ShareActivity') && !content.includes('import { ShareActivity')) {
        const lines = content.split('\n');
        
        let lastImportIndex = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import ') || lines[i].trim().startsWith('// @ts-nocheck') || lines[i].trim().startsWith('"use client"')) {
                lastImportIndex = i;
            } else if (lines[i].trim() !== '' && !lines[i].trim().startsWith('//')) {
                break; // stop at first non-import, non-comment line
            }
        }
        
        const importStatement = 'import { ShareActivity } from "@/components/ShareActivity";';
        if (lastImportIndex !== -1) {
            lines.splice(lastImportIndex + 1, 0, importStatement);
        } else {
            lines.unshift(importStatement);
        }

        content = lines.join('\n');
        fs.writeFileSync(filePath, content);
        console.log(`Added missing import to: ${filePath}`);
    }
});
