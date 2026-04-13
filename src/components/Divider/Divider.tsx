import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps {
  /** Direction of the divider line. */
  orientation?: DividerOrientation;
  className?: string;
}

export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', className }, ref) => (
    <hr
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        styles.divider,
        orientation === 'vertical' && styles.vertical,
        className
      )}
    />
  )
);

Divider.displayName = 'Divider';
