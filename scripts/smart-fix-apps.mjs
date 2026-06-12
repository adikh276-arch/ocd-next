import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

// Generic UI components to exclude from auto-injection
const EXCLUDED_FILES = ['chart.tsx', 'carousel.tsx', 'command.tsx', 'sidebar.tsx', 'toaster.tsx'];

function processFile(filePath, slug) {
  if (EXCLUDED_FILES.some(f => filePath.endsWith(f))) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // This regex matches functional components more strictly
  // It looks for things like: const MyComp = (...) => {
  // We use a multi-stage approach to find the RIGHT brace
  const componentRegex = /(const|function)\s+([A-Z][A-Za-z0-9_]*)\s*=\s*(?:\([^)]*\)|[A-Za-z0-9_]*)\s*=>\s*\{|function\s+([A-Z][A-Za-z0-9_]*)\s*\([^)]*\)\s*\{/g;
  
  let match;
  // We need to keep track of indices carefully as we modify the string
  let newContent = content;
  let offset = 0;

  while ((match = componentRegex.exec(content)) !== null) {
    const head = match[0];
    const startIndex = match.index + head.length;
    
    // Safety check: is this inside a template string? (Heuristic)
    const beforeHead = content.substring(0, match.index);
    const backtickCount = (beforeHead.match(/`/g) || []).length;
    if (backtickCount % 2 !== 0) continue; // Likely inside a template string

    // Find the scope body
    let braceCount = 1;
    let endIndex = -1;
    for (let i = startIndex; i < content.length; i++) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') braceCount--;
        if (braceCount === 0) {
            endIndex = i;
            break;
        }
    }
    
    if (endIndex === -1) continue;

    const body = content.substring(startIndex, endIndex);
    
    // Check if it needs 't' and doesn't have it
    if (body.includes('t(') && !body.includes('useTranslation')) {
        const injection = `\n  const { t } = useTranslation(undefined, { keyPrefix: '${slug}' });`;
        newContent = newContent.substring(0, startIndex + offset) + injection + newContent.substring(startIndex + offset);
        offset += injection.length;
        changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated: ${filePath}`);
  }
}

function walk(dir, slug) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      walk(p, slug);
    } else if (file.endsWith('.tsx')) {
      processFile(p, slug);
    }
  }
}

const apps = fs.readdirSync(APPS_DIR).filter(f => fs.statSync(path.join(APPS_DIR, f)).isDirectory());
for (const slug of apps) {
  if (slug.startsWith('[') || slug.startsWith('_')) continue;
  walk(path.join(APPS_DIR, slug, '_src'), slug);
}
