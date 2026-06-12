const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src/app');
const errors = [];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const hasUseState = content.includes('useState(');
  const hasUseEffect = content.includes('useEffect(');
  const hasUseCallback = content.includes('useCallback(');
  const hasUseMemo = content.includes('useMemo(');
  const hasUseContext = content.includes('useContext(');
  const hasUseReducer = content.includes('useReducer(');
  const hasUseRef = content.includes('useRef(');

  const reactImport = content.match(/import.*\{.*\}.*from ['"]react['"]/);
  
  if (hasUseState && (!reactImport || !reactImport[0].includes('useState'))) {
    errors.push(`${file}: uses useState but missing import`);
  }
  if (hasUseEffect && (!reactImport || !reactImport[0].includes('useEffect'))) {
    errors.push(`${file}: uses useEffect but missing import`);
  }
  if (hasUseCallback && (!reactImport || !reactImport[0].includes('useCallback'))) {
    errors.push(`${file}: uses useCallback but missing import`);
  }
  if (hasUseMemo && (!reactImport || !reactImport[0].includes('useMemo'))) {
    errors.push(`${file}: uses useMemo but missing import`);
  }
  if (hasUseRef && (!reactImport || !reactImport[0].includes('useRef'))) {
    errors.push(`${file}: uses useRef but missing import`);
  }
});

console.log(errors.join('\n'));
if (errors.length === 0) process.exit(0);
else process.exit(1);
