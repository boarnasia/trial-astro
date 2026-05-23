import React from 'react';
import styles from './LayoutBody.module.scss';

interface LayoutBodyProps {
  children: React.ReactNode;
}

export const LayoutBody = ({ children }: LayoutBodyProps) => {
  return (
    <body className={styles.layoutBody}>
      {children}
    </body>
  );
};