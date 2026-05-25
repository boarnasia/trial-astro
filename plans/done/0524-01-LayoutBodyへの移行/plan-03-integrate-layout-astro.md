---
name: integrate-layout-astro
model: sonnet
depends_on: [create-layout-wrappers]
---

# 目的

`src/layouts/Layout.astro` を、新しいラッパー群（`LayoutBody` / `LayoutHeader` / `LayoutMain` / `LayoutFooter`）で組み直す。テンプレ直書きの `<body>` / `<main>` を撤去し、レイアウト責務を `src/components/Layouts/` に集約する。

# 背景・制約

- 先行 sub-plan で `LayoutBody.module.scss` のクリーンアップと、`LayoutHeader` / `LayoutMain` / `LayoutFooter` の新規作成が完了している前提。
- `LayoutBody.tsx` は **named export**（`import { LayoutBody } from ...`）。`Header` / `Footer` は **default export** のまま（既存）。
- `<header>` / `<footer>` タグは Header.tsx / Footer.tsx の中に既にある。LayoutHeader / LayoutFooter は `<div>` で包むのみ（二重防止）。`<main>` は LayoutMain が担う。
- `Astro.url.pathname` は Header の `currentPath` props に渡す必要がある（既存挙動を維持）。
- `<head>` 内の `<BaseHead />` はそのまま維持。
- React コンポーネントに `client:` ディレクティブは付けない（静的レンダリングで十分）。

# 変更ファイル

- `src/layouts/Layout.astro` — 更新

# 手順

1. 既存の `src/layouts/Layout.astro` を読む（現状把握）。
2. 以下の内容に置き換える:

```astro
---
import BaseHead from '@/components/BaseHead.astro';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { LayoutBody } from '@/components/Layouts/LayoutBody';
import { LayoutFooter } from '@/components/Layouts/LayoutFooter';
import { LayoutHeader } from '@/components/Layouts/LayoutHeader';
import { LayoutMain } from '@/components/Layouts/LayoutMain';

interface Props {
	title: string;
	description: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="ja">
	<head>
		<BaseHead title={title} description={description} />
	</head>
	<LayoutBody>
		<LayoutHeader>
			<Header currentPath={Astro.url.pathname} />
		</LayoutHeader>
		<LayoutMain>
			<slot />
		</LayoutMain>
		<LayoutFooter>
			<Footer />
		</LayoutFooter>
	</LayoutBody>
</html>
```

3. 変更後、`src/pages/index.astro` および `src/layouts/BlogPost.astro` を読み、`Layout.astro` の Props 互換性（`title`, `description`）が崩れていないか確認する（読み取りのみ、編集不要）。

# 完了条件

- `src/layouts/Layout.astro` が上記テンプレ通り。
- インポート文に 4 つのレイアウトコンポーネントが含まれる。
- `<body>` および `<main>` が `.astro` テンプレ直書きから消えている。
- Props インタフェース（`title`, `description`）が維持されている。

# 報告

変更したファイル、import 経路に問題がないか、Props 互換性チェックの結果を 200 語以内で報告すること。
