# Refactoring: BEM + FLOCSS + SCSS + React SSG

既存コードを `docs/feontend-design.md` の仕様に準拠させる。

## 背景
- フラットな CSS クラス名（`.active`, `.social-links` 等）
- Astro scoped styles と外部 SCSS が混在
- React コンポーネントと .astro コンポーネントが重複

## サブタスク

| # | ファイル | 内容 | 状態 |
|---|---------|------|------|
| 1 | [01-foundation.md](01-foundation.md) | FLOCSS ディレクトリ構築 + `global.css` → SCSS Foundation 移行 | [ ] |
| 2 | [02-header.md](02-header.md) | `Header.tsx` / `HeaderLink.tsx` BEM 化、.astro 版削除 | [ ] |
| 3 | [03-footer.md](03-footer.md) | `Footer.astro` → `Footer.tsx` React 化 + BEM | [ ] |
| 4 | [04-blogpost.md](04-blogpost.md) | `BlogPost.astro` の scoped styles を SCSS へ抽出 | [ ] |
| 5 | [05-blog-index.md](05-blog-index.md) | `blog/index.astro` の scoped styles を SCSS へ抽出 | [ ] |
| 6 | [06-pages.md](06-pages.md) | 残りページの Header/Footer import を .tsx にスイッチ | [ ] |

## 依存関係
```
Phase 1 → Phase 2, 3, 4, 5（Foundation が全体の基盤）
Phase 2, 3 → Phase 6（ページへの import 差し替え）
Phase 4, 5 は独立して並行可能
```

## 検証
1. `npm run build` — ビルドエラーなし
2. `npm run dev` → /, /blog, /blog/[slug], /about を目視確認
3. `npm run storybook` → Header / Footer stories が正常表示
