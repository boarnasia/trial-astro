# 共有パーツ出力 仕様（たたき台）

FLOCSS の `foundation` / `utility` / `layout` / `ui` を、独立コマンドで `exports/assets/` に書き出す機能の仕様。

## コマンド構成

| 用途 | コマンド | 本ファイルの対象 |
|---|---|---|
| 共有パーツ出力 | `bun run build:common --version-id=<id>` | ✅ |
| 個別ページ出力 | `bun run build:page <name> --version-id=<id>` | ❌（別ファイルで定義） |

- 両者は独立に実行できる
- 個別ページ出力は本コマンドの出力結果を **参照**する（href / src でリンクするのみ。書き換えはしない）

## 入力

- ソース: `src/` 配下の foundation / utility / layout / ui に該当するファイル
- 引数: `--version-id=<id>`（[cli.spec.md](./docs/cli.spec.md) に準拠）

## 出力

ベース: `plans/masatouehara-20260526−01-export-page/drafts/ver2/exports/`

| 対象 | 内容 |
|---|---|
| `assets/foundation/` | グローバル CSS |
| `assets/utility/` | `u-*` クラス CSS |
| `assets/layout/<component>/` | header / footer 等の共通部品（css / js / 画像） |
| `assets/ui/<component>/` | 再利用 UI 部品（css / js / 画像） |
| **対象外** | `assets/page/`, `*.html` |

配置・命名の詳細: [docs/dir.spec.md](./docs/dir.spec.md) / [docs/versioning.spec.md](./docs/versioning.spec.md)

## 個別ページからの参照方法

- ページ側 HTML は **既知のパス規約**で共有パーツを参照する
  - 例: `<link href="/assets/layout/header/header.<VERSION_ID>.css">`
- 個別ページ出力は本コマンドの結果を読まない（マニフェスト等は持たない）
- 両コマンドで `--version-id` を一致させる責任は呼び出し側にある

## 運用フロー

```
1. bun run build:common --version-id=202606         # 共有パーツ全部出す
2. bun run build:page index --version-id=202606     # index ページ出す
```

- 共有 ID を上げる時: 共有出力 → 全ページ再出力、の順で再ビルド
- 個別ページだけ更新する時: ページ出力のみ実行（共有は触らない）

## 必須要件

- 同じ `--version-id` で複数回実行しても同じファイル名を出力する（再現性）
- 既存ファイルは上書きする（差分検出はしない）
- 本コマンド単体実行後、`assets/foundation/` 〜 `assets/ui/` が揃った状態になる

## 非対象 / 今後の検討

- マニフェスト出力（page 側と機械的に整合させる仕組み）
- 共有パーツの部分ビルド（特定コンポーネントのみ再出力）
- ソースマップ出力
- 未使用パーツの自動除外（page 出力からの逆引きで剪定）
