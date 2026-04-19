import * as Dialog from '@radix-ui/react-dialog';
import { useId, useState } from 'react';
import Typography from './Typography';
import './BlogSearch.scss';

interface PostMeta {
  id: string;
  title: string;
  description: string;
  pubDate: string;
}

interface Props {
  posts: PostMeta[];
}

export default function BlogSearch({ posts }: Props) {
  const [query, setQuery] = useState('');
  const inputId = useId();
  const descriptionId = useId();

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(normalizedQuery) ||
          post.description.toLowerCase().includes(normalizedQuery)
        );
      })
    : [];

  const showResults = normalizedQuery.length > 0;

  return (
    <div className="c-blog-search">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button type="button" className="c-blog-search__trigger">
            記事を検索
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="c-blog-search__overlay" />
          <Dialog.Content className="c-blog-search__dialog" aria-describedby={descriptionId}>
            <div className="c-blog-search__header">
              <Dialog.Title asChild>
                <Typography as="h2" variant="title">
                  記事を検索
                </Typography>
              </Dialog.Title>
              <Dialog.Close asChild>
                <button type="button" className="c-blog-search__close" aria-label="検索ダイアログを閉じる">
                  ×
                </button>
              </Dialog.Close>
            </div>

            <Typography as="p" variant="muted" id={descriptionId}>
              タイトルや説明文から、読みたい記事をすばやく探せます。
            </Typography>

            <label className="c-blog-search__label" htmlFor={inputId}>
              キーワード
            </label>
            <input
              id={inputId}
              className="c-blog-search__input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="タイトルや説明で絞り込む…"
              aria-label="ブログ記事を検索"
              autoFocus
            />

            <div className="c-blog-search__results" aria-live="polite">
              {showResults ? (
                filtered.length > 0 ? (
                  <>
                    <p className="c-blog-search__count">{filtered.length}件ヒット</p>
                    <ul className="c-blog-search__list">
                      {filtered.map((post) => (
                        <li key={post.id} className="c-blog-search__item">
                          <a className="c-blog-search__link" href={`/blog/${post.id}/`}>
                            <span className="c-blog-search__title">{post.title}</span>
                            <span className="c-blog-search__description">{post.description}</span>
                            <span className="c-blog-search__date">
                              {new Date(post.pubDate).toLocaleDateString('ja-JP', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="c-blog-search__empty">該当する記事はありません。</p>
                )
              ) : (
                <p className="c-blog-search__empty">キーワードを入力すると候補が表示されます。</p>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
