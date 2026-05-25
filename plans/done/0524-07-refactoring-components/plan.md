# components 再編 実装計画

## 目標

`src/components/` を **FLOCSS レイヤーと対応するフォルダ構造** に再編し、Layout 系のコンポーネント名を **Postfix 形式**（`LayoutBody` → `BodyLayout`）へ揃える。

| フォルダ | FLOCSS レイヤー | 対応 prefix（class 名側） |
| :-- | :-- | :-- |
| `components/ui/` | Component | `c-` |
| `components/layouts/` | Layout | `l-` |
| `components/pages/blog/` | Project | `p-` |

会話履歴での合意:
- フォルダで分類しているので、ファイル名は Postfix が自然（`BodyLayout`）
- CSS Modules 移行中なので、本タスクは **フォルダ移動とリネームのみ**。Pagination.scss の CSS Modules 化や、className の FLOCSS prefix 見直しは別タスク
- 「小さく明確な変更」を優先 → 3 つの sub-plan を **直列** に流す

## 現状 → 目標 マッピング

### components/Layouts/ → components/layouts/ （Postfix リネーム）

| 現状 | 目標 |
| :-- | :-- |
| `Layouts/LayoutBody.tsx` | `layouts/BodyLayout.tsx` |
| `Layouts/LayoutContainer.tsx` | `layouts/ContainerLayout.tsx` |
| `Layouts/LayoutFooter.tsx` | `layouts/FooterLayout.tsx` |
| `Layouts/LayoutHeader.tsx` | `layouts/HeaderLayout.tsx` |
| `Layouts/LayoutMain.tsx` | `layouts/MainLayout.tsx` |

### components/Layouts/Blog/ + BlogSearch → components/pages/blog/

| 現状 | 目標 |
| :-- | :-- |
| `Layouts/Blog/LayoutBody.tsx` | `pages/blog/BodyLayout.tsx` |
| `Layouts/Blog/LayoutHeader.tsx` | `pages/blog/HeaderLayout.tsx` |
| `Layouts/Blog/LayoutHero.tsx` | `pages/blog/HeroLayout.tsx` |
| `Layouts/Blog/LayoutPage.tsx` | `pages/blog/PageLayout.tsx` |
| `BlogSearch.tsx` | `pages/blog/BlogSearch.tsx` |

### フラット配置 → components/ui/

| 現状 | 目標 |
| :-- | :-- |
| `BaseHead.astro` | `ui/BaseHead.astro` |
| `Footer.tsx` | `ui/Footer.tsx` |
| `FormattedDate.astro` | `ui/FormattedDate.astro` |
| `Header.tsx` | `ui/Header.tsx` |
| `HeaderLink.tsx` | `ui/HeaderLink.tsx` |
| `HeroBlock.tsx` | `ui/HeroBlock.tsx` |
| `Pagination.tsx` | `ui/Pagination.tsx` |
| `Typography.tsx` | `ui/Typography.tsx` |

各 `.tsx` と同名の `.module.scss` / `.scss` / `.stories.tsx` も同時に移動する。

## sub-plan 一覧

| # | slug | モデル | 依存 | 状態 | 概要 |
| :-: | :-- | :-: | :-- | :-: | :-- |
| 01 | move-site-layouts | sonnet | - | 未着手 | `Layouts/Layout*` を `layouts/*Layout` にリネーム＋移動。import を更新 |
| 02 | move-blog-pages | sonnet | 01 | 未着手 | `Layouts/Blog/Layout*` と `BlogSearch.*` を `pages/blog/` 配下へ移動。古い `Layouts/` ディレクトリを削除 |
| 03 | move-ui-components | haiku | 02 | 未着手 | 残るフラット配置の汎用部品を `ui/` へ移動。import を更新 |

## 実行波（並列グルーピング）

すべて同じ `.astro`（`src/layouts/Layout.astro`, `src/pages/*.astro`）の import 行を編集するため **直列実行**。

- **Wave 1**: 01
- **Wave 2**: 02
- **Wave 3**: 03

各ウェーブ終了後に `bun run build` を取りまとめ役が実行し、グリーンを確認してから次波へ進む。

## 横断的な制約

- **Postfix 命名**: Layout 系コンポーネントは `<Name>Layout` の形にする（`LayoutBody` → `BodyLayout`）。export 名 / className（CSS Modules キー）も合わせて変更する。
- **export 形式は維持**: 各ファイルの `named export` / `default export` の使い分けは現状を踏襲する（例: `LayoutContainer` は `export default`、`LayoutBody` は `export named`）。
- **className リネーム**: `.module.scss` のクラスキーと、`.tsx` 内の `styles.xxx` 参照を Postfix 形式に揃える（例: `styles.layoutBody` → `styles.bodyLayout`、`.layoutBody` → `.bodyLayout`）。
- **CSS Modules 化は範囲外**: `Pagination.scss`（BEM/FLOCSS の `.c-pagination`）はファイル移動のみ。className も変えない。
- **空ファイルは触らない**: `Layouts/LayoutBody.stories.tsx` のように 0 byte のファイルもそのまま移動。中身追加は別タスク。
- **dev / preview / storybook サーバは起動しない**。検証は `bun run build` のみ。
- **コミットしない**。ユーザー承認後の確認は手動。

## 未確定事項（承認時に確認）

1. **Header/Footer の置き場所**: 案では `ui/` に入れる。`layouts/` に入れる案も妥当（site の構造の一部）。推奨は `ui/`（`layouts/` には slot 系のラッパーだけが入る方が責務が綺麗）。
2. **重複する Layout 名（`BodyLayout`, `HeaderLayout`）**: 案では `layouts/BodyLayout.tsx` と `pages/blog/BodyLayout.tsx` を同名で並べる（既存 `.astro` ではいずれか一方しか import していないため衝突しない）。代替案: 必要時に import alias で区別。推奨は同名のまま。
3. **`pages/` 配下に `blog/` 以外を作るか**: order.md は `pages/blog/` のみ言及。今回は `pages/blog/` だけ作る。`index.astro` 用の `pages/home/` などは作らない。
4. **`Pagination` の置き場所**: 現状 blog からのみ参照されているが、汎用部品なので `ui/` に置く（将来別ページで使う想定）。
