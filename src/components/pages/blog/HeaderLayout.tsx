import React from 'react';
import styles from './HeaderLayout.module.scss';

interface HeaderLayoutProps {
  children: React.ReactNode;
}

export const HeaderLayout = ({ children }: HeaderLayoutProps) => {
  return <div className={styles.headerLayout}>{children}</div>;
};
