import React, { forwardRef, useRef, useCallback, useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import styles from './Sidebar.module.css';

export type SidebarWidth = 'mini' | 'default' | number;

export interface SidebarProps {
  children: React.ReactNode;
  isCollapsed?: boolean;
  onToggle?: () => void;
  width?: SidebarWidth;
  onWidthChange?: (width: SidebarWidth) => void;
  resizable?: boolean;
  footer?: React.ReactNode;
  className?: string;
  isMobile?: boolean;
}

const MINI_WIDTH = 56;
const DEFAULT_WIDTH = 240;
const MIN_DRAG_WIDTH = 180;
const SNAP_THRESHOLD = 140;

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  ({
    children,
    isCollapsed = false,
    onToggle,
    width = 'default',
    onWidthChange,
    resizable = true,
    footer,
    className,
    isMobile = false,
  }, ref) => {
    const internalRef = useRef<HTMLElement>(null);
    const sidebarRef = (ref as React.RefObject<HTMLElement>) || internalRef;
    const [isResizing, setIsResizing] = useState(false);

    const isMini = width === 'mini';
    const resolvedWidth = width === 'mini' ? MINI_WIDTH : width === 'default' ? DEFAULT_WIDTH : width;

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      if (!resizable || !onWidthChange) return;
      e.preventDefault();
      setIsResizing(true);
      const startX = e.clientX;

      const handleMouseMove = (e: MouseEvent) => {
        const newWidth = e.clientX;
        if (newWidth < SNAP_THRESHOLD) {
          onWidthChange('mini');
        } else if (newWidth < MIN_DRAG_WIDTH) {
          onWidthChange('default');
        } else {
          onWidthChange(newWidth);
        }
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }, [resizable, onWidthChange]);

    // Close sidebar on Escape (mobile)
    useEffect(() => {
      if (!isMobile || isCollapsed) return;
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onToggle?.();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobile, isCollapsed, onToggle]);

    if (isCollapsed && !isMobile) return null;

    return (
      <>
        {/* Mobile backdrop */}
        {isMobile && !isCollapsed && (
          <div className={styles.backdrop} onClick={onToggle} aria-hidden />
        )}
        <aside
          ref={sidebarRef}
          className={cn(
            styles.sidebar,
            isMini && styles.mini,
            isMobile && styles.mobile,
            isCollapsed && styles.collapsed,
            isResizing && styles.resizing,
            className
          )}
          style={{ width: isCollapsed ? 0 : resolvedWidth }}
          role="navigation"
          aria-label="Sidebar"
        >
          <div className={styles.content}>
            {children}
          </div>
          {footer && (
            <div className={styles.footer}>
              {footer}
            </div>
          )}
          {resizable && !isMobile && (
            <div
              className={styles.resizeHandle}
              onMouseDown={handleMouseDown}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize sidebar"
            />
          )}
        </aside>
      </>
    );
  }
);

Sidebar.displayName = 'Sidebar';
