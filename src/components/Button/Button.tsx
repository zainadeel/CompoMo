import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Text } from '@/components/Text';
import type { IconComponent } from '@/types/icons';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonIntent = 'brand' | 'neutral' | 'positive' | 'negative' | 'warning' | 'caution' | 'ai';
export type ButtonSize = 'medium' | 'small' | 'extraSmall';
export type ButtonContrast = 'bold' | 'medium' | 'strong';

export interface ButtonProps {
  /** Visual variant. Defaults to 'primary'. */
  variant?: ButtonVariant;
  /** Label text. Required for primary. Optional for secondary/tertiary (icon-only). */
  label?: string;
  /** Leading icon component from @icomo/icons. */
  icon?: IconComponent;
  /** Semantic intent. Defaults to 'brand'. */
  intent?: ButtonIntent;
  /** Size: medium (32px), small (24px), extraSmall (20px). Defaults to 'medium'. */
  size?: ButtonSize;
  /** Pill shape with extra padding. */
  rounded?: boolean;
  /** Fixed width. Omit for content width. */
  width?: React.CSSProperties['width'];
  /** Contrast level (primary variant only). Defaults to 'bold'. */
  contrast?: ButtonContrast;
  /** Toggle semantics — aria-pressed. */
  toggle?: boolean;
  /** Selected/active state (secondary/tertiary). */
  isSelected?: boolean;
  /** Show background when selected. Defaults to true. */
  showSelectedBackground?: boolean;
  /** Trailing dropdown chevron (secondary/tertiary). */
  dropdown?: boolean;
  /** Dropdown chevron icon component. */
  dropdownIcon?: IconComponent;
  /** Badge count (secondary/tertiary). */
  badgeCount?: number;

  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  'aria-label'?: string;
}

const ICON_SIZE_MAP: Record<ButtonSize, number> = { medium: 20, small: 16, extraSmall: 12 };

const TEXT_STYLE_MAP: Record<ButtonSize, { normal: string; emphasis: string }> = {
  medium: { normal: 'text-body-medium', emphasis: 'text-body-medium-emphasis' },
  small: { normal: 'text-body-small', emphasis: 'text-body-small-emphasis' },
  extraSmall: { normal: 'text-caption', emphasis: 'text-caption-emphasis' },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      label,
      icon: Icon,
      intent = 'brand',
      size = 'medium',
      rounded = false,
      width,
      contrast = 'bold',
      toggle = false,
      isSelected = false,
      showSelectedBackground = true,
      dropdown = false,
      dropdownIcon: DropdownIcon,
      badgeCount,
      onClick,
      onMouseEnter,
      onMouseLeave,
      className,
      disabled = false,
      type = 'button',
      id,
      'aria-label': ariaLabel,
    },
    ref
  ) => {
    const hasIcon = !!Icon;
    const hasLabel = !!label;
    const isIconOnly = hasIcon && !hasLabel;
    const isLabelOnly = hasLabel && !hasIcon;
    const isIconAndLabel = hasIcon && hasLabel;
    const iconSize = ICON_SIZE_MAP[size];

    const useEmphasis = variant === 'primary' || isSelected;
    const textStyleKey = useEmphasis ? 'emphasis' : 'normal';
    const textStyle = TEXT_STYLE_MAP[size][textStyleKey];

    const classes = cn(
      styles.button,
      styles[variant],
      styles[`intent${intent.charAt(0).toUpperCase() + intent.slice(1)}`],
      size !== 'medium' && styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
      rounded && styles.rounded,
      disabled && styles.disabled,
      isIconOnly && styles.iconOnly,
      isLabelOnly && styles.labelOnly,
      isIconAndLabel && styles.iconAndLabel,
      dropdown && styles.dropdown,
      // Primary contrast variants
      variant === 'primary' && contrast !== 'bold' && styles[`contrast${contrast.charAt(0).toUpperCase() + contrast.slice(1)}`],
      // Selected states
      isSelected && styles.selected,
      isSelected && showSelectedBackground && styles.selectedWithBg,
      isSelected && !showSelectedBackground && styles.selectedNoBg,
      className,
    );

    const resolvedAriaLabel = ariaLabel || label || 'button';

    return (
      <button
        ref={ref}
        id={id}
        className={classes}
        style={width ? { width } : undefined}
        onClick={disabled ? undefined : onClick}
        onMouseEnter={disabled ? undefined : onMouseEnter}
        onMouseLeave={disabled ? undefined : onMouseLeave}
        type={type}
        disabled={disabled}
        aria-label={resolvedAriaLabel}
        aria-pressed={toggle ? isSelected : undefined}
      >
        {Icon && <Icon size={iconSize} />}
        {label && (
          <Text variant={textStyle as never} as="span" color="inherit">
            {label}
          </Text>
        )}
        {dropdown && DropdownIcon && <DropdownIcon size={iconSize} />}
        {badgeCount != null && badgeCount > 0 && (
          <span className={styles.badge}>{badgeCount > 9 ? '+' : badgeCount}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
