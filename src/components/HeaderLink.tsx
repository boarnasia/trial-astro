type Props = {
  href: string;
  currentPath?: string;
  children: React.ReactNode;
  className?: string;
};

export default function HeaderLink({ href, currentPath = '', children, className }: Props) {
  const subpath = currentPath.match(/[^\/]+/g);
  const isActive = href === currentPath || href === '/' + (subpath?.[0] || '');

  return (
    <a
      href={href}
      className={[className, isActive ? 'active' : ''].filter(Boolean).join(' ')}
    >
      {children}
    </a>
  );
}
