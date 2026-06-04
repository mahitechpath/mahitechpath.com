import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = __dirname;
const distDir = path.join(srcDir, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const itemsToCopy = [
  "btech.html",
  "btech-ece.html",
  "btech-eee.html",
  "btech-hardware.html",
  "btech-mechanical.html",
  "btech-software.html",
  "government.html",
  "government-central.html",
  "government-state.html",
  "leaderboard.html",
  "app.js",
  "styles.css",
  "images",
  "roadmaps",
];

itemsToCopy.forEach(item => {
  const srcPath = path.join(srcDir, item);
  const dstPath = path.join(distDir, item);

  if (!fs.existsSync(srcPath)) {
    console.warn(`[WARN] Source path does not exist: ${srcPath}`);
    return;
  }

  // Clean target first if it exists
  if (fs.existsSync(dstPath)) {
    try {
      fs.rmSync(dstPath, { recursive: true, force: true });
    } catch (e) {
      console.warn(`[WARN] Could not remove existing path ${dstPath}:`, e.message);
    }
  }

  const stat = fs.statSync(srcPath);
  if (stat.isDirectory()) {
    try {
      fs.cpSync(srcPath, dstPath, { recursive: true });
      console.log(`[OK] Copied directory ${item} to dist/`);
    } catch (e) {
      console.error(`[ERROR] Failed to copy directory ${item}:`, e.message);
    }
  } else {
    try {
      fs.copyFileSync(srcPath, dstPath);
      console.log(`[OK] Copied file ${item} to dist/`);
    } catch (e) {
      console.error(`[ERROR] Failed to copy file ${item}:`, e.message);
    }
  }
});

console.log("--- Asset Copying Complete! ---");
