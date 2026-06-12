const fs = require('fs');
const path = require('path');

const mapping = {
  "anxiety_cycle": "src/app/anxiety_cycle/_src/components/BreakCycleScreen.tsx",
  "brave_steps": "src/app/brave_steps/_src/components/erp/WrapUpScreen.tsx",
  "calm-space-visualizer": "src/app/calm-space-visualizer/_src/components/activity/ClosingScreen.tsx",
  "clutter_and_emotional_journal": "src/app/clutter_and_emotional_journal/_src/components/journal/ClosingScreen.tsx",
  "discard_it": "src/app/discard_it/_src/components/discard-exposure/Screen7WellDone.tsx",
  "fear_ladder_newest": "src/app/fear_ladder_newest/_src/components/FearLadder/CompletionScreen.tsx",
  "metta_heart_guide": "src/app/metta_heart_guide/_src/components/meditation/ReflectionSection.tsx",
  "mind-path-cards": "src/app/mind-path-cards/_src/components/FinishCard.tsx",
  "quiet-focus-tool": "src/app/quiet-focus-tool/_src/components/CompletionScreen.tsx",
  "reassurance_resistance": "src/app/reassurance_resistance/_src/components/exercise/Screen8Reflection.tsx",
  "ritual_cost": "src/app/ritual_cost/_src/components/ritual-calculator/Screen4Completion.tsx",
  "thought_diffusion": "src/app/thought_diffusion/_src/components/screens/Screen5Reflection.tsx",
  "truth_seeker_quiz": "src/app/truth_seeker_quiz/_src/components/quiz/ResultsScreen.tsx",
  "uncertainity_acceptance": "src/app/uncertainity_acceptance/_src/components/uncertainty/Screen4Completion.tsx",
  "urge_surfing": "src/app/urge_surfing/_src/components/urge-surfing/Screen4Reflect.tsx"
};

// Informational apps often use Pages/AppName.tsx
const informationalApps = [
    "contamination_ocd", "did_you_know", "gentle-thoughts", "gratitude_logs", 
    "grounded_techniques", "hoarding_ocd", "letter_to_ocd", "mirror_moments", 
    "mood_tracker", "ocd-treatment-guide", "ocd_cycle", "ocd_daily_life_new", 
    "ocd_moments_tracker_new", "ocd_success_stories", "one_thing_updated", 
    "pure_ocd", "reframe_thoughts", "response_guide", "self_compassion", 
    "thought_surfing", "thought_truth", "tricho_ocd", "trigger_map", 
    "uncertainity_tolerance", "what_is_health_ocd", "feelinsvsfact"
];

const importLine = 'import { ShareActivity } from "@/components/ShareActivity";\n';
const shareComponent = '\n      {/* Share Progress CTA */}\n      <div className="px-6 py-8 border-t border-slate-100 mt-8">\n        <ShareActivity className="w-full" />\n      </div>\n';

function injectIntoFile(filePath, type) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Add import if not present
    if (!content.includes('ShareActivity')) {
        const lines = content.split('\n');
        const lastImportIndex = lines.findLastIndex(line => line.startsWith('import'));
        lines.splice(lastImportIndex + 1, 0, importLine);
        content = lines.join('\n');
    }

    // Identify injection point
    if (type === 'interactive') {
        // Look for buttons or final div
        if (content.includes('</button>') && !content.includes('<ShareActivity')) {
            // Find the last button group or closing div
            const lastButtonIndex = content.lastIndexOf('</button>');
            // Move up to the start of that button's line/container if possible
            // But a safer way is to find the final flex/div usually before the last return
            content = content.replace(/(\n\s*)?(<footer|<div className="[^"]*(?:pb-|px-|flex-col-reverse)[^"]*")/, `${shareComponent}$2`);
        }
    } else {
        // Informational: append before the final closing div of the main container
        // Usually the second to last </div>
        const parts = content.split('</div>');
        if (parts.length > 2) {
            parts[parts.length - 2] += shareComponent;
            content = parts.join('</div>');
        }
    }

    fs.writeFileSync(filePath, content);
    console.log(`Injected into ${filePath}`);
}

// 1. Process Mapped Apps (Interactive)
Object.values(mapping).forEach(file => injectIntoFile(file, 'interactive'));

// 2. Process Informational Apps
informationalApps.forEach(app => {
    // Try to find the main page component
    const camelCased = app.split(/[-_]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const paths = [
        `src/app/${app}/_src/pages/${camelCased}.tsx`,
        `src/app/${app}/_src/pages/Index.tsx`
    ];
    
    for (const p of paths) {
        if (fs.existsSync(p)) {
            injectIntoFile(p, 'informational');
            break;
        }
    }
});

console.log('Injection complete.');
