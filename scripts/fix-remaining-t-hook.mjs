/**
 * fix-remaining-t-hook.mjs
 * 
 * Targeted fix for the 22 remaining files + any file with a misplaced hook.
 * Uses a more robust approach:
 *  1. Remove any incorrectly placed hook calls (hooks inside non-component functions)
 *  2. Re-inject at the correct component body start
 */

import { readFileSync, writeFileSync } from 'fs';

const HOOK_LINE = '  const { t } = useTranslation();';

const FILES = [
  'src/app/anxiety_cycle/_src/components/BreakCycleScreen.tsx',
  'src/app/cognitive_distortions/_src/components/DistortionCard.tsx',
  'src/app/cognitive_distortions/_src/components/FinishCard.tsx',
  'src/app/reassurance_resistance/_src/components/exercise/Screen10Closing.tsx',
  'src/app/reassurance_resistance/_src/components/exercise/Screen1Welcome.tsx',
  'src/app/reassurance_resistance/_src/components/exercise/Screen2WhatsHappening.tsx',
  'src/app/reassurance_resistance/_src/components/exercise/Screen4NameIt.tsx',
  'src/app/reassurance_resistance/_src/components/exercise/Screen8Reflection.tsx',
  'src/app/reassurance_resistance/_src/components/exercise/Screen9BSaveSession.tsx',
  'src/app/reassurance_resistance/_src/components/exercise/Screen9BuildHabit.tsx',
  'src/app/thought_diffusion/_src/components/ProgressBar.tsx',
  'src/app/thought_diffusion/_src/components/screens/HistoryScreen.tsx',
  'src/app/thought_diffusion/_src/components/screens/Screen1Welcome.tsx',
  'src/app/thought_diffusion/_src/components/screens/Screen2Defusion.tsx',
  'src/app/thought_diffusion/_src/components/screens/Screen3Tool.tsx',
  'src/app/thought_diffusion/_src/components/screens/Screen4Practice.tsx',
  'src/app/thought_diffusion/_src/components/screens/Screen5Reflection.tsx',
  'src/app/trigger_map/_src/components/triggers-map/ScreenComplete.tsx',
  'src/app/trigger_map/_src/components/triggers-map/ScreenIntro.tsx',
  'src/app/trigger_map/_src/components/triggers-map/ScreenRateTrigger.tsx',
  'src/app/uncertainity_acceptance/_src/components/uncertainty/Screen1Intro.tsx',
  'src/app/uncertainity_acceptance/_src/components/uncertainty/Screen2NameDoubt.tsx',
  'src/app/uncertainity_acceptance/_src/components/uncertainty/Screen3Acceptance.tsx',
];

function fixFile(filePath) {
  let src = readFileSync(filePath, 'utf8');
  
  // Step 1: Remove any already-injected hook that may have landed in the wrong place
  // This handles BreakCycleScreen and similar misplaced injections
  src = src.replace(/^[ \t]*const \{ t \} = useTranslation\(\);[ \t]*\r?\n/gm, '');
  
  // Step 2: Find the outermost component export and inject hook at its body start
  // Strategy: find the last `export default` or primary component declaration,
  // then find the first { that opens its body.
  
  const lines = src.split('\n');
  let injected = false;
  
  // Find the COMPONENT function start - look for patterns like:
  // const Foo: React.FC<...> = (...) => {
  // const Foo = (...) => {
  // const Foo = (...): ReturnType => {
  // function Foo(...) {
  // const Foo: React.FC<...> = (...) => (   <-- implicit return
  
  // We want the FIRST top-level component definition (not inner handlers)
  // Key insight: component lines start at column 0 (no leading spaces)
  
  const componentBlockPattern = /^(export\s+)?(const|let)\s+\w+(\s*:\s*React\.FC[^=]*)?\s*=\s*.+?=>\s*\{s*$/;
  const funcDeclPattern = /^(export\s+)?(default\s+)?function\s+\w+/;
  const implicitReturnPattern = /^(export\s+)?(const|let)\s+\w+(\s*:\s*React\.FC[^=]*)?\s*=\s*.+?=>\s*\(\s*$/;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trimStart();
    
    // Only match top-level component lines (minimal indentation)
    const indentLen = line.length - trimmed.length;
    if (indentLen > 2) continue; // skip deeply indented inner functions
    
    // Pattern A: block body arrow or function declaration  
    if ((componentBlockPattern.test(trimmed) || funcDeclPattern.test(trimmed)) && line.endsWith('{')) {
      lines.splice(i + 1, 0, HOOK_LINE);
      injected = true;
      break;
    }
    
    // Pattern A (multiline): component signature spans lines, closing `{` is on its own line
    if (trimmed === '{' && i > 0) {
      // Check if previous non-empty lines form a component
      let lookback = i - 1;
      while (lookback >= 0 && lines[lookback].trim() === '') lookback--;
      const prevLine = lines[lookback]?.trim() || '';
      if (prevLine.includes('=>') || prevLine.match(/\)\s*:\s*\w/)) {
        // Likely the closing of a multiline component signature
        lines.splice(i + 1, 0, HOOK_LINE);
        injected = true;
        break;
      }
    }
    
    // Pattern B: implicit return `=> (`
    if (implicitReturnPattern.test(trimmed)) {
      // Convert to block body
      lines[i] = line.replace(/=>\s*\(\s*$/, '=> {');
      lines.splice(i + 1, 0, HOOK_LINE);
      lines.splice(i + 2, 0, '  return (');
      
      // Find matching ) - this is the closing paren of the implicit JSX return
      let depth = 1;
      let j = i + 3;
      while (j < lines.length && depth > 0) {
        for (const ch of lines[j]) {
          if (ch === '(') depth++;
          else if (ch === ')') {
            depth--;
            if (depth === 0) break;
          }
        }
        if (depth > 0) j++;
      }
      // j is the line with the matching )
      // Replace trailing ); with   ); and add closing }
      lines[j] = lines[j].replace(/\)\s*;?\s*$/, '  );');
      lines.splice(j + 1, 0, '};');
      injected = true;
      break;
    }
    
    // Pattern C: React.FC with block body spread across multiple lines
    // e.g.: const Foo: React.FC<Props> = ({ onNext, onBack }) => {
    if (/^(export\s+)?(const|let)\s+\w+/.test(trimmed) && line.includes('=>')) {
      // The opening { might be on this same line or following
      if (line.trimEnd().endsWith('{')) {
        lines.splice(i + 1, 0, HOOK_LINE);
        injected = true;
        break;
      }
      // Look ahead for the {
      for (let k = i + 1; k < Math.min(i + 8, lines.length); k++) {
        const kTrimmed = lines[k].trim();
        if (kTrimmed === '{' || kTrimmed.endsWith('{')) {
          lines.splice(k + 1, 0, HOOK_LINE);
          injected = true;
          break;
        }
        if (kTrimmed.startsWith('return') || kTrimmed.startsWith('<')) break;
      }
      if (injected) break;
    }
  }
  
  if (!injected) {
    console.warn(' ⚠ Could not inject in:', filePath);
    return;
  }
  
  const output = lines.join('\n');
  writeFileSync(filePath, output, 'utf8');
  console.log(' ✓ Fixed:', filePath);
}

for (const f of FILES) {
  fixFile(f);
}
console.log('\nDone.');
