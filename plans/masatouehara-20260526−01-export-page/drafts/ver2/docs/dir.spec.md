# 出力ディレクトリ仕様

top ページを切り出した静的サイトの、`exports/` 配下のフォルダ構造とレイヤー責務。

ファイル命名や識別子は [versioning.spec.md](./versioning.spec.md) を参照。

## 1. 全体構造

```
exports/
├── index.html
└── assets/
    ├── foundation/
    ├── utility/
    ├── layout/
    ├── ui/
    └── page/
```

- ベースパス: `plans/masatouehara-20260526−01-export-page/drafts/ver2/exports/`
- `assets/` 直下は **FLOCSS レイヤー名**（`foundation` / `utility` / `layout` / `ui` / `page`）
- アセット種別（css / js / images）の階層は切らない。コンポーネント単位で colocate する

## 2. レイヤー仕様

### 2.1 foundation

グローバルリセット・変数。CSS のみ。

```
assets/foundation/
└── foundation.<VERSION_ID>.css
```

### 2.2 utility

`u-*` クラス。CSS のみ。

```
assets/utility/
└── utility.<VERSION_ID>.css
```

### 2.3 layout

ページ大枠の共通部品（header / footer など）。コンポーネントごとに 1 フォルダ。

```
assets/layout/<name>/
├── <name>.<VERSION_ID>.css
├── <name>.<VERSION_ID>.js          # 必要な場合のみ
└── <image>.<VERSION_ID>.{webp,svg}  # 必要な場合のみ
```

例: `assets/layout/header/{header.202606.css, header.202606.js, logo.202606.svg}`

### 2.4 ui

再利用される UI 部品（pagination, typography 等）。layout と同じ規約。

```
assets/ui/<component>/
├── <component>.<VERSION_ID>.css
├── <component>.<VERSION_ID>.js
└── <image>.<VERSION_ID>.{webp,svg}
```

### 2.5 page

ページ固有のアセット。**ここだけ content hash**。

```
assets/page/<page-name>/
├── <page-name>.<hash>.css
├── <page-name>.<hash>.js
└── <image>.<hash>.{webp,svg}
```

例: `assets/page/index/{index.a1b2.css, index.a1b2.js, hero.c3d4.webp}`

## 3. 非対象 / 今後の検討

- 多ページ展開時の共通アセットの重複排除（現状は index のみ）
- `object/` 階層の再導入（現状は ui / page / util を昇格して平坦化）
