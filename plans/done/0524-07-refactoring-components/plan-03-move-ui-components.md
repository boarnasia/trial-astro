---
name: move-ui-components
model: haiku
depends_on: [move-blog-pages]
---

# 目的

`src/components/` 直下に残る汎用 UI コンポーネントを `src/components/ui/` へ **移動のみ**（リネーム不要）。利用側の import パスを更新する。

# 背景・制約

- マスター: `plans/0524-07-refactoring-components/plan.md`
- 前段（plan-01, plan-02）で `Layouts/` と `BlogSearch.*` はすでに移動済み。残りはすべて汎用 UI
- プロジェクト規約: `CLAUDE.md`、`docs/feontend-design.md` を必ず読むこと
- dev / preview / storybook サーバは起動しない。検証は `bun run build` のみ
- パッケージマネージャは **bun**
- **リネームは行わない**。識別子（export 名）と className もそのまま
- `Pagination.scss`（CSS Modules ではなく FLOCSS の `.c-pagination`）も **そのまま移動**。CSS Modules 化は別タスク

# 変更ファイル

## 移動（旧 → 新）

| 旧 | 新 |
| :-- | :-- |
| `src/components/BaseHead.astro` | `src/components/ui/BaseHead.astro` |
| `src/components/Footer.tsx` | `src/components/ui/Footer.tsx` |
| `src/components/Footer.module.scss` | `src/components/ui/Footer.module.scss` |
| `src/components/Footer.stories.tsx` | `src/components/ui/Footer.stories.tsx` |
| `src/components/FormattedDate.astro` | `src/components/ui/FormattedDate.astro` |
| `src/components/Header.tsx` | `src/components/ui/Header.tsx` |
| `src/components/Header.module.scss` | `src/components/ui/Header.module.scss` |
| `src/components/Header.stories.tsx` | `src/components/ui/Header.stories.tsx` |
| `src/components/HeaderLink.tsx` | `src/components/ui/HeaderLink.tsx` |
| `src/components/HeroBlock.tsx` | `src/components/ui/HeroBlock.tsx` |
| `src/components/HeroBlock.module.scss` | `src/components/ui/HeroBlock.module.scss` |
| `src/components/HeroBlock.stories.tsx` | `src/components/ui/HeroBlock.stories.tsx` |
| `src/components/Pagination.tsx` | `src/components/ui/Pagination.tsx` |
| `src/components/Pagination.scss` | `src/components/ui/Pagination.scss` |
| `src/components/Pagination.stories.tsx` | `src/components/ui/Pagination.stories.tsx` |
| `src/components/Typography.tsx` | `src/components/ui/Typography.tsx` |
| `src/components/Typography.module.scss` | `src/components/ui/Typography.module.scss` |
| `src/components/Typography.stories.tsx` | `src/components/ui/Typography.stories.tsx` |

## 利用側 import の更新

すべて `@/components/<Name>` → `@/components/ui/<Name>` に置換。

| ファイル | 影響 import |
| :-- | :-- |
| `src/layouts/Layout.astro` | `BaseHead.astro`, `Footer`, `Header` |
| `src/pages/index.astro` | `Typography` |
| `src/pages/about.astro` | `Typography`, `HeroBlock` |
| `src/pages/blog/[...page].astro` | `FormattedDate.astro`, `Pagination`, `Typography` |
| `src/pages/blog/[...slug].astro` | `FormattedDate.astro`, `HeroBlock`, `Typography` |
| `src/content/blog/using-mdx.mdx` | `HeaderLink`（現状の相対パス `../../components/HeaderLink` を `../../components/ui/HeaderLink` に） |

**注意**:
- 各コンポーネントの内部実装は **一切触らない**（識別子・スタイル・class 名すべて維持）
- 各 `.stories.tsx` 内に相対 import がある場合は維持される（同一ディレクトリ内移動のため）。念のため確認のこと

# 手順

1. `src/components/ui/` ディレクトリを作成
2. `git mv` で 18 ファイルを `ui/` 配下へ移動
3. 利用側 6 ファイルの import パスを `@/components/<Name>` → `@/components/ui/<Name>` へ書き換え（`HeaderLink` は MDX 内の相対パス）
4. `bun run build` を実行してエラーがないことを確認
5. `git status` で差分を確認

# 完了条件

- `src/components/` 直下に **`ui/`, `layouts/`, `pages/` の 3 ディレクトリしか存在しない**
- `src/components/ui/` 配下に 18 ファイル（=上記マッピング）
- `bun run build` がエラーなく完了
- `git grep -nE "'@/components/(BaseHead|Footer|FormattedDate|Header|HeaderLink|HeroBlock|Pagination|Typography)"` が 0 ヒット

# 報告

150 語以内で:
- 移動したファイル数
- 書き換えた利用側ファイル数
- ビルド結果
- 想定外があれば短く
