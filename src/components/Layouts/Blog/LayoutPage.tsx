import React from 'react';
import styles from './LayoutPage.module.scss';

type LayoutPageVariant = 'with-hero' | 'without-hero';
type LayoutPageElement = 'div' | 'article' | 'section' | 'main';

interface LayoutPageProps {
  children: React.ReactNode;
  variant?: LayoutPageVariant;
  as?: LayoutPageElement;
}

export const LayoutPage = ({
  children,
  variant = 'with-hero',
  as: Component = 'div',
}: LayoutPageProps) => {
  return (
    <Component className={`${styles.layoutPage} ${styles[`variant-${variant}`]}`}>
      {children}
    </Component>
  );
};
