---
name: header
model: sonnet
depends_on: []
---

# 目的

`src/components/Header.tsx` と `src/components/HeaderLink.tsx` を CSS Modules（`Header.module.scss`）へ移行する。両者は `c-header__*` クラスを共有しているため、**HeaderLink も同時に移行が必要**。

# 背景・制約

- 既存スタイル: `src/styles/component/_c-header.scss`（このタスクで参照を消すだけ。**ファイル削除と `_index.scss` 編集は取りまとめ役が Wave 2 でやるので、この plan では触らない**）
- 既存の同パターン参考実装: `src/components/Layouts/LayoutBody.tsx` + `LayoutBody.module.scss`
- CLAUDE.md `docs/feontend-design.md` は BEM/FLOCSS を規定しているが、ユーザは CSS Modules トライアル中（既存 `Layouts/*.module.scss` 群がその実例）。BEM prefix (`c-`, `__`, `--`) は剥がす。
- クラス名はキャメルケース（例: `header`, `nav`, `brand`, `navLinks`, `link`, `linkActive`, `social`）。
- `Header.stories.tsx` は `import Header from './Header'` のままなので、import パスは変えない（default export を維持）。
- `HeaderLink.tsx` も default export を維持（`Header.tsx` から `import HeaderLink from './HeaderLink'` されている）。
- **dev / storybook サーバは起動しない**。動作確認は取りまとめ役が `bun run build` で行うのみ。
- `bun` を使う。`npm` を使わない。

# 変更ファイル

- `src/components/Header.module.scss` ... 新規（`_c-header.scss` の内容をキャメルケースで移植）
- `src/components/Header.tsx` ... 更新（`import styles from` 追加、`className` を `styles.xxx` に置き換え）
- `src/components/HeaderLink.tsx` ... 更新（`Header.module.scss` を import して `styles.link` / `styles.linkActive` を使う）

# 手順

1. `src/styles/component/_c-header.scss` を読み、SCSS を移植する。
   - `.c-header` → `.header`
   - `.c-header__nav` → `.nav`
   - `.c-header__brand` → `.brand`
   - `.c-header__nav-links` → `.navLinks`
   - `.c-header__link` → `.link`
   - `.c-header__link--active` → `.linkActive`
   - `.c-header__social` → `.social`
   - ネスト構造（`&__nav` 形式）はキャメルケースのフラット定義に展開する（`LayoutBody.module.scss` を参考に）。
   - `@media (max-width: 720px)` 部分も忘れず移植。
2. `src/components/Header.module.scss` を新規作成して上記 SCSS を書く。
3. `src/components/Header.tsx` を更新:
   - `import styles from './Header.module.scss';` を追加。
   - `className="c-header"` → `className={styles.header}` のように全て置換。
4. `src/components/HeaderLink.tsx` を更新:
   - `import styles from './Header.module.scss';` を追加（Header と同じ module を共有）。
   - `className={['c-header__link', isActive ? 'c-header__link--active' : ''].filter(Boolean).join(' ')}` を `className={[styles.link, isActive && styles.linkActive].filter(Boolean).join(' ')}` に置換。
5. **`_c-header.scss` と `src/styles/component/_index.scss` は触らない**（Wave 2 の取りまとめ役の担当）。

# 完了条件

- `src/components/Header.module.scss` が新規作成され、`_c-header.scss` と等価なスタイルがキャメルケースで定義されている。
- `Header.tsx` と `HeaderLink.tsx` の文字列クラス名（`c-header*`）が全て `styles.*` 参照に置き換わっている。
- 両ファイルの default export は維持。
- `_c-header.scss` および `_index.scss` には触れていない。

# 報告

- 変更したファイルパス一覧
- キャメルケースでのクラス名対応表（簡潔に）
- 何か想定外があれば（例: 既存 SCSS に拾い損ねた要素があった等）明記
- 200 語以内
