import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

function auditPage(slug, subPath = '') {
  const pageFile = path.join(APPS_DIR, slug, subPath, 'page.tsx');
  if (!fs.existsSync(pageFile)) return;

  let content = fs.readFileSync(pageFile, 'utf8');
  let changed = false;

  // 1. Ensure React import
  if (!content.includes('import React from "react"')) {
    content = content.replace('"use client";', '"use client";\nimport React from "react";');
    changed = true;
  }

  // 2. Ensure params: Promise
  if (content.includes('params: { activity?: string }')) {
    content = content.replace('params: { activity?: string }', 'params: Promise<{ activity?: string }>');
    changed = true;
  }

  // 3. Ensure React.use(params)
  if (!content.includes('React.use(params)')) {
    // Inject at start of function
    content = content.replace(' {', ' {\n  React.use(params);');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(pageFile, content);
    console.log(`[Re-Audited] ${slug}${subPath ? '/' + subPath : ''}`);
  }
}

const apps = fs.readdirSync(APPS_DIR).filter(f => fs.statSync(path.join(APPS_DIR, f)).isDirectory());
for (const slug of apps) {
  if (slug.startsWith('[') || slug.startsWith('_')) continue;
  auditPage(slug);
  auditPage(slug, '[activity]');
}

console.log('Page wrapper final audit complete.');
