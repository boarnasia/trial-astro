import React from 'react';
import styles from './ContainerLayout.module.scss';

type ContainerLayoutSize = 'sm' | 'md';

interface ContainerLayoutProps {
  children: React.ReactNode;
  size?: ContainerLayoutSize;
}

export default function ContainerLayout({
  children,
  size = 'md',
}: ContainerLayoutProps) {
  return (
    <div className={`${styles.containerLayout} ${styles[`size-${size}`]}`}>
      {children}
    </div>
  );
};
