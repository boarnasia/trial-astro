# Phase 2: Header コンポーネント BEM 化

## クラス名マッピング

| 旧 | 新 |
|---|---|
| `header` (要素) | `.c-header` |
| `nav` | `.c-header__nav` |
| `h2 > a` | `.c-header__brand` |
| `.internal-links` | `.c-header__nav-links` |
| `.social-links` | `.c-header__social` |
| `.active` | `.c-header__link--active` |
| `.sr-only` | `.u-sr-only` |

## 作成するファイル
- `src/styles/component/_c-header.scss`

## 変更するファイル
- `src/components/Header.tsx`
- `src/components/HeaderLink.tsx`

## 削除するファイル
- `src/components/Header.astro`
- `src/components/HeaderLink.astro`
- `src/components/Header.scss`

## 補足
- `HeaderLink` の `baseClass` は `"c-header__link"` ハードコードで可（Storybook 内のみ使用）
- pages / layouts の Header import 差し替えは Phase 6 で実施
