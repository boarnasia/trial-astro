import React from 'react';
import styles from './BodyLayout.module.scss';

interface BodyLayoutProps {
  children: React.ReactNode;
}

export const BodyLayout = ({ children }: BodyLayoutProps) => {
  return (
    <body className={styles.bodyLayout}>
      {children}
    </body>
  );
};