# leaf 02-01: 分類マップとベース名抽出

## 役割

Astro/Vite 出力ファイル名から**ベース名**（hash を除いたコンポーネント名）を取り出し、固定マップで「共通」か「ページ専用」かを判定する。

## ベース名抽出

Astro/Vite は `[name].[hash].[ext]` 形式で出力する。例:

- `Typography.BsC0cmaY.css` → ベース名 `Typography`
- `index@_@astro.BdNMo2kM.css` → ベース名 `index@_@astro`
- `HeaderLink.D8cufbIO.css` → ベース名 `HeaderLink`

抽出ロジック（疑似コード）:

```js
function baseName(filename) {
  // 末尾の拡張子を落とす
  const noExt = filename.replace(/\.(css|js|mjs|webp|svg|png|jpe?g|gif|avif)$/, '');
  // 最後のドット以降（hash 部分）を落とす
  const lastDot = noExt.lastIndexOf('.');
  return lastDot === -1 ? noExt : noExt.slice(0, lastDot);
}
```

## COMMON_BASES（共通扱いの許可リスト）

```js
const COMMON_BASES = new Set([
  'Header',
  'Footer',
  'HeaderLink',
  'HeaderLayout',
  'FooterLayout',
  'BodyLayout',
  'MainLayout',
  'client',   // React runtime
]);
```

## ページ専用（明示的に index 扱い）

以下は **page/index/** に置く。明示することで意図を残す:

- `Typography`
- `ContainerLayout`
- `MainBackgroundFull`
- `MovingLights02`
- `index@_@astro`  ← Astro の page entry

## デフォルト挙動

`COMMON_BASES` に無いベース名は**保守的にすべて page/index/ に倒す**。これにより新規コンポーネント追加時にも安全側で動作する。

## classify 関数 I/F

```js
function classify(localPath /* string */) {
  // 戻り値: { bucket: 'common' | 'page' }
}
```

## 受け入れ条件

- `HeaderLink.<hash>.css` → `common`
- `Typography.<hash>.css` → `page`
- `_xxx.<hash>.css`（未知のベース名）→ `page`（保守的）
- `favicon.svg` → 02-02 で別ルートで扱う（このマップの対象外）

## 関連

- 親: [../spec.md](../spec.md)
- 次: [02-path-mapping.md](02-path-mapping.md)
