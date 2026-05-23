# BlogSearch を module.scss 化 実装計画

## 目標

`src/components/BlogSearch.tsx` を CSS Modules (`*.module.scss`) 方式に移行する。既存の BEM (`c-blog-search__*`) ベースのグローバル SCSS を廃止し、`Typography` / `HeroBlock` / `Layouts/*` と同じ camelCase クラス + `styles.xxx` 参照のパターンに揃える。

参考：すでに module.scss 化済みのコンポーネント
- `src/components/Typography.{tsx,module.scss}`
- `src/components/HeroBlock.{tsx,module.scss}`
- `src/components/Layouts/**/*.{tsx,module.scss}`

## sub-plan 一覧

| #  | slug                    | モデル | 依存 | 状態   | 概要 |
| -- | ----------------------- | ------ | ---- | ------ | ---- |
| 01 | blogsearch-module-scss  | sonnet | -    | 未着手 | BlogSearch の SCSS を `BlogSearch.module.scss` に置換し、tsx の className を `styles.xxx` 参照に書き換え、旧 `BlogSearch.scss` を削除する |

## 実行波

- Wave 1: 01

（単一 sub-plan のため並列化なし）

## 横断的な制約

- スタイルは `BlogSearch.module.scss` に切り出し、`tsx` 側は `import styles from './BlogSearch.module.scss'` で参照する。
- クラス名は camelCase（BEM の `__` / `--` は使わない）。Block 部分は `blogSearch`、Element は `trigger` / `overlay` / `dialog` / `header` / `close` / `label` / `input` / `results` / `count` / `list` / `item` / `link` / `title` / `description` / `date` / `empty` のように Element だけを名前にする。
- `data-active` 属性によるアクティブ表示の挙動は維持する（CSS Modules でも属性セレクタはそのまま使える）。
- 既存の見た目・挙動は変更しない（純粋にスタイル基盤の置き換え）。
- `BlogSearch.scss` は削除。グローバル CSS にクラスを残さない。
- `BlogSearch.stories.tsx` は import 側を変更しないため触らない（props のみ渡しているため）。ただし変更が必要になった場合は同 sub-plan で対応する。
- 既存 module.scss 化コンポーネントの命名・書き味に揃える（[[styling-trial-css-modules]] のトライアル方針に従う）。
- dev / preview / storybook サーバは起動しない。検証は `bun run build`。

## 未確定事項

- なし（既存パターンに完全に揃える）
