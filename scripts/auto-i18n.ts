import { Project, SyntaxKind, JsxText, StringLiteral, FunctionDeclaration, ArrowFunction, Node } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

const project = new Project();

// Change to your target app for testing
const appName = process.argv[2] || 'calm-space-visualizer';
const basePath = path.join(process.cwd(), `src/app/${appName}/_src`);
const publicLocalePath = path.join(process.cwd(), `public/${appName}/locales/en`);

if (!fs.existsSync(publicLocalePath)) {
  fs.mkdirSync(publicLocalePath, { recursive: true });
}

project.addSourceFilesAtPaths(`${basePath}/**/*.{tsx,ts}`);

let dictionary: Record<string, string> = {};
const dictPath = path.join(publicLocalePath, 'translation.json');

if (fs.existsSync(dictPath)) {
  dictionary = JSON.parse(fs.readFileSync(dictPath, 'utf8'));
}

const generateKey = (text: string) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .substring(0, 30);
};

const sourceFiles = project.getSourceFiles();

sourceFiles.forEach(sourceFile => {
  // Skip if already has useTranslation
  if (sourceFile.getImportDeclaration(imp => imp.getModuleSpecifierValue() === 'react-i18next')) {
    return;
  }

  let modified = false;

  // Find JsxText
  const jsxTexts = sourceFile.getDescendantsOfKind(SyntaxKind.JsxText);
  jsxTexts.forEach(jsxText => {
    const text = jsxText.getLiteralText();
    if (text.trim().length > 1) {
      const key = generateKey(text);
      if(!key) return;
      dictionary[key] = text.trim();
      jsxText.replaceWithText(`{t('${key}')}`);
      modified = true;
    }
  });

  // Find StringLiteral in JsxAttributes (like placeholder="Something")
  const jsxAttributes = sourceFile.getDescendantsOfKind(SyntaxKind.JsxAttribute);
  jsxAttributes.forEach(attr => {
    const name = attr.getNameNode().getText();
    if (['placeholder', 'title', 'label'].includes(name)) {
      const init = attr.getInitializer();
      if (init && Node.isStringLiteral(init)) {
        const text = init.getLiteralValue();
        if (text.trim().length > 1) {
          const key = generateKey(text);
          if(!key) return;
          dictionary[key] = text.trim();
          attr.setInitializer(`{t('${key}')}`);
          modified = true;
        }
      }
    }
  });

  if (modified) {
    // Add import
    sourceFile.addImportDeclaration({
      namedImports: ['useTranslation'],
      moduleSpecifier: 'react-i18next',
    });

    // Find main functional component to inject `const { t } = useTranslation();`
    // We'll look for ArrowFunctions or FunctionDeclarations that return JSX
    const addHookToScope = (node: Node) => {
      if (Node.isArrowFunction(node) || Node.isFunctionDeclaration(node) || Node.isFunctionExpression(node)) {
         const body = node.getBody();
         if (Node.isBlock(body)) {
            const hasT = body.getVariableStatement(v => v.getText().includes('t = useTranslation'));
            if (!hasT) {
              body.insertStatements(0, 'const { t } = useTranslation();');
            }
         }
      }
    };

    // Find the default export first
    const defaultExport = sourceFile.getDefaultExportSymbol();
    if (defaultExport && defaultExport.getValueDeclaration()) {
       addHookToScope(defaultExport.getValueDeclaration()!);
    } else {
       // Just grab the first component-looking function
       const functions = sourceFile.getDescendantsOfKind(SyntaxKind.ArrowFunction);
       if(functions.length > 0) addHookToScope(functions[0]);
    }
  }
});

// Save changes
project.saveSync();
fs.writeFileSync(dictPath, JSON.stringify(dictionary, null, 2));

console.log(`Processed ${appName}. Dictionary saved with ${Object.keys(dictionary).length} keys.`);
