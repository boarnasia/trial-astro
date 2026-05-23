# LayoutBody への移行 実装計画

## 目標

`<body>` を含むページ骨格を Astro テンプレ直書きから React コンポーネント（CSS Modules）に切り出す。Layout.astro が `<LayoutBody>` を採用し、内部は grid-template-areas で `header / main / footer` の3スロットに分ける。Header / Footer はそれぞれラッパー（LayoutHeader / LayoutFooter）で包んで grid-area の責務をラッパーに閉じ込め、Header.tsx / Footer.tsx 自体はレイアウト無関心のまま保つ。

## 採用方針（事前合意済み）

- スタイルは **CSS Modules** (`*.module.scss`)。BEM/FLOCSS の prefix（`l-` / `c-` 等）は要求しない。クラス名はキャメルケース。
- ラッパー構造:
  - `LayoutBody` → `<body>` + grid container
  - `LayoutHeader` → `<div>` + `grid-area: header`、children に `<Header/>` を受ける
  - `LayoutMain` → `<main>` + `grid-area: main`、children に `<slot/>` 相当
  - `LayoutFooter` → `<div>` + `grid-area: footer`、children に `<Footer/>` を受ける
  - LayoutHeader / LayoutFooter が `<header>` / `<footer>` を出さないのは、Header.tsx / Footer.tsx 側が既にセマンティックタグを持っているため（二重防止）。
- 既存の Header / Footer の `c-*` クラスは今回は触らない（スコープ外）。grid-area のみラッパー側で処理。

## sub-plan 一覧

| #  | slug                    | モデル | 依存  | 状態        | 概要                                                                 |
| -- | ----------------------- | ------ | ----- | ----------- | -------------------------------------------------------------------- |
| 01 | cleanup-layoutbody      | haiku  | -     | **完了済み** | 既存 `LayoutBody.module.scss` を `.layoutBody` 単体に整理（ユーザーが手作業で実施） |
| 02 | create-layout-wrappers  | haiku  | -     | 未着手      | LayoutHeader / LayoutMain / LayoutFooter を新規作成（tsx + module.scss）  |
| 03 | integrate-layout-astro  | sonnet | 02    | 未着手      | `src/layouts/Layout.astro` を新しいラッパーで組み直す                       |

## 実行波

- **Wave 1**: 02
- **Wave 2**: 03
- **検証**: コーディネーターが `bun run build` を実行（sub-plan 化しない）

## 横断的な制約

- **dev / preview / storybook サーバは触らない**（人間管理）。検証は `bun run build` のみ。
- パッケージ操作は **bun / bunx**。`npm` は使わない。
- 既存の `Header.tsx` / `Footer.tsx` の中身は変更しない（c-* クラスを含むマークアップはそのまま）。
- 新規 SCSS は **`*.module.scss`** 命名（CSS Modules を有効化するため）。
- React コンポーネントは `'use client'` 等を付けない（Astro デフォルトの static rendering で十分）。
- Path alias `@/*` → `src/*` を使ってよい。

## 未確定事項

- LayoutMain の `<main>` に追加クラスは現状なし（grid-area のみ）。将来 `c-main` 等の運用層スタイルが必要になったら別タスクで足す想定。
- 既存の `src/layouts/PrimaryLayout.astro`（削除済み、git status で D 表示）は本タスクでは追わない。
