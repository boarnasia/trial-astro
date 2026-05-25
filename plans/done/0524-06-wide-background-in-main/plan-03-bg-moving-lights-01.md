---
name: bg-moving-lights-01
model: sonnet
depends_on: []
---

# 目的

`plans/0524-06-wide-background-in-main/movinglight01.md` の素材を出典とした canvas ベースの "moving lights" 背景アニメ `MovingLights01` を追加する。

# 背景・制約

- `docs/frontend-design.md` を遵守。CSS Modules のみ。タグセレクタ禁止、キャメルケース、`!important` / `:global` 禁止。
- React 関数式 + named export。
- 素材は `<canvas>` + JS の `requestAnimationFrame`。`useEffect` でセットアップする。Astro 側からは **必ず `client:load`** で配置する（このコンポーネント自身は `'use client'` 等は不要だが、`Layout.astro` / 利用ページ側で `client:load` を付ける）。
- 親（`MainBackgroundFull`）の領域を満たすため、ルート要素 `position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden;`。
- `pointer-events: none;` は親で適用済み。
- アクセシビリティ: `useEffect` 内で `window.matchMedia('(prefers-reduced-motion: reduce)').matches` を判定し、true なら `requestAnimationFrame` を回さず、初期描画のみ行う（または描画も省略）。
- パッケージ追加禁止。
- dev / preview サーバは起動しない。検証は `bun run build`。

# 変更ファイル

- `src/components/ui/BackgroundImage/MovingLights01.tsx` ... 新規
- `src/components/ui/BackgroundImage/MovingLights01.module.scss` ... 新規

# 素材の使い方

`plans/0524-06-wide-background-in-main/movinglight01.md` を唯一の出典とする。CodePen は読みに行かない。

素材の `body { background: black; ... }` などのページ全体スタイルは破棄。`<canvas id="canvas">` と JS の `requestAnimationFrame` ループだけ移植する。

# 手順

1. `plans/0524-06-wide-background-in-main/movinglight01.md` を読む。
2. `MovingLights01.tsx`:
   - `useRef<HTMLCanvasElement>(null)` を使い、`<canvas ref={canvasRef} className={styles.canvas} />` を `<div className={styles.movingLights01}>` で包んで返す。
   - `useEffect` 内で素材 JS をほぼそのまま移植する。違いは:
     - `document.getElementById('canvas')` → `canvasRef.current`
     - canvas サイズは `window.innerWidth/innerHeight` ではなく **コンテナの実サイズ** に合わせる（`canvas.getBoundingClientRect()` か親要素の `clientWidth/clientHeight`）。`ResizeObserver` で追従する。
     - `let items = [...]` の生成、`changeCanvas` ループ、初期 `requestAnimationFrame` 呼び出し
     - **クリーンアップ**: `cancelAnimationFrame(rafId)` と `resizeObserver.disconnect()` を return で行う
   - `prefers-reduced-motion` 判定: `matchMedia` で reduce なら ループを開始しない。
   - 変数名はキャメルケース化。素材の `colors`、`backgroundColors`、`count`、`blur`、`radius` パラメータは素材通り。
3. `MovingLights01.module.scss`:
   - 先頭に `// Source: plans/0524-06-wide-background-in-main/movinglight01.md (originally https://codepen.io/smpnjn/pen/yLPdEPQ)` のコメント。
   - `.movingLights01 { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }`
   - `.canvas { width: 100%; height: 100%; display: block; }`
4. 型は素朴に `HTMLCanvasElement | null` / `CanvasRenderingContext2D | null` をハンドリング。null チェックは入れるが過剰な防御は書かない。

# 完了条件

- 2 ファイルが作成されている。
- `bun run build` がエラーなく完了する（SSR ビルド時に `window` 参照でコケないよう、`window` / `document` アクセスは全て `useEffect` 内に閉じ込める）。
- 単体（Storybook で確認可能なら）で canvas にカラフルなぼかし円が浮遊する。

# 報告

- 追加ファイルパス
- `client:load` の必要性について `plan-05` 担当へ申し送る注意点を 1〜2 行
- 200 語以内
