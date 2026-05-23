# Blog ページに Blog/Layout 群を適用 実装計画 (plan3)

## 目標

`src/components/Layouts/Blog/` の新コンポーネント群（plan2 で実装済み）を、ブログ系 2 ページに適用する:

1. 個別記事ページ（`src/layouts/BlogPost.astro` 経由）
2. 記事一覧ページ（`src/pages/blog/[...page].astro`）

両ページとも現状は raw `<html>` / `<body>` を直接書いており、共有 `@/layouts/Layout.astro` を経由していない。本タスクで shared Layout 経由に揃え、その中で `Blog/LayoutPage` を使う。

heroImage の有無で grid 構造が切り替わるよう、`LayoutPage` に `variant` prop を追加する。

## sub-plan 一覧

| #  | slug                        | モデル | 依存                    | 状態   | 概要 |
| -- | --------------------------- | ------ | ----------------------- | ------ | ---- |
| 04 | layout-page-variant         | sonnet | -                       | 未着手 | `LayoutPage` に `variant?: 'with-hero' \| 'without-hero'` と `as?: 'div' \| 'article' \| 'section' \| 'main'` を追加。SCSS の grid を variant ごとに分け、Storybook に WithoutHero ストーリーを追加 |
| 05 | blogpost-layout-apply       | sonnet | layout-page-variant     | 未着手 | `BlogPost.astro` を shared Layout + `<LayoutPage as="article">` 構成に書き換え。heroImage 有無で variant 切替 |
| 06 | blog-index-layout-apply     | sonnet | layout-page-variant     | 未着手 | `src/pages/blog/[...page].astro` を shared Layout + `Blog/LayoutPage variant="without-hero"` 構成に書き換え |

## 実行波

- Wave 1: 04
- Wave 2: 05, 06 ← 並列

## 横断的な制約

- `CLAUDE.md` / `docs/feontend-design.md` を遵守。
- 既存 `Layouts/Blog/*` の named export / `*.module.scss` パターンを崩さない。
- 共有 `Layout.astro` (`@/layouts/Layout.astro`) は `title` / `description` だけ受け取る点、`Header` / `Footer` を内部で描画する点を踏まえる（重複描画しない）。
- `BlogSearch` は `client:load` 必須（interactive）。維持する。
- 記事一覧の `c-post-list*` / `c-post-card*` BEM クラスは触らない（別途トライアル対象）。
- インラインスタイル / `!important` 禁止。
- dev / preview / storybook サーバは起動しない。検証は `bun run build`。

## 設計判断（未確定 — 承認時に確定したい）

### LayoutPage API 拡張

1. **`variant` prop**:
   - 値: `'with-hero'` (default) / `'without-hero'`
   - `Typography` の `variant` 命名と揃える
2. **`as` prop（polymorphic ルート要素）**:
   - 値: `'div'` (default) / `'article'` / `'section'` / `'main'`
   - `Typography` の `as` と同じパターンで実装
   - これにより BlogPost.astro 側で `<LayoutPage as="article">` と書ける（外側 `<article>` ラップ不要）
3. **CSS**:
   - `with-hero`: 既存の 3 領域 grid（`auto 6em auto 3em auto`）
   - `without-hero`: 2 領域 grid（`auto 3em auto`、areas: `header / spacer / body`）

### BlogPost.astro の構造

4. **`<article>` の付与方法**: `<LayoutPage as="article">` でルート要素として指定（外側で `<article>` ラップしない）。
4. **`heroImage` 有無の扱い**: heroImage があれば `variant="with-hero"` + `<LayoutHero>` 描画。無ければ `variant="without-hero"` で `<LayoutHero>` 自体を省略。
5. **LayoutHeader の中身**: 既存順を維持 → `FormattedDate`（必要なら updatedDate も） → `Typography h1 display`（title） → `Typography p lead`（description）。
   - **デフォルト案**: 日付は `Typography variant="muted"` で包む（既存 `c-post__date` / `c-post__updated` クラスは廃止）。
6. **`<hr />`**: 廃止（LayoutHeader と LayoutBody の間に 3em のスペーサがあるため）。
7. **LayoutBody の中身**: `<LayoutContainer size="sm">` で `<slot />` をラップ（about.astro と揃え、本文の読みやすい幅 720px）。
   - 旧 `l-main--wide`（ほぼ全幅）は採用しない。本文は sm で読みやすさ優先。
8. **不要になる import**: `Header`, `Footer`, `BaseHead`（shared Layout 内で描画されるため）。

### blog/[...page].astro の構造

9. **shared Layout の使用**: `@/layouts/Layout.astro` 経由に変更。`BaseHead`, `Header`, `Footer` の直接 import は削除。
10. **LayoutPage variant**: `"without-hero"` 固定（一覧ページに hero 画像なし）。
11. **LayoutHeader の中身**: `Typography eyebrow / display / lead`（既存の 3 行をそのまま入れる）。
12. **LayoutBody の中身**: `<LayoutContainer size="md">` で `BlogSearch` + `<ul class="c-post-list">` + `<Pagination>` をラップ（旧 `l-main--blog-index` の幅 960px と揃える）。
13. **`<section>` ラッパ**: 廃止（LayoutPage が役割を持つため）。
14. **post list の BEM クラス**: そのまま維持（クラス名変更は別タスク）。

### 共通

15. **既存 raw `<html lang="en">`**: shared Layout は `lang="ja"`。BlogPost を移行すると lang が ja に変わる。**デフォルト案**: それで問題なし（サイト全体が日本語なので統一）。
16. **`l-main--wide` / `l-main--blog-index` のスタイル削除**: `src/styles/layout/_l-site.scss` から削除しない（他で参照されているかもしれず、今回のスコープ外）。コードからの参照だけ消える形。

## 既知のスコープ外

- `c-post__date` / `c-post__updated` / `c-post__body` / `c-post__title-area` などの BEM クラス、および `src/styles/layout/_l-site.scss` の `l-main*` クラスの削除（dead code 化するが整理は別タスク）。
- 記事カード (`c-post-list`, `c-post-card`) の module.scss 化。
- `Blog/LayoutPage` のさらなる variant 拡張（例: `header-only`）。
