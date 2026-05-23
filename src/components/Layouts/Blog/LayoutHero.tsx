import React from 'react';
import styles from './LayoutHero.module.scss';

interface LayoutHeroProps {
  children: React.ReactNode;
}

export const LayoutHero = ({ children }: LayoutHeroProps) => {
  return <div className={styles.layoutHero}>{children}</div>;
};
