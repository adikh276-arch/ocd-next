const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Use current working directory
const cwd = process.cwd();

// Find Index.tsx and ContaminationOCD.tsx files
const files = glob.sync('src/app/**/{Index,ContaminationOCD}.tsx', { cwd });

console.log(`Found ${files.length} potential files to refactor.`);

files.forEach(relativePath => {
  const filePath = path.join(cwd, relativePath);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if it doesn't have the "completed guide" pattern or is already refactored
  if (!content.includes('isRead') && !content.includes('isCompleted')) return;
  if (content.includes('StandardFinishCard')) return;

  console.log(`Refactoring: ${relativePath}`);

  // 1. Remove useState hooks for isRead and isCompleted
  // Pattern: const [isRead, setIsRead] = useState(false);
  content = content.replace(/const\s+\[(isRead|isCompleted),\s+set(Read|Completed)\]\s+=\s+useState\(false\);?/g, '');

  // 2. Clear any setIsRead(true) or setIsCompleted(true) calls
  content = content.replace(/setIs(Read|Completed)\(true\);?/g, '');

  // 3. Find and replace the ternary completion block
  // This looks for {!isRead ? (...) : (...)} or {!isCompleted ? (...) : (...)}
  // We handle nested parentheses by finding the balanced block
  
  const identifyTernary = (text) => {
    const match = text.match(/\{!(isRead|isCompleted)\s*\?\s*\(/);
    if (!match) return null;
    
    let start = match.index;
    let balance = 0;
    let foundStart = false;
    
    for (let i = start; i < text.length; i++) {
        if (text[i] === '{') {
            balance++;
            foundStart = true;
        } else if (text[i] === '}') {
            balance--;
            if (foundStart && balance === 0) {
                return { start, end: i + 1, original: text.substring(start, i + 1) };
            }
        }
    }
    return null;
  };

  let ternary = identifyTernary(content);
  if (ternary) {
    content = content.substring(0, ternary.start) + '<StandardFinishCard />' + content.substring(ternary.end);
    
    // Add import if missing
    if (!content.includes('StandardFinishCard')) {
        // Remove existing ShareActivity import if it exists to avoid double imports
        content = content.replace(/import\s+.*\{.*ShareActivity.*\}.*from\s+[\"']@\/components\/ShareActivity[\"'];?\r?\n?/, '');
        // Import StandardFinishCard at the top
        content = `import { StandardFinishCard } from "@/components/StandardFinishCard";\n` + content;
    }
  } else {
    // If no ternary found but has "completed this guide" text, try a simpler replacement
    if (content.includes("completed this guide")) {
        console.log(`Manual replacement needed for ${relativePath} (no clear ternary found)`);
    }
  }

  // 4. Cleanup: Remove unused imports from lucide-react if they were specific to the old completion block
  // We'll leave this to a general cleanup script or leave it as is if it's safe

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Refactoring complete.');
