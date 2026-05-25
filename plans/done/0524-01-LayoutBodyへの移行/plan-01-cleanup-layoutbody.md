---
name: cleanup-layoutbody
model: haiku
depends_on: []
---

# 目的

既存の `src/components/Layouts/LayoutBody.module.scss` を CSS Modules として正しく動く形に整える。要素セレクタ（`body.layoutBody`）と、内部の `header { grid-area: header }` 派生ルールを削除する。

# 背景・制約

- CSS Modules ではクラス名のみがハッシュ化されるため、`body.layoutBody` のように要素併用はノイズ。
- `header { grid-area: header }` は後続 sub-plan（02）で各ラッパー側に `grid-area` を持たせる方針なので、ここでは削除する。
- LayoutBody.tsx 側は既に `className={styles.layoutBody}` を参照しているので、クラス名は `layoutBody` のまま維持する（変更不可）。

# 変更ファイル

- `src/components/Layouts/LayoutBody.module.scss` — 更新

# 手順

1. ファイルを開き、以下の内容に置き換える:

```scss
.layoutBody {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "footer";
  width: 100%;
  min-height: 100dvh;
}
```

2. それ以外は触らない。

# 完了条件

- ファイル全体が上記スニペットと一致する。
- `body.` 要素セレクタが残っていない。
- 内部の `header { ... }` ルールが残っていない。

# 報告

変更したファイルパスのみを 1 行で報告すること。
