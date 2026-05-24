# Wide Background in Main 実装計画

## 目標

`Layout.astro` の `first-element-of-body` スロットに、`HeaderLayout` と `FooterLayout` の間（= ページのメイン領域全域）を覆う背景レイヤーを置けるようにする。背景レイヤー本体（`MainBackgroundFull`）と、その中身として差し込めるアニメーション付き背景ビジュアル 3 種（`SimpleWave01` / `MovingLights01` / `MovingLights02`）を新規追加する。

`HeaderLayout.module.scss` には既に `anchor-name: --page-header`、`FooterLayout.module.scss` には `anchor-name: --page-footer` が定義済みなので、`MainBackgroundFull` 側は anchor positioning でこの 2 つを上下端として広がる。

## sub-plan 一覧

| #  | slug                        | モデル | 依存       | 状態   | 概要 |
| -- | --------------------------- | ------ | ---------- | ------ | ---- |
| 01 | main-background-full        | sonnet | -          | 未着手 | `components/layouts/MainBackgroundFull.tsx` + `.module.scss` を作成（Layout.astro は触らない、page 側から差し込む） |
| 02 | bg-simple-wave-01           | sonnet | -          | 未着手 | `components/ui/BackgroundImage/SimpleWave01.{tsx,module.scss}` を作成（CodePen LYPGxQz の SVG ウェーブを再現） |
| 03 | bg-moving-lights-01         | sonnet | -          | 未着手 | `components/ui/BackgroundImage/MovingLights01.{tsx,module.scss}` を作成（CodePen yLPdEPQ のムービングライトを再現） |
| 04 | bg-moving-lights-02         | sonnet | -          | 未着手 | `components/ui/BackgroundImage/MovingLights02.{tsx,module.scss}` を作成（CodePen VmJjaG のムービングライトを再現） |
| 05 | stories-and-default-wiring  | sonnet | 01,02,03,04 | 未着手 | 各コンポーネントに `*.stories.tsx` を追加し、`src/pages/index.astro` から `<MainBackgroundFull slot="first-element-of-body"><MovingLights02 /></MainBackgroundFull>` を差し込む |

## 実行波（並列グルーピング）

- **Wave 1**: 01, 02, 03, 04 ← 並列（互いに独立）
- **Wave 2**: 05 ← Wave 1 完了後に実行

## 横断的な制約

- `docs/frontend-design.md` に従う。スタイルは **CSS Modules のみ**、タグセレクタ禁止、キャメルケースのクラス名、`!important` / `:global` 禁止。
- 新規コンポーネントは `*.tsx` / `*.module.scss` / `*.stories.tsx` を **同階層に colocate**。`BackgroundImage` カテゴリは `src/components/ui/BackgroundImage/` ディレクトリに 3 つまとめる（カテゴリ単位のディレクトリは可）。
- `client:` ディレクティブは原則不要（CSS / SVG アニメで完結。インタラクション無し）。`Layout.astro` でも素のままインポートして `<MainBackgroundFull>...</MainBackgroundFull>` の形で配置する。
- React コンポーネントは `export const ComponentName = (...) => ...` の関数式 + named export 形式（`HeaderLayout` 等の既存例に合わせる）。
- 背景アニメーションは **`pointer-events: none`** とし、`z-index: -10`（MainBackgroundFull 側で適用）でコンテンツの背面に置く。
- アクセシビリティ: `prefers-reduced-motion: reduce` 下ではアニメーションを停止 or 大幅に減速。
- パッケージ追加・依存導入は行わない（純粋な SCSS + SVG + CSS animation）。
- dev / preview / storybook サーバは起動しない。検証は `bun run build` のみ。

## MainBackgroundFull の CSS（合意済み仕様）

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

子要素として `<BackgroundImage>` 系コンポーネントを受け取れるように `children` を受ける（受け取った要素はそのまま描画）。

## BackgroundImage 3 種の方針（素材は人間が用意済み）

CodePen は読みに行かない。以下の素材ファイル（プロジェクト内）を **唯一の出典** として移植する:

- `plans/0524-06-wide-background-in-main/simplewave01.md` → `SimpleWave01`（HTML + CSS、純粋 SVG + `@keyframes`）
- `plans/0524-06-wide-background-in-main/movinglight01.md` → `MovingLights01`（`<canvas>` + JS の `requestAnimationFrame`。**React の `useEffect` + `client:load` 必須**）
- `plans/0524-06-wide-background-in-main/movinglight02.md` → `MovingLights02`（SVG + SMIL `<animate>`、JS 不要）

各コンポーネントは素材の見た目・動きを基本的にそのまま再現する。ただし以下の方針で調整する:

- 各素材はデモ HTML 全体（ヘッダ・コンテンツ含む）を含んでいる場合があるが、**背景に該当する部分（SVG / canvas）のみ抽出**して移植する。
- 親（`MainBackgroundFull`）の領域を `width: 100%; height: 100%;` で満たす。`position: absolute; inset: 0;` で配置。
- 元素材で `body` や生タグセレクタにスタイルが当たっている部分は、ルートクラス（例 `.simpleWave01`）に閉じて適用する形に書き換える。
- 元の鮮やかな色合いはサイトトーンに合うか別途調整が必要だが、今回は **素材そのまま** で実装する（カラー調整は別タスク）。
- `prefers-reduced-motion: reduce` でアニメ停止（CSS アニメ系のみ。canvas は `useEffect` 内で `matchMedia` 判定して `requestAnimationFrame` を回さない実装にする）。

各コンポーネントは `width: 100%; height: 100%;` で `MainBackgroundFull` の領域いっぱいに描画する。固有の props は不要（必要に応じてカラー差し替えのみ後で拡張可）。

## 確定事項（承認済み）

1. デフォルト背景は **`src/pages/index.astro`（トップページ）** のみに、page 側から `<MainBackgroundFull slot="first-element-of-body"><MovingLights02 /></MainBackgroundFull>` を渡す。`Layout.astro` は変更しない（既存の `<slot name="first-element-of-body" />` をそのまま使う）。
2. `BackgroundImage` 3 種は `src/components/ui/BackgroundImage/` 配下に colocate（個別サブディレクトリは作らない）。
3. CodePen は読みに行かない。`plans/0524-06-wide-background-in-main/` 配下の素材ファイル（simplewave01.md / movinglight01.md / movinglight02.md）を出典とする。

## 残論点

- MovingLights01 は canvas + JS で `requestAnimationFrame` を使うため、Astro 側で **`<MovingLights01 client:load />`** として配置する必要がある（Storybook では問題なし）。これは plan-05 に明記済み。
