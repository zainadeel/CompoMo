import React from 'react';
import { cn } from '@/utils/cn';
import styles from './LabelWrap.module.css';

interface LabelWrapProps {
  children: React.ReactNode;
  /** Enables truncation with ellipsis — use inside full-width containers. */
  truncate?: boolean;
  className?: string;
}

/**
 * Internal utility wrapper used inside interactive components (Button, Tag,
 * Input, Select, MenuItem, etc.) to:
 *   1. Kill the inherited line-height strut from body { line-height: 1.5 }
 *   2. Add optical 2px horizontal padding around the text
 *
 * Not exported from the public barrel — internal use only.
 */
export const LabelWrap = ({ children, truncate = false, className }: LabelWrapProps) => (
  <span className={cn(styles.labelWrap, truncate && styles.truncate, className)}>
    {children}
  </span>
);

LabelWrap.displayName = 'LabelWrap';
