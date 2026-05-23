---
name: wire-up
model: sonnet
depends_on: [hero-component]
---

# 目的

`src/layouts/BlogPost.astro` を新しい `HeroBlock` コンポーネントを使うよう書き換え、`src/styles/component/_c-post.scss` から hero ブロックの古い記述を取り除く。

# 背景・制約

- `CLAUDE.md` を必ず先に読む。
- マスター計画の「API 方針」に従い、`<HeroBlock>...</HeroBlock>` の slot 形式で呼び出す。
- `astro:assets` の `<Image>` は引き続き使う（最適化のため）。`HeroBlock` の `image` prop に Astro 側でレンダリングした `<Image>` を渡す。
- React コンポーネントを Astro から呼ぶ際の hydration ディレクティブは付けない（静的レンダリングで十分）。
- `c-post__body` / `c-post__title-area` / `c-post__date` / `c-post__updated` は本 plan のスコープ外。`_c-post.scss` から削除するのは `&__hero` ブロックのみ。
- インラインスタイル禁止、命名規則変更禁止（既存の他のクラスはそのまま）。

# 変更ファイル

- `src/layouts/BlogPost.astro` ... 更新（Hero ブロック差し替え、import 追加）
- `src/styles/component/_c-post.scss` ... 更新（`&__hero` ブロックを削除）

# 手順

1. `src/layouts/BlogPost.astro` の冒頭 import に `import HeroBlock from '../components/HeroBlock';` を追加。
2. 既存の以下のブロックを置き換える:

   ```astro
   <div class="c-post__hero">
       {heroImage && <Image width={1020} height={510} src={heroImage} alt="" />}
   </div>
   ```

   → 

   ```astro
   {heroImage && (
     <HeroBlock>
       <Image width={1020} height={510} src={heroImage} alt="" />
     </HeroBlock>
   )}
   ```

   - `heroImage` が無いケースで HeroBlock 自体を出さない方針（現状は空の `<div class="c-post__hero">` が残るが、機能的に不要のため削る）。
3. `src/styles/component/_c-post.scss` から `&__hero { ... }` ブロックを削除。他のセレクタは触らない。
4. `_c-post.scss` の `@use` 登録（`_index.scss`）は変更不要。

# 完了条件

- BlogPost.astro が `HeroBlock` を利用しており、`<div class="c-post__hero">` の記述が完全に消えている。
- `_c-post.scss` から `&__hero` セクションが削除されている。
- `bun run build` が通る（取りまとめ役が最終的に実行するが、ローカルでビルドが通る状態にしておく）。

# 報告

200 語以内で:
- 変更したファイルと差分概要（追加・削除行）
- BlogPost.astro 内での HeroBlock 呼び出し箇所
- ビルド試行結果（試したなら）
