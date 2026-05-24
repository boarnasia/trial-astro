---
name: pagination-css-modules
model: sonnet
depends_on: []
---

# 目的

`src/components/ui/Pagination` を `*.module.scss` 仕様 (CSS Modules + クラスのみ + キャメルケース) に移行する。残置 BEM/FLOCSS (`.c-pagination*`) を解体する。

# 背景・制約

- 現状: [Pagination.scss](../../src/components/ui/Pagination.scss) は BEM (`.c-pagination`, `&__list`, `&__link--active` ...) で書かれており、[Pagination.tsx](../../src/components/ui/Pagination.tsx) は文字列 className でそれらを参照している
- スタイル仕様: `docs/frontend-design.md` のコンポーネント層ルール
  - クラスセレクタのみ。タグセレクタ・ネスト内タグセレクタ禁止
  - キャメルケース命名 (`linkActive` 等)
  - 詳細度はクラス1階層に揃える
- `clsx` 未導入。複数クラスはテンプレートリテラルか `[a, b].filter(Boolean).join(' ')` で結合する
- dev/preview/storybook サーバは起動しない。検証は `bun run build`

# 変更ファイル

- `src/components/ui/Pagination.scss` ... 削除
- `src/components/ui/Pagination.module.scss` ... 新規作成 (BEM 解体・キャメルケース・フラット構造)
- `src/components/ui/Pagination.tsx` ... 更新 (`import styles from ...` に変更、全 className を styles 参照に置換)

# 手順

1. `Pagination.module.scss` を新規作成。クラス対応:
   - `.c-pagination` → `.pagination`
   - `.c-pagination__list` → `.list`
   - `.c-pagination__item` → `.item`
   - `.c-pagination__link` → `.link`
   - `.c-pagination__link--active` → `.linkActive`
   - `.c-pagination__link--disabled` → `.linkDisabled`
   - `.c-pagination__link--ellipsis` → `.linkEllipsis`
2. ネスト構造 (`&__list`, `&--active`) はすべてフラットなクラスに展開する。`.pagination` 内に `.list` をネストしない（独立した1階層クラスとして書く）
3. `:hover:not(...)` の長セレクタは整理する。`*.module.scss` ではクラス名がハッシュ化されるため `:not(.linkActive)` は素直に動かない。設計として「modifier クラスが付いていない素のリンクのみ hover 効果を効かせる」方針に切替:
   - `Pagination.tsx` 側でリンクの状態に応じて付与するクラスを完全に出し分ける（通常リンク = `styles.link` のみ、active/disabled/ellipsis = `styles.link` に加えて modifier クラスを追加）
   - `.link:hover` を直接定義し、`.linkActive`, `.linkDisabled`, `.linkEllipsis` 側で `background-color`, `border-color` 等を再上書きすれば hover 時の見た目を打ち消せる（modifier 側で hover を再定義してもよい）
   - もしくは hover を素のリンクだけに適用するため、通常リンクには別クラス `.linkHoverable` を当てる案でもよいが、シンプルなのは「modifier 側の上書きで hover 効果を打ち消す」方
4. `Pagination.tsx`:
   - 1行目を `import styles from './Pagination.module.scss';` に変更
   - 全 className を styles 参照へ置換
   - 複数クラスの結合は `` `${styles.link} ${styles.linkActive}` `` のテンプレートリテラル、もしくは `[styles.link, isActive && styles.linkActive].filter(Boolean).join(' ')` どちらでも可
5. 旧 `Pagination.scss` を削除

# 完了条件

- `src/components/ui/Pagination.scss` が存在しない
- `src/components/ui/Pagination.module.scss` が存在し、タグセレクタ / ネスト内タグセレクタ / BEM 命名が一切ない
- `Pagination.tsx` 内に `c-pagination` 文字列が残っていない
- `Pagination.tsx` から `Pagination.scss` の import が消えている
- `bun run build` が成功する
- 見た目: hover/active/disabled/ellipsis の状態が現状と同等になる CSS になっている (実機確認は人間が後で行う)

# 報告

- 200語以内で:
  - 変更したファイル一覧 (新規/更新/削除を区別)
  - `bun run build` の結果 (成功/警告/失敗)
  - hover 制御の設計判断 (どの方法を採ったか、1行)
  - 想定外に変えた点があればその旨
