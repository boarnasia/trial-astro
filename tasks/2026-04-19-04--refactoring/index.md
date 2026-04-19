# Refactoring 計画・実施記録

## 概要

ブログ全体の保守性と拡張性を高めるため、コンテンツ形式の統一、UI の整理、共通表現の導入、不要な差分の削減を行う。

## 目的

- ブログ記事を MDX に統一する
- UI を必要に応じて Radix UI ベースに寄せる
- Typography を共通 React コンポーネントとして整理する
- 検索とページングの体験を改善する
- 不要ファイルや不要実装を減らす

---

## 対象範囲

| 項目 | 内容 | 状態 |
|---|---|---|
| コンテンツ形式統一 | blog 記事を Markdown から MDX へ統一 | [x] |
| Typography 共通化 | React コンポーネントを追加して見出し・本文の表現を整理 | [x] |
| 検索 UI 改善 | 検索導線をダイアログ化し、アクセシビリティを向上 | [x] |
| ページング整理 | UI の文言と構造を改善 | [x] |
| 不要ファイル整理 | 不要になった補助ファイルを削減 | [x] |
| 追加 UI 検討 | Radix UI をさらに入れるべき箇所を整理 | [x] |

---

## 実施内容

### 1. MDX への統一

- blog 配下の記事ファイルを MDX へ統一
- コンテンツコレクションも MDX 前提に変更
- 投稿生成スクリプトも MDX 出力へ変更
- 既存サンプル記事の MDX 互換差分を修正

### 2. Typography の共通化

- 共通の Typography コンポーネントを追加
- variant により display、title、lead、body、muted、eyebrow を使い分け可能にした
- トップページ、ブログ一覧、記事詳細で共通利用できる状態に整理

### 3. Blog Search の改善

- Radix UI の Dialog を利用した検索 UI に変更
- モーダル表示で検索体験を明確化
- 結果件数表示、空状態表示、閉じる操作を追加

### 4. Pagination の整理

- 単一ページ時は非表示
- 前後ページのラベルとアクセシビリティ属性を調整
- ページ URL の生成処理を整理

### 5. 画面文言と導線の整理

- トップページを現在の構成に合わせて簡潔に更新
- ブログ一覧に説明文を追加し、役割を明確化
- 記事詳細で description も表示するようにした

---

## Radix UI 方針

今回の時点では、以下を追加候補とする。

### 優先度高

- Select
  - 記事一覧の並び替え用
- Tabs
  - 一覧の切り替えや分類表示用

### 優先度中

- Accordion
  - アーカイブや補足情報の折りたたみ用
- Tooltip
  - ページングや検索補助の説明用

### 現時点で必須ではないもの

- Pagination 専用の Radix UI 化
- Search の過度な複雑化

---

## 変更ファイルの主な例

- src/components/Typography.tsx
- src/components/BlogSearch.tsx
- src/components/Pagination.tsx
- src/layouts/BlogPost.astro
- src/pages/index.astro
- src/pages/blog/[...page].astro
- src/content.config.ts
- scripts/generate-posts.mjs

---

## 検証結果

- ビルド確認: 成功
- 実行コマンド: npm run build
- 結果: 118 page(s) built

---

## 次の候補

1. Select を追加して記事一覧に並び替えを導入する
2. Tabs を追加して表示カテゴリを分ける
3. Storybook 側に Typography の story を追加する
4. About ページ本文も共通 Typography に寄せる
