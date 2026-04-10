import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import type { IconComponent } from '@/types';
import styles from './Sidebar.module.css';

export interface SidebarItemProps {
  label: string;
  icon?: IconComponent;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ label, icon: Icon, isSelected = false, isDisabled = false, onClick, badge, children, className }, ref) => (
    <div className={cn(styles.itemWrapper, className)}>
      <button
        ref={ref}
        className={cn(
          styles.item,
          isSelected && styles.itemSelected,
          isDisabled && styles.itemDisabled
        )}
        onClick={onClick}
        disabled={isDisabled}
        type="button"
        aria-current={isSelected ? 'page' : undefined}
      >
        {Icon && (
          <span className={styles.itemIcon}>
            <Icon size={20} />
          </span>
        )}
        <Text
          variant={isSelected ? 'text-body-medium-emphasis' : 'text-body-medium'}
          as="span"
          className={styles.itemLabel}
          lineTruncation={1}
        >
          {label}
        </Text>
        {badge && <span className={styles.itemBadge}>{badge}</span>}
      </button>
      {children && isSelected && (
        <div className={styles.subItems}>
          {children}
        </div>
      )}
    </div>
  )
);

SidebarItem.displayName = 'SidebarItem';
