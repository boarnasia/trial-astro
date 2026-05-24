import styles from './Pagination.module.scss';

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
    <nav className={styles.pagination} aria-label="ブログ一覧ページのページ移動">
      <ul className={styles.list}>
        <li className={styles.item}>
          {prevUrl ? (
            <a className={styles.link} href={prevUrl} aria-label="前のページへ" rel="prev">
              &laquo;
            </a>
          ) : (
            <span className={`${styles.link} ${styles.linkDisabled}`} aria-disabled="true">
              &laquo;
            </span>
          )}
        </li>

        {pageItems.map((item, index) =>
          item === 'ellipsis' ? (
            <li key={`ellipsis-${index}`} className={styles.item}>
              <span className={`${styles.link} ${styles.linkEllipsis}`} aria-hidden="true">
                &hellip;
              </span>
            </li>
          ) : (
            <li key={item} className={styles.item}>
              {item === currentPage ? (
                <span className={`${styles.link} ${styles.linkActive}`} aria-current="page">
                  {item}
                </span>
              ) : (
                <a
                  className={styles.link}
                  href={getPageUrl(item)}
                  aria-label={`${item}ページ目へ`}
                >
                  {item}
                </a>
              )}
            </li>
          ),
        )}

        <li className={styles.item}>
          {nextUrl ? (
            <a className={styles.link} href={nextUrl} aria-label="次のページへ" rel="next">
              &raquo;
            </a>
          ) : (
            <span className={`${styles.link} ${styles.linkDisabled}`} aria-disabled="true">
              &raquo;
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
