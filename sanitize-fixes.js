const fs = require('fs');
const path = require('path');

const files = [
  'src/app/reframe_thoughts/_src/components/SavedEntries.tsx',
  'src/app/uncertainity_tolerance/_src/hooks/useActivitySession.ts',
  'src/app/discard_it/_src/components/discard-exposure/types.ts'
];

files.forEach(file => {
  const fullPath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Fix the "await \n const ocd_user_id ..." pattern and duplicate res
  const pattern = /const res = await \s*const ocd_user_id = typeof window !== 'undefined' \? sessionStorage\.getItem\('user_id'\) : null;\s*const res = await/g;
  
  if (pattern.test(content)) {
    content = content.replace(pattern, "const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;\n    const res = await");
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Sanitized: ${file}`);
  } else {
    // Try an even simpler cleanup for the exact lines I saw
    const lines = content.split('\n');
    let changed = false;
    for(let i=0; i<lines.length-2; i++) {
        if (lines[i].includes('const res = await') && lines[i].trim() === 'const res = await' && lines[i+1].includes('ocd_user_id')) {
            lines.splice(i, 1);
            changed = true;
            break;
        }
    }
    if (changed) {
        fs.writeFileSync(fullPath, lines.join('\n'), 'utf8');
        console.log(`Sanitized (line match): ${file}`);
    } else {
        console.log(`Nothing to sanitize in: ${file}`);
    }
  }
});
