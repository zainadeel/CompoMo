import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps {
  /** Shape of the skeleton. */
  variant?: SkeletonVariant;
  /** Width (CSS value). */
  width?: string | number;
  /** Height (CSS value). */
  height?: string | number;
  /** Number of text lines to render. Only applies to 'text' variant. */
  lines?: number;
  /** Whether to animate the shimmer. */
  animate?: boolean;
  className?: string;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      lines = 1,
      animate = true,
      className,
    },
    ref
  ) => {
    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className={cn(styles.textGroup, className)} style={{ width }}>
          {Array.from({ length: lines }, (_, i) => (
            <div
              key={i}
              className={cn(styles.skeleton, styles.text, animate && styles.animate)}
              style={{
                width: i === lines - 1 ? '60%' : '100%',
                height,
              }}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          styles.skeleton,
          styles[variant],
          animate && styles.animate,
          className
        )}
        style={{ width, height }}
        aria-hidden="true"
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
