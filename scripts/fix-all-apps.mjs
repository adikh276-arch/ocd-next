import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const APPS_DIR = path.join(rootDir, 'src/app');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

function fixFile(slug, appFile) {
  let content = fs.readFileSync(appFile, 'utf8');
  let changed = false;

  // 1. Injects initialPath prop into App component if not present (only for App.tsx)
  if (appFile.endsWith('App.tsx') && content.includes('const App = () =>')) {
    content = content.replace('const App = () =>', 'const App = ({ initialPath }: { initialPath?: string }) =>');
    changed = true;
  }

  // 2. Wrap MemoryRouter with initialEntries (only for App.tsx usually)
  if (content.includes('<MemoryRouter')) {
    if (!content.includes('initialEntries=')) {
        content = content.replace(/<MemoryRouter([^>]*)>/, '<MemoryRouter$1 initialEntries={[initialPath || "/"]}>');
        changed = true;
    }
  }

  // 3. Ensure theme class is on the outer wrapper and has 'isolate' (App.tsx)
  const themeClass = `theme-${slug}`;
  if (appFile.endsWith('App.tsx')) {
      if (!content.includes(themeClass)) {
          content = content.replace(/<div className="([^"]*)"/, `<div className="$1 ${themeClass} isolate"`);
          changed = true;
      } else if (!content.includes('isolate')) {
           content = content.replace(themeClass, `${themeClass} isolate`);
           changed = true;
      }
  }

  // 4. Fix "Handshake" auth to prevent redirects in Dev
  const redirectTarget = 'window.location.href = "https://mantracare.com/token"';
  const patchedRedirect = 'if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") { window.location.href = "https://mantracare.com/token"; } else { console.warn("Dev Mode: Bypassing auth redirect"); if (typeof setIsAuthenticating === "function") setIsAuthenticating(false); if (typeof setLoading === "function") setLoading(false); }';
  
  if (content.includes(redirectTarget)) {
      content = content.split(redirectTarget).join(patchedRedirect);
      changed = true;
  }

  // 5. Replace Vite env vars with process.env
  if (content.includes('import.meta.env.VITE_')) {
      content = content.replace(/import\.meta\.env\.VITE_/g, 'process.env.NEXT_PUBLIC_');
      changed = true;
  }

  // 6. Standardize User ID key (ocd_user_id -> user_id)
  if (content.includes("'ocd_user_id'") || content.includes('"ocd_user_id"')) {
      content = content.replace(/['"]ocd_user_id['"]/g, "'user_id'");
      changed = true;
  }

  if (changed) {
    fs.writeFileSync(appFile, content);
    console.log(`Patched: ${path.relative(rootDir, appFile)}`);
  }
}

const apps = fs.readdirSync(APPS_DIR).filter(f => fs.statSync(path.join(APPS_DIR, f)).isDirectory());

for (const slug of apps) {
  if (slug.startsWith('[') || slug.startsWith('_')) continue;
  
  const srcDir = path.join(APPS_DIR, slug, '_src');
  if (!fs.existsSync(srcDir)) continue;

  const files = getAllFiles(srcDir);
  for (const file of files) {
    fixFile(slug, file);
  }
}

console.log('Universal Fix Complete.');
