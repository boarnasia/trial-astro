# leaf 01-01: CLI 引数とエラーハンドリング

## 役割

`scripts/export-page.mjs` の起動口。ページ ID を 1 つ受け取り、対応する HTML パスを解決する。

## I/F

```
node scripts/export-page.mjs <page-id>
```

- `<page-id>`: `index` / `about` / `blog` 等を想定。**本タスクは `index` のみサポート**
- `index` のときは `dist/index.html`
- それ以外（将来用）は `dist/<page-id>/index.html` を想定するが、未サポートとして警告 or 続行可（実装者判断）

## エラーハンドリング

| ケース | 挙動 |
| --- | --- |
| 引数なし | `Usage: node scripts/export-page.mjs <page-id>` を出し exit 1 |
| `dist/index.html` が存在しない | `dist/index.html が見つかりません。先に "bun run build" を実行してください。` を出し exit 1 |
| `dist/<page-id>/index.html` が存在しない（index 以外） | 同上 |

## 実装メモ

- `process.argv[2]` で受ける（最小構成。`yargs` などは入れない）
- Node 22+ / ESM
- パス解決は `node:path` の `resolve()`、存在確認は `node:fs` の `existsSync()`
- スクリプト先頭に **使い方コメントを 5 行程度** 入れる（03 の要件）

## 受け入れ条件

- 引数なし実行で usage が出る
- 引数 `index` のときに `dist/index.html` を見にいく
- 存在しないときに分かりやすいメッセージで exit 1 する

## 関連

- 親: [../spec.md](../spec.md)
