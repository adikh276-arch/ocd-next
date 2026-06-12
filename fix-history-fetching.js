const fs = require('fs');
const path = require('path');

const files = [
  'src/app/reframe_thoughts/_src/components/SavedEntries.tsx',
  'src/app/uncertainity_tolerance/_src/hooks/useActivitySession.ts',
  'src/app/discard_it/_src/components/discard-exposure/types.ts',
  'src/app/fear_ladder/_src/hooks/useFearLadderStorage.ts',
];

const injectCode = `
    const ocd_user_id = typeof window !== 'undefined' ? sessionStorage.getItem('user_id') : null;`;

files.forEach(file => {
  const fullPath = path.resolve(process.cwd(), file);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Regex to find fetch requests for history (GET requests with /api/logs?slug=...)
  // We look for fetch('/ocd/api/logs?slug=XYZ') or fetch(\`/ocd/api/logs?slug=XYZ\`)
  const regex = /fetch\((['"`])\/ocd\/api\/logs\?slug=([^'"`]+)(['"`])\)/g;
  
  if (regex.test(content)) {
    // Inject the user_id extraction before the fetch
    // First, find standard blocks that call this fetch
    content = content.replace(/(async\s+[\s\S]*?{)([\s\S]*?)fetch\((['"`])\/ocd\/api\/logs\?slug=([^'"`]+)(['"`])\)/g, (match, asyncHeader, bodyBeforeFetch, q1, slug, q2) => {
       if (bodyBeforeFetch.includes('sessionStorage.getItem')) return match; // Already fixed
       
       return `${asyncHeader}${bodyBeforeFetch}${injectCode}\n    const res = await fetch(\`/ocd/api/logs?slug=${slug}\${ocd_user_id ? \`&user_id=\${ocd_user_id}\` : ''}\`)`;
    });
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Successfully patched: ${file}`);
  } else {
    console.log(`No match found in: ${file}`);
  }
});
