import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { Text } from '@/components/Text';
import styles from './DestructiveMenuItem.module.css';

export interface DestructiveMenuItemProps {
  label: string;
  onClick: () => void;
  holdDuration?: number;
  subtext?: string;
}

export const DestructiveMenuItem = forwardRef<HTMLButtonElement, DestructiveMenuItemProps>(
  ({ label, onClick, holdDuration = 4000, subtext }, ref) => {
    const [progress, setProgress] = useState(0);
    const pressTimerRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);
    const animationFrameRef = useRef<number | null>(null);

    const resetState = () => {
      setProgress(0);
      if (pressTimerRef.current) { clearTimeout(pressTimerRef.current); pressTimerRef.current = null; }
      if (animationFrameRef.current) { cancelAnimationFrame(animationFrameRef.current); animationFrameRef.current = null; }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (holdDuration === 0) { onClick(); return; }
      startTimeRef.current = performance.now();
      const animate = () => {
        const elapsed = performance.now() - startTimeRef.current;
        const newProgress = Math.min((elapsed / holdDuration) * 100, 100);
        setProgress(newProgress);
        if (newProgress < 100) animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
      pressTimerRef.current = window.setTimeout(() => { onClick(); resetState(); }, holdDuration);
    };

    const handleMouseUp = (e: React.MouseEvent) => { e.stopPropagation(); resetState(); };
    const handleMouseLeave = (e: React.MouseEvent) => { e.stopPropagation(); resetState(); };

    useEffect(() => () => { resetState(); }, []);

    return (
      <button
        ref={ref}
        className={styles.destructiveMenuItem}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        type="button"
      >
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        <div className={styles.content}>
          <Text style="text-body-medium" as="span" className={styles.label}>{label}</Text>
          {subtext && <Text style="text-body-small" as="span" className={styles.subtext}>{subtext}</Text>}
        </div>
      </button>
    );
  }
);

DestructiveMenuItem.displayName = 'DestructiveMenuItem';
