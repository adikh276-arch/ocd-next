const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, callback);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      callback(fullPath);
    }
  });
}

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Fix the namespace translation issue: [t("namespace"), "common"] -> ["namespace", "common"]
  // e.g. useTranslation([t("reassurance_resistance"), "common"]) -> useTranslation(["reassurance_resistance", "common"])
  const namespaceTRegex = /useTranslation\(\[\s*t\(\s*['"`](.*?)['"`]\s*\)\s*,\s*['"`](.*?)['"`]\s*\]\)/g;
  if (namespaceTRegex.test(content)) {
    content = content.replace(namespaceTRegex, 'useTranslation(["$1", "$2"])');
    console.log(`Fixed namespace translation in: ${filePath}`);
  }

  // 2. Fix the duplicate hook declarations in functions
  // E.g., removing `const { t } = useTranslation("...");` when it's immediately before `const { t, i18n } = useTranslation(...)`
  // We'll use a split lines approach or a clean regex that handles potential whitespace/newlines.
  
  // Let's do a line-by-line check where we look for const { t } = useTranslation and then a const { t, i18n } = useTranslation
  const lines = content.split(/\r?\n/);
  let newLines = [];
  let modified = false;

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    
    // Check if current line is a simple `const { t } = useTranslation`
    if (currentLine.trim().startsWith('const { t } = useTranslation(')) {
      // Look ahead for the next few lines (skipping whitespace or comments)
      let nextUseTranslationLineIdx = -1;
      for (let j = i + 1; j < Math.min(lines.length, i + 5); j++) {
        if (lines[j].includes('const { t, i18n } = useTranslation')) {
          nextUseTranslationLineIdx = j;
          break;
        }
      }

      if (nextUseTranslationLineIdx !== -1) {
        // We found a duplicate declaration! Skip the current `const { t } = useTranslation` line.
        console.log(`Removed duplicate const { t } declaration in: ${filePath} at line ${i + 1}`);
        modified = true;
        continue;
      }
    }
    newLines.push(currentLine);
  }

  if (modified || content !== originalContent) {
    const finalContent = modified ? newLines.join('\n') : content;
    fs.writeFileSync(filePath, finalContent, 'utf8');
    console.log(`Saved fixes for: ${filePath}`);
  }
}

const appDir = path.resolve(__dirname, '../src/app');
if (fs.existsSync(appDir)) {
  console.log(`Starting duplicate translation hook cleanup in ${appDir}...`);
  walkDir(appDir, fixFile);
  console.log('Cleanup finished.');
} else {
  console.error(`App directory not found: ${appDir}`);
}
