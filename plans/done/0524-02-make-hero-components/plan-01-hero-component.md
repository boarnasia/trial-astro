---
name: hero-component
model: sonnet
depends_on: []
---

# 目的

`HeroBlock` コンポーネント本体（`.tsx`）と CSS Modules スタイル（`.module.scss`）を新規作成する。BlogPost.astro への差し替えやストーリー追加は別 plan で行うため、本 plan ではコンポーネントを定義するだけでよい。

# 背景・制約

- `plans/0524-02-make-hero-components/plan.md` のマスター計画と「API 方針」セクションに従うこと。
- `CLAUDE.md` を必ず先に読む。
- スタイルは CSS Modules（`*.module.scss` + `import styles from`）。BEM プレフィックス (`c-` 等) は付けず、キャメルケース命名（`heroBlock`）。
- 参考: `src/components/Typography.tsx` / `Typography.module.scss`、`src/components/Layouts/LayoutBody.tsx` / `LayoutBody.module.scss`。
- 元スタイルは `src/styles/component/_c-post.scss` の `&__hero` ブロック。

```scss
.c-post {
  &__hero {
    width: 100%;
    img {
      display: block;
      margin: 0 auto;
      border-radius: 12px;
      box-shadow: var(--box-shadow);
    }
  }
}
```

これを `HeroBlock.module.scss` 側に移植する。元ファイルからの削除は別 plan（wire-up）で実施するため、本 plan では触らない。

# 変更ファイル

- `src/components/HeroBlock.tsx` ... 新規
- `src/components/HeroBlock.module.scss` ... 新規

# 手順

1. `src/components/HeroBlock.module.scss` を作成。`heroBlock` クラスに `width: 100%` を設定。配下の `img` 要素に `display: block; margin: 0 auto; border-radius: 12px; box-shadow: var(--box-shadow);` を当てる。
2. `src/components/HeroBlock.tsx` を作成。以下のシグネチャ:

   ```tsx
   import type { ReactNode } from 'react';
   import styles from './HeroBlock.module.scss';

   interface HeroBlockProps {
     children: ReactNode;
   }

   export const HeroBlock = ({ children }: HeroBlockProps) => (
     <div className={styles.heroBlock}>{children}</div>
   );

   export default HeroBlock;
   ```

   - `default export` と named export の両方を提供（既存の Typography が default、LayoutBody が named のため両対応にしておくと呼び出し側が選べる）。
3. 既存コンポーネントの import スタイルに合わせる（拡張子なし）。

# 完了条件

- `src/components/HeroBlock.tsx` と `src/components/HeroBlock.module.scss` が新規作成されている。
- TypeScript 型エラーが出ない（`bun run build` は wire-up 後に実施するため、ここでは構文・型レベルで矛盾がないこと）。
- 元の `_c-post.scss` には触れていない（wire-up plan の責務）。

# 報告

200 語以内で:
- 作成したファイルパス
- `HeroBlock` の最終的なシグネチャ（props 型）
- CSS Modules 側のクラス名
- 気付いた懸念（あれば）
