import { useState } from 'react';
import './BlogSearch.scss';

interface PostMeta {
  id: string;
  title: string;
  description: string;
  pubDate: string; // ISO string
}

interface Props {
  posts: PostMeta[];
}

export default function BlogSearch({ posts }: Props) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? posts.filter((post) => {
        const q = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q)
        );
      })
    : [];

  const showResults = query.trim().length > 0;

  return (
    <div className="c-blog-search">
      <label className="c-blog-search__label" htmlFor="blog-search-input">
        記事を検索
      </label>
      <input
        id="blog-search-input"
        className="c-blog-search__input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="タイトルや説明で絞り込む…"
        aria-label="ブログ記事を検索"
      />

      {showResults && (
        <div className="c-blog-search__results" aria-live="polite">
          <p className="c-blog-search__count">{filtered.length}件ヒット</p>
          <ul className="c-blog-search__list">
            {filtered.map((post) => (
              <li key={post.id} className="c-blog-search__item">
                <a
                  className="c-blog-search__link"
                  href={`/blog/${post.id}/`}
                >
                  <span className="c-blog-search__title">{post.title}</span>
                  <span className="c-blog-search__description">
                    {post.description}
                  </span>
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
        </div>
      )}
    </div>
  );
}
