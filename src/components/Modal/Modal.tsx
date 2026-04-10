import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Surface } from '@/components/Surface';
import { Text } from '@/components/Text';
import styles from './Modal.module.css';

export type ModalWidth = 'sm' | 'md' | 'lg';

const WIDTH_MAP: Record<ModalWidth, string> = {
  sm: 'var(--dimension-modal-width-sm, 400px)',
  md: 'var(--dimension-modal-width-md, 560px)',
  lg: 'var(--dimension-modal-width-lg, 720px)',
};

const CLOSE_ANIMATION_MS = 220;

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: ModalWidth | string;
  bodyClassName?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 'md',
  bodyClassName,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  const resolvedWidth = useMemo(() => {
    if (width === 'sm' || width === 'md' || width === 'lg') {
      return WIDTH_MAP[width];
    }
    return width;
  }, [width]);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, CLOSE_ANIMATION_MS);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !shouldRender) return;
    const id = requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return createPortal(
    <div
      className={`${styles.backdrop} ${isClosing ? styles.closing : ''}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <Surface
        ref={dialogRef}
        background="primary"
        elevation="floating"
        radius="var(--dimension-radius-275, 22px)"
        className={styles.dialog}
        style={{ width: `min(${resolvedWidth}, calc(100vw - 32px))` }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className={styles.header}>
          <Text id={titleId} as="h2" style="text-title-small" lineTruncation="none">
            {title}
          </Text>
          {subtitle != null && (
            <div className={styles.subtitle}>{subtitle}</div>
          )}
        </div>
        <div className={`${styles.body} ${bodyClassName ?? ''}`.trim()}>
          {children}
        </div>
        {footer != null && (
          <div className={styles.footer}>{footer}</div>
        )}
      </Surface>
    </div>,
    document.body
  );
};

Modal.displayName = 'Modal';
