type Props = {
  href: string;
  currentPath?: string;
  children: React.ReactNode;
};

export default function HeaderLink({ href, currentPath = '', children }: Props) {
  const subpath = currentPath.match(/[^\/]+/g);
  const isActive = href === currentPath || href === '/' + (subpath?.[0] || '');

  return (
    <a
      href={href}
      className={['c-header__link', isActive ? 'c-header__link--active' : ''].filter(Boolean).join(' ')}
    >
      {children}
    </a>
  );
}
