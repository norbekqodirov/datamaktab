// Script to replace all image references to .webp in source files
import fs from 'fs';
import path from 'path';

const srcDir = './src';

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const updated = content
        .replaceAll('/maktab.jpg', '/maktab.webp')
        .replaceAll('/students-hero.png', '/students-hero.webp');
      if (updated !== content) {
        fs.writeFileSync(fullPath, updated, 'utf-8');
        console.log(`✅ Updated: ${fullPath}`);
      }
    }
  }
}

processDir(srcDir);
console.log('Done!');
