import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import styles from './Radio.module.css';

export interface RadioOption {
  label: string;
  value: string;
  inactive?: boolean;
}

export interface RadioGroupProps {
  /** Currently selected value. */
  value: string;
  /** Called when selection changes. */
  onChange: (value: string) => void;
  /** Radio options to render. */
  options: RadioOption[];
  /** Group label for accessibility. */
  'aria-label'?: string;
  /** Layout direction. */
  direction?: 'vertical' | 'horizontal';
  /** Disables the entire group. */
  inactive?: boolean;
  className?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      onChange,
      options,
      'aria-label': ariaLabel,
      direction = 'vertical',
      inactive = false,
      className,
    },
    ref
  ) => (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        styles.group,
        direction === 'horizontal' && styles.horizontal,
        className
      )}
    >
      {options.map(opt => (
        <RadioItem
          key={opt.value}
          label={opt.label}
          checked={value === opt.value}
          inactive={inactive || opt.inactive}
          onChange={() => onChange(opt.value)}
        />
      ))}
    </div>
  )
);

RadioGroup.displayName = 'RadioGroup';

/* ─── Individual Radio Item ─────────────────────────────────────────────────── */

export interface RadioItemProps {
  label: string;
  checked?: boolean;
  onChange?: () => void;
  inactive?: boolean;
  className?: string;
}

export const RadioItem = forwardRef<HTMLDivElement, RadioItemProps>(
  ({ label, checked = false, onChange, inactive = false, className }, ref) => {
    const handleClick = () => {
      if (!inactive && !checked) onChange?.();
    };

    return (
      <div
        ref={ref}
        role="radio"
        aria-checked={checked}
        tabIndex={inactive ? -1 : 0}
        className={cn(styles.radio, inactive && styles.inactive, className)}
        onClick={handleClick}
        onKeyDown={e => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <span className={cn(styles.circle, checked && styles.circleChecked)}>
          {checked && <span className={styles.dot} />}
        </span>
        <Text variant="text-body-medium" as="span" color="inherit">
          {label}
        </Text>
      </div>
    );
  }
);

RadioItem.displayName = 'RadioItem';
