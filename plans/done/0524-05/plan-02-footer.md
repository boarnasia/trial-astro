---
name: footer
model: haiku
depends_on: []
---

# 目的

`src/components/Footer.tsx` を CSS Modules（`Footer.module.scss`）へ移行する。

# 背景・制約

- 既存スタイル: `src/styles/component/_c-footer.scss`（このタスクでは触らない。Wave 2 で取りまとめ役が削除する）
- 既存の同パターン参考実装: `src/components/Layouts/LayoutBody.tsx` + `LayoutBody.module.scss`
- BEM prefix (`c-`, `__`, `--`) は剥がし、キャメルケースに統一。
- `Footer.stories.tsx` は `import Footer from './Footer'` のまま。default export を維持する。
- **dev / storybook サーバは起動しない**。動作確認は取りまとめ役が `bun run build` で行うのみ。
- `bun` を使う。

# 変更ファイル

- `src/components/Footer.module.scss` ... 新規
- `src/components/Footer.tsx` ... 更新

# 手順

1. `src/styles/component/_c-footer.scss` を読み、SCSS を移植する。
   - `.c-footer` → `.footer`
   - `.c-footer__social` → `.social`
   - `.c-footer__social-link` → `.socialLink`
   - ネスト（`&__social`）はキャメルケースのフラット定義に展開（`LayoutBody.module.scss` を参考に）。
2. `src/components/Footer.module.scss` を新規作成。
3. `src/components/Footer.tsx` を更新:
   - `import styles from './Footer.module.scss';` を追加。
   - `className="c-footer"` → `className={styles.footer}`、`className="c-footer__social"` → `className={styles.social}`、`className="c-footer__social-link"` → `className={styles.socialLink}`。
4. **`_c-footer.scss` と `_index.scss` は触らない**。

# 完了条件

- `Footer.module.scss` が新規作成され、`_c-footer.scss` と等価。
- `Footer.tsx` の `c-footer*` クラスが全て `styles.*` に置き換わっている。
- default export は維持。
- `_c-footer.scss` / `_index.scss` に手を加えていない。

# 報告

- 変更したファイルパス一覧
- クラス名対応表（簡潔に）
- 200 語以内
