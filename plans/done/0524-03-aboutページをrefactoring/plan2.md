# Blog Layout コンポーネント追加 + about ページ適用 実装計画 (order2.md)

## 目標

`src/components/Layouts/Blog/` 配下に 4 つの新コンポーネント（`LayoutPage` / `LayoutHero` / `LayoutHeader` / `LayoutBody`）を追加し、`src/pages/about.astro` をそれらで再構成する。order2.md の grid レイアウト仕様（hero / header / body の 3 領域）を実装する。

## sub-plan 一覧

| #  | slug                    | モデル | 依存                    | 状態   | 概要                                                                                       |
| -- | ----------------------- | ------ | ----------------------- | ------ | ------------------------------------------------------------------------------------------ |
| 02 | blog-layout-components  | sonnet | -                       | 未着手 | `Blog/LayoutPage`, `LayoutHero`, `LayoutHeader`, `LayoutBody` と各 `.module.scss` / `.stories.tsx` を新規作成 |
| 03 | about-page-apply        | sonnet | blog-layout-components  | 未着手 | `about.astro` を新 Blog レイアウトで再構成。`HeroBlock` を hero スロットに戻し、本文は `LayoutContainer` に置く |

> 注: ナンバリングは前回タスク (`plan-01-refactor-about-page.md`) との衝突を避けるため `02` / `03` から開始する。

## 実行波

- Wave 1: 02
- Wave 2: 03

（02 → 03 の直列。02 の中身は 1 ディレクトリ内の小さい兄弟コンポーネント群なので、1 sub-plan に集約して並列化しない）

## 横断的な制約

- 既存 `src/components/Layouts/LayoutContainer.tsx` / `LayoutHeader.tsx` 等の規約に従う:
  - `*.module.scss` を `import styles from ...` で読み込む
  - クラス名は camelCase（`styles.layoutPage` でアクセス）
  - **named export**（既存トップレベル `LayoutHeader.tsx` 等に揃える）
- 新コンポーネントは **`src/components/Layouts/Blog/`** 配下に置く（既存トップレベル `Layouts/LayoutHeader` / `Layouts/LayoutBody` とはパスで区別される）。
- インラインスタイル / 生 BEM クラス禁止、`!important` 禁止。
- ルート HTML 要素は `<div>` で統一（後で必要なら semantic 要素へ昇格）。
- dev / preview / storybook サーバは起動しない。検証は `bun run build`。
- パッケージマネージャは `bun`。

## 設計判断（未確定 — 承認時に確定したい）

order2.md からは読み取れない以下を、デフォルト案として提示する:

1. **コンポーネントの export 形態**: 既存兄弟と揃えて **named export**。
   - 例: `import { LayoutPage } from '@/components/Layouts/Blog/LayoutPage';`
2. **ルート要素**: 4 コンポーネントすべて `<div>`。
   - `LayoutPage` を `<article>` にする案もあるが、再利用性を優先して neutral にする（呼び出し側で `<article>` ラップ可）。
3. **`LayoutHeader` のセンタリング**: order2 の「要素はセンタリング」は flex column + `align-items: center` で実装。
4. **スロット必須性**: hero / header / body の 3 スロットはすべて `children` 必須（grid 領域を埋める前提）。
5. **`grid-template-rows`**: order2 の `auto 6em auto 3em auto` をそのまま採用。
6. **order2 SCSS のタイポ補正**: `grid-template-areas` 末尾の `;` 欠落と `"......"` 行の数を仕様通り（hero / header / body 間に 1 行ずつスペーサ）に整える。
7. **Storybook**: 各コンポーネントに最小の `.stories.tsx` を置く（`LayoutContainer.stories.tsx` のスタイル準拠）。`LayoutPage` の story は 3 領域を埋めたサンプルを表示。
8. **`about.astro` 復活する要素**: 直前のリファクタで外した `HeroBlock` + `AboutHeroImage` を `LayoutHero` 内で復活させる（order2 の HTML 例に従う）。
9. **同名コンポーネントの衝突**: `LayoutHeader` / `LayoutBody` はトップレベルと `Blog/` の両方に存在することになる。import path で区別されるため動作上は問題なし。気持ち悪い場合は `Blog/PageHeader` 等にリネーム可能（要相談）。

## 既知のスコープ外

- `src/layouts/BlogPost.astro` / 個別ブログ記事ページの差し替え（order2 は「視野に入れる」止まりなので今回は触らない）。
- `src/components/Layouts/Blog/index.ts` バレル（個別 import で十分）。
- 本文 Lorem ipsum 5 段落の Typography 化など、リファクタ範囲外の見直し。
