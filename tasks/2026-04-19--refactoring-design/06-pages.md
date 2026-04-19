# Phase 6: ページ import 更新

## 変更するファイル

| ファイル | 変更内容 |
|---------|---------|
| `src/pages/index.astro` | `Header.astro` → `Header.tsx`, `Footer.astro` → `Footer.tsx` |
| `src/layouts/BlogPost.astro` | 同上（Phase 4 と同時実施） |
| `src/pages/blog/index.astro` | 同上（Phase 5 と同時実施） |

## 補足
- React コンポーネントは `client:` ディレクティブなしで SSG 静的レンダリング
- `<Header currentPath={Astro.url.pathname} />` の props 渡し方は既存パターンを踏襲
