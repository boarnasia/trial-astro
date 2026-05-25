---
name: blogsearch-module-scss
model: sonnet
depends_on: []
---

# 目的

`src/components/BlogSearch.tsx` を CSS Modules 方式に移行する。既存 BEM ベースの `BlogSearch.scss` を `BlogSearch.module.scss` に置き換え、tsx の className を `styles.xxx` 参照へ書き換える。

# 背景・制約

- 参考実装: `src/components/Typography.{tsx,module.scss}`、`src/components/HeroBlock.{tsx,module.scss}`、`src/components/Layouts/**/*.module.scss`。
- クラス名は camelCase。BEM の `__` / `--` は使わない。Block 部分（`c-blog-search`）に相当するルート要素は `blogSearch`、Element はそのまま `trigger` / `overlay` / `dialog` / `header` / `close` / `label` / `input` / `results` / `count` / `list` / `item` / `link` / `title` / `description` / `date` / `empty` を使う。
- 見た目・挙動は完全に維持。CSS の値・セレクタの中身は変えない（ネスト構造とクラス名だけ書き換える）。
- `data-active='true'` 属性セレクタは module.scss 上でもそのまま使える（`.link[data-active='true'] { ... }` の形）。
- `BlogSearch.scss` は削除する。残してはいけない。
- `BlogSearch.stories.tsx` は変更不要（props しか触っていない）。
- プロジェクト規約: `CLAUDE.md` と `docs/feontend-design.md` を実装前に読む。ただし [[styling-trial-css-modules]] のトライアル中であり、CSS Modules 方式が優先される（docs はまだ更新前）。
- dev / preview / storybook サーバは絶対に起動しない。`bun run dev` / `astro dev` / `storybook dev` 禁止。検証は `bun run build` のみ。
- パッケージマネージャは `bun`。`npm` / `package-lock.json` を作らない。

# 変更ファイル

- `src/components/BlogSearch.module.scss` ... 新規作成（既存 `BlogSearch.scss` の内容を CSS Modules 構造に書き換えたもの）
- `src/components/BlogSearch.tsx` ... 更新（`import './BlogSearch.scss'` → `import styles from './BlogSearch.module.scss'`、className を `styles.xxx` または `${styles.xxx}` 形式に書き換え）
- `src/components/BlogSearch.scss` ... 削除

# 手順

1. `CLAUDE.md` / `docs/feontend-design.md` / 参考実装（`Typography.tsx` + `Typography.module.scss`、`HeroBlock.tsx` + `HeroBlock.module.scss`）を読む。
2. `src/components/BlogSearch.module.scss` を新規作成し、既存 `BlogSearch.scss` の全スタイルを移植する。
   - ルート: `.blogSearch { ... }`
   - 各 Element はネストせずトップレベルクラスとして書く（CSS Modules ではローカルスコープなので Block ネストは不要）。例: `.trigger { ... }`, `.dialog { ... }`, `.link { ... &[data-active='true'] { ... } }`
   - CSS の値（padding / color / box-shadow など）はすべてそのまま維持。
3. `src/components/BlogSearch.tsx` を更新。
   - `import './BlogSearch.scss'` → `import styles from './BlogSearch.module.scss'`
   - `className="c-blog-search"` → `className={styles.blogSearch}`
   - `className="c-blog-search__trigger"` → `className={styles.trigger}`
   - ...同様にすべての `c-blog-search__xxx` を `styles.xxx` 参照へ。
4. `src/components/BlogSearch.scss` を削除する。
5. `BlogSearch.stories.tsx` を念のため目視確認し、不要な参照がないことを確認する（基本的に変更不要）。

# 完了条件

- `src/components/BlogSearch.module.scss` が存在し、既存のスタイルがすべて移植されている。
- `src/components/BlogSearch.tsx` が `styles.xxx` 形式で参照している（文字列 className が残っていない）。
- `src/components/BlogSearch.scss` が存在しない。
- `bun run build` が成功する（このコマンドは取りまとめ役側で実行するので、サブエージェントは実行しなくてよい。ただし型エラー等が無いことは確認する）。
- 見た目・挙動の差分は無い想定（CSS の値を変更していない）。

# 報告

- 変更したファイルの一覧（追加 / 更新 / 削除を区別）
- 新しい `BlogSearch.module.scss` のクラス名一覧
- tsx 側でハマった点 / 補足事項があれば短く
- 200 語以内
