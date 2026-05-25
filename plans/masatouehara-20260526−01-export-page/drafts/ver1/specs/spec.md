# spec (幹): top ページ export 機能

## 1 行サマリ

`bun run build` で生成した `dist/` から **トップページ `/` が参照する asset だけ**を抽出し、FLOCSS スタイルのパス（`common/` と `page/index/`）に整理し直して `exports/` に書き出すスクリプトを実装する。

## 完了条件

- `bun run export:index` 一発で `exports/` 一式が生成される
- `cd exports && bun serve .` (Bun 1.2+ 組込み) で配信できる
- ブラウザで `/` を開いた見た目が `astro dev` のトップページと一致する
- header / footer が表示される

## 出力構造

```
exports/
├── index.html
├── favicon.svg / favicon.ico              # public 直下のものはルート維持
└── assets/
    ├── css/
    │   ├── common/<name>.<hash>.css       # header / footer / layout 由来
    │   └── page/index/<name>.<hash>.css   # index ページ専用
    ├── js/
    │   ├── common/<name>.<hash>.js
    │   └── page/index/<name>.<hash>.js
    └── images/
        ├── common/<ext>/...
        └── page/index/<ext>/...
```

ファイル名・hash は **Vite が付けたものをそのまま流用**する（再ハッシュしない）。

## 全体方針（決定事項）

| 項目 | 決定 |
| --- | --- |
| 共通 vs ページ専用の分類 | コンポーネント名で**固定マップ**（script 内に許可リスト） |
| CDN 依存 (kiso.css / Google Fonts) | **参照のまま残す**（vendoring しない） |
| serve コマンド | Bun 1.2+ 組込み `bun serve` |
| CSS / JS のバンドル粒度 | Astro 出力をそのまま個別ファイルで複製。連結しない |
| ビルド同梱方法 | 独立スクリプト + `package.json` の `export:index` script |
| 入力 | `dist/index.html` と `dist/_astro/**`（ビルド済み前提） |

## スコープ外

- トップページ以外（about / blog 等は後続タスクで横展開）
- CDN 依存の vendoring
- minify / 再圧縮（Astro 出力をそのまま使う）
- スクリーンショット自動比較

## 枝 (sub-spec) への分解

実装は **直列** に進める。01 の I/F が 02 の入力、02 の対応表が 03 の入力になる。

| # | 枝 spec | 内容 | 推奨モデル |
| --- | --- | --- | --- |
| 01 | [01-script-skeleton/spec.md](01-script-skeleton/spec.md) | `scripts/export-page.mjs` の雛形、参照 asset の列挙 | Haiku |
| 02 | [02-asset-classifier/spec.md](02-asset-classifier/spec.md) | 共通 / ページ専用の分類とコピー | Sonnet |
| 03 | [03-html-rewrite-and-verify/spec.md](03-html-rewrite-and-verify/spec.md) | HTML 書き換え / npm script / 動作確認 | Sonnet |

## 関係ファイル

- **入力**: `dist/index.html`, `dist/_astro/**`
- **出力**: `exports/index.html`, `exports/assets/**`
- **編集対象**: `scripts/export-page.mjs` (新規), `package.json` (script 追加)

## 前提

- `dist/` は `bun run build` で生成済みの最新状態である
- 開発サーバ (`bun run dev`) は人間が管理する。本タスクのスクリプトは dev サーバを使わない
