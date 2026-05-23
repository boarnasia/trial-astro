import React from 'react';
import styles from './LayoutContainer.module.scss';

type LayoutContainerSize = 'sm' | 'md';

interface LayoutContainerProps {
  children: React.ReactNode;
  size?: LayoutContainerSize;
}

export default function LayoutContainer({
  children,
  size = 'md',
}: LayoutContainerProps) {
  return (
    <div className={`${styles.layoutContainer} ${styles[`size-${size}`]}`}>
      {children}
    </div>
  );
};
