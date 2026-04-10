import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import styles from './Tab.module.css';

export interface TabProps {
  id?: string;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ id, label, isSelected = false, onClick, className }, ref) => (
    <button
      ref={ref}
      id={id}
      className={cn(styles.tab, isSelected && styles.tabSelected, className)}
      onClick={onClick}
      type="button"
      aria-selected={isSelected}
      role="tab"
    >
      <Text style={isSelected ? 'text-body-medium-emphasis' : 'text-body-medium'} as="span">
        {label}
      </Text>
    </button>
  )
);

Tab.displayName = 'Tab';
