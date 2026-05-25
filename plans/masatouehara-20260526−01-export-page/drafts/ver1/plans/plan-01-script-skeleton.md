# plan-01: export-page.mjs の雛形と asset 列挙

## 目的

`scripts/export-page.mjs` の雛形を作る。コマンドラインから渡されたページ ID を元に
`dist/<page>/index.html`（または `dist/index.html`）を読み、参照されているローカル asset を列挙して
標準出力にダンプするところまで。

このプランの段階では **コピーや書き換えは行わない**。後続 plan-02 / 03 で実装する。

## 入力

- `dist/index.html` （ビルド済み前提）

## 出力

- `scripts/export-page.mjs` （新規）
- 実行例: `node scripts/export-page.mjs index` で標準出力に asset 一覧を表示する

## やること

1. `scripts/export-page.mjs` を作成（Node 22+ / ESM）
2. CLI 引数で page ID を 1 つ受ける（`index` / `about` / `blog` などを想定。今は `index` のみサポート）
3. HTML パースは正規表現ではなく軽量パーサ（`node-html-parser` か、もしくはピンポイントで `linkedom`）を使う
   - 依存追加が嫌なら正規表現で `<link href="...">`、`<script src="...">`、`<img src="...">` を抽出でも可
   - **判断は実装者に任せる**。ただし decision を script の冒頭コメントに残すこと
4. 抽出対象:
   - `<link rel="stylesheet" href="...">` の href
   - `<script src="...">` の src
   - `<img src="...">`, `<source srcset="...">` の URL
   - `<link rel="icon" href="...">`
5. **外部 URL (`http(s)://`) は除外**。`/_astro/...`, `/favicon.svg` のようなローカル参照のみ列挙
6. 結果を `{ css: [...], js: [...], images: [...], other: [...] }` の形で console.log

## 受け入れ条件

- `node scripts/export-page.mjs index` を実行すると、現状の `dist/index.html` から
  以下のような JSON が出力される（CSS の hash 部分は最新の build に依存）:
  ```json
  {
    "css": [
      "/_astro/css/Typography.BsC0cmaY.css",
      "/_astro/css/index@_@astro.BdNMo2kM.css",
      "/_astro/css/HeaderLink.D8cufbIO.css"
    ],
    "js": [],
    "images": [],
    "other": ["/favicon.svg", "/favicon.ico"]
  }
  ```
- 外部 URL（`https://cdn.jsdelivr.net/...`, Google Fonts など）は含まれない
- `dist/index.html` が無いときは「先に `bun run build` を実行してください」のメッセージを出して終了

## スコープ外

- 分類（共通 vs ページ専用）
- コピー
- HTML 書き換え
