# leaf 02-02: 出力先パスの解決ルール

## マッピング表

| 種類 | 共通 (common) | ページ専用 (page/index) |
| --- | --- | --- |
| CSS | `exports/assets/css/common/<name>.<hash>.css` | `exports/assets/css/page/index/<name>.<hash>.css` |
| JS  | `exports/assets/js/common/<name>.<hash>.js`   | `exports/assets/js/page/index/<name>.<hash>.js`   |
| 画像 | `exports/assets/images/common/<ext>/<name>.<hash>.<ext>` | `exports/assets/images/page/index/<ext>/<name>.<hash>.<ext>` |
| その他 (public 直下) | `exports/<filename>`（ルート相対パスを維持） | — |

> ファイル名・hash は **Vite が付けたものをそのまま流用**する（再ハッシュしない）。

## resolveDest 関数 I/F

```js
function resolveDest(localPath /* string */, pageId /* string */) {
  // 戻り値: { destFsPath: string, destUrlPath: string }
  // destFsPath: ファイル書き込み先 (例: "exports/assets/css/page/index/Typography.xxx.css")
  // destUrlPath: HTML に書き戻すルート相対 URL (例: "/assets/css/page/index/Typography.xxx.css")
}
```

## "その他" の特例

- `/favicon.svg` / `/favicon.ico` のような **public 直下のファイル** はルート維持
- 判定: localPath が `/_astro/` で始まらない → "その他" 扱い
- 出力先 FS パス: `exports/<localPath をそのまま結合>`
- HTML 上の URL: 変更なし（書き換え不要）

## 画像の `<ext>` ディレクトリ

要件:

```
exports/assets/images/page/index/<filename>.<hash>.webp
exports/assets/images/page/index/<filename>.<hash>.svg
```

plan.md / plan-02 の最終ツリーでは拡張子サブディレクトリを切る記述があるが、order.md ではフラット。**実装はフラット**で十分（`<ext>/` の階層なし）に倒す:

```
exports/assets/images/page/index/<name>.<hash>.webp
```

> 理由: トップページからの画像参照は実質ゼロのため、複雑な階層を切る実益が薄い。必要になったら拡張。

## 受け入れ条件

- `/_astro/css/Typography.<h>.css` → FS: `exports/assets/css/page/index/Typography.<h>.css`, URL: `/assets/css/page/index/Typography.<h>.css`
- `/_astro/css/HeaderLink.<h>.css` → common 側
- `/favicon.svg` → FS: `exports/favicon.svg`, URL: `/favicon.svg`（書き換え不要）

## 関連

- 親: [../spec.md](../spec.md)
- 前: [01-classification-map.md](01-classification-map.md)
- 次: [03-copy-logic.md](03-copy-logic.md)
