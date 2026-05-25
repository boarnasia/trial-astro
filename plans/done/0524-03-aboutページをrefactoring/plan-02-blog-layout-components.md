---
name: blog-layout-components
model: sonnet
depends_on: []
---

# 目的

`src/components/Layouts/Blog/` 配下に 4 つの新規 React コンポーネント（`LayoutPage` / `LayoutHero` / `LayoutHeader` / `LayoutBody`）と、それぞれの `*.module.scss` および Storybook story を作成する。order2.md の grid レイアウト仕様を満たす。

# 背景・制約

- 必ず最初に `CLAUDE.md` と `docs/feontend-design.md` を読むこと。
- 既存 `src/components/Layouts/LayoutContainer.tsx` および `src/components/Layouts/LayoutHeader.tsx` / `LayoutBody.tsx` 等の sibling パターンに従う。
- 命名:
  - ファイル名は PascalCase。
  - SCSS のセレクタおよび `styles.xxx` アクセスは camelCase（例: `.layoutPage` / `styles.layoutPage`）。
  - `*.module.scss` を `import styles from './XXX.module.scss'` で読み込む。
- export: **named export**（既存トップレベル `LayoutHeader.tsx` 等に揃える）。
- ルート HTML 要素: 4 つとも `<div>`。
- 各コンポーネントは `{ children: React.ReactNode }` だけを受け取るシンプルなラッパー。
- インラインスタイル禁止、`!important` 禁止。
- dev / preview / storybook サーバは起動しない。
- パッケージマネージャは `bun`。

# 変更ファイル（すべて新規作成）

- `src/components/Layouts/Blog/LayoutPage.tsx`
- `src/components/Layouts/Blog/LayoutPage.module.scss`
- `src/components/Layouts/Blog/LayoutPage.stories.tsx`
- `src/components/Layouts/Blog/LayoutHero.tsx`
- `src/components/Layouts/Blog/LayoutHero.module.scss`
- `src/components/Layouts/Blog/LayoutHero.stories.tsx`
- `src/components/Layouts/Blog/LayoutHeader.tsx`
- `src/components/Layouts/Blog/LayoutHeader.module.scss`
- `src/components/Layouts/Blog/LayoutHeader.stories.tsx`
- `src/components/Layouts/Blog/LayoutBody.tsx`
- `src/components/Layouts/Blog/LayoutBody.module.scss`
- `src/components/Layouts/Blog/LayoutBody.stories.tsx`

# 手順

1. ディレクトリ `src/components/Layouts/Blog/` を作成。
2. **`LayoutPage.tsx`**: `<div className={styles.layoutPage}>{children}</div>` を返す関数コンポーネント。
3. **`LayoutPage.module.scss`**: order2.md のスニペット通り、ただし末尾 `;` 補完:
   ```scss
   .layoutPage {
     display: grid;
     grid-template-columns: 1fr;
     grid-template-rows: auto 6em auto 3em auto;
     grid-template-areas:
       "hero"
       "......"
       "header"
       "......"
       "body";
     width: 100%;
   }
   ```
4. **`LayoutHero.tsx`**: 同様に `<div className={styles.layoutHero}>{children}</div>`。
5. **`LayoutHero.module.scss`**:
   ```scss
   .layoutHero {
     grid-area: hero;
   }
   ```
6. **`LayoutHeader.tsx`**: `<div className={styles.layoutHeader}>{children}</div>`。
7. **`LayoutHeader.module.scss`**:
   ```scss
   .layoutHeader {
     grid-area: header;

     display: flex;
     flex-direction: column;
     align-items: center;
     gap: 1em;
     width: 100%;
   }
   ```
8. **`LayoutBody.tsx`**: `<div className={styles.layoutBody}>{children}</div>`。
9. **`LayoutBody.module.scss`**:
   ```scss
   .layoutBody {
     grid-area: body;
   }
   ```
10. **Stories**: 既存 `src/components/Layouts/LayoutContainer.stories.tsx` のスタイルに準拠。
    - 各 story の `title` は `'Layouts/Blog/<ComponentName>'`。
    - `parameters: { layout: 'fullscreen' }` を付ける。
    - 各個別コンポーネント story は `Default` 1 つだけでよい。中身は背景色 + padding の placeholder（インラインスタイル使用可。stories 内部はサンプル表示なので例外として許容）。
    - `LayoutPage.stories.tsx` の `Default` は `LayoutHero` / `LayoutHeader` / `LayoutBody` の 3 子を入れた実用イメージを表示する。
11. すべて Prettier 慣習（末尾改行、2スペースインデント、`;` 必須）に沿う。

# 完了条件

- 12 ファイルが新規作成されている。
- TypeScript の型エラーが出ない（`bun run build` は呼び出し元で実施）。
- 各 `.tsx` は **named export**（`export const LayoutPage = ...` 形式、`default export` は付けない）。
- ファイル冒頭で必要な React import がある（既存兄弟に揃える）。
- SCSS のクラスセレクタは `.layoutPage` / `.layoutHero` / `.layoutHeader` / `.layoutBody`。
- stories は `Meta` / `StoryObj` 型を使う。
- 既存ファイルは変更しない（`Layouts/LayoutHeader.tsx` 等トップレベルに触らない）。

# 報告

200 語以内で:
- 作成ファイル一覧
- export 形態（named であることの確認）
- `LayoutPage` story でどう 3 領域を埋めたか（簡潔に）
- 想定外の判断をした箇所があればその理由
