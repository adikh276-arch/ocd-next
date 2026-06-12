import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

function fixAppRouting(slug) {
  const appFile = path.join(APPS_DIR, slug, '_src', 'App.tsx');
  if (!fs.existsSync(appFile)) return;

  let content = fs.readFileSync(appFile, 'utf8');
  let changed = false;

  // Change "Not Found" div to actual Index element
  if (content.includes('element={<div>Not Found</div>}')) {
    content = content.replace('element={<div>Not Found</div>}', 'element={<Index />}');
    changed = true;
  }
  
  // Ensure "index" route exists
  if (content.includes('<Routes>') && !content.includes('<Route index')) {
      content = content.replace('<Routes>', '<Routes>\n          <Route index element={<Index />} />');
      changed = true;
  }

  if (changed) {
    fs.writeFileSync(appFile, content);
    console.log(`[Routing Fixed] ${slug}`);
  }
}

const apps = fs.readdirSync(APPS_DIR).filter(f => fs.statSync(path.join(APPS_DIR, f)).isDirectory());
for (const slug of apps) {
  if (slug.startsWith('[') || slug.startsWith('_')) continue;
  fixAppRouting(slug);
}

console.log('Activity internal routing patch complete.');
