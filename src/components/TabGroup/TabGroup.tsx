import React, { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/utils/cn';
import { Tab } from '@/components/Tab';
import styles from './TabGroup.module.css';

export interface TabGroupTab {
  label: string;
  id?: string;
}

export interface TabGroupProps {
  /** Tab definitions. */
  tabs: TabGroupTab[];
  /** Index of the active tab. */
  activeIndex?: number;
  /** Called when a tab is clicked. */
  onTabChange?: (index: number) => void;
  className?: string;
}

export const TabGroup = forwardRef<HTMLDivElement, TabGroupProps>(
  ({ tabs, activeIndex = 0, onTabChange, className }, ref) => {
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    const updateIndicator = useCallback(() => {
      const el = tabsRef.current[activeIndex];
      if (el) {
        const parent = el.parentElement;
        if (parent) {
          setIndicator({
            left: el.offsetLeft,
            width: el.offsetWidth,
          });
        }
      }
    }, [activeIndex]);

    useEffect(() => {
      updateIndicator();
    }, [updateIndicator]);

    // Recalculate on resize
    useEffect(() => {
      const observer = new ResizeObserver(updateIndicator);
      const container = tabsRef.current[0]?.parentElement;
      if (container) observer.observe(container);
      return () => observer.disconnect();
    }, [updateIndicator]);

    return (
      <div
        ref={ref}
        role="tablist"
        className={cn(styles.tabGroup, className)}
      >
        <div className={styles.tabsRow}>
          {tabs.map((tab, i) => (
            <Tab
              key={tab.id ?? i}
              ref={el => { tabsRef.current[i] = el; }}
              id={tab.id}
              label={tab.label}
              isSelected={i === activeIndex}
              onClick={() => onTabChange?.(i)}
            />
          ))}
        </div>
        <div className={styles.track}>
          <div
            className={styles.indicator}
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
            }}
          />
        </div>
      </div>
    );
  }
);

TabGroup.displayName = 'TabGroup';
