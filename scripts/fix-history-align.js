const fs = require('fs');
const file = './src/app/urge_surfing/_src/components/urge-surfing/UrgeSurfingActivity.tsx';
let content = fs.readFileSync(file, 'utf8');

// Move ActivityHistoryDrawer inside the inner div
content = content.replace(
    /<div className="min-h-screen bg-background flex justify-center relative">([\s\S]*?)<div className="absolute top-4 right-4 z-50">([\s\S]*?)<\/div>([\s\S]*?)<div className="w-full max-w-\[390px\] bg-card min-h-screen relative">/,
    '<div className="min-h-screen bg-background flex justify-center">\n      <div className="w-full max-w-[390px] bg-card min-h-screen relative">\n        <div className="absolute top-4 right-4 z-50">\n$2        </div>'
);

fs.writeFileSync(file, content);
console.log('Fixed History button alignment.');
