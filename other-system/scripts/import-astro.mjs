import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const src = path.resolve(root, '../dist/_astro');
const dst = path.resolve(root, 'public/_astro');

if (!fs.existsSync(src)) {
  console.error(`source not found: ${src}\nRun \`bun run build:partial\` in the parent project first.`);
  process.exit(1);
}

fs.rmSync(dst, { recursive: true, force: true });
fs.cpSync(src, dst, { recursive: true });

const HASH_JS = /^(.+)\.([A-Za-z0-9_-]{8})\.js$/;
const HASH_CSS = /^(.+)\.([A-Za-z0-9_-]{8})\.css$/;
const renames = [];

for (const file of fs.readdirSync(dst)) {
  const m = file.match(HASH_JS) ?? file.match(HASH_CSS);
  if (!m) continue;
  const ext = path.extname(file);
  const stable = `${m[1]}${ext}`;
  fs.renameSync(path.join(dst, file), path.join(dst, stable));
  renames.push({ from: file, to: stable });
}

if (renames.length > 0) {
  for (const file of fs.readdirSync(dst)) {
    if (!/\.(js|css|map)$/.test(file)) continue;
    const p = path.join(dst, file);
    let txt = fs.readFileSync(p, 'utf-8');
    let changed = false;
    for (const { from, to } of renames) {
      if (txt.includes(from)) {
        txt = txt.split(from).join(to);
        changed = true;
      }
    }
    if (changed) fs.writeFileSync(p, txt);
  }
}

console.log(`imported ${path.relative(root, src)} -> ${path.relative(root, dst)}`);
for (const { from, to } of renames) console.log(`  renamed ${from} -> ${to}`);
