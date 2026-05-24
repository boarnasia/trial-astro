import React from 'react';
import styles from './FooterLayout.module.scss';

interface FooterLayoutProps {
  children: React.ReactNode;
}

export const FooterLayout = ({ children }: FooterLayoutProps) => {
  return <div className={styles.footerLayout}>{children}</div>;
};
