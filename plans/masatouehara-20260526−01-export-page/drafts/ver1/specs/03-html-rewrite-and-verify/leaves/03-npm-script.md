# leaf 03-03: package.json への script 追加

## 追加内容

`package.json` の `scripts` に以下を追加:

```json
"export:index": "astro build && node scripts/export-page.mjs index"
```

## 設計判断

- `astro build` と `node scripts/export-page.mjs` を `&&` で繋ぐ
  - 理由: `dist/` を最新化してから export しないと、古い hash で manifest がズレるリスク
  - 人間管理の dev サーバとは独立に走る（dist を上書きするだけで dev には影響しない）
- 引数 `index` はハードコード（本タスクは index のみサポート）

## 命名

- `export:index`: コロン区切りで「対象ページ」を表現
- 将来 about / blog を足すなら `export:about`, `export:blog`, あるいは `export:all`
- 今回は **`export:index` のみ追加**

## 使い方コメント

`scripts/export-page.mjs` の冒頭に 5 行程度の使い方コメントを入れる:

```js
/**
 * export-page.mjs
 *
 * 使い方: node scripts/export-page.mjs <page-id>
 *   例: node scripts/export-page.mjs index
 *
 * dist/ から指定ページが参照する asset だけを exports/ に切り出す。
 * 詳細は plans/plans/masatouehara-20260526−01-export-page/ を参照。
 */
```

## 受け入れ条件

- `package.json` の `scripts` に `export:index` がある
- `bun run export:index` で `astro build` → `node scripts/export-page.mjs index` の順に実行される
- スクリプト冒頭に使い方コメントがある

## スコープ外

- README / docs への記載（本タスクではコマンドの存在だけで十分。次フェーズ）
- 他ページ向け script の追加

## 関連

- 親: [../spec.md](../spec.md)
- 次: [04-verification.md](04-verification.md)
