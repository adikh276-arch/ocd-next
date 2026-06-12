const fs = require('fs');
const path = require('path');

const appsDir = './src/app';
const apps = fs.readdirSync(appsDir);

// Apps that we know are informational and need the "I've completed this guide" button
const infoApps = [
    'what_is_health_ocd', 'hoarding_ocd', 'contamination_ocd', 'did_you_know', 'feelinsvsfact', 
    'gentle-thoughts', 'gratitude_logs', 'letter_to_ocd', 'mirror_moments', 
    'ocd-treatment-guide', 'ocd_cycle', 'ocd_daily_life_new', 'ocd_moments_tracker_new', 
    'one_thing_updated', 'pure_ocd', 'response_guide', 'self_compassion', 
    'thought_surfing', 'thought_truth', 'tricho_ocd', 'trigger_map', 'uncertainity_tolerance'
];

infoApps.forEach(app => {
    const appPath = path.join(appsDir, app);
    if (!fs.existsSync(appPath)) return;

    // Find the main file (Index or [AppName].tsx or pointer)
    let targetFile = path.join(appPath, '_src', 'pages', 'Index.tsx');
    let content = '';
    
    if (fs.existsSync(targetFile)) {
        content = fs.readFileSync(targetFile, 'utf8');
        // If it's a pointer, follow it
        const pointerMatch = content.match(/import (\w+) from "\.\/(\w+)"/);
        if (pointerMatch && content.includes('<' + pointerMatch[1] + ' />')) {
            targetFile = path.join(appPath, '_src', 'pages', pointerMatch[2] + '.tsx');
            content = fs.readFileSync(targetFile, 'utf8');
        }
    } else {
        targetFile = path.join(appPath, '_src', 'pages', app + '.tsx');
        if (fs.existsSync(targetFile)) {
            content = fs.readFileSync(targetFile, 'utf8');
        }
    }

    if (content && !content.includes('isRead')) {
        console.log(`Standardizing informational app: ${targetFile}`);
        
        // Imports
        if (!content.includes('ShareActivity')) {
            content = 'import { ShareActivity } from "@/components/ShareActivity";\n' + content;
        }
        if (!content.includes('useState')) {
            content = 'import { useState } from "react";\n' + content;
        }
        if (!content.includes('CheckCircle2')) {
            content = 'import { CheckCircle2 } from "lucide-react";\n' + content;
        }

        // State Injection
        content = content.replace(/const (\w+) = \(\) =\> {/i, 'const $1 = () => {\n  const [isRead, setIsRead] = useState(false);');

        // Remove existing Share button JSX
        const jsxRegex = /{\/\* Share Progress CTA \*\/}\s*<div[^>]*>\s*<ShareActivity[^>]*\/>\s*<\/div>/g;
        content = content.replace(jsxRegex, '');

        // Injection logic
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
                <CheckCircle2 className="mx-auto text-green-500 mb-2" size={32} />
                <h3 className="text-green-900 font-bold text-lg">Knowledge is Power!</h3>
                <p className="text-green-700 text-sm italic">You've finished this journey. Share it to inspire others.</p>
              </div>
              <div className="px-6 py-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
                <ShareActivity className="w-full" />
              </div>
            </div>
          )}
        </div>`;
            lines.splice(lastDivIndex, 0, journeyLogic);
            content = lines.join('\n');
            fs.writeFileSync(targetFile, content);
        }
    }
});
