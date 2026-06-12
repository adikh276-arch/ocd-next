const fs = require('fs');
const path = require('path');

const appsDir = './src/app';
const apps = fs.readdirSync(appsDir);

const closingScreensMap = {
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

apps.forEach(app => {
    const appPath = path.join(appsDir, app);
    if (!fs.statSync(appPath).isDirectory()) return;

    // console.log(`Processing ${app}...`);

    // 1. Cleanup Root Injections
    const roots = [
        path.join(appPath, '_src', 'pages', 'Index.tsx'),
        path.join(appPath, '_src', 'App.tsx')
    ];

    roots.forEach(f => {
        if (fs.existsSync(f)) {
            let content = fs.readFileSync(f, 'utf8');
            if (content.includes('ShareActivity')) {
                if (closingScreensMap[app]) {
                    content = content.split('\n').filter(line => !line.includes('ShareActivity')).join('\n');
                    const jsxRegex = /{\/\* Share Progress CTA \*\/}\s*<div[^>]*>\s*<ShareActivity[^>]*\/>\s*<\/div>/g;
                    content = content.replace(jsxRegex, '');
                    fs.writeFileSync(f, content);
                }
            }
        }
    });

    if (closingScreensMap[app]) {
        const target = closingScreensMap[app];
        if (fs.existsSync(target)) {
            let content = fs.readFileSync(target, 'utf8');
            if (!content.includes('ShareActivity')) {
                if (!content.includes('import { ShareActivity }')) {
                    content = 'import { ShareActivity } from "@/components/ShareActivity";\n' + content;
                }
                const lines = content.split('\n');
                let lastDivIndex = -1;
                for (let i = lines.length - 1; i >= 0; i--) {
                    if (lines[i].includes('</div>')) { lastDivIndex = i; break; }
                }
                if (lastDivIndex !== -1) {
                    const injection = `
      {/* Share Progress CTA */}
      <div className="w-full max-w-lg px-6 py-4 mt-6 border-t border-slate-100 flex justify-center mx-auto">
        <ShareActivity className="w-full" />
      </div>`;
                    lines.splice(lastDivIndex, 0, injection);
                    content = lines.join('\n');
                    fs.writeFileSync(target, content);
                }
            }
        }
    } else {
        const indexFile = path.join(appPath, '_src', 'pages', 'Index.tsx');
        if (fs.existsSync(indexFile)) {
             let content = fs.readFileSync(indexFile, 'utf8');
             if (!content.includes('useState(0)') && !content.includes('screen') && !content.includes('router') && !content.includes('isRead')) {
                 if (!content.includes('ShareActivity')) {
                     content = 'import { ShareActivity } from "@/components/ShareActivity";\n' + content;
                 }
                 if (!content.includes('import { useState }')) {
                     content = 'import { useState } from "react";\n' + content;
                 }
                 content = content.replace(/const (\w+) = \(\) =\> {/i, 'const $1 = () => {\n  const [isRead, setIsRead] = useState(false);');
                 const jsxRegex = /{\/\* Share Progress CTA \*\/}\s*<div[^>]*>\s*<ShareActivity[^>]*\/>\s*<\/div>/g;
                 content = content.replace(jsxRegex, '');
                 const lines = content.split('\n');
                 let lastDivIndex = -1;
                 for (let i = lines.length - 1; i >= 0; i--) {
                    if (lines[i].includes('</div>')) { lastDivIndex = i; break; }
                 }
                 if (lastDivIndex !== -1) {
                     const journeyLogic = `
        <div className="mt-12 pt-8 border-t border-slate-200">
          {!isRead ? (
            <button 
              onClick={() => setIsRead(true)}
              className="w-full py-4 rounded-full bg-slate-900 text-white font-bold text-lg shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              I've completed this guide →
            </button>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center mb-6">
                <h3 className="text-green-900 font-bold text-lg">Knowledge is Power!</h3>
                <p className="text-green-700 text-sm">You've finished this journey. Share it to help others.</p>
              </div>
              <div className="px-6 py-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
                <ShareActivity className="w-full text-center" />
              </div>
            </div>
          )}
        </div>`;
                     lines.splice(lastDivIndex, 0, journeyLogic);
                     content = lines.join('\n');
                     fs.writeFileSync(indexFile, content);
                 }
             }
        }
    }
});
