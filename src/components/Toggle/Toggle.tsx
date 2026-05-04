import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import styles from './Toggle.module.css';

interface ToggleBaseProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  inactive?: boolean;
  className?: string;
}

export type ToggleProps = ToggleBaseProps &
  (
    | { 'aria-label': string; 'aria-labelledby'?: never }
    | { 'aria-label'?: never; 'aria-labelledby': string }
  );

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      checked = false,
      onChange,
      inactive = false,
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
    },
    ref,
  ) => {
    const handleClick = () => {
      if (inactive) return;
      onChange?.(!checked);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        disabled={inactive}
        className={cn(styles.toggle, checked && styles.checked, inactive && styles.inactive, className)}
        onClick={handleClick}
      >
        <span className={styles.thumb} />
      </button>
    );
  },
);

Toggle.displayName = 'Toggle';
