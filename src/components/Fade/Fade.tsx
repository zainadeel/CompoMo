import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import styles from './Fade.module.css';

export type FadeSide = 'top' | 'bottom' | 'left' | 'right';

export interface FadeProps {
  side: FadeSide;
  height: string;
  background?: string;
  className?: string;
  style?: React.CSSProperties;
}

const sideClassMap: Record<FadeSide, string> = {
  top: 'fadeTop',
  bottom: 'fadeBottom',
  left: 'fadeLeft',
  right: 'fadeRight',
};

export const Fade = forwardRef<HTMLDivElement, FadeProps>(
  ({ side, height, background = 'var(--color-background-secondary)', className, style = {} }, ref) => (
    <div
      ref={ref}
      className={cn(styles.fade, styles[sideClassMap[side]], className)}
      style={{ ...style, height, '--background': background } as React.CSSProperties}
      aria-hidden="true"
    />
  )
);

Fade.displayName = 'Fade';
