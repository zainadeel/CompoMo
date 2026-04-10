import React from 'react';
import { Text } from '@/components/Text';
import styles from './Badge.module.css';

export interface BadgeProps {
  count: number;
  isSelected?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ count, isSelected = false, className }) => {
  if (count === 0) return null;
  const displayText = count > 9 ? '+' : count.toString();
  return (
    <span className={`${styles.badge} ${className || ''}`} aria-label={`${count} unread`}>
      <Text variant="text-caption-emphasis" as="span" color={isSelected ? 'primary' : 'secondary'}>
        {displayText}
      </Text>
    </span>
  );
};

Badge.displayName = 'Badge';
