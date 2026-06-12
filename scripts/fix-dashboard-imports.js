const fs = require('fs');
const path = require('path');

const componentsDir = path.join(process.cwd(), 'src/app/dashboard_components');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // 1. Fix react-router to next/navigation
      content = content.replace(/from "react-router"/g, 'from "next/navigation"');
      content = content.replace(/from 'react-router'/g, "from 'next/navigation'");
      
      // 2. Fix useNavigate to useRouter
      if (content.includes('useNavigate')) {
        content = content.replace(/useNavigate/g, 'useRouter');
        content = content.replace(/const navigate = useRouter\(\)/g, 'const router = useRouter()');
        content = content.replace(/navigate\(/g, 'router.push(');
      }
      
      // 3. Fix data paths (assuming components are in dashboard_components/ and data in dashboard_data/)
      // If a component was in src/app/components and data was in src/app/data, the import was ../data
      // Now components are in src/app/dashboard_components and data in src/app/dashboard_data, so it's still ../dashboard_data
      content = content.replace(/from "\.\.\/data\//g, 'from "../dashboard_data/');
      content = content.replace(/from '\.\.\/data\//g, "from '../dashboard_data/");
      
      // 4. Fix assets path (figma:asset/ -> /dashboard_assets/)
      // Convert imports to constant strings pointing to the public folder
      content = content.replace(/import (\w+) from "figma:asset\/([\w.]+)"/g, 'const $1 = "/dashboard_assets/$2"');
      content = content.replace(/import (\w+) from 'figma:asset\/([\w.]+)'/g, "const $1 = '/dashboard_assets/$2'");
      
      // 5. Fix motion/react to framer-motion
      content = content.replace(/from "motion\/react"/g, 'from "framer-motion"');
      content = content.replace(/from 'motion\/react'/g, "from 'framer-motion'");

      // 6. Fix Link component (if any) from react-router to next/link
      if (content.includes('import { Link } from "next/navigation"')) {
          content = content.replace(/import { (.*)Link(.*) } from "next\/navigation"/, 'import { $1Link$2 } from "next/link"');
      }
      
      fs.writeFileSync(filePath, content);
    }
  });
}

console.log('Starting import fix script...');
processDirectory(componentsDir);
console.log('Import fix script completed.');
