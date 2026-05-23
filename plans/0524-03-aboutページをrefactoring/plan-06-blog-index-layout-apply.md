---
name: blog-index-layout-apply
model: sonnet
depends_on: [layout-page-variant]
---

# 目的

`src/pages/blog/[...page].astro` を、shared `@/layouts/Layout.astro` + `Blog/LayoutPage variant="without-hero"` 構成に書き換える。eyebrow / display / lead は `LayoutHeader` に、`BlogSearch` + 記事リスト + `Pagination` は `LayoutBody > LayoutContainer size="md"` に配置する。

# 背景・制約

- 必ず `CLAUDE.md` を読むこと。
- shared `Layout.astro` は `title` / `description` だけ受け取り、内部で `BaseHead`, `Header`, `Footer` を描画する。直接 import は削除する。
- `BlogSearch` は `client:load` で interactive 描画必須。削除・変更しない。
- 記事一覧の `<ul class="c-post-list">` および `c-post-list__item` / `c-post-list__item--featured` / `c-post-card__*` BEM クラスはそのまま残す（リファクタ範囲外）。
- `Pagination` の渡しているプロップも変更しない。
- インラインスタイル禁止、`!important` 禁止、生 BEM クラスの新規追加禁止。
- dev / preview / storybook サーバは起動しない。

# 変更ファイル

- `src/pages/blog/[...page].astro` ... 更新

# 手順

1. `src/pages/blog/[...page].astro` を読む。
2. frontmatter:
   - 残す import: `Image` (astro:assets), `GetStaticPaths`, `getCollection` / `CollectionEntry`, `BlogSearch`, `FormattedDate`, `Pagination`, `Typography`, `SITE_DESCRIPTION` / `SITE_TITLE`
   - 追加 import:
     ```ts
     import Layout from '@/layouts/Layout.astro';
     import LayoutContainer from '@/components/Layouts/LayoutContainer';
     import { LayoutPage } from '@/components/Layouts/Blog/LayoutPage';
     import { LayoutHeader } from '@/components/Layouts/Blog/LayoutHeader';
     import { LayoutBody } from '@/components/Layouts/Blog/LayoutBody';
     ```
   - 削除 import: `BaseHead`, `Footer`, `Header`
   - 既存の `getStaticPaths` / `page` / `allPosts` / `allPostsMeta` のロジックは触らない。
3. body:
   - 既存の `<!doctype html>` / `<html>` / `<head>` / `<body>` / `<main>` / `<section>` を全て削除。
   - 以下に置き換え:
     ```astro
     <Layout title={SITE_TITLE} description={SITE_DESCRIPTION}>
       <LayoutPage variant="without-hero">
         <LayoutHeader>
           <Typography as="p" variant="eyebrow">Blog</Typography>
           <Typography as="h1" variant="display">記事一覧</Typography>
           <Typography as="p" variant="lead">
             MDX で管理された記事を、検索とページングで快適に読めるようにしています。
           </Typography>
         </LayoutHeader>
         <LayoutBody>
           <LayoutContainer size="md">
             <BlogSearch posts={allPostsMeta} client:load />
             <ul class="c-post-list">
               {
                 page.data.map((post, index) => (
                   <li class={`c-post-list__item${index === 0 && page.currentPage === 1 ? ' c-post-list__item--featured' : ''}`}>
                     <a class="c-post-list__link" href={`/blog/${post.id}/`}>
                       {post.data.heroImage && (
                         <Image
                           class="c-post-card__image"
                           width={720}
                           height={360}
                           src={post.data.heroImage}
                           alt=""
                         />
                       )}
                       <h4 class="c-post-card__title">{post.data.title}</h4>
                       <p class="c-post-card__date">
                         <FormattedDate date={post.data.pubDate} />
                       </p>
                     </a>
                   </li>
                 ))
               }
             </ul>
             <Pagination
               currentPage={page.currentPage}
               lastPage={page.lastPage}
               prevUrl={page.url.prev}
               nextUrl={page.url.next}
             />
           </LayoutContainer>
         </LayoutBody>
       </LayoutPage>
     </Layout>
     ```
4. 既存の post list / pagination のマークアップは（インデント以外）変更しない。

# 完了条件

- `[...page].astro` が `<Layout>` 経由になり、`<!doctype html>` / `<html>` / `<head>` / `<body>` / `<main>` / `<section>` の直接記述が消えている。
- `BaseHead`, `Header`, `Footer` の import が消えている。
- `<LayoutPage variant="without-hero">` 直下に `<LayoutHeader>` と `<LayoutBody>` の 2 子要素が並ぶ。
- `<BlogSearch posts={allPostsMeta} client:load />` の記述が `LayoutContainer` 内に残っている。
- 記事リストの `c-post-list*` / `c-post-card*` クラスは全て元通り。
- `Pagination` の prop が変わっていない。
- ファイル末尾改行など Prettier 慣習を崩していない。

# 報告

200 語以内で:
- 変更ファイル
- 最終構造の要旨
- 想定外の判断があればその理由
