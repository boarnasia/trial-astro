# plan-03: HTML 書き換え / npm script 追加 / 動作確認

## 目的

plan-02 で得た「`dist/<src>` → `exports/<dest>`」の対応表を使い、`dist/index.html` 内の参照を
`/assets/...` に書き換えて `exports/index.html` として保存する。
あわせて `package.json` に `export:index` を追加し、`bun run build` で動作確認するところまで。

## やること

### 1. HTML 書き換え

- `dist/index.html` の文字列内で、各 `from`（例: `/_astro/css/Typography.BsC0cmaY.css`）を
  `to` の **ルート相対 URL**（例: `/assets/css/page/index/Typography.BsC0cmaY.css`）に置換
- 単純な文字列 replaceAll で OK（hash 付き URL は他と衝突しない前提）
- 結果を `exports/index.html` に書き出す

### 2. CDN 参照はそのまま

- `https://cdn.jsdelivr.net/npm/kiso.css@latest/kiso.css`
- `https://fonts.googleapis.com/css2?...`
- `https://fonts.gstatic.com`
- `https://example.com/...`（OGP の絶対 URL）

これらは触らない。

### 3. npm script を追加

`package.json` の `scripts` に以下を追加:

```json
"export:index": "astro build && node scripts/export-page.mjs index"
```

`astro build` は人間管理の dev サーバとは独立に走らせて問題ない（dist を上書きするだけ）。

### 4. README / docs への記載は不要

本タスクではコマンドの存在さえあれば良く、ドキュメント整備は次フェーズ。
ただし `scripts/export-page.mjs` の冒頭に **使い方コメント** を 5 行程度入れること。

## 受け入れ条件

- `bun run export:index` を一発実行で完走する（build エラーが無い前提）
- `exports/index.html` の `<link rel="stylesheet" href="...">` が全て
  `/assets/css/...` に書き換わっている
- CDN の `<link>` は元のままである
- `exports/` ディレクトリは以下のような構造になっている:
  ```
  exports/
  ├── index.html
  ├── favicon.svg
  ├── favicon.ico
  └── assets/
      ├── css/
      │   ├── common/HeaderLink.*.css
      │   └── page/index/Typography.*.css
      │                  index@_@astro.*.css
      └── (images/ は今回は実質空でも可)
  ```
- **動作確認**: 人間に `cd exports && bun serve .` を実行してもらい、
  ブラウザでトップページの見た目が `astro dev` と一致することを確認する
  - スクリーンショット差分の自動チェックは本タスクではスコープ外
  - 人間確認の前に AI 側で `bun run build` のみ `/check-build` 経由で OK を取ること

## スコープ外

- スクリーンショット自動比較
- 他ページ（about / blog）への横展開
- CSS / JS の minify / 再 hash
