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
const MAX_WIDTH = 480;
const MIN_DRAG_WIDTH = 180;
const SNAP_THRESHOLD = 140;
const KEYBOARD_STEP = 16;

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

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
    const triggerRef = useRef<HTMLElement | null>(null);
    const [isResizing, setIsResizing] = useState(false);

    const isMini = width === 'mini';
    const resolvedWidth = width === 'mini' ? MINI_WIDTH : width === 'default' ? DEFAULT_WIDTH : width;

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      if (!resizable || !onWidthChange) return;
      e.preventDefault();
      setIsResizing(true);

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

    // Keyboard resize: arrows step, Home → mini, End → max.
    // Stepping below MIN_DRAG_WIDTH snaps to 'mini'; stepping up from 'mini' snaps to 'default'.
    const handleResizeKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (!resizable || !onWidthChange) return;
      switch (e.key) {
        case 'ArrowLeft': {
          e.preventDefault();
          if (width === 'mini') return;
          const next = resolvedWidth - KEYBOARD_STEP;
          onWidthChange(next < MIN_DRAG_WIDTH ? 'mini' : next);
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          if (width === 'mini') {
            onWidthChange('default');
            return;
          }
          const next = Math.min(resolvedWidth + KEYBOARD_STEP, MAX_WIDTH);
          onWidthChange(next);
          break;
        }
        case 'Home':
          e.preventDefault();
          onWidthChange('mini');
          break;
        case 'End':
          e.preventDefault();
          onWidthChange(MAX_WIDTH);
          break;
      }
    }, [resizable, onWidthChange, width, resolvedWidth]);

    // Close sidebar on Escape (mobile)
    useEffect(() => {
      if (!isMobile || isCollapsed) return;
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onToggle?.();
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobile, isCollapsed, onToggle]);

    // Mobile dialog: capture trigger, focus first element, trap Tab, restore focus on close.
    const isMobileOpen = isMobile && !isCollapsed;
    useEffect(() => {
      if (!isMobileOpen) return;
      triggerRef.current = (document.activeElement as HTMLElement) ?? null;

      const container = sidebarRef.current;
      if (!container) return;

      const focusables = () =>
        Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
          (el) => !el.hasAttribute('aria-hidden') && el.offsetParent !== null,
        );

      const initial = focusables();
      (initial[0] ?? container).focus();

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        const items = focusables();
        if (items.length === 0) {
          e.preventDefault();
          container.focus();
          return;
        }
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !container.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !container.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      };

      document.addEventListener('keydown', handleTab);
      return () => {
        document.removeEventListener('keydown', handleTab);
        triggerRef.current?.focus?.();
        triggerRef.current = null;
      };
    }, [isMobileOpen, sidebarRef]);

    if (isCollapsed && !isMobile) return null;

    const dialogProps = isMobileOpen
      ? { role: 'dialog' as const, 'aria-modal': true, tabIndex: -1 }
      : { role: 'navigation' as const };

    return (
      <>
        {/* Mobile backdrop — mouse-only convenience; Escape handler covers keyboard. */}
        {isMobile && !isCollapsed && (
          <div className={styles.backdrop} onClick={onToggle} aria-hidden="true" />
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
          aria-label="Sidebar"
          {...dialogProps}
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
              onKeyDown={handleResizeKeyDown}
              role="separator"
              aria-orientation="vertical"
              aria-label="Resize sidebar"
              aria-valuenow={resolvedWidth}
              aria-valuemin={MINI_WIDTH}
              aria-valuemax={MAX_WIDTH}
              tabIndex={0}
            />
          )}
        </aside>
      </>
    );
  }
);

Sidebar.displayName = 'Sidebar';
