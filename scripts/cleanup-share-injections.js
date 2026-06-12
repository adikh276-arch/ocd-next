const fs = require('fs');
const path = require('path');

const appsDir = './src/app';
const map = {
  "anxiety_cycle": "src\\app\\anxiety_cycle\\_src\\components\\BreakCycleScreen.tsx",
  "brave_steps": "src\\app\\brave_steps\\_src\\components\\erp\\WrapUpScreen.tsx",
  "calm-space-visualizer": "src\\app\\calm-space-visualizer\\_src\\components\\activity\\ClosingScreen.tsx",
  "clutter_and_emotional_journal": "src\\app\\clutter_and_emotional_journal\\_src\\components\\journal\\ClosingScreen.tsx",
  "discard_it": "src\\app\\discard_it\\_src\\components\\discard-exposure\\Screen7WellDone.tsx",
  "fear_ladder_newest": "src\\app\\fear_ladder_newest\\_src\\components\\FearLadder\\CompletionScreen.tsx",
  "metta_heart_guide": "src\\app\\metta_heart_guide\\_src\\components\\meditation\\ReflectionSection.tsx",
  "mind-path-cards": "src\\app\\mind-path-cards\\_src\\components\\FinishCard.tsx",
  "quiet-focus-tool": "src\\app\\quiet-focus-tool\\_src\\components\\CompletionScreen.tsx",
  "reassurance_resistance": "src\\app\\reassurance_resistance\\_src\\components\\exercise\\Screen8Reflection.tsx",
  "ritual_cost": "src\\app\\ritual_cost\\_src\\components\\ritual-calculator\\Screen4Completion.tsx",
  "thought_diffusion": "src\\app\\thought_diffusion\\_src\\components\\screens\\Screen5Reflection.tsx",
  "truth_seeker_quiz": "src\\app\\truth_seeker_quiz\\_src\\components\\quiz\\ResultsScreen.tsx",
  "uncertainity_acceptance": "src\\app\\uncertainity_acceptance\\_src\\components\\uncertainty\\Screen4Completion.tsx",
  "urge_surfing": "src\\app\\urge_surfing\\_src\\components\\urge-surfing\\Screen4Reflect.tsx"
};

Object.keys(map).forEach(app => {
    const indexPath = path.join(appsDir, app, '_src', 'pages', 'Index.tsx');
    const appPath = path.join(appsDir, app, '_src', 'App.tsx');
    
    [indexPath, appPath].forEach(f => {
        if (fs.existsSync(f)) {
            let content = fs.readFileSync(f, 'utf8');
            if (content.includes('ShareActivity')) {
                console.log(`Cleaning up ${f}`);
                // Remove the import if it's there
                content = content.replace(/import { ShareActivity } from "@\/components\/ShareActivity";/g, '');
                
                // Remove the JSX block (multiline)
                const jsxRegex = /{\/\* Share Progress CTA \*\/}\s*<div[^>]*>\s*<ShareActivity[^>]*\/>\s*<\/div>/g;
                content = content.replace(jsxRegex, '');
                
                fs.writeFileSync(f, content);
            }
        }
    });
});
