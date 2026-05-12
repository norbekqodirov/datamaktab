#!/usr/bin/env node
/**
 * Deploy-time image optimization script.
 * Run after `git pull`, before `npm run build`:
 *   node scripts/optimize-uploads.js
 *
 * What it does:
 *  - Scans public/uploads/ and public/ for oversized images
 *  - Re-encodes each to WebP at max 1920px width, quality 78
 *  - Deletes stale original JPG/PNG files that already have a WebP twin
 *  - Skips files that are already small enough (<= MAX_BYTES)
 *  - File names (URLs) are never changed → DB references stay valid
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Directories to scan
const SCAN_DIRS = [
  path.join(ROOT, 'public', 'uploads'),
  path.join(ROOT, 'public'),
];

// Only re-process images larger than this (500 KB)
const MAX_BYTES = 500 * 1024;

const WEBP_OPTS = { quality: 78, effort: 4 };
const RESIZE_OPTS = { width: 1920, withoutEnlargement: true };

let totalSaved = 0;
let processed = 0;
let skipped = 0;
let deleted = 0;

async function optimizeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);

  // --- Delete stale JPG/PNG if a WebP twin already exists ---
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const webpPath = filePath.replace(/\.[^.]+$/, '.webp');
    if (fs.existsSync(webpPath)) {
      fs.unlinkSync(filePath);
      console.log(`  🗑  Deleted stale original: ${path.basename(filePath)} (${kb(stat.size)} KB)`);
      deleted++;
    }
    // Whether or not we deleted it, don't try to re-encode — WebP twin handles it
    return;
  }

  // Only process WebP from here
  if (ext !== '.webp') return;

  // Skip if already small enough
  if (stat.size <= MAX_BYTES) {
    skipped++;
    return;
  }

  const before = stat.size;
  const tmp = filePath + '.tmp.webp';

  try {
    await sharp(filePath)
      .resize(RESIZE_OPTS)
      .webp(WEBP_OPTS)
      .toFile(tmp);

    const after = fs.statSync(tmp).size;

    // Only replace if we actually made it smaller
    if (after < before) {
      fs.renameSync(tmp, filePath);
      const saved = before - after;
      totalSaved += saved;
      processed++;
      console.log(`  ✅ ${path.basename(filePath)}: ${kb(before)} KB → ${kb(after)} KB  (-${kb(saved)} KB)`);
    } else {
      fs.unlinkSync(tmp);
      skipped++;
      console.log(`  ⏭  ${path.basename(filePath)}: already optimal (${kb(before)} KB)`);
    }
  } catch (err) {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
    console.error(`  ❌ ${path.basename(filePath)}: ${err.message}`);
  }
}

function kb(bytes) {
  return (bytes / 1024).toFixed(0);
}

async function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    await optimizeFile(path.join(dir, entry.name));
  }
}

console.log('\n🔧 Image optimization — deploy script\n');

for (const dir of SCAN_DIRS) {
  console.log(`📂 Scanning: ${dir}`);
  await scanDir(dir);
}

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Re-encoded : ${processed} files
⏭  Skipped   : ${skipped} files (already small)
🗑  Deleted   : ${deleted} stale originals
💾 Total saved: ${(totalSaved / 1024 / 1024).toFixed(1)} MB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
