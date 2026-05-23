import React from 'react';
import styles from './LayoutMain.module.scss';

interface LayoutMainProps {
  children: React.ReactNode;
}

export const LayoutMain = ({ children }: LayoutMainProps) => {
  return <main className={styles.layoutMain}>{children}</main>;
};
