import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import type { IconComponent } from '@/types/icons';
import styles from './Tag.module.css';

export type TagIntent = 'positive' | 'negative' | 'warning' | 'caution' | 'neutral' | 'brand' | 'ai' | 'walkthrough' | 'guide';
export type TagContrast = 'faint' | 'medium' | 'strong' | 'bold';
export type TagStyle = 'filled' | 'outline';
export type TagSize = 'md' | 'sm' | 'xs';

export interface TagProps {
  label: string;
  intent?: TagIntent;
  contrast?: TagContrast;
  tagStyle?: TagStyle;
  size?: TagSize;
  rounded?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  /** Icon component for the remove button. */
  removeIcon?: IconComponent;
  maxWidth?: string | number;
  className?: string;
}

const ICON_SIZE: Record<TagSize, number> = { md: 20, sm: 16, xs: 12 };

export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      label,
      intent = 'neutral',
      contrast = 'faint',
      tagStyle = 'filled',
      size = 'md',
      rounded = false,
      removable = false,
      onRemove,
      removeIcon: RemoveIcon,
      maxWidth,
      className,
    },
    ref
  ) => {
    const textVariant =
      size === 'xs' ? 'text-caption-emphasis' : size === 'sm' ? 'text-body-small' : contrast === 'bold' ? 'text-body-medium-emphasis' : 'text-body-medium';

    const classes = cn(
      styles.tag,
      styles[`intent${intent.charAt(0).toUpperCase() + intent.slice(1)}`],
      styles[`contrast${contrast.charAt(0).toUpperCase() + contrast.slice(1)}`],
      styles[`style${tagStyle.charAt(0).toUpperCase() + tagStyle.slice(1)}`],
      styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
      rounded && styles.rounded,
      removable && styles.removable,
      className,
    );

    const style = maxWidth != null ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth } : undefined;

    return (
      <div ref={ref} className={classes} style={style}>
        <Text variant={textVariant as never} wrap="nowrap" color="inherit">
          {label}
        </Text>
        {removable && onRemove && (
          <button type="button" className={styles.removeButton} onClick={onRemove} aria-label={`Remove ${label}`}>
            {RemoveIcon ? <RemoveIcon size={ICON_SIZE[size]} /> : <span aria-hidden>&times;</span>}
          </button>
        )}
      </div>
    );
  }
);

Tag.displayName = 'Tag';
