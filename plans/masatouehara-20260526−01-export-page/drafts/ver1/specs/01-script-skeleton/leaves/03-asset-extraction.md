# leaf 01-03: 抽出対象セレクタとローカル/外部判定

## 抽出対象

| 種類 | セレクタ | 取得属性 |
| --- | --- | --- |
| CSS | `link[rel="stylesheet"]` | `href` |
| JS  | `script[src]` | `src` |
| 画像 (img) | `img[src]` | `src` |
| 画像 (source) | `source[srcset]`, `img[srcset]` | `srcset` (カンマ区切り、各 URL を取り出す) |
| favicon 系 | `link[rel="icon"]`, `link[rel="apple-touch-icon"]` | `href` |

## ローカル / 外部 判定

- 先頭が `http://` または `https://` → **外部** → 除外
- 先頭が `//` (プロトコル相対) → 外部扱いで除外
- それ以外 (`/_astro/...`, `/favicon.svg`, 相対パス等) → **ローカル** として収集

## 分類（出力 JSON のキー）

ローカル URL を以下に振り分ける:

- 拡張子 `.css` → `css`
- 拡張子 `.js` / `.mjs` → `js`
- 拡張子 `.webp` / `.svg` / `.png` / `.jpg` / `.jpeg` / `.gif` / `.avif` → `images`
- それ以外 → `other`（favicon.ico などはここに入る）

> ※ `favicon.svg` は `.svg` だが扱いは **other** とする（public 直下、ルート維持で出力するため。02 で扱いを分ける）

## srcset の扱い

`srcset="a.webp 1x, b.webp 2x"` のような形式をカンマ区切りで分割し、各エントリの先頭トークン（URL 部分）を取り出してから上記の判定を回す。

## 受け入れ条件

- 外部 URL (`https://cdn.jsdelivr.net/...`, `https://fonts.googleapis.com/...`, `https://example.com/...`) が出力に含まれない
- `dist/index.html` に現れるローカル参照が全て拾えている
- 重複（同じ URL が複数回現れた場合）は排除されている

## スコープ外

- 共通/専用の分類（02 の責務）
- インライン `<style>`, `<script>` ブロック（今回は対象外）

## 関連

- 親: [../spec.md](../spec.md)
