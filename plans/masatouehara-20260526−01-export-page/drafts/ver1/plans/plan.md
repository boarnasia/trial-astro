# Plan: top ページを必要な部品だけ exports/ に切り出す

## ゴール

`bun run build` で生成される `dist/` から **トップページ (`/`) が参照する asset だけ** を抽出し、
FLOCSS スタイルのパスに整え直して `exports/` 配下に出力する。

```
exports/
├── index.html
└── assets/
    ├── css/
    │   ├── common/<name>.<hash>.css      # header / footer / layout 由来
    │   └── page/index/<name>.<hash>.css  # index ページ専用
    ├── js/
    │   ├── common/<name>.<hash>.js
    │   └── page/index/<name>.<hash>.js
    └── images/
        ├── common/<name>.<hash>.{webp,svg,jpg,...}
        └── page/index/<name>.<hash>.{webp,svg,jpg,...}
```

完了条件:

- `bun run build && bun run export:index` で `exports/` 一式が生成される
- `cd exports && bun serve .` （Bun 1.2+ 組込み）で配信できる
- ブラウザで `/` を開いた見た目が `astro dev` のトップページと一致する
- header / footer は表示される

## 設計上の決定事項（質疑応答ログ）

| 項目 | 決定 |
| --- | --- |
| 共通 vs ページ専用の分類 | コンポーネント名で固定マップ（script 内に許可リストを持つ） |
| CDN 依存 (kiso.css / Google Fonts) | 参照のまま残す（vendoring しない） |
| serve コマンド | Bun 1.2+ 組込み `bun serve` |
| CSS / JS のバンドル粒度 | Astro 出力をそのまま個別ファイルで複製。連結しない |
| ビルド同梱方法 | 独立スクリプト + `package.json` の `export:index` script |

## スコープ外

- トップページ以外のページ（後続タスクで横展開する想定だが、本タスクは index のみ）
- CDN 依存の vendoring
- minify / 再圧縮（Astro 出力をそのまま使う）

## 前提

- `dist/` は `bun run build` で生成済みの最新状態
- 開発サーバ (`bun run dev`) は人間が管理する。本タスクのスクリプトは dev サーバを使わない（dist を入力にする）

## サブプラン構成

| # | ファイル | 内容 | 難易度 / 推奨モデル |
| --- | --- | --- | --- |
| 01 | [plan-01-script-skeleton.md](plan-01-script-skeleton.md) | `scripts/export-page.mjs` の雛形。`dist/index.html` を読み参照 asset を列挙する | Haiku |
| 02 | [plan-02-asset-classifier.md](plan-02-asset-classifier.md) | 共通 vs ページ専用の固定マップ。asset を `exports/assets/<type>/<bucket>/...` へコピー | Sonnet |
| 03 | [plan-03-html-rewrite-and-verify.md](plan-03-html-rewrite-and-verify.md) | HTML 内の参照パスを書き換え、`export:index` npm script を追加、`bun run build` で動作確認 | Sonnet |

並列性: 01 → 02 → 03 の **直列**。01 の I/F が後段の入力になるので、並列実装は不可。

## 関係ファイル

- 入力: `dist/index.html`, `dist/_astro/**`
- 出力: `exports/index.html`, `exports/assets/**`
- 編集対象: `scripts/export-page.mjs` (新規), `package.json` (script 追加)
