// One-time script to convert existing PNG/JPG images to WebP
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const publicDir = './public';
const uploadsDir = './public/uploads';
const dirs = [publicDir, uploadsDir];

let total = 0;
let saved = 0;

for (const dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const inPath = path.join(dir, file);
    const outName = path.basename(file, ext) + '.webp';
    const outPath = path.join(dir, outName);

    if (fs.existsSync(outPath)) {
      console.log(`⏭  Skipped (exists): ${outName}`);
      continue;
    }

    try {
      const before = fs.statSync(inPath).size;
      await sharp(inPath).webp({ quality: 85, effort: 4 }).toFile(outPath);
      const after = fs.statSync(outPath).size;
      const reduction = (((before - after) / before) * 100).toFixed(1);
      console.log(`✅ ${file} (${(before/1024).toFixed(0)}KB) → ${outName} (${(after/1024).toFixed(0)}KB) | -${reduction}%`);
      saved += before - after;
      total++;
    } catch (e) {
      console.error(`❌ ${file}:`, e.message);
    }
  }
}

console.log(`\n📊 Done! ${total} files converted, ${(saved/1024).toFixed(0)}KB total saved.`);
