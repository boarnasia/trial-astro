# バージョニング規約

ビルド成果物のファイル名に埋め込む識別子（VERSION_ID / content hash）と、ファイル命名のルール。

## 1. レイヤー別の識別子

| レイヤー | 識別子 | 生成方法 |
|---|---|---|
| foundation | `<VERSION_ID>` | CLI 引数で指定 |
| utility | `<VERSION_ID>` | CLI 引数で指定 |
| layout | `<VERSION_ID>` | CLI 引数で指定 |
| ui | `<VERSION_ID>` | CLI 引数で指定 |
| page | content hash 4 桁 | ファイル内容から自動生成 |

レイヤーの責務は [dir.spec.md](./dir.spec.md) を参照。

## 2. VERSION_ID

### フォーマット

- 許容文字: `[A-Za-z0-9._-]+`
- 例: `202606`, `v2`, `2026-06-rc1`

### 運用方針

- 共有アセット**全体**を更新したい時にだけ手動でインクリメントする
- 同じ `VERSION_ID` のまま中身を変えた場合、CDN/ブラウザが古いキャッシュを返すのは**意図的に許容**する
- 指定方法（CLI / env / フォールバック）は [cli.spec.md](./cli.spec.md) を参照

## 3. content hash

- ファイル内容から生成、**4 桁**（astro 既定 8 桁を短縮）
- 各 page アセットごとに独立して生成される
- ファイル内容が変わると hash も変わるため、キャッシュは自動的に無効化される

## 4. ファイル命名

| 種別 | パターン |
|---|---|
| CSS（共有） | `<name>.<VERSION_ID>.css` |
| JS（共有） | `<name>.<VERSION_ID>.js` |
| 画像（共有） | `<basename>.<VERSION_ID>.{webp,svg}` |
| CSS（page） | `<name>.<hash4>.css` |
| JS（page） | `<name>.<hash4>.js` |
| 画像（page） | `<basename>.<hash4>.{webp,svg}` |

- `<name>` はコンポーネント名（小文字, kebab-case）
- `<basename>` は元画像のファイル名（拡張子除く, kebab-case）

## 5. 非対象 / 今後の検討

- VERSION_ID の自動採番ルール（手動運用前提）
- CDN キャッシュパージの自動化（許容方針のため未対応）
