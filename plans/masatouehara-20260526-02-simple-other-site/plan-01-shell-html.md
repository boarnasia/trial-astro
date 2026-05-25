---
name: shell-html
model: haiku
depends_on: []
---

# 目的

`other-system/index.html` を、他システム側のシェルを模した **手書きの最小 HTML** として作成する。
Astro `app.js` / `app.css` への参照はプレースホルダパスで書いておき、実体の生成・接続は今回スコープ外。

# 背景・制約

- `other-system/` は Astro のビルド対象外で、ここに置く HTML は静的・手書き。
- 現状 `other-system/index.html` は **0 バイトの空ファイル**。これを上書きする。
- Astro のビルド出力ディレクトリは `_astro/`（`astro.config.mjs` の `entryFileNames: '_astro/[name].[hash].js'`）。本タスクではハッシュなしの理想形 `/_astro/app.js`, `/_astro/app.css` を **プレースホルダ** として書く（実体は未生成でよい）。
- 既存システム由来の js/css は **書かない**（次タスク）。
- `lang="ja"` / `<meta charset="utf-8">` / viewport は必須。
- インラインスタイル禁止。`style=` 属性も使わない。
- コメントは最小限。プレースホルダ箇所に「ビルド前は 404 になる」旨を 1 行残す程度。

# 変更ファイル

- `other-system/index.html` ... 上書き（現在は空）

# 手順

1. 既存 `other-system/index.html`（0 バイト）の存在を確認する。
2. 以下の構造の HTML を書く:
   - `<!doctype html>`
   - `<html lang="ja">`
   - `<head>`:
     - `<meta charset="utf-8" />`
     - `<meta name="viewport" content="width=device-width, initial-scale=1" />`
     - `<title>Other System (Astro micro-frontend host)</title>`
     - `<link rel="stylesheet" href="/_astro/app.css" />` ← プレースホルダ
   - `<body>`:
     - 短い `<h1>Other System</h1>`
     - 1 行の `<p>` で「これは Astro マイクロフロントエンドの接続テスト用のホスト HTML」だと説明
     - Astro マウント先の `<div id="app"></div>`
     - `<script type="module" src="/_astro/app.js"></script>` ← プレースホルダ
3. プレースホルダの link/script の **直前** に、HTML コメントで「`/_astro/app.js`, `/_astro/app.css` は次タスクで生成予定。現状は 404」と 1 行だけ残す（場所が分かるようコメントは link 側にだけ書いて十分）。
4. ファイルを保存する。

# 完了条件

- `other-system/index.html` が UTF-8 で保存され、最低限 `<!doctype html>` から閉じタグまで揃った妥当な HTML5 文書になっている。
- Astro `app.js` / `app.css` への参照行が存在し、それぞれ意図が分かるコメントが添えられている。
- インラインスタイル / 既存システム想定の追加 js/css / 装飾的なマークアップが含まれていない。
- ファイルサイズはコメント込みでも 1KB 程度に収まる。

# 報告

200 語以内で以下を伝えること:
- 書いたファイルのパスと行数
- プレースホルダパスとして採用した値（`/_astro/app.js`, `/_astro/app.css` を使ったかどうか）
- 想定外に変更した他ファイルがあれば明記（無ければ「なし」と書く）
