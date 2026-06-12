import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

function processFile(filePath, slug) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Fix sub-component translation hooks
  // This regex looks for functional components: const ComponentName = ... or function ComponentName(...)
  // and checks if they use 't(' but don't have 'useTranslation' in their body.
  const componentRegex = /const\s+([A-Z][A-Za-z0-9_]*)\s*=\s*(?:\([^)]*\)|[A-Za-z0-9_]*)\s*=>\s*\{|function\s+([A-Z][A-Za-z0-9_]*)\s*\([^)]*\)\s*\{/g;
  
  let match;
  let offset = 0;
  while ((match = componentRegex.exec(content)) !== null) {
    const compName = match[1] || match[2];
    const startIndex = match.index + match[0].length;
    
    // Find matching closing brace for this component to define the scope
    let braceCount = 1;
    let endIndex = startIndex;
    for (let i = startIndex; i < content.length; i++) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      if (braceCount === 0) {
        endIndex = i;
        break;
      }
    }
    
    const body = content.substring(startIndex, endIndex);
    if (body.includes('t(') && !body.includes('useTranslation')) {
      const injection = `\n  const { t } = useTranslation(undefined, { keyPrefix: '${slug}' });`;
      content = content.substring(0, startIndex) + injection + content.substring(startIndex);
      changed = true;
      componentRegex.lastIndex += injection.length; // move forward
    }
  }

  // 2. Fix specific apps missing ShareActivity (as per audit)
  const appsMissingShare = ['letter_to_ocd', 'mirror_moments', 'mood_tracker', 'ocd_tips', 'one_thing_out', 'response_guide', 'self_compassion', 'thought_truth', 'trigger_map'];
  
  if (appsMissingShare.includes(slug) && filePath.endsWith('Index.tsx')) {
    if (!content.includes('ShareActivity')) {
      // Inject import
      if (!content.includes('import { ShareActivity }')) {
        content = "import { ShareActivity } from '@/components/ShareActivity';\n" + content;
      }
      // Simple injection at the end of the return statement if it's a simple informational app
      if (['ocd_tips', 'response_guide', 'self_compassion', 'thought_truth'].includes(slug)) {
         content = content.replace(/(return\s+\()([^)]*)(\);)/, '$1<div className="flex flex-col min-h-screen">$2<div className="mt-auto py-8"><ShareActivity /></div></div>$3');
         changed = true;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
  }
}

function walk(dir, slug) {
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
  const srcPath = path.join(APPS_DIR, slug, '_src');
  if (fs.existsSync(srcPath)) {
    walk(srcPath, slug);
  }
}
