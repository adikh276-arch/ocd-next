const fs = require('fs');
const path = require('path');

const localesDir = path.join(process.cwd(), 'public', 'locales');
const missingKeys = {
  grounded_techniques: {
    "Grounding techniques help bring your attention back to the present moment.": "Grounding techniques help bring your attention back to the present moment.",
    "Choose one activity that feels supportive right now.": "Choose one activity that feels supportive right now."
  },
  mirror_moments: {
    common: {
      close: "Close"
    }
  },
  one_thing_out: {
    "Saving...": "Saving...",
    "Therapeutic Simple": "Therapeutic Simple",
    "One item. One day. One small act of letting go.": "One item. One day. One small act of letting go.",
    "Not about decluttering. About practicing the feeling of release.": "Not about decluttering. About practicing the feeling of release.",
    "THE DISCOVERY": "THE DISCOVERY",
    "SELF-REFLECTION": "SELF-REFLECTION",
    "e.g. old charger, magazine...": "e.g. old charger, magazine...",
    "THE CLOSURE": "THE CLOSURE",
    "Day 1 of your journey": "Day 1 of your journey",
    "Complete the Act →": "Complete the Act →",
    "STRENGTH DISCOVERED": "STRENGTH DISCOVERED",
    "Every small step counts.": "Every small step counts."
  }
};

function deepMerge(target, source) {
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (typeof source[key] === 'object' && source[key] !== null) {
        if (!target[key]) target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        if (!target[key]) {
          target[key] = source[key];
        }
      }
    }
  }
}

try {
  const dirs = fs.readdirSync(localesDir);
  for (const dir of dirs) {
    const translationPath = path.join(localesDir, dir, 'translation.json');
    if (fs.existsSync(translationPath)) {
      const data = JSON.parse(fs.readFileSync(translationPath, 'utf8'));
      deepMerge(data, missingKeys);
      fs.writeFileSync(translationPath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Updated translation in ${dir}`);
    }
  }
} catch (e) {
  console.error('Error updating translations:', e);
}
