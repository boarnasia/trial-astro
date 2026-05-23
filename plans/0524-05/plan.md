# 0524-05 refactoring 実装計画

## 目標

CSS Modules トライアル方針に沿って、残っている `c-header` / `c-footer` / `c-post-list` / `c-post-card` の BEM/FLOCSS スタイルを **コンポーネントローカル** な形へ移行する。同時に、未使用の `_c-post.scss` を削除する。

- React コンポーネント (`Header.tsx`, `Footer.tsx`) → `*.module.scss` + `import styles from`
- Astro ページ (`src/pages/blog/[...page].astro`) → CSS Modules（`post-list.module.scss` を同階層に作成し、`import styles from` で参照）。React component と書き方を揃える
- BEM プレフィックス（`c-`, `__`, `--`）は剥がし、キャメルケースに統一（既存 `LayoutBody.module.scss` 等と揃える）
- 移行後、`src/styles/component/` 側の partial と `_index.scss` の `@use` を取り除く

## 対象範囲（order.md より）

- `src/components/Header.tsx` → module.scss 化（`HeaderLink.tsx` も `c-header__link` を使うため同時移行が必要）
- `src/components/Footer.tsx` → module.scss 化
- `src/pages/blog/[...page].astro` の `c-post-list` / `c-post-card` → Astro scoped style 化
- `src/styles/component/_c-post.scss` → コードベース未使用なので削除（grep 確認済）

## sub-plan 一覧

| #  | slug             | モデル | 依存 | 状態     | 概要 |
| -- | ---------------- | ------ | ---- | -------- | ---- |
| 01 | header           | sonnet | -    | 未着手   | `Header.tsx` + `HeaderLink.tsx` を `Header.module.scss` に統合移行 |
| 02 | footer           | haiku  | -    | 未着手   | `Footer.tsx` を `Footer.module.scss` に移行 |
| 03 | blog-post-list   | sonnet | -    | 未着手   | `[...page].astro` の `c-post-list` / `c-post-card` を `post-list.module.scss`（CSS Modules）に移行 |

各 sub-plan は **独立ファイル** のみを編集する（`src/styles/component/_index.scss` には触らない）。

## 実行波（並列グルーピング）

- **Wave 1（並列, 3 plan 同時）**: 01 / 02 / 03
- **Wave 2（取りまとめ役が直接実行）**:
  - `src/styles/component/_index.scss` から `@use 'c-header'` / `@use 'c-footer'` / `@use 'c-post-card'` / `@use 'c-post'` を削除
  - `src/styles/component/_c-header.scss` を削除
  - `src/styles/component/_c-footer.scss` を削除
  - `src/styles/component/_c-post-card.scss` を削除
  - `src/styles/component/_c-post.scss` を削除（order.md の「未使用なら削除」分。grep で他に参照なしを確認済）
  - `bun run build` で検証

## 横断的な制約

- **dev / preview / storybook サーバは起動しない**（人間管理）。検証は `bun run build` のみ。
- パッケージマネージャは `bun` を使う。`npm` を使わない。
- React component / Astro ファイルとも `import styles from './*.module.scss'` + `styles.camelCase` で書く（既存 `LayoutBody.tsx` / `BlogSearch.tsx` 等と同じ書き方）。
- BEM プレフィックス（`c-` / `__` / `--`）は全て剥がし、キャメルケースに統一。
- `Header.stories.tsx` / `Footer.stories.tsx` は `import` パスが変わらないので原則そのまま動く。スタイル参照が壊れていないかは Wave 2 のビルドで確認。
- `src/styles/component/_index.scss` は **Wave 2 でのみ** 触る。Wave 1 の各 sub-plan は触らない（並列衝突を避ける）。
- 既存の `c-post-card` クラスは `[...page].astro` 1 か所のみで使用されている（grep 確認済）。Astro scoped style で完結させる。

## 未確定事項

- `_c-post.scss` 削除はコードベース内 grep ベースで判断。生成物（記事 MDX 内など）に `c-post` が現れる可能性は薄いが、念のため Wave 2 のビルドで警告が出ないか確認。
