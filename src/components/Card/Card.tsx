import React, { forwardRef } from 'react';
import styles from './Card.module.css';
import { cn } from '@/utils/cn';

export type CardElevation = 'flat' | 'elevated' | 'floating';
export type CardRadius = 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps {
  children: React.ReactNode;
  /** Optional header content — rendered with a bottom divider. */
  header?: React.ReactNode;
  /** Optional footer content — rendered with a top divider. */
  footer?: React.ReactNode;
  /** Elevation level. Defaults to 'elevated'. */
  elevation?: CardElevation;
  /** Corner radius. Defaults to 'lg'. */
  radius?: CardRadius;
  /** Additional CSS classes. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
}

const elevationClassMap: Record<CardElevation, string> = {
  flat: styles.elevationFlat,
  elevated: styles.elevationElevated,
  floating: styles.elevationFloating,
};

const radiusClassMap: Record<CardRadius, string> = {
  sm: styles.radiusSm,
  md: styles.radiusMd,
  lg: styles.radiusLg,
  xl: styles.radiusXl,
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, header, footer, elevation = 'elevated', radius = 'lg', className, style }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(styles.card, elevationClassMap[elevation], radiusClassMap[radius], className)}
        style={style}
      >
        {header && <div className={styles.header}>{header}</div>}
        <div className={styles.body}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';
