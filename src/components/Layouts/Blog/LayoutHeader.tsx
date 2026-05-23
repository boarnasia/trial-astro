import React from 'react';
import styles from './LayoutHeader.module.scss';

interface LayoutHeaderProps {
  children: React.ReactNode;
}

export const LayoutHeader = ({ children }: LayoutHeaderProps) => {
  return <div className={styles.layoutHeader}>{children}</div>;
};
