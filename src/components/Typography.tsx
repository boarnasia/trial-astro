import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import styles from './Typography.module.scss';

type TypographyVariant = 'display' | 'title' | 'lead' | 'body' | 'muted' | 'eyebrow';

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TypographyVariant;
  children: ReactNode;
}

export default function Typography({
  as: Component = 'p',
  variant = 'body',
  className = '',
  children,
  ...props
}: Props) {
  const classes = [styles.typography, styles[`variant-${variant}`], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
