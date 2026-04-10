import React, { forwardRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import styles from './Sidebar.module.css';

export interface SidebarSectionProps {
  label?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
}

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ label, children, collapsible = false, defaultCollapsed = false, className }, ref) => {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

    return (
      <div ref={ref} className={cn(styles.section, className)}>
        {label && (
          <div
            className={cn(styles.sectionHeader, collapsible && styles.sectionHeaderClickable)}
            onClick={collapsible ? () => setIsCollapsed(prev => !prev) : undefined}
            role={collapsible ? 'button' : undefined}
            aria-expanded={collapsible ? !isCollapsed : undefined}
          >
            <Text variant="text-caption-emphasis" as="span" color="tertiary">
              {label}
            </Text>
          </div>
        )}
        {!isCollapsed && (
          <div className={styles.sectionItems}>
            {children}
          </div>
        )}
      </div>
    );
  }
);

SidebarSection.displayName = 'SidebarSection';
