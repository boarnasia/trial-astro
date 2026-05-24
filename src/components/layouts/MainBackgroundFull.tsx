import React from 'react';
import styles from './MainBackgroundFull.module.scss';

interface MainBackgroundFullProps {
  children: React.ReactNode;
}

export default function MainBackgroundFull({ children }: MainBackgroundFullProps) {
  return <div className={styles.mainBackgroundFull}>{children}</div>;
}
