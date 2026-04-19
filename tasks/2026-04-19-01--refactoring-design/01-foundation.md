# Phase 1: FLOCSS ディレクトリ + Foundation SCSS

## 作成するファイル

```
src/styles/
├── foundation/
│   ├── _variables.scss   # :root CSS 変数
│   ├── _base.scss        # 要素スタイル
│   └── _index.scss
├── layout/
│   ├── _l-site.scss      # .l-main variants
│   └── _index.scss
├── component/
│   └── _index.scss       # 各 Phase で追加
├── utility/
│   ├── _u-sr-only.scss
│   └── _index.scss
└── main.scss             # @use エントリポイント
```

## 変更するファイル
- `src/components/BaseHead.astro` — `global.css` → `main.scss`

## 削除するファイル
- `src/styles/global.css`

## 注意点
- `--black: 15, 18, 25` は RGB トリプレット → `rgb(var(--black))` で使う
- `.prose p` ルールは Phase 4 で `.c-post__body p` に置換するため `_base.scss` には含めない
- `main` 要素の width/padding は `_l-site.scss` で `.l-main` として定義し、`_base.scss` の `main { }` は削除
