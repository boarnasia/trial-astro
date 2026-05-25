# leaf 01-02: HTML パース戦略

## 役割

`dist/index.html` を読んで参照 asset を抽出するためのパース方針を決め、実装する。

## 選択肢

| 案 | メリット | デメリット |
| --- | --- | --- |
| A. `node-html-parser` | 軽量・速い・依存も小さい | 新規依存追加 |
| B. `linkedom` | DOM API そのまま使える | やや重い |
| C. 正規表現 | 依存ゼロ | エッジケース取りこぼしリスク |

## 決定ルール

**実装者に任せる**。ただし以下を満たすこと:

- script 冒頭コメントに `// HTML parsing: <A|B|C> — 理由: ...` を残す
- C を選ぶ場合は対象セレクタの正規表現を網羅的に列挙すること（次の葉 03 で定義する 4 種類すべて）
- 依存を入れる場合は `bun add -d <pkg>` で **devDependencies** に追加（実行は本番ではないため）

## 推奨

`node-html-parser` を推す。Astro 出力 HTML は素直なので、`querySelectorAll` で十分。

## 実装イメージ (A 案)

```js
import { parse } from 'node-html-parser';
const html = fs.readFileSync(htmlPath, 'utf8');
const root = parse(html);
const links = root.querySelectorAll('link[rel="stylesheet"]');
// ...
```

## 受け入れ条件

- 採用した戦略が冒頭コメントで明示されている
- パース失敗時にスタックトレースだけで終わらず、どの HTML を読もうとして失敗したか分かるメッセージを出す

## 関連

- 親: [../spec.md](../spec.md)
- 次: [03-asset-extraction.md](03-asset-extraction.md)
