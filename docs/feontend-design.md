# Frontend Design Specification v1

## Stack

| 役割 | 技術 |
|------|------|
| フレームワーク | Astro (SSG) |
| UIコンポーネント | React (.tsx) |
| スタイル | SCSS + BEM + FLOCSS |
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

## FLOCSS レイヤー構造

```
src/styles/
├── foundation/       # reset, base, variables, mixins
├── layout/           # ページ骨格 (l- prefix)
└── object/
    ├── component/    # 汎用UI部品 (c- prefix)
    ├── project/      # プロジェクト固有 (p- prefix)
    └── utility/      # ユーティリティ (u- prefix)
```

### prefix 規則

| prefix | レイヤー | 例 |
|--------|----------|----|
| `l-` | Layout | `.l-header`, `.l-container` |
| `c-` | Component | `.c-button`, `.c-card` |
| `p-` | Project | `.p-hero`, `.p-article` |
| `u-` | Utility | `.u-hidden`, `.u-mt-16` |

---

## BEM 命名規則

```scss
// Block
.c-card { }

// Element: __
.c-card__title { }
.c-card__image { }

// Modifier: --
.c-card--featured { }
.c-card__title--large { }
```

### ルール

- Block名はコンポーネント名と一致させる
- Element は2階層まで（`.c-card__body__text` は禁止 → `.c-card__text`）
- Modifier は状態・バリアントのみ（`is-` は使わない）

---

## ファイル構成

### Reactコンポーネント

```
src/components/
├── Header.tsx          # Reactコンポーネント
├── Header.scss         # BEM SCSSファイル（同名）
└── Header.stories.tsx  # Storybook
```

### SCSS ファイルの対応

- コンポーネントと同名の `.scss` を同ディレクトリに配置
- `.tsx` 内で `import './ComponentName.scss'` で読み込む

```tsx
// Header.tsx
import './Header.scss';

export const Header = () => (
  <header className="l-header">
    <nav className="c-nav">
      <a className="c-nav__link c-nav__link--active" href="/">Home</a>
    </nav>
  </header>
);
```

```scss
// Header.scss
.l-header {
  // layout styles
}

.c-nav {
  &__link {
    // element styles
  }

  &__link--active {
    // modifier styles
  }
}
```

---

## Foundation

`src/styles/foundation/` に配置する変数・mixin の規約。

```scss
// _variables.scss
$color-primary: #3b82f6;
$color-text: #1a1a1a;
$spacing-base: 8px;

// _mixins.scss
@mixin responsive($bp) {
  @if $bp == md { @media (min-width: 768px) { @content; } }
  @if $bp == lg { @media (min-width: 1024px) { @content; } }
}
```

---

## 禁止事項

- インラインスタイル（`style=` 属性）
- グローバルスコープへの要素セレクタ（`div { }` など）
- BEM なしのクラス名（`.active`, `.wrapper` など）
- `!important` の使用（utility層のみ例外）
