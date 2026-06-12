const fs = require('fs');
const path = require('path');

const appsDir = './src/app';

function getAppSlugs() {
  return fs.readdirSync(appsDir).filter(file => {
    return fs.statSync(path.join(appsDir, file)).isDirectory();
  });
}

const slugs = getAppSlugs();

slugs.forEach(slug => {
  const appPath = path.join(appsDir, slug, '_src', 'App.tsx');
  const pagesDir = path.join(appsDir, slug, '_src', 'pages');

  if (!fs.existsSync(appPath)) {
    console.log(`Skipping ${slug} - no App.tsx found`);
    return;
  }

  // Determine pages to route
  let extraRoutes = [];
  let extraImports = [];
  if (fs.existsSync(pagesDir)) {
    const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx') && f !== 'Index.tsx' && f !== 'NotFound.tsx');
    pages.forEach(page => {
      const pageName = page.replace('.tsx', '');
      let routePath = pageName.toLowerCase().replace(/_/g, '-');
      
      // Special override for common patterns
      if (pageName === 'TechniqueDetail') routePath = 'technique/:id';
      if (pageName === 'ContaminationOCD') routePath = 'contaminationocd';
      if (pageName === 'WhatIsPureO') routePath = 'whatispureo';
      if (pageName === 'HomePage') routePath = 'homepage';

      extraImports.push(`import ${pageName} from "./pages/${pageName}";`);
      extraRoutes.push(`          <Route path="/${routePath}" element={<${pageName} />} />`);
    });
  }

  const template = `import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Index from "./pages/Index";
${extraImports.join('\n')}
import "@/lib/i18n";
import "./index.css";

const App = ({ initialPath }: { initialPath?: string }) => {
  const { t } = useTranslation(undefined, { keyPrefix: '${slug}' });
  
  return (
    <div className="theme-${slug} isolate min-h-[100dvh] bg-background text-foreground">
      <MemoryRouter initialEntries={[initialPath || "/"]}>
        <Routes>
          <Route path="/" element={<Index />} />
${extraRoutes.join('\n')}
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;`;

  fs.writeFileSync(appPath, template);
  console.log(`Successfully standardized ${slug}`);
});

console.log('All 42 apps processed.');
