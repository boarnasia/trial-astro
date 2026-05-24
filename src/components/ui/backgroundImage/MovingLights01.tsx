import React, { useEffect, useRef } from 'react';
import styles from './MovingLights01.module.scss';

interface LightItem {
  x: number;
  y: number;
  blur: number;
  radius: number;
  initialXDirection: number;
  initialYDirection: number;
  initialBlurDirection: number;
  colorOne: string;
  colorTwo: string;
  gradient: [number, number, number, number];
}

export const MovingLights01 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const backgroundColors = ['#000', '#000'];
    const colors: [string, string][] = [
      ['#002aff', '#009ff2'],
      ['#0054ff', '#27e49b'],
      ['#202bc5', '#873dcc'],
    ];
    const count = 70;
    const blur: [number, number] = [12, 70];
    const radius: [number, number] = [1, 120];

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    let ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    setCanvasSize();
    ctx.globalCompositeOperation = 'lighter';

    const drawBackground = (context: CanvasRenderingContext2D) => {
      const grd = context.createLinearGradient(0, canvas.height, canvas.width, 0);
      grd.addColorStop(0, backgroundColors[0]);
      grd.addColorStop(1, backgroundColors[1]);
      context.fillStyle = grd;
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const buildItems = (): LightItem[] => {
      const items: LightItem[] = [];
      let remaining = count;
      while (remaining--) {
        const thisRadius = rand(radius[0], radius[1]);
        const thisBlur = rand(blur[0], blur[1]);
        const x = rand(-100, canvas.width + 100);
        const y = rand(-100, canvas.height + 100);
        const colorIndex = Math.floor(rand(0, 299) / 100);
        const colorOne = colors[colorIndex][0];
        const colorTwo = colors[colorIndex][1];

        const directionX = Math.round(rand(-99, 99) / 100);
        const directionY = Math.round(rand(-99, 99) / 100);

        items.push({
          x,
          y,
          blur: thisBlur,
          radius: thisRadius,
          initialXDirection: directionX,
          initialYDirection: directionY,
          initialBlurDirection: directionX,
          colorOne,
          colorTwo,
          gradient: [x - thisRadius / 2, y - thisRadius / 2, x + thisRadius, y + thisRadius],
        });
      }
      return items;
    };

    const drawItems = (context: CanvasRenderingContext2D, items: LightItem[]) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const adjX = 2;
      const adjY = 2;
      const adjBlur = 1;

      items.forEach((item) => {
        if (
          (item.x + item.initialXDirection * adjX >= canvas.width && item.initialXDirection !== 0) ||
          (item.x + item.initialXDirection * adjX <= 0 && item.initialXDirection !== 0)
        ) {
          item.initialXDirection *= -1;
        }
        if (
          (item.y + item.initialYDirection * adjY >= canvas.height && item.initialYDirection !== 0) ||
          (item.y + item.initialYDirection * adjY <= 0 && item.initialYDirection !== 0)
        ) {
          item.initialYDirection *= -1;
        }
        if (
          (item.blur + item.initialBlurDirection * adjBlur >= radius[1] && item.initialBlurDirection !== 0) ||
          (item.blur + item.initialBlurDirection * adjBlur <= radius[0] && item.initialBlurDirection !== 0)
        ) {
          item.initialBlurDirection *= -1;
        }

        item.x += item.initialXDirection * adjX;
        item.y += item.initialYDirection * adjY;
        item.blur += item.initialBlurDirection * adjBlur;

        context.beginPath();
        context.filter = `blur(${item.blur}px)`;
        const grd = context.createLinearGradient(
          item.gradient[0],
          item.gradient[1],
          item.gradient[2],
          item.gradient[3],
        );
        grd.addColorStop(0, item.colorOne);
        grd.addColorStop(1, item.colorTwo);
        context.fillStyle = grd;
        context.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        context.fill();
        context.closePath();
      });
    };

    drawBackground(ctx);
    const items = buildItems();

    let rafId: number;

    if (prefersReducedMotion) {
      // Draw initial frame only, no animation loop
      drawItems(ctx, items);
    } else {
      const changeCanvas = () => {
        if (!ctx) return;
        drawItems(ctx, items);
        rafId = window.requestAnimationFrame(changeCanvas);
      };
      rafId = window.requestAnimationFrame(changeCanvas);
    }

    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize();
      ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.globalCompositeOperation = 'lighter';
        drawBackground(ctx);
      }
    });
    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.movingLights01}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};
