import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Surface } from '@/components/Surface';
import { Text } from '@/components/Text';
import styles from './Header.module.css';

export type HeaderBackground = 'primary' | 'secondary' | 'transparent' | 'translucent';

export interface HeaderProps {
  title?: string;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  background?: HeaderBackground;
  className?: string;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ title, left, center, right, background = 'secondary', className }, ref) => (
    <Surface
      ref={ref}
      as="header"
      background={background}
      elevation="none"
      edge="bottom"
      className={cn(styles.header, className)}
    >
      <div className={styles.left}>
        {left}
        {title && !center && (
          <Text variant="text-title-small" as="h1" lineTruncation={1}>
            {title}
          </Text>
        )}
      </div>
      {center && <div className={styles.center}>{center}</div>}
      <div className={styles.right}>{right}</div>
    </Surface>
  )
);

Header.displayName = 'Header';
