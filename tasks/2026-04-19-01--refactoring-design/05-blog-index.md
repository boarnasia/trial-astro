# Phase 5: Blog Index scoped styles 移行

## クラス名マッピング

| 旧 | 新 |
|---|---|
| `ul` | `.c-post-list` |
| `ul li` | `.c-post-list__item` |
| `ul li:first-child` | `.c-post-list__item--featured` (index===0 で付与) |
| `.title` (h4) | `.c-post-card__title` |
| `.date` (p) | `.c-post-card__date` |
| `ul li img` | `.c-post-card__image` |

## 作成するファイル
- `src/styles/component/_c-post-card.scss`

## 変更するファイル
- `src/pages/blog/index.astro`
  - `<style>` ブロック削除
  - BEM クラス名適用
  - `first-child` CSS → `index === 0` で `--featured` modifier を付与
  - Header / Footer import を .tsx にスイッチ（Phase 6 と同時）
