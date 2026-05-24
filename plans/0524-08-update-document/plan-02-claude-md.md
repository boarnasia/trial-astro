---
name: claude-md
model: haiku
depends_on: []
---

# 目的

ルートの `CLAUDE.md` を、現状のスタイル方針（CSS Modules + 残置 BEM/FLOCSS）に追従させる。
さらにファイル名の誤記 `feontend-design.md` を正しい `frontend-design.md` に修正する。

# 背景・制約

- `CLAUDE.md` の `## Stack` 行は現在 `SCSS (BEM + FLOCSS)` と書かれている
- `## Repository docs` セクションで `docs/feontend-design.md` を参照しており、わざわざ「note: filename is `feontend-design.md`, not `frontend-`」と注記している。**実ファイルは `docs/frontend-design.md`** で、注記が誤り
- CLAUDE.md は他ドキュメントの内容を「restate」しない方針なので、スタイル詳細は書かない。あくまでスタック行と参照リンクのみ更新する
- 共有用語はマスター `plan.md` の「共有用語」セクションに従う

# 変更ファイル

- `CLAUDE.md` ... 更新（2箇所）

# 手順

1. マスター plan `plans/0524-07-update-document/plan.md` の「共有用語」を確認する
2. `CLAUDE.md` を開く
3. `## Stack` の段落で `SCSS (BEM + FLOCSS)` を `SCSS (CSS Modules + Foundation/Utility は BEM + FLOCSS)` に変更
4. `## Repository docs` セクションで:
   - `@docs/feontend-design.md` → `@docs/frontend-design.md` に修正
   - 行末の「note: filename is `feontend-design.md`, not `frontend-`」の注記を削除（誤記だったため）
5. 他に styling に関連する記述がないか軽く確認し、あれば共有用語に合わせる
6. それ以外（Critical: dev servers / Conventions / Change-size preference 等）は触らない

# 完了条件

- `CLAUDE.md` の Stack 行に `CSS Modules` という語が含まれる
- `CLAUDE.md` 内で `feontend-design` の文字列が完全に消えており、`frontend-design.md` を正しく参照している
- 上記以外の節は無変更

# 報告

100語以内で:
- 変更行（前後の文字列を1行ずつ）
- 削除した行（誤記注記）があればその内容
