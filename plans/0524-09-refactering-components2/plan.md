# CSS Modules 仕様への寄せ込み 実装計画

## 目標

`docs/frontend-design.md` で確定したコンポーネント層スタイル方針 (`*.module.scss` + クラスのみ + ネストタグセレクタ禁止) に違反している既存コードを解消する。対象は `Pagination`（残置 BEM/FLOCSS）と `Header`（ネストタグセレクタ）の2箇所。

## sub-plan 一覧

| # | slug | モデル | 依存 | 状態 | 概要 |
| - | - | - | - | - | - |
| 01 | pagination-css-modules | sonnet | - | 未着手 | `Pagination.scss` を `Pagination.module.scss` へ改名し BEM を解体、`Pagination.tsx` の className を styles 参照へ書き換え |
| 02 | header-no-nested-tag | haiku | - | 未着手 | `Header.module.scss` の `.brand > a` / `.social > a` ネストを `.brandLink` / `.socialLink` に切り出し、`Header.tsx` の `<a>` にクラスを付与 |

## 実行波（並列グルーピング）

- Wave 1: 01, 02 ← 並列（互いに独立したファイル群）

## 横断的な制約

- スタイリングルールは [docs/frontend-design.md](../../docs/frontend-design.md) に従う:
  - `*.module.scss` ではクラスセレクタのみを使う（タグセレクタ・ネスト内タグセレクタ禁止）
  - クラス名はキャメルケース（`linkActive` 等）。BEM の `__`, `--` は使わない
  - `!important` 不可、`:global` 原則禁止
- インポートは `import styles from './Xxx.module.scss'` 形式
- `clsx` はプロジェクト未導入。複数クラス結合はテンプレートリテラル or `[a, b].filter(Boolean).join(' ')` で対応
- dev / preview / storybook サーバは起動しない（人間管理）。検証は `bun run build`
- `u-sr-only` のような Utility 層クラスはそのまま使ってよい（グローバル）

## 未確定事項

- なし（order.md がリネーム規則まで具体的に指定済み）
