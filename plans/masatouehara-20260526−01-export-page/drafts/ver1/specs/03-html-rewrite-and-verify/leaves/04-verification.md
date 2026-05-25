# leaf 03-04: ビルドと動作確認手順

## AI 側で確認すること

1. `bun run export:index` を実行（または `/check-build` 経由で build パスを確認）
2. `exports/index.html` の存在を確認
3. `exports/assets/css/common/` と `exports/assets/css/page/index/` の中身を確認
4. `exports/index.html` の `<link>` / `<script>` を目視:
   - ローカル参照が `/assets/...` に書き換わっているか
   - CDN 参照が温存されているか
5. `exports/favicon.svg` / `exports/favicon.ico` が存在するか

## チェックリスト（grep ベース）

```sh
# 残留 /_astro/ がない（CDN 以外で）
grep -n '/_astro/' exports/index.html  # → 何も出ないこと

# common と page の両方が参照されている
grep -n '/assets/css/common/' exports/index.html
grep -n '/assets/css/page/index/' exports/index.html

# CDN は残っている
grep -n 'cdn.jsdelivr.net' exports/index.html
grep -n 'fonts.googleapis.com' exports/index.html
```

## 人間に依頼すること

- `cd exports && bun serve .` でローカル配信を立ち上げてもらう
- ブラウザで `http://localhost:<port>/` を開く
- `astro dev` のトップページ（`http://localhost:4321/`）と見た目を比較してもらう
- header / footer が出ているか、背景や fonts が崩れていないかを確認してもらう

## スクリーンショット差分

- 自動比較は **本タスクではスコープ外**
- 人間が目視で OK を出す前提

## トラブルシュート（参考）

| 症状 | 想定原因 | 切り分け |
| --- | --- | --- |
| CSS が当たらない | manifest の書き換え漏れ | `exports/index.html` の `<link>` を見て `/assets/...` か確認 |
| 404 が出る | コピー漏れ | `exports/assets/` 配下にファイルがあるか確認 |
| Fonts が出ない | CDN URL が壊れた | CDN の URL を grep して原文と比較 |
| header だけ出ない | `Header` 系のベース名が common に入っていない | `COMMON_BASES` を確認 |

## 関連

- 親: [../spec.md](../spec.md)
- 全体: [../../spec.md](../../spec.md)
