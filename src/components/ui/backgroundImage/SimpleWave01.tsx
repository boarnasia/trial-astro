import React from 'react';
import styles from './SimpleWave01.module.scss';

export const SimpleWave01 = () => {
  return (
    <div className={styles.simpleWave01}>
      <svg
        className={styles.waves}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className={styles.parallax}>
          <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" className={styles.parallaxUse1} />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" className={styles.parallaxUse2} />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" className={styles.parallaxUse3} />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" className={styles.parallaxUse4} />
        </g>
      </svg>
    </div>
  );
};
