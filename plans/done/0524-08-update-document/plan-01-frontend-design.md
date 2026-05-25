---
name: frontend-design
model: sonnet
depends_on: []
---

# 目的

`docs/frontend-design.md` を、現状の実装方針（CSS Modules 中心 + Foundation/Utility のみ BEM + FLOCSS）に合わせて書き換える。
これが他ドキュメントから参照される **スタイル仕様の source of truth** になる。

# 背景・制約

- 元仕様は全面 BEM + FLOCSS だったが、`object/` 配下は廃止し、コンポーネント層は `*.module.scss` に移行済み
- 残るレイヤーは `src/styles/foundation/`（reset, variables, base, mixins）と `src/styles/utility/`（`u-*`）のみ
- 既存コードには移行残骸が残っている（`Header.module.scss` 内のネスト `a {}`、`Pagination.scss` の `.c-pagination`）— これは別タスクで対応するため、本ドキュメントは「新規・改修時の方針」として書く
- 共有用語はマスター `plan.md` の「共有用語」セクションに従うこと

# 変更ファイル

- `docs/frontend-design.md` ... 更新（全面書き換えに近い）

# 手順

1. マスター plan `plans/0524-07-update-document/plan.md` の「共有用語」を確認する
2. `docs/frontend-design.md` の現状を読み、章立てを把握する
3. 以下の章立てで書き換える（既存の節を流用しつつ内容を差し替える）:
   - `# Frontend Design Specification v2`（v1 から v2 に上げる）
   - `## Stack` — 表の Style 行を `SCSS (CSS Modules + Foundation/Utility は BEM + FLOCSS)` に
   - `## レンダリング方針` — 既存内容を踏襲（Astro / React / client: directive）
   - `## スタイル構成` — 新章。以下を含める:
     - `src/styles/` の現構造（`foundation/`, `utility/`, `main.scss`）
     - `object/` は廃止済み（component / project / utility の3層構造ではなく、object 自体がない）
     - コンポーネント単位のスタイルは `*.module.scss` を colocate
   - `## CSS Modules（コンポーネント層）` — 新章。中核ルール:
     - 命名: `Component.module.scss`、`import styles from './Component.module.scss'`
     - クラス名はキャメルケース（`headerNav`, `linkActive`）
     - **3原則**:
       1. クラスセレクタのみ。`div { }` `section { }` などタグセレクタは禁止
       2. ネスト内も同様（`.card { a { } }` のような書き方は避け、`.cardLink` 等のクラスを切る）
       3. 詳細度を揃える（クラス1階層に揃える、`!important` 不要）
     - `:global` は原則使わない
     - 短いサンプル（`Header.module.scss` + `Header.tsx` の最小例）
   - `## Foundation 層` — 既存内容を踏襲。`src/styles/foundation/` の役割（reset, variables, mixins, base のグローバル）
   - `## Utility 層（BEM + FLOCSS の残置）` — 新章。`u-*` プレフィックスのみ残し、`.u-sr-only` のような単一目的ユーティリティとして使う。`!important` の例外はここに限る
   - `## ファイル構成` — colocate ルール（`.tsx` / `.astro` / `.stories.tsx` / `.module.scss` を同階層に置く）
   - `## 禁止事項` — 以下に更新:
     - インラインスタイル（`style=` 属性）
     - `*.module.scss` 内のタグセレクタ（ネスト含む）
     - グローバルスコープへの要素セレクタ（foundation/base の reset を除く）
     - `!important`（utility 層のみ例外）
4. v1 のサンプルコードはそのまま転載せず、現行の `src/components/ui/Header.module.scss` を踏まえた CSS Modules 例に置き換える（ただし既存ファイルの「タグセレクタ残置」は再現しない — 模範として書く）
5. 章末か脚注に「移行途中のため、一部の既存コンポーネントには BEM クラス名やネストタグセレクタが残っている。新規・改修時に本仕様へ寄せていく」旨の注記を追加

# 完了条件

- `docs/frontend-design.md` の Stack 表が `CSS Modules + Foundation/Utility は BEM + FLOCSS` を反映している
- `## CSS Modules` 章が存在し、3原則（クラスのみ / ネストでもタグ不可 / 詳細度を揃える）が明記されている
- `## 禁止事項` に「`*.module.scss` 内のタグセレクタ」が含まれる
- `object/` レイヤーが廃止されたことが本文中に明示されている

# 報告

200語以内で:
- 変更したファイルパス
- 主要な章立ての変更点（追加 / 削除 / 改名した節）
- 残した既存記述と置き換えた記述の比率の感覚
