---
name: blog-post-list
model: sonnet
depends_on: []
---

# 目的

`src/pages/blog/[...page].astro` で使われている `c-post-list` / `c-post-card` クラス群を、**CSS Modules（`.module.scss`）** へ移行する。BEM プレフィックス（`c-`, `__`, `--`）を剥がしてキャメルケースに統一する。

# 背景・制約

- 既存スタイル: `src/styles/component/_c-post-card.scss` の中に `c-post-list` と `c-post-card` の **両方** が定義されている。今回の移行対象はこの 2 ブロックの全内容。
- このスタイルは `src/pages/blog/[...page].astro` でのみ使われている（grep で他に参照なしを確認済）。
- 既存パターン参考: `src/components/BlogSearch.tsx` + `BlogSearch.module.scss`、`src/components/Layouts/LayoutBody.tsx` + `LayoutBody.module.scss`。
- **Astro ファイル + `.module.scss`** の書き方: フロントマターで `import styles from './post-list.module.scss';` のように import し、テンプレート側で `class={styles.postList}` のように参照する。条件付きクラスは `class={[styles.postListItem, isFeatured && styles.postListItemFeatured].filter(Boolean).join(' ')}` の形。
- **ファイル名は `post-list.module.scss`**（同階層 `src/pages/blog/` に配置）。`[...page].module.scss` のような動的ルート名にしない（ブラケットを含むファイル名を避けるため）。
- BEM プレフィックスは全て剥がし、キャメルケースに統一:
  - `c-post-list` → `postList`
  - `c-post-list__item` → `postListItem`
  - `c-post-list__item--featured` → `postListItemFeatured`（CSS Modules では複合クラス指定で使う）
  - `c-post-list__link` → `postListLink`
  - `c-post-card__image` → `postCardImage`
  - `c-post-card__title` → `postCardTitle`
  - `c-post-card__date` → `postCardDate`
- `_c-post-card.scss` には `&:hover` の中で `.c-post-card__title` を参照する箇所がある。CSS Modules で他クラスを参照する場合は `:global` ではなく、SCSS の `&` ネストや明示的なクラス連結で書き直す（同じ module 内なら通常のクラスセレクタで参照可能）。
- **dev サーバは起動しない**。検証は取りまとめ役が `bun run build` で行う。
- `bun` を使う。

# 変更ファイル

- `src/pages/blog/post-list.module.scss` ... 新規（`_c-post-card.scss` の内容をキャメルケースで移植）
- `src/pages/blog/[...page].astro` ... 更新（フロントマターに `import styles`、テンプレートの `class` を `styles.*` に置き換え）

# 手順

1. `src/styles/component/_c-post-card.scss` の全内容を読む（`c-post-list` ブロック + `c-post-card` ブロック）。
2. `src/pages/blog/post-list.module.scss` を新規作成し、以下のキャメルケース命名で SCSS を書く:
   - `.postList { ... }` 直下に `.postListItem`, `.postListItemFeatured`, `.postListLink` などを置く（ネスト構造はキャメルケースのフラット定義に展開）。
   - `.postCardImage`, `.postCardTitle`, `.postCardDate` も同 module 内に定義。
   - `@media (max-width: 720px)` 部分も忘れず移植。
   - `&:hover` 内で子クラスを参照している箇所（`.c-post-card__title` 等）は、同 module 内の `.postCardTitle` クラスを使うように書き直す。CSS Modules の場合、SCSS ネストの中で `.postCardTitle` を直接書くと **コンパイル後にスコープ化された同じ識別子** として解釈されるので、`& .postCardTitle` の形で書けばよい。
3. `src/pages/blog/[...page].astro` のフロントマター末尾に `import styles from './post-list.module.scss';` を追加。
4. テンプレートの class を全て書き換え:
   - `class="c-post-list"` → `class={styles.postList}`
   - `class={\`c-post-list__item${index === 0 && page.currentPage === 1 ? ' c-post-list__item--featured' : ''}\`}` → `class={[styles.postListItem, index === 0 && page.currentPage === 1 && styles.postListItemFeatured].filter(Boolean).join(' ')}`
   - `class="c-post-list__link"` → `class={styles.postListLink}`
   - `class="c-post-card__image"` → `class={styles.postCardImage}`
   - `class="c-post-card__title"` → `class={styles.postCardTitle}`
   - `class="c-post-card__date"` → `class={styles.postCardDate}`
5. **`_c-post-card.scss` と `src/styles/component/_index.scss` は触らない**（Wave 2 の取りまとめ役の担当）。
6. 他のファイル（他 page / コンポーネント / Astro layout）には触らない。

# 完了条件

- `src/pages/blog/post-list.module.scss` が新規作成され、`_c-post-card.scss` と等価なスタイルがキャメルケースで定義されている。
- `[...page].astro` 内の `c-post-*` クラス文字列が全て `styles.*` 参照に置き換わっている。
- `_c-post-card.scss` / `_index.scss` には触れていない。
- 既存の hover 挙動（`.post-list-link:hover` 内で `.postCardTitle` / `.postCardDate` の色を変える、`img` の box-shadow）が保持されている。

# 報告

- 変更したファイルパス一覧
- キャメルケースでのクラス名対応表（簡潔に）
- modifier (`--featured`) を `postListItemFeatured` として複合適用したことを 1 行で確認
- hover 内クロス参照（`& .postCardTitle` 等）の書き方を 1 行で
- 200 語以内
