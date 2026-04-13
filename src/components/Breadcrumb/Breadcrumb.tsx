import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  /** Ordered list of breadcrumb items. Last item is treated as current page. */
  items: BreadcrumbItem[];
  /** Custom separator. Defaults to '/'. */
  separator?: React.ReactNode;
  className?: string;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, separator = '/', className }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn(styles.breadcrumb, className)}>
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className={styles.item}>
              {isLast ? (
                <Text variant="text-body-medium-emphasis" as="span" color="primary" aria-current="page">
                  {item.label}
                </Text>
              ) : (
                <>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={styles.link}
                      onClick={e => { if (item.onClick) { e.preventDefault(); item.onClick(); } }}
                    >
                      <Text variant="text-body-medium" as="span" color="inherit">
                        {item.label}
                      </Text>
                    </a>
                  ) : (
                    <button
                      type="button"
                      className={styles.link}
                      onClick={item.onClick}
                    >
                      <Text variant="text-body-medium" as="span" color="inherit">
                        {item.label}
                      </Text>
                    </button>
                  )}
                  <span className={styles.separator} aria-hidden="true">
                    {separator}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  )
);

Breadcrumb.displayName = 'Breadcrumb';
