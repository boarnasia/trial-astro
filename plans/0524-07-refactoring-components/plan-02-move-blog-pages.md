---
name: move-blog-pages
model: sonnet
depends_on: [move-site-layouts]
---

# 目的

`src/components/Layouts/Blog/Layout*.{tsx,module.scss,stories.tsx}` を `src/components/pages/blog/*Layout.*` へ **Postfix リネーム＋移動**し、`src/components/BlogSearch.*` も同じく `pages/blog/` 配下へ移動する。最後に空になった `src/components/Layouts/` を削除する。

# 背景・制約

- マスター: `plans/0524-07-refactoring-components/plan.md`
- 前段（plan-01）で `Layouts/` 直下の Layout* はすでに移動済み。`Layouts/Blog/` だけが残っている状態を前提
- プロジェクト規約: `CLAUDE.md`、`docs/feontend-design.md` を必ず読むこと
- dev / preview / storybook サーバは起動しない。検証は `bun run build` のみ
- パッケージマネージャは **bun**
- `pages/blog/BodyLayout.tsx` と `layouts/BodyLayout.tsx`（plan-01 で作成済み）は同名だが衝突しない（利用側 `.astro` がいずれか一方しか import しないため）。**改名や alias は行わない**

# 変更ファイル

## 移動＋リネーム

| 旧 | 新 |
| :-- | :-- |
| `src/components/Layouts/Blog/LayoutBody.tsx` | `src/components/pages/blog/BodyLayout.tsx` |
| `src/components/Layouts/Blog/LayoutBody.module.scss` | `src/components/pages/blog/BodyLayout.module.scss` |
| `src/components/Layouts/Blog/LayoutBody.stories.tsx` | `src/components/pages/blog/BodyLayout.stories.tsx` |
| `src/components/Layouts/Blog/LayoutHeader.tsx` | `src/components/pages/blog/HeaderLayout.tsx` |
| `src/components/Layouts/Blog/LayoutHeader.module.scss` | `src/components/pages/blog/HeaderLayout.module.scss` |
| `src/components/Layouts/Blog/LayoutHeader.stories.tsx` | `src/components/pages/blog/HeaderLayout.stories.tsx` |
| `src/components/Layouts/Blog/LayoutHero.tsx` | `src/components/pages/blog/HeroLayout.tsx` |
| `src/components/Layouts/Blog/LayoutHero.module.scss` | `src/components/pages/blog/HeroLayout.module.scss` |
| `src/components/Layouts/Blog/LayoutHero.stories.tsx` | `src/components/pages/blog/HeroLayout.stories.tsx` |
| `src/components/Layouts/Blog/LayoutPage.tsx` | `src/components/pages/blog/PageLayout.tsx` |
| `src/components/Layouts/Blog/LayoutPage.module.scss` | `src/components/pages/blog/PageLayout.module.scss` |
| `src/components/Layouts/Blog/LayoutPage.stories.tsx` | `src/components/pages/blog/PageLayout.stories.tsx` |
| `src/components/BlogSearch.tsx` | `src/components/pages/blog/BlogSearch.tsx` |
| `src/components/BlogSearch.module.scss` | `src/components/pages/blog/BlogSearch.module.scss` |
| `src/components/BlogSearch.stories.tsx` | `src/components/pages/blog/BlogSearch.stories.tsx` |

## 各 `.tsx` 内の書き換え（Layout 系のみ。BlogSearch は触らない）

- `import styles from './LayoutBody.module.scss'` → `import styles from './BodyLayout.module.scss'`（以下同様）
- export 名 / コンポーネント名: `LayoutBody` → `BodyLayout`、`LayoutHeader` → `HeaderLayout`、`LayoutHero` → `HeroLayout`、`LayoutPage` → `PageLayout`
- `styles.layoutBody` などのキー参照を `styles.bodyLayout` 等へ
- export 形式（named / default）は現状維持
- **BlogSearch は識別子・キーの書き換え不要**（パスだけ変える）

## 各 `.module.scss` 内の書き換え

- クラスキーを Postfix へ: `.layoutBody` → `.bodyLayout` 等（Blog 配下のみ。`BlogSearch.module.scss` は触らない）

## 利用側 import の更新

| ファイル | 旧 import | 新 import |
| :-- | :-- | :-- |
| `src/pages/about.astro` | `import { LayoutPage } from '@/components/Layouts/Blog/LayoutPage'` | `import { PageLayout } from '@/components/pages/blog/PageLayout'` |
| `src/pages/about.astro` | `import { LayoutHero } from '@/components/Layouts/Blog/LayoutHero'` | `import { HeroLayout } from '@/components/pages/blog/HeroLayout'` |
| `src/pages/about.astro` | `import { LayoutHeader } from '@/components/Layouts/Blog/LayoutHeader'` | `import { HeaderLayout } from '@/components/pages/blog/HeaderLayout'` |
| `src/pages/about.astro` | `import { LayoutBody } from '@/components/Layouts/Blog/LayoutBody'` | `import { BodyLayout } from '@/components/pages/blog/BodyLayout'` |
| `src/pages/about.astro`（JSX） | `<LayoutPage>...<LayoutHero>...` 等 | `<PageLayout>...<HeroLayout>...` 等 |
| `src/pages/blog/[...slug].astro` | 同上（Blog/Layout* 4 種） | 同上（pages/blog/*Layout 4 種） |
| `src/pages/blog/[...slug].astro`（JSX） | `<LayoutPage>...<LayoutHero>...` 等 | `<PageLayout>...<HeroLayout>...` 等 |
| `src/pages/blog/[...page].astro` | `import { LayoutPage } from '@/components/Layouts/Blog/LayoutPage'` | `import { PageLayout } from '@/components/pages/blog/PageLayout'` |
| `src/pages/blog/[...page].astro` | `import { LayoutHeader } from '@/components/Layouts/Blog/LayoutHeader'` | `import { HeaderLayout } from '@/components/pages/blog/HeaderLayout'` |
| `src/pages/blog/[...page].astro` | `import { LayoutBody } from '@/components/Layouts/Blog/LayoutBody'` | `import { BodyLayout } from '@/components/pages/blog/BodyLayout'` |
| `src/pages/blog/[...page].astro`（JSX） | `<LayoutPage>...<LayoutHeader>...<LayoutBody>` 等 | `<PageLayout>...<HeaderLayout>...<BodyLayout>` 等 |
| `src/pages/blog/[...page].astro` | `import BlogSearch from '@/components/BlogSearch'` | `import BlogSearch from '@/components/pages/blog/BlogSearch'` |

`src/pages/blog/[...page].astro` の `BlogSearch` の JSX 利用箇所はそのまま（識別子変更なし）。

# 手順

1. `src/components/pages/blog/` ディレクトリを作成
2. `git mv` で `Layouts/Blog/` 配下の 12 ファイルを `pages/blog/` 配下へ移動＋リネーム
3. `git mv` で `BlogSearch.{tsx,module.scss,stories.tsx}` を `pages/blog/` 配下へ移動
4. 各新 Layout ファイル内の `.module.scss` import パス、export 名、`styles.xxx` 参照を Postfix へ書き換え
5. 各新 Layout の `.module.scss` 内のクラスキーを Postfix へ書き換え
6. 利用側 `.astro` の import 行と JSX タグ名を更新（BlogSearch はパスのみ）
7. 空になった `src/components/Layouts/Blog/` と `src/components/Layouts/` を削除（`rmdir` または `git rm -r` で確認の上）
8. `bun run build` を実行してエラーがないことを確認
9. `git status` で差分を確認

# 完了条件

- `src/components/Layouts/` ディレクトリが **存在しない**
- `src/components/pages/blog/` に Layout 系 12 ファイル + BlogSearch 3 ファイル = 15 ファイル
- ルート直下に `BlogSearch.*` が **残っていない**
- `bun run build` がエラーなく完了
- `git grep -n 'Layouts/Blog\|components/BlogSearch'` が 0 ヒット

# 報告

200 語以内で:
- 移動したファイル数、削除した旧ディレクトリ
- 書き換えた利用側ファイル数
- ビルド結果
- 想定外の差分があれば短く
