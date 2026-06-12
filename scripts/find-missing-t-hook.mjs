import { readdirSync, readFileSync, statSync } from 'fs';
import { join, extname } from 'path';

const SRC = 'src';
const broken = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { walk(full); continue; }
    const ext = extname(entry.name);
    if (ext !== '.tsx' && ext !== '.ts') continue;
    const src = readFileSync(full, 'utf8');
    // Only care about files that import useTranslation
    if (!src.includes('useTranslation')) continue;
    // Check if the hook is actually called: const { t ... } = useTranslation(
    const hookCalled = /const\s*\{[^}]*\bt\b[^}]*\}\s*=\s*useTranslation\s*\(/.test(src)
                    || /const\s*\{[^}]*\bt\b[^}]*\}\s*=\s*useI18nTranslation\s*\(/.test(src);
    // Check if t() is actually used
    const tUsed = /\bt\s*\(/.test(src);
    if (tUsed && !hookCalled) {
      broken.push(full.replace(/\\/g, '/'));
    }
  }
}

walk(SRC);
console.log(`Found ${broken.length} broken file(s):\n`);
broken.forEach(f => console.log(' -', f));
