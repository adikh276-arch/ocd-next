/**
 * Restore all App.tsx files for multi-page apps.
 * My standardize-apps.js replaced them with a single-route template.
 * Now I need to auto-detect the extra pages and add them back.
 */

const fs = require('fs');
const path = require('path');

const appsDir = path.join('src', 'app');

const apps = fs.readdirSync(appsDir).filter(a => {
  const s = fs.statSync(path.join(appsDir, a));
  return s.isDirectory();
});

apps.forEach(appSlug => {
  const pagesDir = path.join(appsDir, appSlug, '_src', 'pages');
  if (!fs.existsSync(pagesDir)) return;

  const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx') && f !== 'Index.tsx');
  if (pageFiles.length === 0) return; // Only Index.tsx, no extra routes needed

  const appFile = path.join(appsDir, appSlug, '_src', 'App.tsx');
  if (!fs.existsSync(appFile)) return;

  let currentContent = fs.readFileSync(appFile, 'utf8');

  // Build up the extra page imports and routes
  const extraImports = [];
  const extraRoutes = [];

  pageFiles.forEach(pageFile => {
    const pageName = path.basename(pageFile, '.tsx');
    if (pageName === 'NotFound') return; // Skip NotFound, handled as * route

    // Check if this page is already imported
    if (currentContent.includes(`import ${pageName}`)) return;

    // Guess the route path from the page name
    let routePath = '/' + pageName.toLowerCase().replace(/_/g, '-');
    
    // Special cases we know about
    if (pageName === 'TechniqueDetail') routePath = '/technique/:id';

    extraImports.push(`import ${pageName} from "./pages/${pageName}";`);
    extraRoutes.push(`          <Route path="${routePath}" element={<${pageName} />} />`);
  });

  if (extraImports.length === 0) return;

  console.log(`Restoring routes for ${appSlug}: ${pageFiles.map(f => path.basename(f, '.tsx')).join(', ')}`);

  // Add imports after the Index import
  currentContent = currentContent.replace(
    'import Index from "./pages/Index";',
    'import Index from "./pages/Index";\n' + extraImports.join('\n')
  );

  // Add routes before the catch-all * route
  currentContent = currentContent.replace(
    '          <Route path="*" element={<div>Not Found</div>} />',
    extraRoutes.join('\n') + '\n          <Route path="*" element={<div>Not Found</div>} />'
  );

  fs.writeFileSync(appFile, currentContent);
  console.log(`  -> Updated ${appFile}`);
});

console.log('\nDone restoring multi-page routes!');
