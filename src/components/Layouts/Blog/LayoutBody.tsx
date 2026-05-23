import React from 'react';
import styles from './LayoutBody.module.scss';

interface LayoutBodyProps {
  children: React.ReactNode;
}

export const LayoutBody = ({ children }: LayoutBodyProps) => {
  return <div className={styles.layoutBody}>{children}</div>;
};
