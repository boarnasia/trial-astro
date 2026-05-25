# top ページを必要な部品だけ切り出す

## 書き出し先

- plans/masatouehara-20260526−01-export-page/drafts/ver2/plans
- plans/masatouehara-20260526−01-export-page/drafts/ver2/scripts

## ソース

- `src`

## 出力先の構成

ベース: `plans/masatouehara-20260526−01-export-page/drafts/ver2/exports/`

FLOCSS ベースのフォルダ構成。共有層（page 以外）と page 層でハッシュ規約が異なる。

```
exports/
├── index.html
└── assets/
    ├── foundation/
    │   └── foundation.<VERSION_ID>.css
    ├── utility/
    │   └── utility.<VERSION_ID>.css
    ├── layout/
    │   ├── header/
    │   │   ├── header.<VERSION_ID>.css
    │   │   ├── header.<VERSION_ID>.js
    │   │   └── <image>.<VERSION_ID>.{webp,svg}
    │   └── footer/
    │       └── ...（同上）
    ├── ui/
    │   └── <component>/
    │       ├── <component>.<VERSION_ID>.css
    │       ├── <component>.<VERSION_ID>.js
    │       └── <image>.<VERSION_ID>.{webp,svg}
    └── page/
        └── index/
            ├── index.<hash>.css
            ├── index.<hash>.js
            └── <image>.<hash>.{webp,svg}
```

### ハッシュ規約

| レイヤー | 識別子 | 備考 |
|---|---|---|
| foundation / utility / layout / ui | `<VERSION_ID>` 固定 | ビルド時に指定する共有 ID |
| page | content hash（4 桁） | ファイル内容から自動生成 |

- `<VERSION_ID>` は CLI 引数 `--version-id=<id>` で指定する（例: `bun run build:export --version-id=202606`）
- フォーマットは任意文字列を許容する（`[A-Za-z0-9._-]+`）
- 共有 ID は「共有アセットを全部更新したい時」にだけ手動で上げる
- 同じ `<VERSION_ID>` のまま中身を変えた場合に CDN/ブラウザが古いキャッシュを返すのは**意図的に許容**する

## 必須要件

- `cd exports && bun serve .` で起動できること
- screenshot が一致すること
- header / footer などは共通部品として、css / js / webp / svg は上記 FLOCSS スタイルで配置する
- 出力されたページには header / footer はついていて良い
