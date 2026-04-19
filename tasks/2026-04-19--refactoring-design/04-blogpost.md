# Phase 4: BlogPost レイアウト scoped styles 移行

## クラス名マッピング

| 旧 | 新 |
|---|---|
| `.hero-image` | `.c-post__hero` |
| `.prose` | `.c-post__body` |
| `.title` (div) | `.c-post__title-area` |
| `.date` | `.c-post__date` |
| `.last-updated-on` | `.c-post__updated` |

## 作成するファイル
- `src/styles/component/_c-post.scss`
  - `.c-post__body p { margin-bottom: 2em }` を含める（`global.css` の `.prose p` を置換）

## 変更するファイル
- `src/layouts/BlogPost.astro`
  - `<style>` ブロック削除
  - BEM クラス名適用
  - Header / Footer import を .tsx にスイッチ（Phase 6 と同時）
