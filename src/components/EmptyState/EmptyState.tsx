import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import styles from './EmptyState.module.css';

export type EmptyStateType = 'no-content' | 'no-results' | 'no-results-filter' | 'no-access';

const defaultMessages: Record<EmptyStateType, string> = {
  'no-content': 'No page contents to display.',
  'no-results': 'No results found.',
  'no-results-filter': 'No results found. Please update search criteria.',
  'no-access': "You don't have access to this page.",
};

export interface EmptyStateProps {
  type?: EmptyStateType;
  message?: string;
  className?: string;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ type = 'no-content', message, className }, ref) => (
    <div ref={ref} className={cn(styles.emptyState, className)}>
      <Text style="text-body-medium" as="p" color="secondary">
        {message || defaultMessages[type]}
      </Text>
    </div>
  )
);

EmptyState.displayName = 'EmptyState';
