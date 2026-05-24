---
name: stories-and-default-wiring
model: sonnet
depends_on: [main-background-full, bg-simple-wave-01, bg-moving-lights-01, bg-moving-lights-02]
---

# 目的

Wave 1 で作った 4 コンポーネントに Storybook story を追加し、**`src/pages/index.astro`（トップページ）** の `first-element-of-body` スロットに `<MainBackgroundFull><MovingLights02 /></MainBackgroundFull>` を差し込む。`Layout.astro` 側はデフォルト変更なし。

# 背景・制約

- `docs/frontend-design.md` を遵守。
- Story の書き方は既存（`Header.stories.tsx` / `BodyLayout.stories.tsx` / `HeroBlock.stories.tsx`）を参考にする。**着手前に `src/components/layouts/BodyLayout.stories.tsx` と `src/components/ui/HeroBlock.stories.tsx` を読み、同じ形式で書くこと。**
- `MainBackgroundFull` の Story は anchor positioning が Storybook 単体では効かないため、**Story 用ラッパに anchor 元のダミー要素**（`anchor-name: --page-header` と `--page-footer` を持つ空 div を上下に）を置く、もしくは Story 内では `position: relative;` の固定サイズ枠で代用する。判断はエージェント裁量。
- BackgroundImage 3 種の Story は、ルートを `width: 100%; height: 600px; position: relative; background: #fff;` などの可視サイズの枠で囲って単体表示できるようにする。
- `MovingLights01` は内部で `requestAnimationFrame` を回すため、Storybook では問題なく動く。Astro 側で配置する際は **必ず `client:load`** を付ける（後述）。
- dev / storybook サーバは起動しない。検証は `bun run build`。

# 変更ファイル

- `src/components/layouts/MainBackgroundFull.stories.tsx` ... 新規
- `src/components/ui/BackgroundImage/SimpleWave01.stories.tsx` ... 新規
- `src/components/ui/BackgroundImage/MovingLights01.stories.tsx` ... 新規
- `src/components/ui/BackgroundImage/MovingLights02.stories.tsx` ... 新規
- `src/pages/index.astro` ... 更新（`<MainBackgroundFull slot="first-element-of-body"><MovingLights02 /></MainBackgroundFull>` を Layout の子として追加）

# 手順

1. `src/components/layouts/BodyLayout.stories.tsx` と `src/components/ui/HeroBlock.stories.tsx` を読み、`Meta` / `StoryObj` / `args` の形式を確認する。
2. `MainBackgroundFull.stories.tsx` を作成。Story では中身として軽い色付き矩形 or BackgroundImage の 1 つを差し込んで見た目確認できるようにする。anchor positioning が効かない件は Story 用ラッパで補完する。
3. BackgroundImage 3 種の Story ファイルをそれぞれ作成。可視枠（`width: 100%; height: 600px; position: relative; background: #fff;` 程度）で囲って単体表示できるようにする。
4. `src/pages/index.astro` を更新:
   - `import { MainBackgroundFull } from '@/components/layouts/MainBackgroundFull';`
   - `import { MovingLights02 } from '@/components/ui/BackgroundImage/MovingLights02';`
   - `<Layout title={SITE_TITLE} description={SITE_DESCRIPTION}>` の **直下の子** として、以下を追加:
     ```astro
     <MainBackgroundFull slot="first-element-of-body">
       <MovingLights02 />
     </MainBackgroundFull>
     ```
     既存の `<ContainerLayout>...</ContainerLayout>` の前か後ろどちらでも良い、slot 機構で正しく配置される。
5. `Layout.astro` 側には **追加変更は不要**（既存の `<slot name="first-element-of-body" />` をそのまま使う）。

# 完了条件

- 4 ファイルが新規作成され、`src/pages/index.astro` が更新されている。
- `bun run build` がエラーなく完了する。
- トップページに MovingLights02 の背景が出る。各 Story が Storybook で表示可能（実機確認は人間）。

# 報告

- 追加・更新したファイルパス一覧
- `src/pages/index.astro` の差分（before → after の該当行）
- `MovingLights01` を Astro で使う際の注意点（`client:load` 必須）を一文で
- 200 語以内
