---
name: supporting-docs
model: haiku
depends_on: []
---

# 目的

`docs/ai-guidelines.md` と `docs/onboarding.md` の「スタイル」記述を、現状の方針（CSS Modules 中心 + Foundation/Utility のみ BEM + FLOCSS）に追従させる。

# 背景・制約

- `docs/ai-guidelines.md` は AI 向けの最小ルール集。1行で「Styling uses SCSS with BEM and FLOCSS.」と書かれている部分を更新する
- `docs/onboarding.md` は人間/AI 向けのオンボーディング。冒頭の「スタイル: SCSS + BEM + FLOCSS」を更新する
- 詳細仕様は `docs/frontend-design.md`（plan-01 で更新）に任せ、ここでは短い言及に留める
- 共有用語はマスター `plan.md` の「共有用語」セクションに従う

# 変更ファイル

- `docs/ai-guidelines.md` ... 更新（1行）
- `docs/onboarding.md` ... 更新（1〜2行）

# 手順

1. マスター plan `plans/0524-07-update-document/plan.md` の「共有用語」を確認する
2. `docs/ai-guidelines.md` を開き、以下のように更新:
   - 該当行（現在「Styling uses SCSS with BEM and FLOCSS.」）を:
     `Styling uses SCSS with CSS Modules (*.module.scss) for components. Foundation and utility layers keep BEM + FLOCSS.`
     程度に変更（リンク先 `feontend-design.md` の表記がもし出ていたら `frontend-design.md` に修正）
3. `docs/onboarding.md` を開き、以下のように更新:
   - 冒頭リストの「スタイル: SCSS + BEM + FLOCSS」を:
     `スタイル: SCSS（CSS Modules 中心 / Foundation・Utility のみ BEM + FLOCSS）`
   - 他に styling 表記が残っていたら共有用語に合わせる（参照リンクの綴り `frontend-design.md` も確認）
4. 詳細は触らず、他の節（主要ディレクトリ / 開発 URL / 役割分担 / 推奨ワークフロー / メモ）はそのまま

# 完了条件

- `docs/ai-guidelines.md` の styling 記述に `CSS Modules` または `*.module.scss` という語が含まれている
- `docs/onboarding.md` の冒頭スタック表記が CSS Modules を反映している
- 両ファイルとも、`frontend-design.md` への参照があれば正しい綴りになっている
- それ以外の章は無変更

# 報告

100語以内で:
- 変更前後の該当行（各ファイル）
- 修正したリンク表記（あれば）
