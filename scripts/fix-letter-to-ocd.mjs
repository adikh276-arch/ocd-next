import fs from 'fs';
const p = 'src/app/letter_to_ocd/_src/components/DearOCD.tsx';
let c = fs.readFileSync(p, 'utf8');

// 1. Pass 't' to sub-components in the main render
c = c.replace(/<Screen1 onStart/g, '<Screen1 t={t} onStart');
c = c.replace(/<Screen2\s+letter/g, '<Screen2 t={t} letter');
c = c.replace(/<Screen3\s+letter/g, '<Screen3 t={t} letter');
c = c.replace(/<Screen4\s+sessions/g, '<Screen4 t={t} sessions');

// 2. Add 't' to sub-component definitions
c = c.replace(/const Screen1 = \({([^}]*)}\)/g, 'const Screen1 = ({ t, $1 })');
c = c.replace(/const Screen2 = \({([^}]*)}\)/g, 'const Screen2 = ({ t, $1 })');
c = c.replace(/const Screen3 = \({([^}]*)}\)/g, 'const Screen3 = ({ t, $1 })');
c = c.replace(/const Screen4 = \({([^}]*)}\)/g, 'const Screen4 = ({ t, $1 })');

// 3. Inject ShareActivity into Screen3
if (!c.includes('ShareActivity')) {
  c = "import { ShareActivity } from '@/components/ShareActivity';\n" + c;
}

const screen3EndMarker = 'style={{ fontSize: 12, color: \"#3a4828\", lineHeight: 1.8 }}\n      >\n        {t(\'writing_this_took_courage_ever\')}</p>\n    </div>';
const replacement = screen3EndMarker + '\n\n    <div className=\"mb-6\">\n      <ShareActivity />\n    </div>';
c = c.replace(screen3EndMarker, replacement);

fs.writeFileSync(p, c);
console.log('Updated ' + p);
