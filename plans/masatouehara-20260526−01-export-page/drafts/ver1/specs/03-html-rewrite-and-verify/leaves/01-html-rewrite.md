# leaf 03-01: HTML 内文字列置換

## 役割

`dist/index.html` を文字列として読み、02 で得た `Manifest` の `from` → `to` 置換をかけて `exports/index.html` に書き出す。

## I/F

```js
function rewriteHtml(htmlStr /* string */, manifest /* Manifest */) /* : string */ {
  // 戻り値: 書き換え後の HTML 文字列
}
```

## 実装

- 単純な **`String.prototype.replaceAll`** で OK
  - hash 付き URL は他と衝突しない前提（Astro/Vite の出力は安全）
- 各 entry について順に `html = html.replaceAll(entry.from, entry.to)`
- 結果を `fs.writeFile('exports/index.html', html)` で保存

## なぜパース不要か

- `from` は `/_astro/css/Typography.BsC0cmaY.css` のように一意性が極めて高い文字列
- HTML パース → 属性書き換え → シリアライズの過程で余計な差分が出るリスク（属性順、空白、エンティティ）を避けたい
- 文字列置換なら **元 HTML のフォーマットを保てる**

## 失敗パターン

- manifest の `from` が HTML に存在しない → スキップ（warning でも可）
- manifest の `from` が他の文字列の部分一致になる → 起きない前提（hash が衝突しない）

## 受け入れ条件

- `exports/index.html` 内に `/_astro/` が残っていない（CDN 由来除く）
- すべての `<link rel="stylesheet" href="/assets/css/...">` が manifest の `to` と一致する
- HTML の改行・インデント等は dist のまま温存される

## 関連

- 親: [../spec.md](../spec.md)
- 次: [02-cdn-handling.md](02-cdn-handling.md)
