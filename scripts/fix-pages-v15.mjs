import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

function updatePage(slug, subPath = '') {
  const pageFile = path.join(APPS_DIR, slug, subPath, 'page.tsx');
  if (!fs.existsSync(pageFile)) return;

  let content = fs.readFileSync(pageFile, 'utf8');
  let changed = false;

  // 1. Ensure imports exist
  if (!content.includes('import React from')) {
    content = content.replace('"use client";\n', '"use client";\n\nimport React from "react";\n');
    changed = true;
  }
  if (!content.includes('import dynamic from')) {
    content = content.replace('import React from "react";\n', 'import React from "react";\nimport dynamic from "next/dynamic";\n');
    changed = true;
  }

  // 2. Update the Page signature to Promise
  const oldSignature = 'export default function Page({ params }: { params: { activity?: string } }) {';
  const newSignature = 'export default function Page({ params }: { params: Promise<{ activity?: string }> }) {';
  
  if (content.includes(oldSignature)) {
    content = content.replace(oldSignature, newSignature);
    changed = true;
  }

  // 3. Update the initialPath logic using React.use()
  const isSubActivity = subPath === '[activity]';
  
  if (isSubActivity) {
    const oldLogic = 'const initialPath = params.activity ? `/${params.activity}` : "/";';
    const newLogic = 'const { activity } = React.use(params);\n  const initialPath = activity ? `/${activity}` : "/";';
    if (content.includes(oldLogic)) {
      content = content.replace(oldLogic, newLogic);
      changed = true;
    }
  } else {
    // For root level, use params to avoid Next.js warnings, even if we just extract initialPath
    const oldLogic = 'const initialPath = "/";';
    const newLogic = 'React.use(params);\n  const initialPath = "/";';
    if (content.includes(oldLogic) && !content.includes('React.use(params)')) {
      content = content.replace(oldLogic, newLogic);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(pageFile, content);
    console.log(`[V15 Fixed] ${slug}${subPath ? '/' + subPath : ''}`);
  }
}

const apps = fs.readdirSync(APPS_DIR).filter(f => fs.statSync(path.join(APPS_DIR, f)).isDirectory());
for (const slug of apps) {
  if (slug.startsWith('[') || slug.startsWith('_')) continue;
  updatePage(slug);
  updatePage(slug, '[activity]');
}

console.log('Next.js 15 routing patch complete.');
