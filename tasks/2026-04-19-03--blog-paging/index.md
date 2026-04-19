# Blog Paging 実装計画

## 目標

1. ブログ記事を約100件生成する
2. ブログ一覧ページにページング機能を追加する
3. クライアントサイド検索機能を実装する（React + JS）

---

## 技術方針

- フレームワーク: Astro (SSG)
- UIコンポーネント: React TSX + SCSS (BEM/FLOCSS準拠)
- インタラクションが必要なコンポーネントには `client:load`
- SCSS は TSX と同名・同ディレクトリに配置

---

## ステップ

### Step 1: ブログ記事の生成（約100件）

- `src/content/blog/` に Markdown ファイルを100件追加
- フロントマターは `content.config.ts` のスキーマに準拠:
  - `title`: string（必須）
  - `description`: string（必須）
  - `pubDate`: Date（必須）
  - `heroImage`: 任意（省略可能）
- `pubDate` はランダムな過去日付を設定
- ファイル名は `post-001.md` 〜 `post-100.md`

### Step 2: ページング実装

**Astro の組み込み `paginate()` を使用**

- `src/pages/blog/index.astro` を `src/pages/blog/[...page].astro` に変更（または削除して新規作成）
- `getStaticPaths()` 内で `paginate(posts, { pageSize: 10 })` を呼び出す
- URL パターン: `/blog/` (1ページ目), `/blog/2/`, `/blog/3/`, ...
- 1ページあたり10件表示

**ページング UI コンポーネント**

- `src/components/Pagination.tsx` + `Pagination.scss` + `Pagination.stories.tsx`
- BEM クラス名: `.c-pagination`, `.c-pagination__item`, `.c-pagination__link`, `.c-pagination__link--active`
- Props: `currentPage`, `lastPage`, `baseUrl`

### Step 3: クライアントサイド検索実装

**方針**

- 全記事のメタデータ（title, description, slug, pubDate）を Astro から React コンポーネントに props として渡す
- 検索アクティブ時はページング一覧を非表示にし、検索結果を表示
- 検索非アクティブ（クエリ空）時はページング一覧を表示

**コンポーネント構成**

- `src/components/BlogSearch.tsx` + `BlogSearch.scss` + `BlogSearch.stories.tsx`
- BEM クラス名: `.c-blog-search`, `.c-blog-search__input`, `.c-blog-search__results`, `.c-blog-search__result-item`
- `client:load` ディレクティブで読み込む

**検索ロジック**

- `title` と `description` を対象にインクリメンタルサーチ
- 大文字小文字を区別しない

---

## ファイル変更一覧

| ファイル | 操作 |
|---|---|
| `src/content/blog/post-001.md` 〜 `post-100.md` | 新規作成 |
| `src/pages/blog/index.astro` | 削除 → `[...page].astro` に変更 |
| `src/pages/blog/[...page].astro` | 新規作成（ページング対応版） |
| `src/components/Pagination.tsx` | 新規作成 |
| `src/components/Pagination.scss` | 新規作成 |
| `src/components/Pagination.stories.tsx` | 新規作成 |
| `src/components/BlogSearch.tsx` | 新規作成 |
| `src/components/BlogSearch.scss` | 新規作成 |
| `src/components/BlogSearch.stories.tsx` | 新規作成 |
| `src/styles/component/_c-pagination.scss` | 新規作成（グローバル SCSS） |
| `src/styles/component/_c-blog-search.scss` | 新規作成（グローバル SCSS） |
| `src/styles/component/_index.scss` | 更新（新規 SCSS を import） |

---

## 実装順序（サブエージェント分割）

1. **Agent A**: ブログ記事 100件を生成（Step 1）
2. **Agent B**: ページングコンポーネント + ページング対応 Astro ページ（Step 2）
3. **Agent C**: 検索コンポーネント（Step 3）
4. **ブラウザ確認**: `http://localhost:4321/blog/` で動作確認
