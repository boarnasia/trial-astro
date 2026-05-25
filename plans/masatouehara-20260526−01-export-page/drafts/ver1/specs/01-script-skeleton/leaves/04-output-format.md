# leaf 01-04: 出力 JSON の形と内部表現

## 標準出力フォーマット

```json
{
  "css": ["/_astro/css/Typography.BsC0cmaY.css", "..."],
  "js": [],
  "images": [],
  "other": ["/favicon.svg", "/favicon.ico"]
}
```

- 各配列は **ローカルパス（ルート相対）の string**
- 並びは HTML 内に出現した順を維持する（重複は除外）
- `console.log(JSON.stringify(result, null, 2))` で出す

## 内部表現

後段 (02 / 03) で使えるように、関数として export しておく:

```js
// scripts/export-page.mjs
export function collectAssets(html /* string */) /* : AssetMap */ {
  // ...
}
```

`AssetMap` の型 (JSDoc で十分):

```js
/**
 * @typedef {Object} AssetMap
 * @property {string[]} css
 * @property {string[]} js
 * @property {string[]} images
 * @property {string[]} other
 */
```

## CLI モード vs ライブラリ モード

- CLI 直接実行 (`node scripts/export-page.mjs index`) では `console.log` まで行う
- 後続の 02 / 03 で関数として呼ぶ場合は `collectAssets()` を呼ぶだけで JSON 出力には触らない
- 判定は `import.meta.main` または `process.argv[1]` 比較（Node 22 で動く方法）

## 受け入れ条件

- 上記 JSON 形式で出力される
- `collectAssets()` が pure function（fs に触らず、HTML 文字列だけを引数に取る）
- 重複が排除されている

## スコープ外

- ファイルへの書き出し（標準出力のみ）
- 分類後の対応表（02 で別途定義）

## 関連

- 親: [../spec.md](../spec.md)
- 後続: [../../02-asset-classifier/spec.md](../../02-asset-classifier/spec.md)
