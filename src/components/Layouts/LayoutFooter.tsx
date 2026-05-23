import React from 'react';
import styles from './LayoutFooter.module.scss';

interface LayoutFooterProps {
  children: React.ReactNode;
}

export const LayoutFooter = ({ children }: LayoutFooterProps) => {
  return <div className={styles.layoutFooter}>{children}</div>;
};
