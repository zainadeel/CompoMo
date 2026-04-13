import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import styles from './Accordion.module.css';

export interface AccordionItemData {
  id: string;
  label: string;
  content: React.ReactNode;
  inactive?: boolean;
}

export interface AccordionProps {
  /** Items to render. */
  items: AccordionItemData[];
  /** Allow multiple items open at once. When false, behaves as an accordion. */
  multiple?: boolean;
  /** Controlled: which item IDs are expanded. */
  expandedIds?: string[];
  /** Called when expansion state changes. */
  onExpandedChange?: (ids: string[]) => void;
  className?: string;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ items, multiple = false, expandedIds: controlledIds, onExpandedChange, className }, ref) => {
    const [internalIds, setInternalIds] = useState<string[]>([]);
    const expandedIds = controlledIds ?? internalIds;

    const toggle = (id: string) => {
      let next: string[];
      if (expandedIds.includes(id)) {
        next = expandedIds.filter(x => x !== id);
      } else {
        next = multiple ? [...expandedIds, id] : [id];
      }
      setInternalIds(next);
      onExpandedChange?.(next);
    };

    return (
      <div ref={ref} className={cn(styles.accordion, className)}>
        {items.map(item => (
          <AccordionItem
            key={item.id}
            label={item.label}
            isExpanded={expandedIds.includes(item.id)}
            inactive={item.inactive}
            onToggle={() => toggle(item.id)}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

/* ─── AccordionItem ─────────────────────────────────────────────────────────── */

export interface AccordionItemProps {
  label: string;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
  inactive?: boolean;
  className?: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ label, children, isExpanded = false, onToggle, inactive = false, className }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);

    const measure = useCallback(() => {
      if (contentRef.current) {
        setHeight(contentRef.current.scrollHeight);
      }
    }, []);

    useEffect(() => {
      measure();
      const el = contentRef.current;
      if (!el) return;
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }, [measure]);

    return (
      <div ref={ref} className={cn(styles.item, inactive && styles.inactive, className)}>
        <button
          type="button"
          className={styles.trigger}
          onClick={() => !inactive && onToggle?.()}
          aria-expanded={isExpanded}
          tabIndex={inactive ? -1 : 0}
        >
          <Text variant="text-body-medium-emphasis" as="span" color="inherit">
            {label}
          </Text>
          <span className={cn(styles.chevron, isExpanded && styles.chevronOpen)}>
            &#x203A;
          </span>
        </button>
        <div
          className={styles.body}
          style={{ height: isExpanded ? height : 0 }}
          aria-hidden={!isExpanded}
        >
          <div ref={contentRef} className={styles.bodyInner}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';
