# leaf 03-02: CDN 参照の温存

## 方針

外部 URL（CDN / OGP / Google Fonts）は **書き換えない・コピーしない・vendoring しない**。HTML 内で参照のまま残す。

## 対象（残すもの）

- `https://cdn.jsdelivr.net/npm/kiso.css@latest/kiso.css`
- `https://fonts.googleapis.com/css2?...`
- `https://fonts.gstatic.com`
- `https://example.com/...`（OGP の絶対 URL 等）
- プロトコル相対 `//...`

## 担保のしかた

01（asset 列挙）の段階で **外部 URL を弾いている**ため、manifest には外部 URL が現れない → 03-01 の replaceAll は触らずに済む。**特別な処理は不要**。

つまりこの葉は「機能ではなくテスト観点」を定義する。

## 受け入れ条件（テスト観点）

`exports/index.html` を grep して以下が **そのまま残っている**こと:

```
https://cdn.jsdelivr.net/
https://fonts.googleapis.com/
https://fonts.gstatic.com
```

OGP / canonical 等の絶対 URL も触られていないこと:

```
<meta property="og:image" content="https://example.com/...">
<link rel="canonical" href="https://...">
```

## 受け入れ確認手段

```sh
grep -c 'cdn.jsdelivr.net' dist/index.html
grep -c 'cdn.jsdelivr.net' exports/index.html
# 上記の出力が一致すれば OK
```

## スコープ外

- CDN の vendoring（kiso.css をローカルに持つなど）
- Google Fonts の self-host

## 関連

- 親: [../spec.md](../spec.md)
- 前: [01-html-rewrite.md](01-html-rewrite.md)
- 次: [03-npm-script.md](03-npm-script.md)
