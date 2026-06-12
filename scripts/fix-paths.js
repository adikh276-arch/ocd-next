const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if (file.endsWith('.ts') || file.endsWith('.tsx')) results.push(file);
  });
  return results;
}

const files = walk(path.join(process.cwd(), 'src'));
let modified = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Replace fetch calls
  content = content.replace(/fetch\(['"]\/(api\/logs)/g, "fetch('/ocd/$1");
  content = content.replace(/fetch\([`]\/(api\/logs)/g, "fetch(`/ocd/$1");
  content = content.replace(/fetch\(['"]\/(api\/users\/initialize)/g, "fetch('/ocd/$1");

  // Replace root redirections
  content = content.replace(/window\.location\.href\s*=\s*(['"])\/\1/g, "window.location.href = $1/ocd$1");

  if (content !== original) {
    fs.writeFileSync(file, content);
    modified++;
    console.log('Updated ' + file);
  }
});

console.log('Modified ' + modified + ' files.');
