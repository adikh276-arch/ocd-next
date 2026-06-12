import fs from 'fs';
import path from 'path';

const files = [
  'src/app/self_compassion/_src/pages/Index.tsx',
  'src/app/thought_truth/_src/pages/Index.tsx'
];

files.forEach(p => {
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  
  if (p.includes('self_compassion')) {
    c = c.replace(/const Index = \(\) => \{[^}]*return (<[^/]* \/>);[^}]*\};/, (m, comp) => {
      return `const Index = () => (
  <div className="flex flex-col min-h-screen">
    ${comp}
    <div className="mt-auto py-8">
      <ShareActivity />
    </div>
  </div>
);`;
    });
  } else if (p.includes('thought_truth')) {
    c = c.replace(/const Index = \(\) => (<[^/]* \/>);/, (m, comp) => {
      return `const Index = () => (
  <div className="flex flex-col min-h-screen">
    ${comp}
    <div className="mt-auto py-8">
      <ShareActivity />
    </div>
  </div>
);`;
    });
  }
  
  fs.writeFileSync(p, c);
  console.log(`Updated ${p}`);
});
