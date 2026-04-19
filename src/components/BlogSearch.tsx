import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useId, useRef, useState } from 'react';
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
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputId = useId();
  const descriptionId = useId();
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

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

  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isDown = e.key === 'ArrowDown' || (e.key === 'n' && e.ctrlKey);
    const isUp = e.key === 'ArrowUp' || (e.key === 'p' && e.ctrlKey);

    if (isDown && filtered.length > 0) {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (isUp && filtered.length > 0) {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0 && filtered[activeIndex]) {
      e.preventDefault();
      window.location.href = `/blog/${filtered[activeIndex].id}/`;
    }
  };

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
              onChange={handleChange}
              onKeyDown={handleKeyDown}
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
                      {filtered.map((post, index) => (
                        <li
                          key={post.id}
                          className="c-blog-search__item"
                          ref={(el) => { itemRefs.current[index] = el; }}
                        >
                          <a
                            className="c-blog-search__link"
                            href={`/blog/${post.id}/`}
                            data-active={activeIndex === index}
                          >
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
