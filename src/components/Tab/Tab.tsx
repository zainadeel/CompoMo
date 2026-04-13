import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import styles from './Tab.module.css';

export type TabBackground = 'faint' | 'medium' | 'bold' | 'strong' | 'always-dark';

export interface TabProps {
  id?: string;
  label: string;
  isSelected?: boolean;
  /** Parent surface context. Adjusts hover tokens and fg for tabs on colored backgrounds. */
  background?: TabBackground;
  onClick?: () => void;
  className?: string;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ id, label, isSelected = false, background, onClick, className }, ref) => {
    const bgClass = background && background !== 'faint'
      ? styles[background === 'always-dark' ? 'onAlwaysDark' : `on${background.charAt(0).toUpperCase() + background.slice(1)}`]
      : undefined;
    return (
    <button
      ref={ref}
      id={id}
      className={cn(styles.tab, isSelected && styles.tabSelected, bgClass, className)}
      onClick={onClick}
      type="button"
      aria-selected={isSelected}
      role="tab"
    >
      <Text variant={isSelected ? 'text-body-medium-emphasis' : 'text-body-medium'} as="span">
        {label}
      </Text>
    </button>
    );
  }
);

Tab.displayName = 'Tab';
