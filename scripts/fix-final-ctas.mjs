import fs from 'fs';

// Fix OcdCycle.tsx - add ShareActivity import and conditional render on mantra screen
const cyclePath = 'src/app/ocd_cycle/_src/components/OcdCycle.tsx';
let c = fs.readFileSync(cyclePath, 'utf8');
if (!c.includes('ShareActivity')) {
  c = c.replace(
    "import { Brain, Zap, RefreshCw, Heart } from \"lucide-react\";",
    "import { Brain, Zap, RefreshCw, Heart } from \"lucide-react\";\nimport { ShareActivity } from '@/components/ShareActivity';"
  );
  c = c.replace(
    '{/* Bottom button */}',
    '{/* Share CTA on final mantra screen */}\n      {isMantra && <div className="w-full mb-3"><ShareActivity /></div>}\n\n      {/* Bottom button */}'
  );
  fs.writeFileSync(cyclePath, c);
  console.log('Fixed ocd_cycle ShareActivity');
} else {
  console.log('ocd_cycle already has ShareActivity');
}

// Fix letter_to_ocd - check if it renders <ShareActivity or just imports it
const letterPath = 'src/app/letter_to_ocd/_src/components/DearOCD.tsx';
let l = fs.readFileSync(letterPath, 'utf8');
if (!l.includes('<ShareActivity')) {
  // Find where Screen3 CTAs are and inject before them
  l = l.replace(
    '<div className="mt-auto flex flex-col gap-3">',
    '<div className="mb-6"><ShareActivity /></div>\n    <div className="mt-auto flex flex-col gap-3">'
  );
  fs.writeFileSync(letterPath, l);
  console.log('Fixed letter_to_ocd ShareActivity render');
} else {
  console.log('letter_to_ocd already renders ShareActivity');
}
