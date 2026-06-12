import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

function auditAppContent(slug) {
  const appFile = path.join(APPS_DIR, slug, '_src', 'App.tsx');
  if (!fs.existsSync(appFile)) return null;

  const content = fs.readFileSync(appFile, 'utf8');
  const indexFile = path.join(APPS_DIR, slug, '_src', 'pages', 'Index.tsx');
  
  let issues = [];

  // Check if it's using the Placeholder Index
  if (fs.existsSync(indexFile)) {
    const indexContent = fs.readFileSync(indexFile, 'utf8');
    if (indexContent.includes('PlaceholderIndex') || indexContent.includes('lovable-blank-page-placeholder')) {
      // Check if there are other pages available
      const pagesDir = path.join(APPS_DIR, slug, '_src', 'pages');
      const otherPages = fs.readdirSync(pagesDir).filter(f => f !== 'Index.tsx' && f.endsWith('.tsx'));
      
      if (otherPages.length > 0) {
        issues.push(`Activity loads Placeholder Index but has real pages available: ${otherPages.join(', ')}`);
      } else {
        issues.push(`Activity is entirely a placeholder (no real content pages found).`);
      }
    }
  }

  return issues.length > 0 ? { slug, issues } : null;
}

const apps = fs.readdirSync(APPS_DIR).filter(f => fs.statSync(path.join(APPS_DIR, f)).isDirectory());
const reports = [];

for (const slug of apps) {
  if (slug.startsWith('[') || slug.startsWith('_')) continue;
  const report = auditAppContent(slug);
  if (report) reports.push(report);
}

if (reports.length > 0) {
  console.log('--- CONTENT AUDIT REPORT ---');
  reports.forEach(r => {
    console.log(`[${r.slug.toUpperCase()}]`);
    r.issues.forEach(issue => console.log(`  - ${issue}`));
  });
} else {
  console.log('No content issues found.');
}
