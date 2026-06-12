import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

function injectReact(slug, subPath = '') {
  const pageFile = path.join(APPS_DIR, slug, subPath, 'page.tsx');
  if (!fs.existsSync(pageFile)) return;

  let content = fs.readFileSync(pageFile, 'utf8');
  let changed = false;

  // We need to reliably add `import React from "react";` and `import dynamic from 'next/dynamic';`
  // if they don't exist.
  
  const lines = content.split('\n');
  
  if (!content.includes('import React from')) {
    // Find the first line after "use client"
    const useClientIndex = lines.findIndex(l => l.includes('use client'));
    if (useClientIndex !== -1) {
       lines.splice(useClientIndex + 1, 0, 'import React from "react";');
       changed = true;
    } else {
       // If no use client, put at very top
       lines.unshift('import React from "react";');
       changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(pageFile, lines.join('\n'));
    console.log(`[React Import Fixed] ${slug}${subPath ? '/' + subPath : ''}`);
  }
}

const apps = fs.readdirSync(APPS_DIR).filter(f => fs.statSync(path.join(APPS_DIR, f)).isDirectory());
for (const slug of apps) {
  if (slug.startsWith('[') || slug.startsWith('_')) continue;
  injectReact(slug);
  injectReact(slug, '[activity]');
}

console.log('React import global injection complete.');
