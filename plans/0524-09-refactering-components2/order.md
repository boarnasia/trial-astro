# 既存コンポーネントの CSS Modules 仕様への寄せ込み

## 背景

`0524-07-update-document` でドキュメントを更新し、コンポーネント層のスタイル方針を以下に確定した:

- コンポーネント層は `*.module.scss`（CSS Modules）
- Foundation / Utility 層のみ BEM + FLOCSS を維持
- `*.module.scss` の3原則:
  1. クラスセレクタのみ。タグセレクタ（`div { }`, ネストの `a { }` 等）は使わない
  2. ネスト内も同様（`.card { a { } }` を避け、`.cardLink` 等のクラスを切る）
  3. 詳細度はクラス1階層に揃える。`:global` は原則使わない

詳細は [docs/frontend-design.md](../../docs/frontend-design.md) を参照。

本タスクは、既存コードに残る上記方針への違反を解消する。

## 対象

### 1. Pagination の CSS Modules 化（残置 BEM/FLOCSS）

唯一残った非 module の SCSS。BEM クラス（`.c-pagination*`）で書かれている。

- [src/components/ui/Pagination.scss](../../src/components/ui/Pagination.scss) — `.module.scss` に改名 + BEM 命名を解体
- [src/components/ui/Pagination.tsx](../../src/components/ui/Pagination.tsx) — `className="c-pagination__link c-pagination__link--active"` のような文字列を `styles.link` / `styles.linkActive` 等の参照に置換

#### やること

- ファイル名: `Pagination.scss` → `Pagination.module.scss`
- クラス名のリネーム例:
  - `.c-pagination` → `.pagination`
  - `.c-pagination__list` → `.list`
  - `.c-pagination__item` → `.item`
  - `.c-pagination__link` → `.link`
  - `.c-pagination__link--active` → `.linkActive`
  - `.c-pagination__link--disabled` → `.linkDisabled`
  - `.c-pagination__link--ellipsis` → `.linkEllipsis`
- ネストした BEM の `&__list` `&--active` 構文をフラットなクラスに展開
- `:hover:not(...)` の長いセレクタは、modifier クラスを付けない通常リンクのみを対象にする形に整理する（CSS Modules ではクラスがハッシュ化されるため `:not(.linkActive)` の参照方式に注意。`clsx` 等で modifier を付けない設計にする方が素直）
- インポート: `import styles from './Pagination.module.scss'`
- `Pagination.tsx` 側で `className={clsx(styles.link, isActive && styles.linkActive)}` のような形に書き換える（`clsx` がプロジェクトで既に使われているなら踏襲、なければ単純なテンプレートリテラル）

#### 完了条件

- `src/components/ui/Pagination.scss` が消えていて、`Pagination.module.scss` が存在
- `Pagination.tsx` 内に `c-pagination` 文字列が残っていない
- `bun run build` 成功
- 見た目とインタラクション（hover / active / disabled / ellipsis）が現状と同等

---

### 2. Header.module.scss のネストタグセレクタ除去

`*.module.scss` の3原則に違反するネスト `a { }` が2箇所残っている。

- [src/components/ui/Header.module.scss](../../src/components/ui/Header.module.scss) — `.brand` と `.social` 配下に `a { }` ネスト
- [src/components/ui/Header.tsx](../../src/components/ui/Header.tsx) — 対応する `<a>` 要素にクラスを付与する必要あり

#### やること

- `.brand { a { text-decoration: none; } }` → `.brandLink { text-decoration: none; }` を切り出し、`Header.tsx` で `<a>` に `className={styles.brandLink}` を付与
- `.social { a { display: flex; } }` → `.socialLink { display: flex; }` を切り出し、`Header.tsx` で各 `<a>` に `className={styles.socialLink}` を付与（`u-sr-only` は維持）
- `.social` の `@media (max-width: 720px) { display: none; }` はクラスベースなので残してよい

#### 完了条件

- `Header.module.scss` 内に裸のタグセレクタ（ネスト内含む）が一つもない
- `Header.tsx` の `<a>` 要素にスタイル用クラスが付いている
- 見た目（リンクの下線・SNS アイコンのレイアウト・モバイル時の非表示）が現状と同等

---

## スコープ外（今回は触らない）

- **Storybook `*.stories.tsx` 内の inline style**: `style={{ background: '#xxx', padding: '...' }}` のようなレイアウト確認用デコレータが多数存在するが、これは Storybook のストーリー用デモなので CSS Modules 化の対象外
- **Foundation / Utility 層**: BEM + FLOCSS のまま維持（仕様どおり）
- **`src/styles/foundation/_base.scss` 内のタグセレクタ**: reset / base 目的なので残す（仕様で明示的に許容）

## 進め方

- `Pagination` と `Header` は独立しているため、並列の sub-plan に分割可能
- 変更後は `bun run build` で型・ビルドエラーがないことを確認
- 見た目の最終確認は人間が Storybook / dev サーバで実施

## 参考メモリ

- `styling-trial-css-modules`（プロジェクトメモリ）— 移行方針の根拠
