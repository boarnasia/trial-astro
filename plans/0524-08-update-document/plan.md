# ドキュメント更新（CSS Modules 移行を反映）実装計画

## 目標

`order.md` に従って、ドキュメントを現状の実装方針（CSS Modules + 残置 BEM/FLOCSS）に追従させる。
具体的には以下を明文化する:

1. **コンポーネント層**は `*.module.scss`（CSS Modules）で書く
2. **Foundation / Utility 層**は SCSS + BEM + FLOCSS を維持する（`object` 配下は廃止済み）
3. `*.module.scss` のスタイル指定は **必ずクラスセレクタ** を使う（HTML タグセレクタへの直接スタイル付けは避ける）。詳細度を揃えるため

コードの実装そのものは対象外（document 更新タスク）。既存の `Header.module.scss` 等にタグセレクタが残っている件は別タスク `0524-07-refactoring-components/` 側で扱う。

## 共有用語（全 sub-plan で統一）

ドキュメント間で表現がブレないよう、以下の文言・用語を使うこと:

- スタック表記: `SCSS (CSS Modules + Foundation/Utility は BEM + FLOCSS)`
- ファイル命名: `Component.module.scss`（コンポーネント同階層に colocate）
- インポート方式: `import styles from './Component.module.scss'`
- クラス命名: キャメルケース（`headerNav`, `linkActive` 等）。BEM の `__` `--` プレフィックスは使わない
- 残置レイヤー: `src/styles/foundation/`（reset, variables, base）と `src/styles/utility/`（`u-*`）のみ。`object/`（`c-*`, `p-*`）は廃止済み
- module.scss の3原則:
  1. クラスセレクタのみでスタイルを当てる（タグセレクタ `div { }`, ネストした `a { }` 等は使わない）
  2. 詳細度はクラス1階層に揃える
  3. グローバルに漏らさない（`:global` は原則使わない）

## sub-plan 一覧

| # | slug | モデル | 依存 | 状態 | 概要 |
| - | - | - | - | - | - |
| 01 | frontend-design | sonnet | - | 未着手 | `docs/frontend-design.md` を CSS Modules 中心の仕様書に書き換える |
| 02 | claude-md | haiku | - | 未着手 | ルートの `CLAUDE.md` のスタック行と参照リンクを更新（`feontend-` 表記の扱いを含む） |
| 03 | supporting-docs | haiku | - | 未着手 | `docs/ai-guidelines.md` と `docs/onboarding.md` のスタイル記述を更新 |

CLAUDE.local.md には styling 関連の記述がないため、本タスクでは変更しない（完了報告で言及）。

## 実行波

- Wave 1: 01, 02, 03（互いに独立 — 共有用語で揃えるため並列実行可）

## 横断的な制約

- 既存の見出し階層・章立てはなるべく維持し、差分を小さく保つ
- 「もともと BEM + FLOCSS だった」経緯は前置きとして残してよいが、現在の指針が CSS Modules 主体であることを明確にする
- 既存コードに残るタグセレクタ・BEM クラス名（例: `Header.module.scss` のネスト `a {}`、`Pagination.scss` の `.c-pagination`）は **「移行途中のため残置」** と注記し、document は「新規・改修時の方針」として書く
- `docs/frontend-design.md` のファイル名は **そのまま `frontend-design.md`**（プロジェクト CLAUDE.md には `feontend-design.md` という誤記があるが、これは plan-02 で正規スペルに修正する）

## 未確定事項

- なし（order.md と memory の `styling_trial_css_modules` で方針は固まっているため、設計どおり進めて問題なさそう）
