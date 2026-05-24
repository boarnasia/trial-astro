---
name: move-site-layouts
model: sonnet
depends_on: []
---

# 目的

`src/components/Layouts/Layout*.{tsx,module.scss,stories.tsx}` を `src/components/layouts/*Layout.*` へ **Postfix リネーム＋移動** する。エクスポート名と CSS Modules のクラスキーも Postfix 形式へ揃える。

# 背景・制約

- マスター: `plans/0524-07-refactoring-components/plan.md`
- プロジェクト規約: `CLAUDE.md`、`docs/feontend-design.md` を必ず読むこと
- このタスクは **`components/Layouts/Blog/` には触らない**（plan-02 で扱う）
- dev / preview / storybook サーバは起動しない。検証は `bun run build` のみ
- パッケージマネージャは **bun**（npm 禁止）
- 0 byte のファイル（例: `LayoutBody.stories.tsx`）はそのまま移動して空のまま維持

# 変更ファイル

## 移動＋リネーム（旧 → 新）

| 旧 | 新 |
| :-- | :-- |
| `src/components/Layouts/LayoutBody.tsx` | `src/components/layouts/BodyLayout.tsx` |
| `src/components/Layouts/LayoutBody.module.scss` | `src/components/layouts/BodyLayout.module.scss` |
| `src/components/Layouts/LayoutBody.stories.tsx`（0 byte） | `src/components/layouts/BodyLayout.stories.tsx` |
| `src/components/Layouts/LayoutContainer.tsx` | `src/components/layouts/ContainerLayout.tsx` |
| `src/components/Layouts/LayoutContainer.module.scss` | `src/components/layouts/ContainerLayout.module.scss` |
| `src/components/Layouts/LayoutContainer.stories.tsx` | `src/components/layouts/ContainerLayout.stories.tsx` |
| `src/components/Layouts/LayoutFooter.tsx` | `src/components/layouts/FooterLayout.tsx` |
| `src/components/Layouts/LayoutFooter.module.scss` | `src/components/layouts/FooterLayout.module.scss` |
| `src/components/Layouts/LayoutHeader.tsx` | `src/components/layouts/HeaderLayout.tsx` |
| `src/components/Layouts/LayoutHeader.module.scss` | `src/components/layouts/HeaderLayout.module.scss` |
| `src/components/Layouts/LayoutMain.tsx` | `src/components/layouts/MainLayout.tsx` |
| `src/components/Layouts/LayoutMain.module.scss` | `src/components/layouts/MainLayout.module.scss` |

## 各 `.tsx` 内の書き換え

- `import styles from './LayoutBody.module.scss'` → `import styles from './BodyLayout.module.scss'`（ファイル名に合わせる）
- export 名と React コンポーネント名: `LayoutBody` → `BodyLayout`、`LayoutContainer` → `ContainerLayout`、以下同様
- `styles.layoutBody` / `styles.layoutContainer` 等のキー参照を `styles.bodyLayout` / `styles.containerLayout` 等へ
- 既存の export 形式（named vs default）は **そのまま維持**:
  - `LayoutContainer.tsx` は `export default` → `ContainerLayout` も `export default`
  - その他は `export const ...` → そのまま `export const ...`

## 各 `.module.scss` 内の書き換え

- クラスキーを Postfix へ: `.layoutBody { ... }` → `.bodyLayout { ... }`、以下同様。スタイル本体は触らない

## import を更新する利用側ファイル

| ファイル | 旧 import | 新 import |
| :-- | :-- | :-- |
| `src/layouts/Layout.astro` | `import { LayoutBody } from '@/components/Layouts/LayoutBody'` | `import { BodyLayout } from '@/components/layouts/BodyLayout'` |
| `src/layouts/Layout.astro` | `import { LayoutFooter } from '@/components/Layouts/LayoutFooter'` | `import { FooterLayout } from '@/components/layouts/FooterLayout'` |
| `src/layouts/Layout.astro` | `import { LayoutHeader } from '@/components/Layouts/LayoutHeader'` | `import { HeaderLayout } from '@/components/layouts/HeaderLayout'` |
| `src/layouts/Layout.astro` | `import { LayoutMain } from '@/components/Layouts/LayoutMain'` | `import { MainLayout } from '@/components/layouts/MainLayout'` |
| `src/layouts/Layout.astro`（JSX） | `<LayoutBody>...<LayoutHeader>...` 等 | `<BodyLayout>...<HeaderLayout>...` 等にすべて差し替え |
| `src/pages/index.astro` | `import LayoutContainer from '@/components/Layouts/LayoutContainer'` | `import ContainerLayout from '@/components/layouts/ContainerLayout'` |
| `src/pages/index.astro`（JSX） | `<LayoutContainer ...>` | `<ContainerLayout ...>` |
| `src/pages/about.astro` | `import LayoutContainer from '@/components/Layouts/LayoutContainer'` | `import ContainerLayout from '@/components/layouts/ContainerLayout'` |
| `src/pages/about.astro`（JSX） | `<LayoutContainer ...>` | `<ContainerLayout ...>` |
| `src/pages/blog/[...page].astro` | `import LayoutContainer from '@/components/Layouts/LayoutContainer'` | `import ContainerLayout from '@/components/layouts/ContainerLayout'` |
| `src/pages/blog/[...page].astro`（JSX） | `<LayoutContainer ...>` | `<ContainerLayout ...>` |
| `src/pages/blog/[...slug].astro` | `import LayoutContainer from '@/components/Layouts/LayoutContainer'` | `import ContainerLayout from '@/components/layouts/ContainerLayout'` |
| `src/pages/blog/[...slug].astro`（JSX） | `<LayoutContainer ...>` | `<ContainerLayout ...>` |

**注意**: `src/pages/blog/[...slug].astro` と `src/pages/about.astro` には `Layouts/Blog/Layout*` の import も含まれるが、それは plan-02 で処理する。**本 plan では触らない**。

# 手順

1. `src/components/layouts/` ディレクトリを作成（`mkdir -p src/components/layouts`）
2. 上記マッピング表の順に `git mv` でファイルを移動＆リネーム（履歴を残すため `mv` ではなく `git mv` を使用）
3. 各新ファイル内の `import 'xxx.module.scss'` パスと export 名 / コンポーネント名 / `styles.xxx` 参照を Postfix へ書き換え
4. 各 `.module.scss` 内のクラスキーを Postfix へ書き換え
5. 利用側 `.astro` の import 行と JSX タグ名を更新
6. `bun run build` を実行してエラーがないことを確認
7. `git status` で意図しない差分がないことを確認

# 完了条件

- `src/components/Layouts/` 直下に上記 5 コンポーネント分のファイルが **残っていない**（`Blog/` サブディレクトリは残る = plan-02 で処理）
- `src/components/layouts/` 配下に 12 ファイル（5×{.tsx, .module.scss} + LayoutBody/Container.stories.tsx の 2 つ）が存在
- `bun run build` がエラーなく完了する
- `git grep -n 'Layouts/Layout'` の結果が `Layouts/Blog/` 以外のヒットを返さない

# 報告

200 語以内で以下を報告:
- 移動したファイル数と新規作成ディレクトリ
- 書き換えた利用側ファイル数
- `bun run build` の結果（成功 / 警告 / 失敗）
- 想定外の差分や判断に迷った箇所があれば短く
