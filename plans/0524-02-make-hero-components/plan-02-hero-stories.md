---
name: hero-stories
model: haiku
depends_on: [hero-component]
---

# 目的

`HeroBlock` の Storybook ストーリーを追加する。既存のストーリー（`Typography.stories.tsx` / `LayoutBody.stories.tsx`）のパターンを踏襲する。

# 背景・制約

- `CLAUDE.md` を必ず先に読む。
- 既存のストーリーは `@storybook/react-vite` の `Meta` / `StoryObj` を使用。先行 plan の `HeroBlock` は `children: ReactNode` を受け取る slot 型 React コンポーネント。
- 画像は Storybook 内では `astro:assets` の `<Image>` は使えないので、通常の `<img>` でダミー画像（例: `https://picsum.photos/1020/510` など外部 URL、または `placehold.co`）を使う。

# 変更ファイル

- `src/components/HeroBlock.stories.tsx` ... 新規

# 手順

1. `src/components/HeroBlock.stories.tsx` を作成。
2. 以下を含める:
   - `Meta<typeof HeroBlock>`、`title: 'Components/HeroBlock'`、`parameters: { layout: 'fullscreen' }`（Hero は横幅いっぱい想定）。
   - `Default` ストーリー: children として `<img src="https://picsum.photos/1020/510" alt="" width={1020} height={510} />` を渡す。`render` を使って JSX で組むのが分かりやすい。
   - `Empty` ストーリー: children を渡さず（または空フラグメント）、空状態が壊れないことを示す（コンテナだけが表示される）。
3. import は `import HeroBlock from './HeroBlock';`（default export を利用）。

# 完了条件

- `src/components/HeroBlock.stories.tsx` が新規作成され、TypeScript 型エラーなし。
- 既存ストーリーのコーディングスタイルに揃っている（`argTypes` は必要なら追加するが、`image` は `ReactNode` なので control は不要）。

# 報告

150 語以内で:
- 作成したファイルパス
- 用意したストーリー名一覧
- ダミー画像の取得元
