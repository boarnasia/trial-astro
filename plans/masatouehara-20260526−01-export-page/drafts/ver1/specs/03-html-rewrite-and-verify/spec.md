# spec 03 (枝): HTML 書き換え / npm script / 動作確認

## 目的

02 で得た `Manifest`（`{ from, to }[]`）を使い、`dist/index.html` 内の asset 参照を `/assets/...` に書き換えて `exports/index.html` として保存する。あわせて `package.json` に `export:index` を追加し、`bun run build` で動作確認するところまで。

## 受け入れ条件

- `bun run export:index` を一発実行で完走する（build エラーが無い前提）
- `exports/index.html` の `<link rel="stylesheet" href="...">` が全て `/assets/css/...` に書き換わっている
- `<script src="...">` も同様に `/assets/js/...` に書き換わっている
- **CDN の `<link>` / `<script>` は元のまま**である
- `exports/` の構造が幹 spec で示したツリーと一致する
- **動作確認**: AI 側で `/check-build`（または `bun run build`）が成功している。人間が `cd exports && bun serve .` でブラウザ確認する手前まで

## 葉 (leaves) への分解

| # | 葉 spec | 内容 |
| --- | --- | --- |
| 01 | [leaves/01-html-rewrite.md](leaves/01-html-rewrite.md) | manifest を使った HTML 内文字列置換 |
| 02 | [leaves/02-cdn-handling.md](leaves/02-cdn-handling.md) | CDN 参照を温存するための条件 |
| 03 | [leaves/03-npm-script.md](leaves/03-npm-script.md) | `package.json` への script 追加 |
| 04 | [leaves/04-verification.md](leaves/04-verification.md) | ビルドと動作確認手順 |

## スコープ外

- スクリーンショット自動比較
- 他ページ（about / blog）への横展開
- CSS / JS の minify / 再 hash
- README / docs 整備

## 関連

- 親: [../spec.md](../spec.md)
- 前: [../02-asset-classifier/spec.md](../02-asset-classifier/spec.md)
