/**
 * Scan all component files for undefined components (Button, Input, etc.)
 * and add the missing imports from the shared UI library.
 */
const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = dir + '/' + file;
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(fullPath));
      } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        results.push(fullPath);
      }
    });
  } catch (e) {}
  return results;
}

// UI components and their source paths
// These are the shared components in src/components/ui/
const sharedComponents = {
  'Button': '@/components/ui/button',
  'Input': '@/components/ui/input',
  'Textarea': '@/components/ui/textarea',
  'Label': '@/components/ui/label',
  'Badge': '@/components/ui/badge',
  'Card': '@/components/ui/card',
  'CardContent': '@/components/ui/card',
  'CardHeader': '@/components/ui/card',
  'CardTitle': '@/components/ui/card',
  'CardDescription': '@/components/ui/card',
  'CardFooter': '@/components/ui/card',
  'Dialog': '@/components/ui/dialog',
  'DialogContent': '@/components/ui/dialog',
  'DialogHeader': '@/components/ui/dialog',
  'DialogTitle': '@/components/ui/dialog',
  'Progress': '@/components/ui/progress',
  'Slider': '@/components/ui/slider',
  'Switch': '@/components/ui/switch',
  'Select': '@/components/ui/select',
  'SelectContent': '@/components/ui/select',
  'SelectItem': '@/components/ui/select',
  'SelectTrigger': '@/components/ui/select',
  'SelectValue': '@/components/ui/select',
  'Tabs': '@/components/ui/tabs',
  'TabsContent': '@/components/ui/tabs',
  'TabsList': '@/components/ui/tabs',
  'TabsTrigger': '@/components/ui/tabs',
  'Separator': '@/components/ui/separator',
  'ScrollArea': '@/components/ui/scroll-area',
  'Avatar': '@/components/ui/avatar',
  'AvatarImage': '@/components/ui/avatar',
  'AvatarFallback': '@/components/ui/avatar',
  'Skeleton': '@/components/ui/skeleton',
  'Alert': '@/components/ui/alert',
  'AlertDescription': '@/components/ui/alert',
  'AlertTitle': '@/components/ui/alert',
  'Tooltip': '@/components/ui/tooltip',
  'TooltipContent': '@/components/ui/tooltip',
  'TooltipProvider': '@/components/ui/tooltip',
  'TooltipTrigger': '@/components/ui/tooltip',
  'Sheet': '@/components/ui/sheet',
  'SheetContent': '@/components/ui/sheet',
  'SheetHeader': '@/components/ui/sheet',
  'SheetTitle': '@/components/ui/sheet',
  'Checkbox': '@/components/ui/checkbox',
  'RadioGroup': '@/components/ui/radio-group',
  'RadioGroupItem': '@/components/ui/radio-group',
  'DropdownMenu': '@/components/ui/dropdown-menu',
  'DropdownMenuContent': '@/components/ui/dropdown-menu',
  'DropdownMenuItem': '@/components/ui/dropdown-menu',
  'DropdownMenuTrigger': '@/components/ui/dropdown-menu',
};

const files = walk('src/app');
let fixedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let modified = false;

  // Group missing imports by source
  const missingBySource = {};

  for (const [componentName, sourcePath] of Object.entries(sharedComponents)) {
    // Check if component is used as JSX
    const usedAsJSX = new RegExp(`<${componentName}[\\s/>]`).test(content);
    if (!usedAsJSX) continue;

    // Check if it's already imported
    const alreadyImported = new RegExp(`import.*\\b${componentName}\\b.*from`).test(content);
    if (alreadyImported) continue;

    // Need to add import
    if (!missingBySource[sourcePath]) {
      missingBySource[sourcePath] = [];
    }
    missingBySource[sourcePath].push(componentName);
  }

  if (Object.keys(missingBySource).length === 0) return;

  // Build import statements to add
  let importsToAdd = '';
  for (const [source, components] of Object.entries(missingBySource)) {
    // Check if there's already an import from this source
    const existingMatch = content.match(new RegExp(`import\\s*\\{([^}]+)\\}\\s*from\\s*['"]${source.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`));
    if (existingMatch) {
      // Add to existing import
      const existing = existingMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      const merged = [...new Set([...existing, ...components])].sort().join(', ');
      content = content.replace(existingMatch[0], `import { ${merged} } from '${source}'`);
      modified = true;
    } else {
      importsToAdd += `import { ${components.sort().join(', ')} } from '${source}';\n`;
    }
  }

  if (importsToAdd) {
    // Add after last import line
    const lastImportMatch = content.match(/(^import .+$\n)+/m);
    if (lastImportMatch) {
      content = content.replace(lastImportMatch[0], lastImportMatch[0] + importsToAdd);
    } else {
      content = importsToAdd + content;
    }
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(f, content);
    console.log(`Fixed missing UI imports in: ${f}`);
    fixedCount++;
  }
});

console.log(`\nFixed ${fixedCount} files.`);
