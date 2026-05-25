# CLI 仕様

top ページ切り出しビルドのコマンドライン仕様。

## 1. コマンド

```
bun run build:export --version-id=<id> [options]
```

## 2. 引数

| 引数 | 必須 | デフォルト | 説明 |
|---|---|---|---|
| `--version-id=<id>` | 推奨 | 現在年月 `YYYYMM` | 共有アセットの ID。foundation / utility / layout / ui のファイル名に埋め込まれる |

### VERSION_ID のフォーマット

- 許容文字: `[A-Za-z0-9._-]+`
- 例: `202606`, `v2`, `2026-06-rc1`
- 詳細は [versioning.spec.md](./versioning.spec.md) を参照

## 3. 優先順位

1. CLI 引数 `--version-id`
2. 環境変数 `VERSION_ID`
3. フォールバック: 現在年月 `YYYYMM`

## 4. 実行例

```
bun run build:export --version-id=202606
VERSION_ID=202606 bun run build:export
bun run build:export                       # → 自動採番（例: 202605）
```

## 5. 終了コード

| コード | 意味 |
|---|---|
| 0 | 成功 |
| 1 | ビルド失敗（ソース解析エラー、書き出し失敗など） |
| 2 | 引数エラー（不正な `--version-id` フォーマット等） |

## 6. 非対象 / 今後の検討

- ビルド対象ページの引数指定（現状は top のみ固定）
- `--clean` 等の事前掃除オプション
- dry-run モード
