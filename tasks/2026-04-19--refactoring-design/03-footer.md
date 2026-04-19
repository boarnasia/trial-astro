# Phase 3: Footer コンポーネント React 化 + BEM

## クラス名マッピング

| 旧 | 新 |
|---|---|
| `footer` (要素) | `.c-footer` |
| `.social-links` | `.c-footer__social` |
| `.sr-only` | `.u-sr-only` |

## 作成するファイル
- `src/components/Footer.tsx`
- `src/components/Footer.stories.tsx`
- `src/styles/component/_c-footer.scss`

## 削除するファイル
- `src/components/Footer.astro`

## 補足
- `Footer.astro` のグラデーション背景・ソーシャルリンク構造を React に移植
- pages / layouts の Footer import 差し替えは Phase 6 で実施
