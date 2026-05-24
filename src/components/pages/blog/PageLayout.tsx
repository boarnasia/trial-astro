import React from 'react';
import styles from './PageLayout.module.scss';

type PageLayoutVariant = 'with-hero' | 'without-hero';
type PageLayoutElement = 'div' | 'article' | 'section' | 'main';

interface PageLayoutProps {
  children: React.ReactNode;
  variant?: PageLayoutVariant;
  as?: PageLayoutElement;
}

export const PageLayout = ({
  children,
  variant = 'with-hero',
  as: Component = 'div',
}: PageLayoutProps) => {
  return (
    <Component className={`${styles.pageLayout} ${styles[`variant-${variant}`]}`}>
      {children}
    </Component>
  );
};
