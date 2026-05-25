# leaf 02-03: コピー処理と manifest 構築

## 役割

01 で得た `AssetMap` を走査し、`classify()` + `resolveDest()` でコピー先を決め、`fs.copyFile` で複製しつつ `Manifest` を組み立てる。

## I/F

```js
async function copyAssets(assets /* AssetMap */, pageId /* string */) {
  // 戻り値: Manifest
  // Manifest: { from: string /* HTML 上の URL */, to: string /* 書き換え後 URL */ }[]
}
```

## 処理フロー

1. `exports/` ディレクトリを **初期化**（既存のものは削除して作り直す）
   - `fs.rm('exports', { recursive: true, force: true })` → `fs.mkdir('exports', { recursive: true })`
2. `assets.css` / `assets.js` / `assets.images` / `assets.other` を順に走査
3. 各 URL について:
   - `classify(url)` で bucket を得る
   - `resolveDest(url, pageId)` で `destFsPath` / `destUrlPath` を得る
   - 親ディレクトリを `fs.mkdir(dir, { recursive: true })` で作る
   - `fs.copyFile(srcFsPath, destFsPath)` でコピー
   - `manifest.push({ from: url, to: destUrlPath })`
4. manifest を return

## srcFsPath の解決

HTML 上の URL は `/_astro/...` のようなルート相対。これを `dist/_astro/...` に対応付ける:

```js
const srcFsPath = path.join('dist', url.replace(/^\//, ''));
```

## エラー処理

- 元ファイルが無い: ファイル名と URL を出して warning（continue するか fail するかは実装者判断。**推奨は fail**: dist が古い兆候）
- 書き込み失敗: そのまま throw

## ログ

`--verbose` フラグは作らない。stderr に `copied: <from> -> <to>` を 1 行ずつ出す程度に留める（dist の不整合を見つけやすくするため）。

## 受け入れ条件

- 実行後、`exports/assets/css/page/index/Typography.<hash>.css` が存在する
- `exports/assets/css/common/HeaderLink.<hash>.css` が存在する
- `exports/favicon.svg` / `exports/favicon.ico` が存在する
- manifest が `{ from: '/_astro/css/Typography.<h>.css', to: '/assets/css/page/index/Typography.<h>.css' }` を含む
- 不要なファイル（dist 全体や他ページの asset）はコピーされていない

## スコープ外

- HTML 内の参照書き換え（03 の責務）

## 関連

- 親: [../spec.md](../spec.md)
- 後続: [../../03-html-rewrite-and-verify/spec.md](../../03-html-rewrite-and-verify/spec.md)
