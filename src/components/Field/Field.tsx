import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import styles from './Field.module.css';

export interface FieldProps {
  label: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ label, children, id, className }, ref) => (
    <div ref={ref} className={cn(styles.field, className)}>
      <Text style="text-body-small-emphasis" as="label" htmlFor={id}>{label}</Text>
      {children}
    </div>
  )
);

Field.displayName = 'Field';
