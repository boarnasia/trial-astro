---
name: header-no-nested-tag
model: haiku
depends_on: []
---

# 目的

`Header.module.scss` 内に残る2箇所のネストタグセレクタ (`.brand { a { } }`, `.social { a { } }`) を独立クラスに切り出し、`*.module.scss` の3原則 (クラスセレクタのみ) に揃える。

# 背景・制約

- 現状:
  - [Header.module.scss](../../src/components/ui/Header.module.scss) の `.brand` 内に `a { text-decoration: none; }`
  - 同 `.social` 内に `a { display: flex; }`
  - [Header.tsx](../../src/components/ui/Header.tsx) の対応する `<a>` 要素には現状クラスが付いていない
- スタイル仕様: `docs/frontend-design.md` のコンポーネント層ルール
  - `*.module.scss` ではタグセレクタ・ネスト内タグセレクタを使わない
  - クラス名はキャメルケース
- `u-sr-only` は Utility 層クラスなのでそのまま使ってよい
- `.social` の `@media (max-width: 720px) { display: none; }` はクラスベースなので残す
- dev/preview/storybook サーバは起動しない。検証は `bun run build`

# 変更ファイル

- `src/components/ui/Header.module.scss` ... 更新 (ネスト `a {}` を独立クラス `.brandLink` / `.socialLink` に置換)
- `src/components/ui/Header.tsx` ... 更新 (対応する `<a>` に `className={styles.brandLink}` / `className={styles.socialLink}` を付与)

# 手順

1. `Header.module.scss`:
   - `.brand { a { text-decoration: none; } }` の `a { }` を削除し、トップレベルに `.brandLink { text-decoration: none; }` を追加
   - `.social { a { display: flex; } }` の `a { }` を削除し、トップレベルに `.socialLink { display: flex; }` を追加
   - `.brand` / `.social` の他のプロパティ (`margin`, `font-size`, `display: flex`, `@media (...)`) はそのまま残す
   - 結果として `*.module.scss` 内にネスト内含めタグセレクタが一つも残らない状態にする
2. `Header.tsx`:
   - `.brand` 内の `<a href="/">{SITE_TITLE}</a>` に `className={styles.brandLink}` を付与
   - `.social` 内の3つの `<a>` (Mastodon / Twitter / GitHub) それぞれに `className={styles.socialLink}` を付与
   - 既存の他属性 (`href`, `target`, `rel`) は変更しない
   - SVG や `<span className="u-sr-only">` はそのまま残す

# 完了条件

- `Header.module.scss` 内に裸のタグセレクタ (ネスト内含む) が一つもない
- `Header.tsx` の対象 `<a>` 要素にスタイル用クラス (`styles.brandLink`, `styles.socialLink`) が付与されている
- `bun run build` が成功する
- 見た目: ブランドリンクの下線無し / SNS アイコンのレイアウト / モバイル時の `.social` 非表示が現状と同等になる CSS になっている

# 報告

- 200語以内で:
  - 変更したファイル一覧 (更新ファイルのみのはず)
  - `bun run build` の結果
  - 想定外に変えた点があればその旨
