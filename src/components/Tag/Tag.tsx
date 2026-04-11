import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import { LabelWrap } from '@/components/LabelWrap';
import { CrossUI } from '@ds-mo/icons';
import type { IconComponent } from '@/types/icons';
import styles from './Tag.module.css';

export type TagIntent = 'neutral' | 'brand' | 'ai' | 'negative' | 'warning' | 'caution' | 'positive';
export type TagContrast = 'strong' | 'bold' | 'medium' | 'faint';
export type TagVariant = 'filled' | 'outline';
export type TagSize = 'md' | 'sm' | 'xs';

export interface TagProps {
  label: string;
  intent?: TagIntent;
  contrast?: TagContrast;
  /** Visual variant. Defaults to 'filled'. */
  variant?: TagVariant;
  size?: TagSize;
  rounded?: boolean;
  /** Leading icon component. */
  icon?: IconComponent;
  removable?: boolean;
  onRemove?: () => void;
  /** Override the default CrossUI remove icon. */
  removeIcon?: IconComponent;
  maxWidth?: string | number;
  /** Elevation shadow. 'floating' = FAB-strength shadow. */
  elevation?: boolean | 'floating';
  disabled?: boolean;
  /** Makes the tag clickable. Pair with pressed/onPressedChange for filter-chip behavior. */
  onClick?: () => void;
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  className?: string;
}

const ICON_SIZE: Record<TagSize, number> = { md: 16, sm: 14, xs: 12 };

const TEXT_STYLE_MAP: Record<TagSize, string> = {
  md: 'text-body-medium-emphasis',
  sm: 'text-body-small-emphasis',
  xs: 'text-caption-emphasis',
};

export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      label,
      intent = 'neutral',
      contrast = 'faint',
      variant = 'filled',
      size = 'md',
      rounded = false,
      icon: Icon,
      removable = false,
      onRemove,
      removeIcon: RemoveIcon,
      maxWidth,
      elevation,
      disabled = false,
      onClick,
      pressed,
      onPressedChange,
      className,
    },
    ref
  ) => {
    const isInteractive = !!onClick || !!onPressedChange;
    const iconSize = ICON_SIZE[size];
    const textStyle = TEXT_STYLE_MAP[size];

    const classes = cn(
      styles.tag,
      styles[`intent${intent.charAt(0).toUpperCase() + intent.slice(1)}`],
      styles[`contrast${contrast.charAt(0).toUpperCase() + contrast.slice(1)}`],
      styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
      styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
      rounded && styles.rounded,
      removable && styles.removable,
      isInteractive && styles.interactive,
      disabled && styles.disabled,
      elevation === true && styles.elevation,
      elevation === 'floating' && styles.elevationFloating,
      pressed && styles.pressed,
      className,
    );

    const style = maxWidth != null
      ? { maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }
      : undefined;

    const handleInteract = isInteractive && !disabled
      ? () => {
          onPressedChange?.(!pressed);
          onClick?.();
        }
      : undefined;

    const handleKeyDown = isInteractive && !disabled
      ? (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPressedChange?.(!pressed);
            onClick?.();
          }
        }
      : undefined;

    return (
      <div
        ref={ref}
        className={classes}
        style={style}
        onClick={handleInteract}
        onKeyDown={handleKeyDown}
        role={isInteractive ? 'button' : undefined}
        tabIndex={isInteractive && !disabled ? 0 : undefined}
        aria-pressed={onPressedChange != null ? pressed : undefined}
        aria-disabled={disabled || undefined}
      >
        {Icon && <Icon size={iconSize} />}
        <LabelWrap>
          <Text variant={textStyle as never} as="span" color="inherit">
            {label}
          </Text>
        </LabelWrap>
        {removable && onRemove && (
          <button
            type="button"
            className={styles.removeButton}
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            aria-label={`Remove ${label}`}
            tabIndex={-1}
          >
            {RemoveIcon ? <RemoveIcon size={iconSize} /> : <CrossUI size={iconSize} />}
          </button>
        )}
      </div>
    );
  }
);

Tag.displayName = 'Tag';
