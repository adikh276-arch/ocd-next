const { Project, SyntaxKind, Node } = require("ts-morph");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const AZURE_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_REGION = process.env.AZURE_TRANSLATOR_REGION || "eastus";
const AZURE_ENDPOINT = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0";

const LANGUAGES = [
  "en", "es", "fr", "de", "pt", "ru", "zh-Hans", "zh-Hant", "ja", "ko",
  "ar", "hi", "bn", "id", "tr", "vi", "it", "pl", "th", "tl", "nl", "sv",
  "no", "da", "fi", "cs", "el", "ro", "hu", "uk", "he", "ms", "ta", "te", "ur"
];

// JSX props whose string values should be translated
const TRANSLATABLE_ATTRS = new Set([
  "placeholder", "label", "title", "description", "alt",
  "startOverText", "content", "aria-label", "tooltip",
  "buttonText", "submitText", "cancelText", "confirmText",
  "value", "text", "heading", "subheading", "subtitle",
  "message", "errorMessage", "successMessage", "hint",
  "emptyText", "noDataText", "loadingText", "helperText"
]);

// Props to NEVER translate (they are not user-visible text)
const SKIP_ATTRS = new Set([
  "className", "style", "id", "key", "ref", "href", "src",
  "type", "name", "tabIndex", "role", "target", "rel",
  "htmlFor", "onClick", "onChange", "onBlur", "onFocus",
  "onSubmit", "disabled", "readOnly", "required", "checked",
  "defaultValue", "defaultChecked", "autoComplete", "autoFocus",
  "maxLength", "minLength", "min", "max", "step", "pattern",
  "size", "rows", "cols", "multiple", "accept", "capture",
  "encType", "method", "action", "noValidate", "autoPlay",
  "controls", "loop", "muted", "poster", "preload",
  "crossOrigin", "loading", "decoding", "fetchPriority",
  "data-testid", "data-cy", "suppressHydrationWarning",
  "strokeWidth", "stroke", "fill", "viewBox", "xmlns",
  "width", "height", "x", "y", "cx", "cy", "r", "d", "path",
  "points", "transform", "opacity", "className", "style",
  "variant", "size", "asChild", "orientation", "side",
  "align", "sideOffset", "alignOffset", "avoidCollisions",
  "forceMount", "modal", "open", "defaultOpen", "onOpenChange",
  "showHome", "isOpen", "emoji"
]);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "_")
    .substring(0, 60);
}

function isTranslatableString(text) {
  if (!text || typeof text !== "string") return false;
  const trimmed = text.trim();
  if (trimmed.length <= 1) return false;
  // Skip pure numbers, URLs, CSS classes, paths, camelCase identifiers
  if (/^[0-9.,]+$/.test(trimmed)) return false;
  if (/^https?:\/\//.test(trimmed)) return false;
  if (/^\//.test(trimmed) && !trimmed.includes(" ")) return false;
  if (/^[A-Z_]+$/.test(trimmed) && !trimmed.includes(" ")) return false; // ALL_CAPS constants
  if (/^#[0-9A-Fa-f]{3,6}$/.test(trimmed)) return false; // Hex color
  if (/^[0-9A-Fa-f]{6}$/.test(trimmed)) return false; // Hex color without #
  if (trimmed.length < 10 && /^[a-zA-Z0-9]+$/.test(trimmed) && !trimmed.includes(" ")) return false; // Short alphanumeric codes
  if (/^\s*$/.test(trimmed)) return false;
  // Must contain at least one letter
  if (!/[a-zA-Z\u00C0-\u024F\u0400-\u04FF\u0900-\u097F]/.test(trimmed)) return false;
  return true;
}

async function translateText(textMap, targetLangs, srcDir) {
  const translations = {};
  for (const lang of targetLangs) {
    translations[lang] = {};
  }

  const keys = Object.keys(textMap);
  const values = Object.values(textMap);

  if (keys.length === 0) return translations;

  console.log(`Translating up to ${keys.length} keys to ${targetLangs.length} languages...`);

  for (const lang of targetLangs) {
    if (lang === "en") {
      for (let j = 0; j < keys.length; j++) {
        translations["en"][keys[j]] = values[j];
      }
      continue;
    }

    let target = lang;
    if (lang === "tl") target = "fil";
    if (lang === "zh-CN") target = "zh-Hans";
    if (lang === "zh-Hans") target = "zh-Hans";
    if (lang === "zh-Hant") target = "zh-Hant";
    // Azure expects 'pt-br' or 'pt-pt' for portuguese, 'pt' defaults to 'pt-br' in most cases but let's leave it as is, Azure handles standard ISOs.

    // Load existing translations to avoid re-translating
    const filePath = path.join(srcDir, "i18n", `${lang}.json`);
    let existing = {};
    if (fs.existsSync(filePath)) {
      try {
        existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch (e) {}
    }
    
    // Copy existing translations over
    translations[lang] = { ...existing };

    // Find only the keys that are missing
    const missingKeys = keys.filter(k => !(k in existing));
    const missingValues = missingKeys.map(k => textMap[k]);

    if (missingKeys.length === 0) {
      process.stdout.write(`  ✓ ${lang} (cached fully)\n`);
      continue;
    }

    process.stdout.write(`  - ${lang}: ${missingKeys.length} new keys to translate... `);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      for (let i = 0; i < missingValues.length; i += 50) {
        const chunk = missingValues.slice(i, i + 50);
        const chunkKeys = missingKeys.slice(i, i + 50);

        let retries = 0;
        while (retries < 4) {
          try {
            const response = await axios({
              url: `${AZURE_ENDPOINT}&to=${target}`,
              method: "post",
              headers: {
                "Ocp-Apim-Subscription-Key": AZURE_KEY,
                "Ocp-Apim-Subscription-Region": AZURE_REGION,
                "Content-Type": "application/json"
              },
              data: chunk.map(text => ({ text }))
            });
            const results = response.data;
            for (let j = 0; j < results.length; j++) {
              translations[lang][chunkKeys[j]] = results[j].translations[0].text;
            }
            break;
          } catch (err) {
            if (err.response?.status === 429 || err.response?.status === 403) {
              const wait = (retries + 1) * 5000;
              process.stdout.write(` rate-limited on ${lang}, waiting ${wait / 1000}s... `);
              await new Promise(resolve => setTimeout(resolve, wait));
              retries++;
            } else {
              throw err;
            }
          }
        }
      }
      process.stdout.write(`✓\n`);
    } catch (err) {
      console.error(`\n  ✗ ${lang}:`, err.response?.data?.error?.message || err.message);
    }
  }

  return translations;
}

async function processModule(moduleName) {
  const moduleDir = path.join(process.cwd(), "src/app", moduleName);
  const srcDir = path.join(moduleDir, "_src");
  if (!fs.existsSync(srcDir)) {
    console.error(`Module ${moduleName} not found at ${srcDir}`);
    return;
  }

  const project = new Project({ skipAddingFilesFromTsConfig: true });
  project.addSourceFilesAtPaths(path.join(srcDir, "**/*.{ts,tsx}"));

  const translationsEn = {};

  // Load existing en.json to preserve already-extracted keys
  const i18nDir = path.join(srcDir, "i18n");
  const enPath = path.join(i18nDir, "en.json");
  if (fs.existsSync(enPath)) {
    try {
      Object.assign(translationsEn, JSON.parse(fs.readFileSync(enPath, "utf8")));
    } catch (e) {}
  }

  const sourceFiles = project.getSourceFiles();

  for (const sourceFile of sourceFiles) {
    if (sourceFile.getBaseName() === "App.tsx") continue;

    const filePath = sourceFile.getFilePath();
    // Skip shared ui components that shouldn't be modified
    if (filePath.includes("/components/ui/")) continue;
    if (filePath.includes("use-toast")) continue;
    if (filePath.includes(".test.")) continue;
    if (filePath.includes("setup.ts")) continue;
    if (filePath.includes("vite-env")) continue;

    console.log(`  Scanning ${sourceFile.getBaseName()}...`);

    // Only process files that likely contain React components
    const componentsCount = [
      ...sourceFile.getFunctions(),
      ...sourceFile.getVariableStatements()
        .flatMap(v => v.getDeclarations())
        .filter(d => {
          const init = d.getInitializer();
          return init && (
            init.getKind() === SyntaxKind.ArrowFunction ||
            init.getKind() === SyntaxKind.FunctionExpression
          );
        })
    ].length;

    if (componentsCount === 0 && !sourceFile.getText().includes('t("')) {
      console.log(`    Skipping ${sourceFile.getBaseName()} (no components found)`);
      continue;
    }

    let usedT = false;
    const nodesToReplace = [];

    sourceFile.forEachDescendant(node => {
      const kind = node.getKind();

      // 1. JSX Text nodes
      if (kind === SyntaxKind.JsxText) {
        const text = node.getText().trim();
        if (isTranslatableString(text)) {
          const key = slugify(text);
          translationsEn[key] = text;
          nodesToReplace.push({ node, replacement: `{t("${key}")}` });
          usedT = true;
        }
      }

      // 2. JSX String Attribute values
      if (kind === SyntaxKind.JsxAttribute) {
        const nameNode = node.getFirstChildByKind(SyntaxKind.Identifier);
        const attrName = nameNode ? nameNode.getText() : "";
        if (SKIP_ATTRS.has(attrName)) return;

        const initializer = node.getFirstChildByKind(SyntaxKind.StringLiteral);
        if (initializer) {
          const text = initializer.getLiteralValue();
          if (TRANSLATABLE_ATTRS.has(attrName) && isTranslatableString(text)) {
            const key = slugify(text);
            translationsEn[key] = text;
            nodesToReplace.push({ node: initializer, replacement: `{t("${key}")}` });
            usedT = true;
          }
        }
      }

      // 3. String literals in top-level const arrays/objects (data arrays like TIPS, challenges, etc.)
      if (kind === SyntaxKind.StringLiteral) {
        const parent = node.getParent();
        if (!parent) return;
        const parentKind = parent.getKind();

        // Only target string literals that are:
        // - Direct values in array literals
        // - Values of properties in object literals (where the key suggests UI text)
        if (parentKind === SyntaxKind.ArrayLiteralExpression) {
          const text = node.getLiteralValue();
          if (isTranslatableString(text)) {
            const key = slugify(text);
            translationsEn[key] = text;
            nodesToReplace.push({ node, replacement: `t("${key}")` });
            usedT = true;
          }
        }

        if (parentKind === SyntaxKind.PropertyAssignment) {
          const propName = parent.getFirstChildByKind(SyntaxKind.Identifier);
          const pName = propName ? propName.getText() : "";
          const translatableKeys = new Set([
            "label", "title", "description", "text", "content", "heading",
            "subheading", "subtitle", "message", "placeholder", "hint",
            "tooltip", "buttonText", "name", "question", "answer",
            "option", "choice", "step", "tip", "fact", "myth", "quote",
            "difficulty", "category", "tag"
          ]);
          if (translatableKeys.has(pName)) {
            const text = node.getLiteralValue();
            if (isTranslatableString(text)) {
              const key = slugify(text);
              translationsEn[key] = text;
              nodesToReplace.push({ node, replacement: `t("${key}")` });
              usedT = true;
            }
          }
        }
      }
    });

    // Apply replacements in reverse order
    if (nodesToReplace.length > 0) {
      nodesToReplace.reverse().forEach(({ node, replacement }) => {
        try { node.replaceWithText(replacement); } catch (e) {}
      });
      sourceFile.saveSync();
    }

    // Always run pass 2 if the file now contains translation calls
    const hasT = sourceFile.getText().includes('t("');
    if (hasT) {
      const imports = sourceFile.getImportDeclarations();
      const hasHook = imports.some(i => i.getModuleSpecifierValue() === "react-i18next");
      if (!hasHook) {
        sourceFile.addImportDeclaration({
          moduleSpecifier: "react-i18next",
          namedImports: ["useTranslation"]
        });
      }

      const components = [
        ...sourceFile.getFunctions(),
        ...sourceFile.getVariableStatements()
          .flatMap(v => v.getDeclarations())
          .filter(d => {
            const init = d.getInitializer();
            return init && (
              init.getKind() === SyntaxKind.ArrowFunction ||
              init.getKind() === SyntaxKind.FunctionExpression
            );
          })
          .map(d => d.getInitializer())
      ];

      // Find all top-level constants that now use t()
      const vars = sourceFile.getVariableStatements();
      const globalConstantsToMove = vars
        .filter(v => v.getText().includes('t("'))
        .filter(v => v.getParent() === sourceFile)
        .filter(v => {
          return v.getDeclarations().some(d => {
            const init = d.getInitializer();
            if (!init) return false;
            const kind = init.getKind();
            return kind === SyntaxKind.ArrayLiteralExpression || kind === SyntaxKind.ObjectLiteralExpression;
          });
        });

      if (components.length > 0) {
        // Collect constants that need moving
        const constantsToMove = globalConstantsToMove.map(v => ({
          statement: v,
          text: v.getText() + "\n  ",
          name: v.getDeclarations()[0].getName()
        }));

        // Remove them from global scope
        globalConstantsToMove.forEach(v => v.remove());

        // For each component, check which constants it uses and insert them
        components.forEach(comp => {
          const body = comp.getBody();
          if (body && body.getKind() === SyntaxKind.Block) {
            const bodyText = body.getText();
            
            // Remove existing hook if present
            const statements = body.getStatements();
            const existingHook = statements.find(s => s.getText().includes("const { t } = useTranslation"));
            if (existingHook) existingHook.remove();

            // Insert hook at top
            body.insertStatements(0, `const { t } = useTranslation("${moduleName}");`);

            // Find constants used in this component
            const usedConstants = constantsToMove.filter(c => bodyText.includes(c.name));
            if (usedConstants.length > 0) {
              const movedContent = usedConstants.map(c => c.text).join("");
              body.insertStatements(1, movedContent);
            }
          }
        });
      }
      sourceFile.saveSync();
    }
  }

  if (Object.keys(translationsEn).length > 0) {
    if (!fs.existsSync(i18nDir)) fs.mkdirSync(i18nDir, { recursive: true });

    console.log(`  → Extracted ${Object.keys(translationsEn).length} strings total`);
    const allTranslations = await translateText(translationsEn, LANGUAGES, srcDir);

    for (const lang of LANGUAGES) {
      const filePath = path.join(i18nDir, `${lang}.json`);
      fs.writeFileSync(filePath, JSON.stringify(allTranslations[lang] || {}, null, 2));
    }
    console.log(`  ✓ Saved ${LANGUAGES.length} locale files`);
  } else {
    console.log(`  (no strings found in ${moduleName})`);
  }
}

const moduleName = process.argv[2];
if (moduleName) {
  processModule(moduleName).catch(console.error);
} else {
  console.log("Usage: node scripts/i18n-tool.js <module_name>");
}
