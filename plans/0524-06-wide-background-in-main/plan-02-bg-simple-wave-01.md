---
name: bg-simple-wave-01
model: sonnet
depends_on: []
---

# 目的

`plans/0524-06-wide-background-in-main/simplewave01.md` の素材を出典とした SVG ウェーブ背景アニメ `SimpleWave01` を追加する。

# 背景・制約

- `docs/frontend-design.md` を遵守。CSS Modules のみ。タグセレクタ禁止、キャメルケース、`!important` / `:global` 禁止。
- React 関数式 + named export。`client:` ディレクティブ不要（純粋 SVG + CSS アニメ）。
- 親（`MainBackgroundFull`）の領域を満たすため、ルート要素は `position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden;`。
- `pointer-events: none;` は親で適用済みのため子側で再指定不要。
- `prefers-reduced-motion: reduce` でアニメ停止（`animation: none`）。
- パッケージ追加禁止。純 SVG + SCSS のみ。
- dev / preview サーバは起動しない。検証は `bun run build`。

# 変更ファイル

- `src/components/ui/BackgroundImage/SimpleWave01.tsx` ... 新規
- `src/components/ui/BackgroundImage/SimpleWave01.module.scss` ... 新規

# 素材の使い方（重要）

`plans/0524-06-wide-background-in-main/simplewave01.md` を **唯一の出典** とする。CodePen は読みに行かない。

素材は元 CodePen のデモ HTML 全体を含んでおり、ヘッダ・ロゴ・タイトル文字・コンテンツが入っているが、**この BackgroundImage では波の SVG のみを使う**。以下は **削除する**:

- `<h1>Simple CSS Waves</h1>`、`<svg class="logo">...</svg>`、`<div class="inner-header flex">` などの **テキスト・ロゴ・ヘッダ要素**
- `<div class="content flex">By.Goodkatz | Free to use</div>` などの **フッターコンテンツ**
- `body`, `h1`, `p`, `.logo`, `.inner-header`, `.flex`, `.content`、`@import url(...Lato)` などの **フォント・テキスト・レイアウト系 CSS**
- `.header` の `linear-gradient` 背景色（必要なら親側で別途指定。今回コンポーネントには持たせない）

**残して移植するのは以下のみ**:

- `<svg class="waves" ...>` 要素（`<defs><path id="gentle-wave" .../></defs>` と `<g class="parallax"><use .../>×4</g>` を含む全体）
- `.waves` の CSS（`position: relative; width: 100%; ...` だが、`min-height` / `max-height` / `margin-bottom` は適宜削除して親領域いっぱいに広げる）
- `.parallax > use` の animation 4 段階指定
- `@keyframes move-forever`
- `@media (max-width: 768px)` のうち `.waves` 関連のみ（`.content` / `h1` は削除）

# 手順

1. `plans/0524-06-wide-background-in-main/simplewave01.md` を読み、上記「素材の使い方」に従って必要部分だけ抽出する。
2. `SimpleWave01.tsx`:
   - ルート `<div className={styles.simpleWave01}>` の中に `<svg className={styles.waves} ...>` を置く。
   - SVG の属性は JSX 化（`xmlns:xlink` → `xmlnsXlink`、`xlink:href` → `xlinkHref`、`shape-rendering` → `shapeRendering`、`preserveAspectRatio` はそのまま）。`use` の `xlinkHref="#gentle-wave"` で参照。
   - SVG 内の各 `<use>` には `<use ... className={styles.parallaxUse}>` のようなクラスは付けず、CSS 側で `.parallax > use` 相当のスタイルは `.parallax use` セレクタで書く → と思いきや、これは「タグセレクタ」になりルール違反。**回避策**: `<use>` 1 つずつにクラスを付け、`.parallaxUse1` ～ `.parallaxUse4` のように個別クラスでアニメ指定する。CSS は 4 クラスそれぞれに `animation-delay` / `animation-duration` を当てる形。
   - SVG `id="gentle-wave"` の `<defs>` はそのまま JSX 内に置く（CSS Modules の影響を受けない属性なので問題なし）。
3. `SimpleWave01.module.scss`:
   - 先頭に `// Source: plans/0524-06-wide-background-in-main/simplewave01.md (originally https://codepen.io/goodkatz/pen/LYPGxQz)` の 1 行コメント。
   - `.simpleWave01 { position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; }`
   - `.waves { position: absolute; inset: 0; width: 100%; height: 100%; }`（親いっぱいに広げる。元の `15vh` 等は破棄）
   - `.parallaxUse1` ～ `.parallaxUse4`: 共通の `animation: moveForever 25s cubic-bezier(.55,.5,.45,.5) infinite;` を base にしつつ、それぞれ delay / duration を上書き。
   - `@keyframes moveForever` を素材通りに定義（`translate3d(-90px,0,0)` → `translate3d(85px,0,0)`）。
   - `@media (prefers-reduced-motion: reduce)` で `.parallaxUse1, .parallaxUse2, .parallaxUse3, .parallaxUse4 { animation: none; }`。
4. fill の透明度は素材通り（`rgba(255,255,255,0.7)` / `0.5` / `0.3` / `#fff`）。

# 完了条件

- 2 ファイルが作成されている。
- `bun run build` がエラーなく完了する。
- 文字・ロゴ・グラデーション背景は含まれず、波の SVG とアニメだけが残っている。

# 報告

- 追加ファイルパス
- 残した要素 / 削除した要素を箇条書きで簡潔に
- 200 語以内
