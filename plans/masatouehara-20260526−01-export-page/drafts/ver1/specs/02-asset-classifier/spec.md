# spec 02 (枝): 共通 / ページ専用 の分類とコピー

## 目的

01 で列挙した asset を、**固定マップ**で「共通 (common)」「ページ専用 (page/<id>)」に振り分け、`exports/assets/...` に FLOCSS スタイルのパスへコピーする。

## 受け入れ条件

- `node scripts/export-page.mjs index` 実行後:
  - `exports/assets/css/page/index/` に `Typography.<hash>.css` / `index@_@astro.<hash>.css` が存在
  - `exports/assets/css/common/` に `HeaderLink.<hash>.css` 等が存在
  - `exports/favicon.svg` / `exports/favicon.ico` が存在
  - 不要なファイル（dist 全体や他ページの asset）はコピーされていない
- 関数として「`from` → `to` の対応表」を返し、03 から利用できる

## 入出力

- 入力: 01 で得た `AssetMap`（ローカルパス配列）
- 出力:
  - `exports/assets/**` 配下のコピー
  - `Manifest`: `{ from: string, to: string }[]` の対応表

## 葉 (leaves) への分解

| # | 葉 spec | 内容 |
| --- | --- | --- |
| 01 | [leaves/01-classification-map.md](leaves/01-classification-map.md) | `COMMON_BASES` の定義とベース名抽出 |
| 02 | [leaves/02-path-mapping.md](leaves/02-path-mapping.md) | 出力先パスの解決ルール |
| 03 | [leaves/03-copy-logic.md](leaves/03-copy-logic.md) | コピー処理と manifest 構築 |

## スコープ外

- HTML 書き換え → 03
- npm script 追加 → 03

## 関連

- 親: [../spec.md](../spec.md)
- 前: [../01-script-skeleton/spec.md](../01-script-skeleton/spec.md)
- 次: [../03-html-rewrite-and-verify/spec.md](../03-html-rewrite-and-verify/spec.md)
