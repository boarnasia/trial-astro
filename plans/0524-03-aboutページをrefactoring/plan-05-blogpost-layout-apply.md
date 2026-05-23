---
name: blogpost-layout-apply
model: sonnet
depends_on: [layout-page-variant]
---

# 目的

`src/layouts/BlogPost.astro` を、shared `@/layouts/Layout.astro` + `<LayoutPage as="article">` 構成に書き換える。heroImage の有無で `LayoutPage` の variant を切り替え、heroImage が無い記事では `<LayoutHero>` 自体を省略する。`<article>` は `LayoutPage` のルート要素として `as` prop 経由で指定する（外側でラップしない）。

# 背景・制約

- 必ず `CLAUDE.md` を読むこと。
- shared `Layout.astro` は `title` / `description` だけを props に取り、内部で `BaseHead`, `Header`, `Footer`, `LayoutBody`（site frame）, `LayoutMain` 等を描画する。そのため `BlogPost.astro` から `BaseHead`, `Header`, `Footer` の直接 import は削除する。
- `Blog/LayoutPage` に `variant?: 'with-hero' | 'without-hero'` および `as?: 'div' | 'article' | 'section' | 'main'` が plan-04 で追加済み。
- 既存の `c-post__*` BEM クラス（date / title-area / body / updated）は廃止する。日付は `Typography variant="muted"` で表現する（クラス指定なし）。
- `<hr />` は廃止（LayoutHeader と LayoutBody の間に 3em スペーサがあるため）。
- 本文（`<slot />`）は `<LayoutContainer size="sm">` でラップ（about.astro と幅を揃える）。
- インラインスタイル禁止、`!important` 禁止、生 BEM クラスの新規追加禁止。
- dev / preview / storybook サーバは起動しない。

# 変更ファイル

- `src/layouts/BlogPost.astro` ... 更新（ほぼ全文書き換え）

# 手順

1. `src/layouts/BlogPost.astro` を読む。
2. frontmatter:
   - 残す import: `Image` (astro:assets), `CollectionEntry` (astro:content), `FormattedDate`, `HeroBlock`, `Typography`
   - 追加 import:
     ```ts
     import Layout from '@/layouts/Layout.astro';
     import LayoutContainer from '@/components/Layouts/LayoutContainer';
     import { LayoutPage } from '@/components/Layouts/Blog/LayoutPage';
     import { LayoutHero } from '@/components/Layouts/Blog/LayoutHero';
     import { LayoutHeader } from '@/components/Layouts/Blog/LayoutHeader';
     import { LayoutBody } from '@/components/Layouts/Blog/LayoutBody';
     ```
   - 削除する import: `BaseHead`, `Footer`, `Header`
   - Props 型 (`CollectionEntry<'blog'>['data']`) と分割代入 (`title, description, pubDate, updatedDate, heroImage`) はそのまま残す。
3. body:
   - 既存の `<html>` / `<head>` / `<body>` / `<main>` を全て削除。
   - 以下に置き換え（`<article>` は外側に書かず、`LayoutPage as="article"` でルートに指定）:
     ```astro
     <Layout title={title} description={description}>
       <LayoutPage as="article" variant={heroImage ? 'with-hero' : 'without-hero'}>
         {heroImage && (
           <LayoutHero>
             <HeroBlock>
               <Image width={1020} height={510} src={heroImage} alt="" />
             </HeroBlock>
           </LayoutHero>
         )}
         <LayoutHeader>
           <Typography as="p" variant="muted">
             <FormattedDate date={pubDate} />
             {updatedDate && (
               <Fragment>
                 {' ・ Last updated on '}
                 <FormattedDate date={updatedDate} />
               </Fragment>
             )}
           </Typography>
           <Typography as="h1" variant="display">{title}</Typography>
           <Typography as="p" variant="lead">{description}</Typography>
         </LayoutHeader>
         <LayoutBody>
           <LayoutContainer size="sm">
             <slot />
           </LayoutContainer>
         </LayoutBody>
       </LayoutPage>
     </Layout>
     ```
4. Astro では `<Fragment>` が組み込みで使える（明示的な import 不要）。`updatedDate` が無い場合は何も描画しない（Typography の中身は `FormattedDate` のみ）。

# 完了条件

- `BlogPost.astro` が `<Layout>` 経由になり、`<html>` / `<head>` / `<body>` / `<main>` の直接記述が消えている。
- `BaseHead`, `Header`, `Footer` の import が消えている。
- `<LayoutPage as="article" ...>` が `<Layout>` 直下にあり、独立した `<article>` タグでは包まれていない（ルート要素として LayoutPage に統合）。
- heroImage がある場合 `variant="with-hero"` + `<LayoutHero>` 描画、無い場合 `variant="without-hero"` + `<LayoutHero>` なし。
- `c-post__*` BEM クラスの新規記述なし。`<hr />` なし。
- 本文 `<slot />` が `<LayoutContainer size="sm">` 内にある。
- ファイル末尾改行など Prettier 慣習を崩していない。

# 報告

200 語以内で:
- 変更ファイル
- 最終構造の要旨
- updatedDate の描き方をどう実装したか（Fragment / 別 Typography 行 / その他）
- 想定外の判断があればその理由
