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

// All informational apps as well
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

const shareBlockRegex = /\{\/\* Share Progress CTA \*\/\}[\s\S]*?<ShareActivity className="w-full" \/>[\s\S]*?<\/div>/g;

filesToFix.forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove all existing (potentially broken) injections
    content = content.replace(shareBlockRegex, '');

    // 2. Add properly placed injection
    const shareComponent = '\n      {/* Share Progress CTA */}\n      <div className="px-6 py-4 mt-4 border-t border-slate-100">\n        <ShareActivity className="w-full" />\n      </div>\n';

    // Injection for components with navigation buttons at the bottom
    // We look for the last <button or the final </div> of the main container
    const lastButtonIndex = content.lastIndexOf('<button');
    if (lastButtonIndex !== -1) {
        // Find the start of the line containing the last button
        const lines = content.split('\n');
        let buttonLineIndex = -1;
        for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i].includes('<button') || lines[i].includes('<Button')) {
                buttonLineIndex = i;
                break;
            }
        }
        
        if (buttonLineIndex !== -1) {
            // Find if this button is inside a container (like footer or div)
            // Insert BEFORE the button group if possible
            if (lines[buttonLineIndex-1] && (lines[buttonLineIndex-1].includes('flex') || lines[buttonLineIndex-1].includes('gap-'))) {
                lines.splice(buttonLineIndex - 1, 0, shareComponent);
            } else {
                lines.splice(buttonLineIndex, 0, shareComponent);
            }
            content = lines.join('\n');
        }
    } else {
        // No button found? Append to the end of the root element
        const lastDivIndex = content.lastIndexOf('</div>');
        if (lastDivIndex !== -1) {
            content = content.slice(0, lastDivIndex) + shareComponent + content.slice(lastDivIndex);
        }
    }

    fs.writeFileSync(filePath, content);
    console.log(`Fixed and properly injected: ${filePath}`);
});
