import React, { forwardRef } from 'react';
import styles from './Text.module.css';

/**
 * Text variant options.
 * Each variant maps to a TokoMo typography class with predefined font-size, line-height,
 * font-weight, and letter-spacing.
 */
export type TextVariant =
  | 'text-display-medium'
  | 'text-display-small'
  | 'text-title-large'
  | 'text-title-medium'
  | 'text-title-small'
  | 'text-body-large'
  | 'text-body-large-emphasis'
  | 'text-body-medium'
  | 'text-body-medium-emphasis'
  | 'text-body-small'
  | 'text-body-small-emphasis'
  | 'text-caption'
  | 'text-caption-emphasis';

/** @deprecated Use `TextVariant` instead. */
export type TextStyle = TextVariant;

/**
 * Semantic color tokens for text.
 * Maps to TokoMo --color-foreground-* CSS custom properties.
 */
export type TextColorToken =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'brand'
  | 'negative'
  | 'positive'
  | 'warning'
  | 'caution'
  | 'ai'
  | 'on-strong'
  | 'on-bold'
  | 'inherit';

/** Text color — semantic token or CSS variable escape hatch. */
export type TextColor = TextColorToken | `var(--${string})`;

export type TextDecoration = 'none' | 'underline' | 'dotted-underline';
export type TextAlign = 'left' | 'center' | 'right';
export type LineTruncation = 1 | 2 | 3 | 4 | 5 | 'none';
export type TextWrap = 'wrap' | 'nowrap' | 'balance' | 'pretty';
export type TextElement = 'p' | 'span' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TextProps {
  /** Typography variant. Maps to a TokoMo typography class. Defaults to 'text-body-medium'. */
  variant?: TextVariant;
  children: React.ReactNode;

  // Appearance
  color?: TextColor;
  decoration?: TextDecoration;
  italic?: boolean;
  align?: TextAlign;

  // Truncation / wrap
  /** Max lines before ellipsis. Ignored when wrap is 'nowrap'. Defaults to 'none'. */
  lineTruncation?: LineTruncation;
  /** 'nowrap' = single line, truncates with ellipsis when constrained. */
  wrap?: TextWrap;

  // Semantic HTML
  as?: TextElement;
  id?: string;
  htmlFor?: string;

  // Escape hatches
  className?: string;
  style?: React.CSSProperties;
}

const colorClassMap: Record<TextColorToken, string> = {
  primary: styles.colorPrimary,
  secondary: styles.colorSecondary,
  tertiary: styles.colorTertiary,
  brand: styles.colorBrand,
  negative: styles.colorNegative,
  positive: styles.colorPositive,
  warning: styles.colorWarning,
  caution: styles.colorCaution,
  ai: styles.colorAi,
  'on-strong': styles.colorOnStrong,
  'on-bold': styles.colorOnBold,
  inherit: styles.colorInherit,
};

const decorationClassMap: Record<TextDecoration, string> = {
  none: styles.decorationNone,
  underline: styles.decorationUnderline,
  'dotted-underline': styles.decorationDottedUnderline,
};

const alignClassMap: Record<TextAlign, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
  right: styles.alignRight,
};

const truncationClassMap: Record<LineTruncation, string> = {
  1: styles.truncate1Line,
  2: styles.truncate2Lines,
  3: styles.truncate3Lines,
  4: styles.truncate4Lines,
  5: styles.truncate5Lines,
  none: styles.noTruncation,
};

const isCustomColor = (color: TextColor): color is `var(--${string})` =>
  color.startsWith('var(--');

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      variant = 'text-body-medium',
      children,
      color,
      decoration,
      italic,
      align,
      lineTruncation = 'none',
      wrap,
      as: Component = 'p',
      id,
      htmlFor,
      className = '',
      style,
    },
    ref
  ) => {
    const wrapClass =
      wrap === 'nowrap' ? styles.wrapNowrap
      : wrap === 'balance' ? styles.wrapBalance
      : wrap === 'pretty' ? styles.wrapPretty
      : '';
    const truncationClass =
      wrap === 'nowrap' ? '' : truncationClassMap[lineTruncation];

    const classes = [
      variant,
      styles.text,
      wrapClass,
      truncationClass,
      color && !isCustomColor(color) ? colorClassMap[color] : '',
      decoration ? decorationClassMap[decoration] : '',
      italic ? styles.italic : '',
      align ? alignClassMap[align] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const computedStyle: React.CSSProperties = {
      ...style,
      ...(color && isCustomColor(color) ? { color } : {}),
    };

    const props: React.HTMLAttributes<HTMLElement> & { htmlFor?: string } = {
      className: classes,
      style: Object.keys(computedStyle).length > 0 ? computedStyle : undefined,
      ...(id ? { id } : {}),
      ...(Component === 'label' && htmlFor ? { htmlFor } : {}),
    };

    return (
      <Component ref={ref as React.Ref<never>} {...props}>
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
