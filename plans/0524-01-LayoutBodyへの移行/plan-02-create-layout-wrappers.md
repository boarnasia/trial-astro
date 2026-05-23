---
name: create-layout-wrappers
model: haiku
depends_on: []
---

# 目的

`LayoutHeader` / `LayoutMain` / `LayoutFooter` の 3 つのレイアウトスロットコンポーネントを新規作成する。それぞれが grid-area を 1 つずつ受け持ち、children を表示する薄いラッパー。

# 背景・制約

- スタイルは CSS Modules（`*.module.scss`）。BEM/FLOCSS の prefix は不要、クラス名はキャメルケース。
- 既存 `src/components/Layouts/LayoutBody.tsx` と同じパターンに合わせる（参考のため必ず先に読むこと）。
- LayoutHeader / LayoutFooter は `<div>` を出す（中の `<Header/>` `<Footer/>` 側が既に semantic tag を持つため、二重を避ける）。
- LayoutMain のみ `<main>` を出す（コンテンツに対するセマンティクスを担う）。
- props は `children: React.ReactNode` のみ。追加 props は不要。

# 変更ファイル

- `src/components/Layouts/LayoutHeader.tsx` — 新規
- `src/components/Layouts/LayoutHeader.module.scss` — 新規
- `src/components/Layouts/LayoutMain.tsx` — 新規
- `src/components/Layouts/LayoutMain.module.scss` — 新規
- `src/components/Layouts/LayoutFooter.tsx` — 新規
- `src/components/Layouts/LayoutFooter.module.scss` — 新規

# 手順

## LayoutHeader.tsx

```tsx
import React from 'react';
import styles from './LayoutHeader.module.scss';

interface LayoutHeaderProps {
  children: React.ReactNode;
}

export const LayoutHeader = ({ children }: LayoutHeaderProps) => {
  return <div className={styles.layoutHeader}>{children}</div>;
};
```

## LayoutHeader.module.scss

```scss
.layoutHeader {
  grid-area: header;
}
```

## LayoutMain.tsx

```tsx
import React from 'react';
import styles from './LayoutMain.module.scss';

interface LayoutMainProps {
  children: React.ReactNode;
}

export const LayoutMain = ({ children }: LayoutMainProps) => {
  return <main className={styles.layoutMain}>{children}</main>;
};
```

## LayoutMain.module.scss

```scss
.layoutMain {
  grid-area: main;
}
```

## LayoutFooter.tsx

```tsx
import React from 'react';
import styles from './LayoutFooter.module.scss';

interface LayoutFooterProps {
  children: React.ReactNode;
}

export const LayoutFooter = ({ children }: LayoutFooterProps) => {
  return <div className={styles.layoutFooter}>{children}</div>;
};
```

## LayoutFooter.module.scss

```scss
.layoutFooter {
  grid-area: footer;
}
```

# 完了条件

- 6 ファイルが上記スニペット通りに存在する。
- どのコンポーネントも default export ではなく named export。
- どの .scss ファイルにも要素セレクタ（`div { ... }` 等）が含まれない。

# 報告

新規作成したファイルパス一覧を箇条書きで報告すること（200 語以内）。
