---
name: refactor-about-page
model: sonnet
depends_on: []
---

# 目的

`src/pages/about.astro` を、ブログ用 `BlogPost.astro` レイアウトから汎用 `@/layouts/Layout.astro` に移行し、本文を `LayoutContainer` でレイアウトする。`index.astro` と同じパターンに揃える。

# 背景・制約

- `BlogPost.astro` は `heroImage` / `pubDate` / `FormattedDate` / `HeroBlock` などブログポスト固有の構成を持つ。about ページは記事ではないので、これらを残す必然性はない。
- `Layout.astro` は `title` / `description` のみを受け取る。
- `LayoutContainer` は `default export` (`import LayoutContainer from '@/components/Layouts/LayoutContainer'`)、props は `size?: 'sm' | 'md'` と children。
- `Typography` は `as` と `variant`（例: `display`, `lead`）を持つ。`index.astro` の使い方を参考にすること。
- 本文段落の Lorem ipsum 文章は **変更しない**。マークアップを差し替えるだけ。
- 既存の `index.astro` を参照パターンとして合わせる。
- インラインスタイル禁止、生 BEM クラスを新規に書かない、`!important` 禁止 (`docs/feontend-design.md`)。

# 変更ファイル

- `src/pages/about.astro` ... 更新（ほぼ全文書き換え）

# 手順

1. `src/pages/about.astro` を読む。
2. `src/pages/index.astro` をパターン参考として読む。
3. 以下に書き換える:
   - frontmatter:
     - `Layout` の import を `@/layouts/Layout.astro` に変更。
     - `LayoutContainer` を `@/components/Layouts/LayoutContainer` から import。
     - `Typography` を `@/components/Typography` から import。
     - 不要になった import (`AboutHeroImage`, `BlogPost`) を削除。
   - body:
     - `<Layout title="About Me" description="Lorem ipsum dolor sit amet">` でラップ。
     - 中に `<LayoutContainer size="sm">` を置く。
     - `LayoutContainer` の中で:
       - `<Typography as="h1" variant="display">About Me</Typography>`
       - `<Typography as="p" variant="lead">Lorem ipsum dolor sit amet</Typography>`
       - その下に既存の 5 段落の `<p>...</p>` をそのまま並べる。
     - `heroImage` / `HeroBlock` / `FormattedDate` / `pubDate` は載せない。
4. ビルド検証は取りまとめ役側で行うので、ここでは触らない。

# 完了条件

- `src/pages/about.astro` の冒頭が `import Layout from '@/layouts/Layout.astro';` になっている。
- `BlogPost.astro` / `AboutHeroImage` への参照が消えている。
- `<LayoutContainer size="sm">` 直下に Typography（title, lead）と 5 段落 `<p>` が並んでいる。
- インラインスタイル / 新規 BEM クラス追加なし。
- ファイルの末尾改行など Prettier 慣習を崩していない。

# 報告

200 語以内で:
- 変更したファイル一覧
- 採用した最終構造の要旨（どの import、どの順序で何を置いたか）
- 想定外の判断をした箇所があればその理由
