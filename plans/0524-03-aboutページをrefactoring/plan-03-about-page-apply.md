---
name: about-page-apply
model: sonnet
depends_on: [blog-layout-components]
---

# 目的

`src/pages/about.astro` を、新規 `Blog/LayoutPage` 構成に切り替える。`HeroBlock` + `AboutHeroImage` を `LayoutHero` 内で復活させ、タイトル / リードを `LayoutHeader` に、本文段落を `LayoutBody > LayoutContainer size="sm"` に配置する。

# 背景・制約

- 必ず最初に `CLAUDE.md` を読むこと。
- 直前の refactor（`plan-01-refactor-about-page.md`, 完了済み）で `src/pages/about.astro` は `Layout + LayoutContainer + Typography + HeroBlock` 構成になっている。今回はその上に新しい Blog レイアウトを挟む。
- 新コンポーネントは sub-plan `blog-layout-components` で作成済み。import path:
  - `import { LayoutPage } from '@/components/Layouts/Blog/LayoutPage';`
  - `import { LayoutHero } from '@/components/Layouts/Blog/LayoutHero';`
  - `import { LayoutHeader } from '@/components/Layouts/Blog/LayoutHeader';`
  - `import { LayoutBody } from '@/components/Layouts/Blog/LayoutBody';`
- 既存の `Layout`（`@/layouts/Layout.astro`）はそのまま外側に残す。
- 本文 Lorem ipsum 5 段落は **変更しない**（マークアップの差し替えのみ）。
- インラインスタイル禁止、`!important` 禁止、生 BEM クラスの新規追加禁止。
- dev / preview / storybook サーバは起動しない。

# 変更ファイル

- `src/pages/about.astro` ... 更新

# 手順

1. `src/pages/about.astro` を読む。
2. frontmatter:
   - `LayoutPage` / `LayoutHero` / `LayoutHeader` / `LayoutBody` を `@/components/Layouts/Blog/...` から import 追加。
   - 既存の `Layout`, `Image`, `AboutHeroImage`, `LayoutContainer`, `Typography`, `HeroBlock` import は維持。
3. body を以下の構造に置き換える:
   ```astro
   <Layout title="About Me" description="Lorem ipsum dolor sit amet">
     <LayoutPage>
       <LayoutHero>
         <HeroBlock>
           <Image src={AboutHeroImage} alt="About Me" />
         </HeroBlock>
       </LayoutHero>
       <LayoutHeader>
         <Typography as="h1" variant="display">About Me</Typography>
         <Typography as="p" variant="lead">Lorem ipsum dolor sit amet</Typography>
       </LayoutHeader>
       <LayoutBody>
         <LayoutContainer size="sm">
           <p>...</p>
           <!-- 既存 5 段落をそのまま -->
         </LayoutContainer>
       </LayoutBody>
     </LayoutPage>
   </Layout>
   ```
4. 既存の `<article>` ラッパは `<LayoutPage>` に置き換える（order2 の例には `<article>` がないため）。
5. Typography（タイトル / リード）は `LayoutContainer` 内側から `LayoutHeader` 内へ移動する。
6. Lorem ipsum 5 段落と `LayoutContainer size="sm"` ラップはそのまま `LayoutBody` 内に残す。

# 完了条件

- `src/pages/about.astro` が `<Layout>` の中に `<LayoutPage>` を持ち、`<LayoutPage>` 直下に `LayoutHero` / `LayoutHeader` / `LayoutBody` の 3 子要素を持つ構造になっている。
- `<HeroBlock>` が `LayoutHero` 内、`Image` 付きで存在する。
- Typography（h1, lead）が `LayoutHeader` 内にある。
- 本文 5 段落 + `LayoutContainer size="sm"` ラップが `LayoutBody` 内にある。
- `<article>` タグは存在しない。
- インラインスタイル / 新規 BEM クラス追加なし。
- ファイル末尾改行など Prettier 慣習を崩していない。

# 報告

200 語以内で:
- 変更ファイル
- 最終構造の要旨（import と body ネスト）
- 想定外の判断をした箇所があればその理由
