import React, { forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';
import styles from './Toggle.module.css';

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked = false, onChange, disabled = false, className, 'aria-label': ariaLabel }, ref) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setIsPressed(true);
    };

    const handleMouseUp = () => {
      if (disabled || !isPressed) return;
      setIsPressed(false);
      onChange?.(!checked);
    };

    const handleMouseLeave = () => {
      if (isPressed) setIsPressed(false);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        className={cn(styles.toggle, checked && styles.checked, disabled && styles.disabled, className)}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <span className={styles.thumb} />
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';
