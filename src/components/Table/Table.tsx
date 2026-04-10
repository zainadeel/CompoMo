import React, { useMemo, useState, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import styles from './Table.module.css';

export type SortDirection = 'asc' | 'desc';
export type CellType = 'string' | 'numbers' | 'tag' | 'checkbox' | 'button' | 'spacer' | 'image' | 'icon' | 'empty';
export type FilterValue = string | number | Array<string | number> | undefined;
export type FilterState = Record<string, FilterValue>;

export interface SortState {
  columnId: string;
  direction: SortDirection;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface TableColumn<T = unknown> {
  id: string;
  header: string | React.ReactNode;
  accessorKey?: string;
  accessor?: (row: T) => unknown;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  renderCell?: (row: T, rowIndex: number) => React.ReactNode;
  cellType?: CellType;
  hide?: boolean;
  pinned?: 'left' | 'right';
}

export interface TableProps<T = unknown> {
  columns: TableColumn<T>[];
  data: T[];
  sortState?: SortState;
  onSort?: (columnId: string) => void;
  className?: string;
  onRowClick?: (row: T, rowIndex: number) => void;
  selectedRows?: Set<number>;
  loading?: boolean;
  pagination?: PaginationState;
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
  emptyMessage?: string;
}

function getColumnValue<T>(column: TableColumn<T>, row: T): unknown {
  if (column.accessorKey) return (row as Record<string, unknown>)[column.accessorKey];
  if (column.accessor) return column.accessor(row);
  return undefined;
}

function compareValues(a: unknown, b: unknown, direction: SortDirection): number {
  const mult = direction === 'asc' ? 1 : -1;
  if (a == null && b == null) return 0;
  if (a == null) return mult;
  if (b == null) return -mult;
  if (typeof a === 'number' && typeof b === 'number') return (a - b) * mult;
  return String(a).localeCompare(String(b)) * mult;
}

export function Table<T>({
  columns,
  data,
  sortState,
  onSort,
  className,
  onRowClick,
  selectedRows,
  loading = false,
  pagination,
  onPaginationChange,
  emptyMessage = 'No results found.',
}: TableProps<T>) {
  const visibleColumns = useMemo(() => columns.filter(c => !c.hide), [columns]);

  const gridTemplateColumns = useMemo(() =>
    visibleColumns.map(col => {
      if (col.width) return typeof col.width === 'number' ? `${col.width}px` : col.width;
      return 'minmax(120px, 1fr)';
    }).join(' '),
    [visibleColumns]
  );

  const sortedData = useMemo(() => {
    if (!sortState) return data;
    const col = columns.find(c => c.id === sortState.columnId);
    if (!col) return data;
    return [...data].sort((a, b) =>
      compareValues(getColumnValue(col, a), getColumnValue(col, b), sortState.direction)
    );
  }, [data, columns, sortState]);

  const pagedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = pagination.pageIndex * pagination.pageSize;
    return sortedData.slice(start, start + pagination.pageSize);
  }, [sortedData, pagination]);

  const totalPages = pagination ? Math.ceil(sortedData.length / pagination.pageSize) : 1;
  const isEmpty = !loading && pagedData.length === 0;

  const handleSort = (columnId: string) => {
    if (onSort) onSort(columnId);
  };

  return (
    <div className={cn(styles.tableWrapper, className)}>
      <div className={styles.tableScroll}>
        <div className={styles.table} style={{ gridTemplateColumns }} role="table">
          {/* Header */}
          <div className={styles.headerRow} role="row">
            {visibleColumns.map(col => (
              <div
                key={col.id}
                className={cn(
                  styles.headerCell,
                  col.sortable && styles.sortable,
                  col.align === 'right' && styles.alignRight,
                  col.align === 'center' && styles.alignCenter
                )}
                role="columnheader"
                onClick={() => col.sortable && handleSort(col.id)}
                style={col.minWidth ? { minWidth: typeof col.minWidth === 'number' ? `${col.minWidth}px` : col.minWidth } : undefined}
              >
                {typeof col.header === 'string' ? (
                  <Text style="text-body-small-emphasis" as="span" color="secondary">
                    {col.header}
                  </Text>
                ) : col.header}
                {sortState?.columnId === col.id && (
                  <span className={styles.sortIndicator} aria-hidden>
                    {sortState.direction === 'asc' ? '\u2191' : '\u2193'}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Loading skeleton */}
          {loading && Array.from({ length: 5 }).map((_, i) => (
            <div key={`skeleton-${i}`} className={styles.row} role="row">
              {visibleColumns.map(col => (
                <div key={col.id} className={styles.cell} role="cell">
                  <div className={styles.skeleton} />
                </div>
              ))}
            </div>
          ))}

          {/* Empty state */}
          {isEmpty && (
            <div className={styles.emptyRow} style={{ gridColumn: `1 / -1` }}>
              <Text style="text-body-medium" as="p" color="secondary">{emptyMessage}</Text>
            </div>
          )}

          {/* Data rows */}
          {!loading && pagedData.map((row, rowIndex) => {
            const isSelected = selectedRows?.has(rowIndex);
            return (
              <div
                key={rowIndex}
                className={cn(
                  styles.row,
                  isSelected && styles.rowSelected,
                  onRowClick && styles.rowClickable
                )}
                role="row"
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {visibleColumns.map(col => (
                  <div
                    key={col.id}
                    className={cn(
                      styles.cell,
                      col.align === 'right' && styles.alignRight,
                      col.align === 'center' && styles.alignCenter
                    )}
                    role="cell"
                  >
                    {col.renderCell
                      ? col.renderCell(row, rowIndex)
                      : <Text style="text-body-medium" as="span" lineTruncation={1}>{String(getColumnValue(col, row) ?? '')}</Text>
                    }
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      {pagination && onPaginationChange && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageButton}
            disabled={pagination.pageIndex === 0}
            onClick={() => onPaginationChange(pagination.pageIndex - 1, pagination.pageSize)}
            type="button"
          >
            <Text style="text-body-small" as="span">Previous</Text>
          </button>
          <Text style="text-body-small" as="span" color="secondary">
            {`Page ${pagination.pageIndex + 1} of ${totalPages}`}
          </Text>
          <button
            className={styles.pageButton}
            disabled={pagination.pageIndex >= totalPages - 1}
            onClick={() => onPaginationChange(pagination.pageIndex + 1, pagination.pageSize)}
            type="button"
          >
            <Text style="text-body-small" as="span">Next</Text>
          </button>
        </div>
      )}
    </div>
  );
}

Table.displayName = 'Table';
