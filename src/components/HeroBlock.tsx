import type { ImageMetadata } from 'astro';
import styles from './HeroBlock.module.scss';

interface HeroBlockProps {
  src: ImageMetadata | string;
  alt?: string;
  width?: number;
  height?: number;
}

export const HeroBlock = ({ src, alt = '', width, height }: HeroBlockProps) => {
  const imgSrc = typeof src === 'string' ? src : src.src;
  const w = width ?? (typeof src === 'string' ? undefined : src.width);
  const h = height ?? (typeof src === 'string' ? undefined : src.height);
  return (
    <div className={styles.heroBlock}>
      <img className={styles.image} src={imgSrc} alt={alt} width={w} height={h} />
    </div>
  );
};

export default HeroBlock;
