const fs = require('fs');
const path = require('path');
const glob = require('glob');

const cwd = process.cwd();
const files = [
  'src/app/contamination_ocd/_src/pages/ContaminationOCD.tsx',
  'src/app/daily_life/_src/pages/Index.tsx',
  'src/app/did_you_know/_src/pages/Index.tsx',
  'src/app/gratitude_logs/_src/pages/Index.tsx',
  'src/app/hoarding_ocd/_src/pages/Index.tsx',
  'src/app/ocd_moments/_src/pages/Index.tsx',
  'src/app/ocd-treatment-guide/_src/pages/Index.tsx',
  'src/app/pure_ocd/_src/pages/Index.tsx',
  'src/app/thought_surfing/_src/pages/Index.tsx',
  'src/app/tricho_ocd/_src/pages/Index.tsx',
  'src/app/uncertainity_tolerance/_src/pages/Index.tsx',
  'src/app/what_is_health_ocd/_src/pages/Index.tsx'
];

files.forEach(relativePath => {
  const filePath = path.join(cwd, relativePath);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  console.log(`Deep cleaning: ${relativePath}`);

  // 1. Fully remove isRead/isCompleted state declarations
  content = content.replace(/const\s+\[(isRead|isCompleted),\s+setIs(Read|Completed)\]\s+=\s+useState\(false\);?/g, '');
  
  // 2. Remove any setIsRead(true) or setIsCompleted(true) assignments
  content = content.replace(/setIs(Read|Completed)\(true\);?/g, '');

  // 3. Completely wipe out any previous StandardFinishCard injections to start fresh
  content = content.replace(/<StandardFinishCard\s*\/>/g, '');

  // 4. Find the main completion ternary or conditional blocks and replace them.
  // We'll look for blocks starting with {!isRead? or {isRead? or similar.
  // We'll also look for the hardcoded "I've completed this guide" button and its surrounding block.
  
  // Custom logic for health_ocd which had two blocks
  if (relativePath.includes('what_is_health_ocd')) {
      // Find the two blocks and remove the entire container div if it only holds completion logic
      // This is tricky with regex, so we'll use a marker-based approach or just target the specific patterns.
  }

  // Generic approach: Find the last few <div> blocks that contain "completed this guide" or derived logic
  // and replace the entire container with precisely one StandardFinishCard.
  
  // Pattern: {!VARIABLE ? ( ... ) : ( ... )}
  const completionRegex = /\{!(isRead|isCompleted)\s*\?\s*\([\s\S]+?\)\s*:\s*\([\s\S]+?\)\}/g;
  content = content.replace(completionRegex, '<StandardFinishCard />');

  // Alternative: if it's not a ternary (e.g. just a button), catch that too
  const simpleButtonRegex = /<button\s+onClick=\{\(\)\s*=>\s*setIs(Read|Completed)\(true\)\}[\s\S]+?<\/button>/g;
  content = content.replace(simpleButtonRegex, '<StandardFinishCard />');

  // 5. Deduplicate StandardFinishCard (ensure only one at the bottom)
  const parts = content.split('<StandardFinishCard />');
  if (parts.length > 2) {
      console.log(`Found multiple card placements in ${relativePath}, joining into one.`);
      const lastContent = parts.pop();
      content = parts.join('') + '<StandardFinishCard />' + lastContent;
  }

  // 6. Clean up imports
  // Ensure StandardFinishCard is imported
  if (!content.includes('import { StandardFinishCard }')) {
      content = `import { StandardFinishCard } from "@/components/StandardFinishCard";\n` + content;
  }
  
  // Clean up unused ShareActivity import
  content = content.replace(/import\s+\{\s*ShareActivity\s*\}\s+from\s+["']@\/components\/ShareActivity["'];?\r?\n?/g, '');
  // Clean up unused CheckCircle2 (if only used in the removed block)
  if (!content.includes('CheckCircle2') || content.match(/CheckCircle2/g).length === 1 && content.includes('import { ..., CheckCircle2, ... }')) {
     // This is safe-ish, but let's just make sure we don't break valid imports.
  }

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Deep clean complete.');
