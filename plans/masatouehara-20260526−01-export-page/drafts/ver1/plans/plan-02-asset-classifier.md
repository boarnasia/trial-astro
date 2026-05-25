# plan-02: 共通 / ページ専用 の分類とコピー

## 目的

plan-01 で列挙した asset を、**固定マップ**で「共通 (common)」「ページ専用 (page/<id>)」に振り分け、
`exports/assets/...` に FLOCSS スタイルのパスへコピーする。

## 分類ルール（固定マップ）

CSS / JS は **ファイル名の prefix（hash の前のベース名）** で判定する。
Astro/Vite は `[name].[hash].[ext]` 形式で出力するので、ベース名抽出は単純。

### common 扱いにするベース名

- `Header`
- `Footer`
- `HeaderLink`
- `HeaderLayout`
- `FooterLayout`
- `BodyLayout`
- `MainLayout`
- `client`  ← React runtime（複数ページで共有される）

### それ以外（page/index/ 扱い）

- `Typography`
- `ContainerLayout`
- `MainBackgroundFull`
- `MovingLights02`
- `index@_@astro` ← Astro が page entry に付ける命名
- `_..*` のような名前不明 file は **デフォルトで page/index/**（保守的に倒す）

### 画像

- `dist/_astro/<ext>/...` 配下の `webp` / `svg` / `jpg` / `png` などをそのまま扱う
- 本タスクではトップページからの画像参照は実質ゼロのはずだが、**列挙されたものは page/index/images/<ext>/ に置く**
- common 扱いの画像は今のところ無し（必要になったら map を拡張）

### 出力先パスのマッピング

| 種類 | 共通 | ページ専用 |
| --- | --- | --- |
| CSS | `exports/assets/css/common/<name>.<hash>.css` | `exports/assets/css/page/index/<name>.<hash>.css` |
| JS  | `exports/assets/js/common/<name>.<hash>.js`   | `exports/assets/js/page/index/<name>.<hash>.js`   |
| Image | `exports/assets/images/common/<ext>/...`     | `exports/assets/images/page/index/<ext>/...`     |
| その他 (`favicon.svg` 等 public 直下) | `exports/<filename>` （元のルート相対パスを維持） | — |

ファイル名・hash は **Vite が付けたものをそのまま流用**する（再ハッシュしない）。

## やること

1. `scripts/export-page.mjs` に `classify(filePath)` 関数を追加
   - 戻り値: `{ bucket: 'common' | 'page', destPath: string }`
2. 上記の固定マップを `const COMMON_BASES = new Set([...])` で定義
3. plan-01 で列挙した各 asset について:
   - `dist/<src>` → `exports/<dest>` にコピー
   - 出力先ディレクトリは `fs.mkdir(..., { recursive: true })` で都度作る
4. コピー結果として `{ from, to }` の対応表を保持し、plan-03 の HTML 書き換えで使う

## 受け入れ条件

- `node scripts/export-page.mjs index` 実行後、`exports/assets/css/page/index/` に
  `Typography.<hash>.css`, `index@_@astro.<hash>.css` が、
  `exports/assets/css/common/` に `HeaderLink.<hash>.css` が存在する
- `exports/favicon.svg` / `exports/favicon.ico` が存在する
- 不要なファイル（dist 全体や他ページの asset）はコピーされない

## スコープ外

- HTML 書き換え（plan-03）
- npm script 追加（plan-03）
