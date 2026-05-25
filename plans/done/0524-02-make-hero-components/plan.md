# HeroBlock コンポーネント化 実装計画

## 目標

`src/layouts/BlogPost.astro` 内にインラインで書かれている Hero ブロック（`<div class="c-post__hero">` + `<Image>`）を、独立した React コンポーネント `HeroBlock` として切り出す。スタイルは CSS Modules (`HeroBlock.module.scss`)、Storybook ストーリーも合わせて追加する。

## API 方針（承認済み）

`astro:assets` の `<Image>` は Astro 専用のためコンポーネント内部では呼べない。既存の `LayoutBody` 系と同じく、`children` で画像要素を受け取る薄いラッパとする。

```astro
<!-- BlogPost.astro 側 -->
{heroImage && (
  <HeroBlock>
    <Image width={1020} height={510} src={heroImage} alt="" />
  </HeroBlock>
)}
```

```tsx
// HeroBlock.tsx
interface Props {
  children: ReactNode; // 画像要素（<Image /> でも <img /> でも可）
}
export const HeroBlock = ({ children }: Props) => (
  <div className={styles.heroBlock}>{children}</div>
);
```

order.md の「input: image」は意味的に「Hero に表示する画像要素」を指す。実装上は `children` で受け取る slot パターンとし、`LayoutBody` 系と統一する。

## 既存スタイルの扱い

- `src/styles/component/_c-post.scss` の `&__hero` ブロックは新コンポーネント側に移管し、元ファイルからは削除する。
- `c-post__body` / `c-post__title-area` 等は今回スコープ外（残置）。

## sub-plan 一覧

| #  | slug                | モデル  | 依存 | 状態   | 概要 |
| -- | ------------------- | ------ | ---- | ------ | ---- |
| 01 | hero-component      | sonnet | -    | 未着手 | `HeroBlock.tsx` + `HeroBlock.module.scss` を新規作成 |
| 02 | hero-stories        | haiku  | 01   | 未着手 | `HeroBlock.stories.tsx` を作成（既存パターン踏襲） |
| 03 | wire-up             | sonnet | 01   | 未着手 | `BlogPost.astro` を差し替え、`_c-post.scss` から hero ブロックを削除 |

## 実行波（並列グルーピング）

- Wave 1: 01
- Wave 2: 02, 03 ← 並列

## 横断的な制約

- スタイルは CSS Modules (`*.module.scss` + `import styles from`)。BEM プレフィックス (`c-` 等) は付けない。クラス名はキャメルケース（`heroBlock`）。
- React コンポーネントは `.tsx`、ファイル配置は `src/components/` 直下（既存パターン踏襲）。
- インラインスタイル禁止、`!important` 禁止。
- `bun run dev` / `bun run storybook` は起動しない。検証は `bun run build` のみ。
- パッケージ操作は `bun`。

## 未確定事項

- なし（API は `children` で確定）。

## 完了後の確認（人間）

- `bun run dev` で `/blog/<post>` を開き、Hero 画像が表示されていること。
- `bun run storybook` で `HeroBlock` の表示確認。
