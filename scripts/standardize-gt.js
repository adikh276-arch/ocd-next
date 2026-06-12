const fs = require('fs');
const path = require('path');

const files = [
  './src/app/grounded_techniques/_src/pages/Index.tsx',
  './src/app/grounded_techniques/_src/pages/TechniqueDetail.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace custom import with standard one
  content = content.replace(
    /import \{ useTranslation \} from ["'](\.\.\/hooks\/useTranslation|@\/app\/grounded_techniques\/_src\/hooks\/useTranslation)["'];/g,
    'import { useTranslation } from "react-i18next";'
  );

  // Update useTranslation call to include keyPrefix
  content = content.replace(
    /const \{ t, currentLang, changeLang \} = useTranslation\(\);/g,
    "const { t } = useTranslation(undefined, { keyPrefix: 'grounded_techniques' });"
  );
  
  // Replace currentLang usage (global detector handles this now)
  content = content.replace(/currentLang/g, 'i18n.language');
  
  // Ensure i18n is available if used
  if (content.includes('i18n.language') && !content.includes(', i18n } = useTranslation')) {
      content = content.replace('const { t } = useTranslation', 'const { t, i18n } = useTranslation');
  }

  fs.writeFileSync(file, content);
  console.log(`Standardized translation hook in ${file}`);
});
