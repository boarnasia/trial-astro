# spec 01 (枝): export-page.mjs の雛形と asset 列挙

## 目的

`scripts/export-page.mjs` の雛形を作る。CLI から渡されたページ ID をもとに `dist/<page>/index.html`（または `dist/index.html`）を読み、参照されているローカル asset を列挙して標準出力にダンプするところまで。

> **この段階ではコピーや書き換えは行わない**。後続 02 / 03 で実装する。

## 入出力

- 入力: `dist/index.html`（ビルド済み前提）
- 出力: `scripts/export-page.mjs`（新規作成）
- 実行例: `node scripts/export-page.mjs index` → 標準出力に asset 一覧の JSON

## 受け入れ条件

- `node scripts/export-page.mjs index` 実行で以下のような JSON が出る（hash は build 依存）:
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
- `dist/index.html` が無いときは「先に `bun run build` を実行してください」と出して exit 1

## スコープ外

- 分類（共通 vs ページ専用）→ 02
- コピー → 02
- HTML 書き換え → 03

## 葉 (leaves) への分解

| # | 葉 spec | 内容 |
| --- | --- | --- |
| 01 | [leaves/01-cli-args.md](leaves/01-cli-args.md) | CLI 引数とエラーハンドリング |
| 02 | [leaves/02-html-parsing.md](leaves/02-html-parsing.md) | HTML パース戦略の選択 |
| 03 | [leaves/03-asset-extraction.md](leaves/03-asset-extraction.md) | 抽出対象セレクタとローカル/外部の判定 |
| 04 | [leaves/04-output-format.md](leaves/04-output-format.md) | 出力 JSON の形と内部表現 |

## 関連

- 親: [../spec.md](../spec.md)
- 後続: [../02-asset-classifier/spec.md](../02-asset-classifier/spec.md)
