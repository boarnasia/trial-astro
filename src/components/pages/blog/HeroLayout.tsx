import React from 'react';
import styles from './HeroLayout.module.scss';

interface HeroLayoutProps {
  children: React.ReactNode;
}

export const HeroLayout = ({ children }: HeroLayoutProps) => {
  return <div className={styles.heroLayout}>{children}</div>;
};
