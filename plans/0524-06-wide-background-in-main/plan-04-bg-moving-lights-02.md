---
name: bg-moving-lights-02
model: sonnet
depends_on: []
---

# 目的

`plans/0524-06-wide-background-in-main/movinglight02.md` の素材を出典とした SVG ベース（SMIL `<animate>`）の "moving lights" 背景アニメ `MovingLights02` を追加する。

# 背景・制約

- `docs/frontend-design.md` を遵守。CSS Modules のみ。タグセレクタ禁止、キャメルケース、`!important` / `:global` 禁止。
- React 関数式 + named export。`client:` ディレクティブ不要（SMIL `<animate>` はブラウザネイティブで動く）。
- 親（`MainBackgroundFull`）の領域を満たすため、ルート要素 `position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden;`。
- `pointer-events: none;` は親で適用済み。
- アクセシビリティ: `prefers-reduced-motion: reduce` 下では SMIL アニメ停止が SVG 単体では難しいので、CSS で `.bgWrap svg animate, .bgWrap svg animateTransform { ... }` のような attempt は避け、**割り切って何もしない**（このタスクでは reduced-motion 対応を best-effort とし、後追い可）。記述は `*.module.scss` の末尾コメントとして残す。
- パッケージ追加禁止。
- dev / preview サーバは起動しない。検証は `bun run build`。

# 変更ファイル

- `src/components/ui/BackgroundImage/MovingLights02.tsx` ... 新規
- `src/components/ui/BackgroundImage/MovingLights02.module.scss` ... 新規

# 素材の使い方

`plans/0524-06-wide-background-in-main/movinglight02.md` を唯一の出典とする。

素材は `<div id="bg-wrap"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">...</svg></div>`。CSS は記載なし（コンポーネント側で全部書く）。

素材内には **コメントアウトされた `<rect>` 3 個**（Gradient4 / 5 / 6）と、**有効な `<rect>` 3 個**（Gradient1 / 2 / 3）が含まれている。**有効な 3 個だけを実装する**（コメントアウト部分は移植不要）。`<defs>` には Gradient1〜6 全てが定義されているが、Gradient4〜6 は未使用でも残す（将来の差し替え用）と判断するか、未使用は削除して `defs` も Gradient1〜3 のみにするか。判断: **未使用の Gradient4〜6 は削除**（YAGNI）。

# 手順

1. `plans/0524-06-wide-background-in-main/movinglight02.md` を読む。
2. `MovingLights02.tsx`:
   - ルート `<div className={styles.movingLights02}>` の中に `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={styles.svg}>...</svg>` を置く。
   - JSX 化:
     - `<radialGradient ...>` はそのまま JSX 対応。属性は camelCase (`cx`, `cy`, `fx`, `fy`, `r`, `stop-color` → `stopColor`)
     - `<stop>` は `<stop offset="0%" stopColor="..." />`
     - `<animate attributeName="fx" dur="34s" values="0%;3%;0%" repeatCount="indefinite" />`（self-close）
     - `<animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="7s" repeatCount="indefinite" />`
     - `<rect x="13.744%" y="1.18473%" width="100%" height="100%" fill="url(#Gradient1)" transform="rotate(334.41 50 50)">` の中に `<animate>` 2 つ + `<animateTransform>` 1 つを入れる
   - 採用するのは Gradient1, 2, 3 を fill とした 3 つの `<rect>` のみ。Gradient4〜6 の `<defs>` も削除。
3. `MovingLights02.module.scss`:
   - 先頭に `// Source: plans/0524-06-wide-background-in-main/movinglight02.md (originally https://codepen.io/thanks2music/pen/VmJjaG)` のコメント。
   - `.movingLights02 { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }`
   - `.svg { width: 100%; height: 100%; display: block; }`
   - 末尾コメントで「prefers-reduced-motion 対応は best-effort、SMIL 停止は別タスク」と明記。

# 完了条件

- 2 ファイルが作成されている。
- `bun run build` がエラーなく完了する。
- 親領域いっぱいに広がり、3 色の radial gradient が回転・移動する。

# 報告

- 追加ファイルパス
- 削除した要素（コメントアウトされていた rect、未使用 Gradient4〜6）の確認
- 200 語以内
