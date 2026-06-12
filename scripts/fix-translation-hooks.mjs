import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

function processFile(filePath, slug) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Regex to find functional component definitions
  // Matches: function Component() { or const Component = () => {
  const componentRegex = /(?:function\s+([A-Z][a-zA-Z0-9]*)\s*\([^)]*\)\s*\{|const\s+([A-Z][a-zA-Z0-9]*)\s*=\s*\([^)]*\)\s*=>\s*\{)/g;
  
  let match;
  let newContent = content;

  // We need to be careful with nested functions. For simplicity, we'll look for 
  // top-level components and ensure they have 't' defined if they use it.
  
  // Also check if useTranslation is imported
  if (content.includes('t(') && !content.includes('import { useTranslation }')) {
    newContent = 'import { useTranslation } from "react-i18next";\n' + newContent;
    changed = true;
  }

  // Iterate matches backwards to not break indices
  const components = [];
  while ((match = componentRegex.exec(content)) !== null) {
      components.push({
          index: match.index,
          name: match[1] || match[2],
          fullMatch: match[0]
      });
  }

  for (let i = components.length - 1; i >= 0; i--) {
      const comp = components[i];
      // Find the end of this component or at least a reasonable chunk
      const nextCompIndex = i < components.length - 1 ? components[i+1].index : content.length;
      const compBody = content.substring(comp.index, nextCompIndex);

      // If 't(' is used in this body but 'const { t }' or 'const {t}' is NOT defined in this body
      if (compBody.includes('t(') && !compBody.includes('const { t }') && !compBody.includes('const {t}')) {
          const injection = `\n  const { t } = useTranslation(undefined, { keyPrefix: '${slug}' });`;
          newContent = newContent.substring(0, comp.index + comp.fullMatch.length) + injection + newContent.substring(comp.index + comp.fullMatch.length);
          changed = true;
      }
  }

  if (changed) {
    fs.writeFileSync(filePath, newContent);
    return true;
  }
  return false;
}

function walkDir(dir, slug) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, slug);
    } else if (file.endsWith('.tsx')) {
      if (processFile(filePath, slug)) {
          console.log(`[Hooks Fixed] ${filePath}`);
      }
    }
  }
}

const apps = fs.readdirSync(APPS_DIR).filter(f => fs.statSync(path.join(APPS_DIR, f)).isDirectory());
for (const slug of apps) {
  if (slug.startsWith('[') || slug.startsWith('_')) continue;
  const srcDir = path.join(APPS_DIR, slug, '_src');
  if (fs.existsSync(srcDir)) {
      walkDir(srcDir, slug);
  }
}

console.log('Global translation hook audit complete.');
