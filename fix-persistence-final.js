const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

const targetFiles = [
  "src/app/uncertainity_tolerance/_src/hooks/useActivitySession.ts",
  "src/app/urge_surfing/_src/components/urge-surfing/UrgeSurfingActivity.tsx",
  "src/app/trigger_map/_src/components/triggers-map/TriggersMapActivity.tsx",
  "src/app/uncertainity_acceptance/_src/components/uncertainty/UncertaintyPractice.tsx",
  "src/app/ritual_cost/_src/components/ritual-calculator/RitualCostCalculator.tsx",
  "src/app/thought_diffusion/_src/components/DefusionExercise.tsx",
  "src/app/reframe_thoughts/_src/components/SavedEntries.tsx",
  "src/app/reframe_thoughts/_src/pages/ReframeThoughts.tsx",
  "src/app/reassurance_resistance/_src/components/exercise/ProgressDashboard.tsx",
  "src/app/reassurance_resistance/_src/components/exercise/ExerciseController.tsx",
  "src/app/one_thing_out/_src/components/OneThingOut.tsx",
  "src/app/ocd_moments/_src/lib/storage.ts",
  "src/app/mood_tracker/_src/components/MoodTracker.tsx",
  "src/app/discard_it/_src/components/discard-exposure/types.ts",
  "src/app/fear_ladder/_src/hooks/useFearLadderStorage.ts",
  "src/app/feelings_fact/_src/components/FeelingVsFact.tsx",
  "src/app/gratitude_logs/_src/components/GratitudeCheckIn.tsx",
  "src/app/letter_to_ocd/_src/components/DearOCD.tsx",
  "src/app/daily_life/_src/pages/Index.tsx",
  "src/app/daily_life/_src/components/WeeklyInsights.tsx",
  "src/app/brave_steps/_src/components/erp/WrapUpScreen.tsx",
  "src/app/clutter_journal/_src/lib/journal-store.ts",
  "src/app/anxiety_cycle/_src/components/BreakCycleScreen.tsx"
];

const SNIPPET = "const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;";

targetFiles.forEach(fileRel => {
  const file = path.resolve(process.cwd(), fileRel);
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let lines = content.split('\n');
  let changed = false;

  // 1. Remove all existing injected ocd_user_id declarations to start clean for this audit
  // (Only if it matches our exact snippet pattern from previous scripts)
  const cleanSnippet = "const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;";
  lines = lines.filter(line => !line.trim().includes(cleanSnippet));

  // 2. Re-inject in every function/callback that uses ocd_user_id
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('ocd_user_id') && !lines[i].includes('const ocd_user_id')) {
      // Find the start of the nearest block (try/callback/function)
      let injected = false;
      for (let j = i - 1; j >= 0; j--) {
        // Look for try block or arrow function start or named function start
        if (lines[j].includes('try {') || lines[j].includes('=> {') || lines[j].includes('async') || (lines[j].includes('function') && lines[j].includes('{'))) {
          lines.splice(j + 1, 0, `    ${SNIPPET}`);
          changed = true;
          i++; // skip newly added line
          injected = true;
          break;
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(file, lines.join('\n'), 'utf8');
    console.log(`✅ Audit fixed: ${fileRel}`);
  }
});
