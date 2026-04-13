import React, { forwardRef, useMemo } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import styles from './Pagination.module.css';

export interface PaginationProps {
  /** Current page (1-based). */
  page: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called when page changes. */
  onPageChange: (page: number) => void;
  /** Max page buttons visible (excluding prev/next). */
  siblingCount?: number;
  /** Disables all interaction. */
  inactive?: boolean;
  className?: string;
}

function buildRange(start: number, end: number): (number | 'ellipsis')[] {
  const items: (number | 'ellipsis')[] = [];
  for (let i = start; i <= end; i++) items.push(i);
  return items;
}

function buildPages(page: number, totalPages: number, siblings: number): (number | 'ellipsis')[] {
  const totalSlots = siblings * 2 + 5; // siblings + boundaries + ellipses + current

  if (totalPages <= totalSlots) return buildRange(1, totalPages);

  const leftSibling = Math.max(page - siblings, 2);
  const rightSibling = Math.min(page + siblings, totalPages - 1);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const left = buildRange(1, siblings * 2 + 3);
    return [...left, 'ellipsis', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const right = buildRange(totalPages - (siblings * 2 + 2), totalPages);
    return [1, 'ellipsis', ...right];
  }

  return [1, 'ellipsis', ...buildRange(leftSibling, rightSibling), 'ellipsis', totalPages];
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ page, totalPages, onPageChange, siblingCount = 1, inactive = false, className }, ref) => {
    const pages = useMemo(() => buildPages(page, totalPages, siblingCount), [page, totalPages, siblingCount]);

    if (totalPages <= 1) return null;

    return (
      <nav ref={ref} aria-label="Pagination" className={cn(styles.pagination, inactive && styles.inactive, className)}>
        <button
          type="button"
          className={cn(styles.button, styles.nav)}
          disabled={page <= 1 || inactive}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <Text variant="text-body-small" as="span" color="inherit">&#x2039;</Text>
        </button>

        {pages.map((item, i) =>
          item === 'ellipsis' ? (
            <span key={`e${i}`} className={styles.ellipsis}>
              <Text variant="text-body-small" as="span" color="tertiary">&hellip;</Text>
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={cn(styles.button, item === page && styles.active)}
              onClick={() => onPageChange(item)}
              aria-current={item === page ? 'page' : undefined}
              disabled={inactive}
            >
              <Text variant={item === page ? 'text-body-small-emphasis' : 'text-body-small'} as="span" color="inherit">
                {item}
              </Text>
            </button>
          )
        )}

        <button
          type="button"
          className={cn(styles.button, styles.nav)}
          disabled={page >= totalPages || inactive}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <Text variant="text-body-small" as="span" color="inherit">&#x203A;</Text>
        </button>
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';
