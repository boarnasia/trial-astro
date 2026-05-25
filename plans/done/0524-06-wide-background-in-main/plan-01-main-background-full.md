---
name: main-background-full
model: sonnet
depends_on: []
---

# 目的

`HeaderLayout` と `FooterLayout` の間に広がる背景レイヤー用コンポーネント `MainBackgroundFull` を追加し、`Layout.astro` の `first-element-of-body` スロットへ差し込めるようにする。

# 背景・制約

- `docs/frontend-design.md` を遵守。スタイルは CSS Modules のみ、タグセレクタ禁止、キャメルケース、`!important` / `:global` 禁止。
- 既存 `HeaderLayout.module.scss` に `anchor-name: --page-header`、`FooterLayout.module.scss` に `anchor-name: --page-footer` が定義済み。これに乗る形で配置する。
- このコンポーネントは React 関数式 + named export（`HeaderLayout` 等の既存に合わせる）。
- `client:` ディレクティブ不要。
- パッケージ追加なし。`bun run build` で検証する（dev サーバは起動しない）。

# 変更ファイル

- `src/components/layouts/MainBackgroundFull.tsx` ... 新規
- `src/components/layouts/MainBackgroundFull.module.scss` ... 新規

`Layout.astro` は **変更しない**。`<slot name="first-element-of-body" />` は既存のまま使い、page 側（plan-05 で `src/pages/index.astro`）から `<MainBackgroundFull slot="first-element-of-body">...</MainBackgroundFull>` の形で差し込む方針に決定。

# 手順

1. `src/components/layouts/HeaderLayout.tsx` / `BodyLayout.tsx` を参考に、同パターンで `MainBackgroundFull.tsx` を作る。`children: React.ReactNode` を受け、`<div className={styles.mainBackgroundFull}>{children}</div>` を返す。
2. `MainBackgroundFull.module.scss` を作成し、以下を実装する:

   ```scss
   .mainBackgroundFull {
     position: absolute;
     inset-inline: 0;
     top: anchor(--page-header bottom);
     bottom: anchor(--page-footer top);
     z-index: -10;
     pointer-events: none;
     overflow: hidden;
   }
   ```

# 完了条件

- 2 ファイルが作成されている（Layout.astro は触らない）。
- `bun run build` がエラーなく完了する（取りまとめ役が後で確認）。

# 報告

- 追加したファイルパス一覧
- 200 語以内
