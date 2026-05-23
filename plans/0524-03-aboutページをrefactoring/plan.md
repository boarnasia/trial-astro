# about ページの refactoring 実装計画

## 目標

`src/pages/about.astro` を `BlogPost.astro` レイアウトから `@/layouts/Layout.astro` に切り替え、本文を `LayoutContainer` で内側にレイアウトする。`index.astro` と同じ「Layout + LayoutContainer + Typography」のパターンに揃え、ブログポスト固有の要素（pubDate / FormattedDate）はページから外す。

## sub-plan 一覧

| #  | slug                | モデル | 依存 | 状態   | 概要                                                                    |
| -- | ------------------- | ------ | ---- | ------ | ----------------------------------------------------------------------- |
| 01 | refactor-about-page | sonnet | -    | 未着手 | about.astro を Layout + LayoutContainer + Typography 構成に書き換える |

## 実行波

- Wave 1: 01

（単一 sub-plan のため並列化なし）

## 横断的な制約

- `CLAUDE.md` / `docs/feontend-design.md` の規約を遵守。
- 既存の `index.astro` の書き方を参考パターンとする。
- インラインスタイル / 生 BEM クラスを直書きしない。`LayoutContainer` と `Typography` は既存 export をそのまま使う。
- 段落本文の Lorem ipsum テキストは変更しない（refactoring の範囲外）。
- dev / preview / storybook サーバは起動しない。検証は `bun run build`。

## 設計判断（未確定事項 — 承認時に確定したい）

order.md からは読み取れない以下を、デフォルト案として提示する:

1. **`heroImage` の扱い**: 現状は `blog-placeholder-about.jpg` を `BlogPost.astro` が描画している。新 `Layout.astro` に hero スロットは無い。
   - **デフォルト案**: 画像は外す。about ページは「サイト紹介ページ」であり、ブログポストのヒーロー画像とは性質が違うため。
   - 代替案: `LayoutContainer` の中に `HeroBlock` を入れて画像を残す。
2. **`pubDate` / `FormattedDate` の扱い**:
   - **デフォルト案**: 外す。about ページは記事ではないため日付は不要。
3. **タイトル / 説明文の表示**:
   - **デフォルト案**: `Typography as="h1" variant="display"` で `"About Me"`、`Typography as="p" variant="lead"` で説明文を表示（index.astro と揃える）。
4. **`LayoutContainer` のサイズ**:
   - **デフォルト案**: `size="sm"`（index.astro と揃える）。本文が読みやすい幅。
5. **本文段落のマークアップ**:
   - **デフォルト案**: 既存の生 `<p>` をそのまま残す（5 段落）。Typography 化は別タスク扱い。

これらが NG であれば、承認ゲートで戻して plan を直す。
