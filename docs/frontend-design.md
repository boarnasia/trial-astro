# Frontend Design Specification v2

## Stack

| 役割 | 技術 |
|------|------|
| フレームワーク | Astro (SSG) |
| UIコンポーネント | React (.tsx) |
| スタイル | SCSS (CSS Modules + Foundation/Utility は BEM + FLOCSS) |
| コンポーネント開発 | Storybook |

---

## レンダリング方針

- **ページ・レイアウト**: `.astro` ファイル
- **UIコンポーネント**: React `.tsx` ファイル（SSG静的レンダリング）
- **インタラクションが不要**: `client:` ディレクティブなし（サーバーサイドのみ）
- **インタラクションが必要**: `client:load` を明示的に付与

```astro
<!-- 静的レンダリング（デフォルト） -->
<MyComponent />

<!-- クライアントサイド必要な場合のみ -->
<MyComponent client:load />
```

---

## スタイル構成

グローバルスタイルはレイヤーを限定し、コンポーネント固有のスタイルは CSS Modules で完結させる。

```
src/styles/
├── foundation/       # reset, variables, mixins, base（グローバル）
├── utility/          # u-* ユーティリティ（グローバル）
└── main.scss         # foundation / utility をまとめてインポート
```

> `object/`（`component/`, `project/`）は廃止済み。`c-*`, `p-*` プレフィックスは使わない。

コンポーネント単位のスタイルは `*.module.scss` をコンポーネントと同階層に colocate する。

---

## CSS Modules（コンポーネント層）

コンポーネント固有のすべてのスタイルは CSS Modules で書く。これがスタイリングの主要手段。

### ファイル命名・インポート

- ファイル名: `Component.module.scss`（コンポーネントと同階層）
- インポート: `import styles from './Component.module.scss'`

```tsx
// Header.tsx
import styles from './Header.module.scss';

export const Header = () => (
  <header className={styles.header}>
    <nav className={styles.nav}>
      <a className={styles.link} href="/">Home</a>
    </nav>
  </header>
);
```

### クラス命名

キャメルケースで書く（`headerNav`, `linkActive` 等）。BEM の `__` `--` プレフィックスは使わない。

```scss
// Header.module.scss
.header { }
.nav { }
.navLinks { }
.link { }
.linkActive { }   // Modifier 相当はキャメルケースで表現
```

### 3原則

1. **クラスセレクタのみでスタイルを当てる** — タグセレクタ（`div { }`, `section { }`, ネスト内の `a { }` など）は使わない
2. **ネスト内でもタグセレクタを使わない** — `.card { a { } }` のような書き方は避け、`.cardLink` 等のクラスを切る
3. **詳細度はクラス1階層に揃える** — `!important` 不要、`:global` は原則使わない

```scss
// 良い例
.brand { }
.brandLink { }   // a 要素にはクラスを付与して参照

// 避ける例（タグセレクタによるネスト）
.brand {
  a { }   // NG: タグセレクタ
}
```

---

## Foundation 層

`src/styles/foundation/` に配置するグローバルスタイルの規約。リセット・変数・mixin・ベーススタイルを担う。

```scss
// _variables.scss
$color-primary: #3b82f6;
$color-text: #1a1a1a;
$spacing-base: 8px;

// _mixins.scss（例）
@mixin responsive($bp) {
  @if $bp == md { @media (min-width: 768px) { @content; } }
  @if $bp == lg { @media (min-width: 1024px) { @content; } }
}
```

Foundation 層はグローバルスコープに展開されるため、**要素セレクタを直接スタイリングする場合は `_base.scss`（reset 目的）に限定する**。

---

## Utility 層（BEM + FLOCSS の残置）

`src/styles/utility/` に `u-*` プレフィックスのクラスのみを置く。単一目的のユーティリティとして使用する。

```scss
// _u-sr-only.scss
.u-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
```

- `!important` の使用はこの層のみ例外として認める
- `c-*`, `p-*`, `l-*` プレフィックスは廃止済み。新規に追加しない

---

## ファイル構成

`.tsx` / `.astro` / `.stories.tsx` / `.module.scss` は同階層に colocate する。サブディレクトリは不要。

```
src/components/
├── ui/
│   ├── Header.tsx
│   ├── Header.module.scss
│   └── Header.stories.tsx
└── layouts/
    ├── MainLayout.astro
    └── MainLayout.module.scss
```

---

## 禁止事項

- インラインスタイル（`style=` 属性）
- `*.module.scss` 内のタグセレクタ（`.wrapper { a { } }` のようなネスト含む）
- グローバルスコープへの要素セレクタ（foundation/`_base.scss` の reset を除く）
- `!important`（utility 層のみ例外）
- `c-*`, `p-*`, `l-*` プレフィックスの新規追加（廃止済みレイヤー）
- `:global` の使用（原則禁止）

---

## 移行状況に関する注記

移行途中のため、一部の既存コンポーネントには BEM クラス名やネストタグセレクタが残っている（例: `Header.module.scss` 内の `a {}` ネスト、旧 `*.scss` の `.c-*` クラス）。新規コンポーネントの作成・既存コンポーネントの改修時に、本仕様へ寄せていく。
