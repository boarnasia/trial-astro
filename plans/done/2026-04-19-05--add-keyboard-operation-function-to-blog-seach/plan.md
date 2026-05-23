# 計画: ブログサーチにキーボード操作機能を追加

## Context

ブログ記事検索ダイアログ（`BlogSearch.tsx`）は現在マウス操作のみ対応している。
検索結果をキーボードで選択・移動できるようにすることで、キーボード派ユーザーの UX を向上させる。

対応キーバインド:
- `ArrowDown` / `ArrowUp` — 上下移動
- `j` / `k` — vim スタイル
- `Ctrl+N` / `Ctrl+P` — emacs スタイル
- `Enter` — 選択したリンク先へ遷移

---

## 変更ファイル

- `src/components/BlogSearch.tsx`
- `src/components/BlogSearch.scss`

---

## 実装方針

### BlogSearch.tsx

1. **状態追加**: `const [activeIndex, setActiveIndex] = useState(-1)`  
   `-1` = 未選択、`0〜filtered.length-1` = 選択中インデックス

2. **クエリ変更時にリセット**: `onChange` で `setQuery` と同時に `setActiveIndex(-1)` を呼ぶ

3. **`handleKeyDown` 関数** を input の `onKeyDown` に追加:
   - 下移動条件: `ArrowDown` | `j`（修飾キーなし） | `Ctrl+N`
   - 上移動条件: `ArrowUp` | `k`（修飾キーなし） | `Ctrl+P`
   - `filtered.length > 0` のときのみ `preventDefault()` して移動
   - 下: `Math.min(prev + 1, filtered.length - 1)`
   - 上: `Math.max(prev - 1, 0)`（0 以下には下がらない）
   - `Enter` かつ `activeIndex >= 0`: `window.location.href` でページ遷移

4. **スクロール追従**: `useRef<(HTMLLIElement | null)[]>([])` でリスト項目を参照し、  
   `useEffect([activeIndex])` 内で `scrollIntoView({ block: 'nearest' })` を呼ぶ

5. **アクセシビリティ**: アクティブ項目の `<li>` に `data-active={activeIndex === index}` を付与

### BlogSearch.scss

`&__link[data-active="true"]` スタイルを追加:
```scss
&__link[data-active="true"] {
  border-color: var(--accent);
  box-shadow: var(--box-shadow);
  background-color: rgb(var(--gray-light));
}
```

---

## 検証方法

1. `npm run dev` でサーバーを起動し `http://localhost:4321/blog/` を開く
2. 「記事を検索」ボタンをクリックしてダイアログを開く
3. キーワードを入力して結果を表示
4. `ArrowDown` / `j` / `Ctrl+N` で下方向に移動 → ハイライトが動くことを確認
5. `ArrowUp` / `k` / `Ctrl+P` で上方向に移動 → ハイライトが動くことを確認
6. `Enter` で選択した記事ページへ遷移することを確認
7. 結果が多い場合に項目が見切れても自動スクロールされることを確認
8. Storybook (`npm run storybook`) でも動作確認
