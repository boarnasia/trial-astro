#!/usr/bin/env node

/**
 * Asset extractor, copier, and HTML rewriter for Astro-built pages.
 *
 * Flow: list local assets → classify (common/page) → copy to exports/ → rewrite HTML refs → write exports/index.html
 *
 * Usage: bun run export:index
 *   (= astro build && node scripts/export-page.mjs index)
 *
 * Details:
 * - Reads dist/<page>/index.html, extracts all local CSS/JS/image/icon refs
 * - Copies each asset to exports/ under assets/css/{common,page/<id>}/, etc.
 * - Rewrites /_astro/... hrefs in the HTML to /assets/... paths
 * - CDN links (jsdelivr, fonts.googleapis.com, etc.) are left untouched
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync } from 'fs';
import { mkdirSync } from 'fs';
import { resolve, basename, extname, dirname } from 'path';

const PAGE_ID = process.argv[2] || 'index';
const PAGE_FILE = PAGE_ID === 'index'
  ? resolve('dist/index.html')
  : resolve(`dist/${PAGE_ID}/index.html`);

// Check if the HTML file exists
if (!existsSync(PAGE_FILE)) {
  console.error('先に `bun run build` を実行してください');
  process.exit(1);
}

// Read the HTML file
const html = readFileSync(PAGE_FILE, 'utf-8');

// Extract assets using regex patterns
const assets = {
  css: [],
  js: [],
  images: [],
  other: [],
};

// Extract CSS from <link rel="stylesheet" href="...">
const cssRegex = /<link\s+rel="stylesheet"\s+href="([^"]+)"/g;
let match;
while ((match = cssRegex.exec(html)) !== null) {
  const href = match[1];
  if (!href.startsWith('http://') && !href.startsWith('https://')) {
    assets.css.push(href);
  }
}

// Extract JS from <script src="...">
const jsRegex = /<script\s+src="([^"]+)"/g;
while ((match = jsRegex.exec(html)) !== null) {
  const src = match[1];
  if (!src.startsWith('http://') && !src.startsWith('https://')) {
    assets.js.push(src);
  }
}

// Extract images from <img src="...">
const imgRegex = /<img\s+[^>]*src="([^"]+)"/g;
while ((match = imgRegex.exec(html)) !== null) {
  const src = match[1];
  if (!src.startsWith('http://') && !src.startsWith('https://')) {
    assets.images.push(src);
  }
}

// Extract images from <source srcset="...">
const srcsetRegex = /<source\s+[^>]*srcset="([^"]+)"/g;
while ((match = srcsetRegex.exec(html)) !== null) {
  const srcset = match[1];
  // srcset can contain multiple URLs separated by commas, extract the first
  const urls = srcset.split(',').map(s => s.trim().split(/\s+/)[0]);
  urls.forEach(url => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      if (!assets.images.includes(url)) {
        assets.images.push(url);
      }
    }
  });
}

// Extract icons from <link rel="icon" href="...">
const iconRegex = /<link\s+rel="icon"[^>]*href="([^"]+)"/g;
while ((match = iconRegex.exec(html)) !== null) {
  const href = match[1];
  if (!href.startsWith('http://') && !href.startsWith('https://')) {
    if (!assets.other.includes(href)) {
      assets.other.push(href);
    }
  }
}

// Debug output (plan-01 legacy)
console.error(JSON.stringify(assets, null, 2));

// ──────────────────────────────────────────────
// plan-02: classify + copy
// ──────────────────────────────────────────────

/** ベース名がこのセットに含まれれば common 扱い */
const COMMON_BASES = new Set([
  'Header',
  'Footer',
  'HeaderLink',
  'HeaderLayout',
  'FooterLayout',
  'BodyLayout',
  'MainLayout',
  'client',  // React runtime
]);

/**
 * ファイル名からハッシュ前のベース名を抽出する。
 * 例: "Typography.BsC0cmaY.css" → "Typography"
 *     "index@_@astro.BdNMo2kM.css" → "index@_@astro"
 */
function extractBaseName(filename) {
  // 拡張子を除く
  const withoutExt = filename.replace(/\.[^.]+$/, '');
  // 最後の "." の前までを取り、さらに "." で分割して先頭を得る
  const parts = withoutExt.split('.');
  // 末尾要素がハッシュ（英数字8文字以上）なら除く、それ以外はそのまま
  if (parts.length >= 2) {
    return parts.slice(0, -1).join('.');
  }
  return withoutExt;
}

/**
 * asset のルート相対パスを受け取り、コピー先を決定する。
 * @param {string} filePath  例: "/_astro/css/Typography.BsC0cmaY.css"
 * @param {'css'|'js'|'image'|'other'} type
 * @returns {{ bucket: 'common'|'page'|'public', destPath: string }}
 */
function classify(filePath, type) {
  // public 直下のファイル（_astro/ 配下でない）
  if (!filePath.startsWith('/_astro/')) {
    const filename = basename(filePath);
    return { bucket: 'public', destPath: filename };
  }

  const filename = basename(filePath);

  if (type === 'css') {
    const base = extractBaseName(filename);
    const bucket = COMMON_BASES.has(base) ? 'common' : 'page';
    const dir = bucket === 'common'
      ? 'assets/css/common'
      : `assets/css/page/${PAGE_ID}`;
    return { bucket, destPath: `${dir}/${filename}` };
  }

  if (type === 'js') {
    const base = extractBaseName(filename);
    const bucket = COMMON_BASES.has(base) ? 'common' : 'page';
    const dir = bucket === 'common'
      ? 'assets/js/common'
      : `assets/js/page/${PAGE_ID}`;
    return { bucket, destPath: `${dir}/${filename}` };
  }

  if (type === 'image') {
    // 拡張子を取得（先頭の . を除く）
    const ext = extname(filename).replace(/^\./, '') || 'other';
    // images はすべて page 扱い（common 画像は今のところ無し）
    return { bucket: 'page', destPath: `assets/images/page/${PAGE_ID}/${ext}/${filename}` };
  }

  // fallback
  return { bucket: 'public', destPath: filename };
}

const DIST_ROOT = resolve('dist');
const EXPORTS_ROOT = resolve('exports');

/** asset をコピーし { from, to } を返す */
function copyAsset(filePath, type) {
  const { destPath } = classify(filePath, type);
  const srcAbs = resolve(DIST_ROOT, filePath.replace(/^\//, ''));
  const destAbs = resolve(EXPORTS_ROOT, destPath);

  if (!existsSync(srcAbs)) {
    console.error(`[warn] ソースが存在しません: ${srcAbs}`);
    return null;
  }

  mkdirSync(dirname(destAbs), { recursive: true });
  copyFileSync(srcAbs, destAbs);

  return { from: filePath, to: `/${destPath}` };
}

const copied = [];

for (const filePath of assets.css) {
  const result = copyAsset(filePath, 'css');
  if (result) copied.push(result);
}

for (const filePath of assets.js) {
  const result = copyAsset(filePath, 'js');
  if (result) copied.push(result);
}

for (const filePath of assets.images) {
  const result = copyAsset(filePath, 'image');
  if (result) copied.push(result);
}

for (const filePath of assets.other) {
  const result = copyAsset(filePath, 'other');
  if (result) copied.push(result);
}

// ──────────────────────────────────────────────
// plan-03: HTML 書き換え → exports/index.html 出力
// ──────────────────────────────────────────────

let rewrittenHtml = html;

for (const { from, to } of copied) {
  // public 直下ファイル（/_astro/ 配下でないもの）は URL が変わらないのでスキップ
  if (!from.startsWith('/_astro/')) continue;
  rewrittenHtml = rewrittenHtml.replaceAll(from, to);
}

mkdirSync(EXPORTS_ROOT, { recursive: true });
writeFileSync(resolve(EXPORTS_ROOT, 'index.html'), rewrittenHtml, 'utf-8');

// 完了サマリ
console.log(`✓ exports/index.html generated`);
console.log(`✓ ${copied.length} files copied to exports/`);
