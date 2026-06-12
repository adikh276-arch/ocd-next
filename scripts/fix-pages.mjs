import fs from 'fs';
import path from 'path';

const APPS_DIR = './src/app';

function updatePage(slug, subPath = '') {
  const pageFile = path.join(APPS_DIR, slug, subPath, 'page.tsx');
  if (!fs.existsSync(pageFile)) return;

  let content = fs.readFileSync(pageFile, 'utf8');

  // Update Page function to accept { params }
  if (content.includes('export default function Page() {')) {
    const isSubActivity = subPath === '[activity]';
    const initialPathDecl = isSubActivity 
      ? 'const initialPath = params.activity ? `/${params.activity}` : "/";'
      : 'const initialPath = "/";';
    
    content = content.replace(
      'export default function Page() {', 
      'export default function Page({ params }: { params: { activity?: string } }) {'
    );
    content = content.replace(
      'return <App />;', 
      `${initialPathDecl}\n  return <App initialPath={initialPath} />;`
    );
  }

  fs.writeFileSync(pageFile, content);
  console.log(`Fixed ${slug}${subPath ? '/' + subPath : ''}`);
}

const apps = fs.readdirSync(APPS_DIR).filter(f => fs.statSync(path.join(APPS_DIR, f)).isDirectory());
for (const slug of apps) {
  if (slug.startsWith('[') || slug.startsWith('_')) continue;
  updatePage(slug);
  updatePage(slug, '[activity]');
}
