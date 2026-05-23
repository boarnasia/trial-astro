---
name: layout-page-variant
model: sonnet
depends_on: []
---

# 目的

`src/components/Layouts/Blog/LayoutPage.tsx` に 2 つの prop を追加する:

1. `variant?: 'with-hero' | 'without-hero'` — hero の有無で grid 構造を切り替え
2. `as?: 'div' | 'article' | 'section' | 'main'` — ルート HTML 要素を呼び出し側で指定可能（polymorphic）

Storybook に WithoutHero ストーリーを追加する。

# 背景・制約

- 必ず `CLAUDE.md` と `docs/feontend-design.md` を読むこと。
- plan2 で作成した既存実装を破壊しない後方互換が必要。具体的には prop を省略すると `variant='with-hero'` / `as='div'`（これまでと同じ振る舞い）になる。
- 既存パターン参考: `src/components/Typography.tsx` の `variant` / `as` 実装、`src/components/Layouts/LayoutContainer.tsx` の `size` 実装。
- `as` の実装は Typography と同様に `Component = as` と型 alias を切り、JSX で `<Component ...>` として描画する形が望ましい。
- SCSS のクラスセレクタは camelCase で、`styles.layoutPage` / `styles['variant-with-hero']` 形式でアクセス。
- インラインスタイル / `!important` 禁止。
- dev / preview / storybook サーバは起動しない。

# 変更ファイル

- `src/components/Layouts/Blog/LayoutPage.tsx` ... 更新（prop 追加）
- `src/components/Layouts/Blog/LayoutPage.module.scss` ... 更新（variant クラス追加、ベースから grid-template-* を分離）
- `src/components/Layouts/Blog/LayoutPage.stories.tsx` ... 更新（WithoutHero ストーリー追加、Default は variant 未指定で既存通り）

# 手順

1. **`LayoutPage.tsx`** を更新:
   ```tsx
   import React from 'react';
   import styles from './LayoutPage.module.scss';

   type LayoutPageVariant = 'with-hero' | 'without-hero';
   type LayoutPageElement = 'div' | 'article' | 'section' | 'main';

   interface LayoutPageProps {
     children: React.ReactNode;
     variant?: LayoutPageVariant;
     as?: LayoutPageElement;
   }

   export const LayoutPage = ({
     children,
     variant = 'with-hero',
     as: Component = 'div',
   }: LayoutPageProps) => {
     return (
       <Component className={`${styles.layoutPage} ${styles[`variant-${variant}`]}`}>
         {children}
       </Component>
     );
   };
   ```

2. **`LayoutPage.module.scss`** を更新:
   ```scss
   .layoutPage {
     display: grid;
     grid-template-columns: 1fr;
     width: 100%;
   }

   .variant-with-hero {
     grid-template-rows: auto 6em auto 3em auto;
     grid-template-areas:
       "hero"
       "......"
     "header"
       "......"
       "body";
   }

   .variant-without-hero {
     grid-template-rows: auto 3em auto;
     grid-template-areas:
       "header"
       "......"
       "body";
   }
   ```
   （※ ベース `.layoutPage` から `grid-template-rows` / `grid-template-areas` を削除し、variant 側に持たせる。インデントは Prettier に合わせる）

3. **`LayoutPage.stories.tsx`** を更新:
   - 既存 `Default` story はそのまま残す（variant 未指定 = with-hero と同等）。
   - 新規 `WithoutHero` story を追加:
     ```tsx
     export const WithoutHero: Story = {
       args: {
         variant: 'without-hero',
         children: (
           <>
             <LayoutHeader>
               <div style={{ background: '#bfdbfe', padding: '1.5em', width: '100%', textAlign: 'center' }}>
                 Header: 記事タイトル・メタ情報
               </div>
             </LayoutHeader>
             <LayoutBody>
               <div style={{ background: '#d1fae5', padding: '2em' }}>
                 Body: 本文コンテンツが入る
               </div>
             </LayoutBody>
           </>
         ),
       },
     };
     ```
   - `argTypes` で variant / as を control に出すのが望ましい（任意）:
     ```ts
     argTypes: {
       variant: {
         control: { type: 'radio' },
         options: ['with-hero', 'without-hero'],
       },
       as: {
         control: { type: 'select' },
         options: ['div', 'article', 'section', 'main'],
       },
     },
     ```

4. 既存ストーリーの import / 型は触らない。

# 完了条件

- `LayoutPage` を prop なしで呼ぶと既存（`<div>` + with-hero）の振る舞いになる。
- `variant="without-hero"` で呼ぶと hero 行とその後の 6em スペーサが消えた grid が適用される。
- `as="article"` で呼ぶとルート要素が `<article>` になる（クラスは付与されたまま）。
- TypeScript 型エラーが出ない（呼び出し元での型推論も壊さない）。
- Storybook の `Default` は表示が変わらず、`WithoutHero` が追加される。
- 他の `Blog/*` ファイルは変更されない。
- インラインスタイルは story 内 placeholder のみで本体には書かない。

# 報告

200 語以内で:
- 変更ファイル
- API（`variant` / `as` の prop 名・デフォルト値・許容値）
- SCSS の構造変更の要旨（base / variant の分け方）
- 想定外の判断があればその理由
