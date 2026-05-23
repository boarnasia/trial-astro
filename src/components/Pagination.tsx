import './Pagination.scss';

interface Props {
  currentPage: number;
  lastPage: number;
  prevUrl: string | undefined;
  nextUrl: string | undefined;
}

const getPageUrl = (page: number) => (page === 1 ? '/blog/' : `/blog/${page}/`);

export default function Pagination({ currentPage, lastPage, prevUrl, nextUrl }: Props) {
  if (lastPage <= 1) {
    return null;
  }

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  const visiblePages = pages.filter((page) => {
    return page === 1 || page === lastPage || Math.abs(page - currentPage) <= 2;
  });

  const pageItems: (number | 'ellipsis')[] = [];
  visiblePages.forEach((page, index) => {
    if (index > 0 && page - visiblePages[index - 1] > 1) {
      pageItems.push('ellipsis');
    }
    pageItems.push(page);
  });

  return (
    <nav className="c-pagination" aria-label="ブログ一覧ページのページ移動">
      <ul className="c-pagination__list">
        <li className="c-pagination__item">
          {prevUrl ? (
            <a className="c-pagination__link" href={prevUrl} aria-label="前のページへ" rel="prev">
              &laquo;
            </a>
          ) : (
            <span className="c-pagination__link c-pagination__link--disabled" aria-disabled="true">
              &laquo;
            </span>
          )}
        </li>

        {pageItems.map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${index}`} className="c-pagination__item">
              <span className="c-pagination__link c-pagination__link--ellipsis" aria-hidden="true">
                &hellip;
              </span>
            </li>
          ) : (
            <li key={item} className="c-pagination__item">
              {item === currentPage ? (
                <span className="c-pagination__link c-pagination__link--active" aria-current="page">
                  {item}
                </span>
              ) : (
                <a
                  className="c-pagination__link"
                  href={getPageUrl(item)}
                  aria-label={`${item}ページ目へ`}
                >
                  {item}
                </a>
              )}
            </li>
          ),
        )}

        <li className="c-pagination__item">
          {nextUrl ? (
            <a className="c-pagination__link" href={nextUrl} aria-label="次のページへ" rel="next">
              &raquo;
            </a>
          ) : (
            <span className="c-pagination__link c-pagination__link--disabled" aria-disabled="true">
              &raquo;
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
