import React, { forwardRef } from 'react';
import styles from './Text.module.css';

/**
 * Text style options.
 * Each style maps to a TokoMo typography class with predefined font-size, line-height,
 * font-weight, and letter-spacing.
 */
export type TextStyle =
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
export type TextWrap = 'wrap' | 'nowrap';
export type TextSpacing = 'sm' | 'none';
export type TextElement = 'p' | 'span' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TextProps {
  /** Text style — required. Maps to a TokoMo typography class. */
  style: TextStyle;
  children: React.ReactNode;

  // Appearance
  color?: TextColor;
  decoration?: TextDecoration;
  italic?: boolean;
  align?: TextAlign;
  /** Horizontal padding. Defaults to 'sm'. */
  space?: TextSpacing;

  // Truncation / wrap
  /** Max lines before ellipsis. Ignored when wrap is 'nowrap'. Defaults to 1. */
  lineTruncation?: LineTruncation;
  /** 'nowrap' = single line, truncates with ellipsis when constrained. */
  wrap?: TextWrap;

  // Selection
  selectable?: boolean;

  // Semantic HTML
  as?: TextElement;
  id?: string;
  htmlFor?: string;

  // Escape hatches
  className?: string;
  inlineStyle?: React.CSSProperties;
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

const spaceClassMap: Record<TextSpacing, string> = {
  sm: styles.spaceSm,
  none: styles.spaceNone,
};

const isCustomColor = (color: TextColor): color is `var(--${string})` =>
  color.startsWith('var(--');

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      style: textStyle,
      children,
      color,
      decoration,
      italic,
      align,
      space = 'sm',
      lineTruncation = 1,
      wrap,
      selectable = false,
      as: Component = 'p',
      id,
      htmlFor,
      className = '',
      inlineStyle,
    },
    ref
  ) => {
    const truncationClass =
      wrap === 'nowrap' ? styles.wrapNowrap : truncationClassMap[lineTruncation];

    const classes = [
      textStyle,
      styles.text,
      spaceClassMap[space],
      truncationClass,
      selectable ? styles.selectable : '',
      color && !isCustomColor(color) ? colorClassMap[color] : '',
      decoration ? decorationClassMap[decoration] : '',
      italic ? styles.italic : '',
      align ? alignClassMap[align] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const computedStyle: React.CSSProperties = {
      ...inlineStyle,
      ...(color && isCustomColor(color) ? { color } : {}),
    };

    const props: React.HTMLAttributes<HTMLElement> & { htmlFor?: string } = {
      className: classes,
      style: Object.keys(computedStyle).length > 0 ? computedStyle : undefined,
      ...(id ? { id } : {}),
      ...(selectable ? { 'data-selectable': 'true' } : {}),
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
