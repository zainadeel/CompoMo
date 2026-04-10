import React, { forwardRef } from 'react';
import styles from './Surface.module.css';

/**
 * Semantic intent for colored surfaces.
 * When 'default', use the background prop instead.
 * When semantic, pair with the contrast prop.
 */
export type SurfaceIntent =
  | 'default'
  | 'brand'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'caution'
  | 'ai'
  | 'neutral'
  | 'walkthrough'
  | 'guide';

/** Background type when intent is 'default'. */
export type SurfaceBackground = 'primary' | 'secondary' | 'transparent' | 'translucent' | 'shade';

/** Contrast level for semantic intents. */
export type SurfaceContrast = 'faint' | 'medium' | 'bold' | 'strong';

/** Elevation for depth/shadow effects. */
export type SurfaceElevation =
  | 'none'
  | 'depressed'
  | 'flat'
  | 'elevated'
  | 'floating'
  | 'overlayLeft'
  | 'overlayRight';

/** Edge divider border direction. */
export type SurfaceEdge = 'top' | 'right' | 'bottom' | 'left';

/** Corner radius presets. */
export type SurfaceRadiusPreset = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/** Corner radius — preset or CSS variable escape hatch. */
export type SurfaceRadius = SurfaceRadiusPreset | `var(--${string})`;

/** HTML elements Surface can render as. */
export type SurfaceElement =
  | 'div'
  | 'section'
  | 'aside'
  | 'article'
  | 'header'
  | 'footer'
  | 'main'
  | 'nav'
  | 'span'
  | 'button'
  | 'td'
  | 'th';

export interface SurfaceProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;

  /** Semantic intent for colored surfaces. Defaults to 'default'. */
  intent?: SurfaceIntent;
  /** Background type when intent is 'default'. Defaults to 'transparent'. */
  background?: SurfaceBackground;
  /** Contrast level when using a semantic intent. Defaults to 'faint'. */
  contrast?: SurfaceContrast;
  /** Elevation for depth/shadow effects. Defaults to 'none'. */
  elevation?: SurfaceElevation;
  /** Edge divider border(s). Only applies when elevation is 'none'. */
  edge?: SurfaceEdge | SurfaceEdge[];
  /** Corner radius — preset or CSS variable. */
  radius?: SurfaceRadius;

  /** Enable hover/pressed interaction overlay. */
  interactive?: boolean;
  /** Apply selected background state. */
  selected?: boolean;
  /** Disable the component (dims + disables pointer events). */
  disabled?: boolean;

  /** HTML element to render. Defaults to 'div'. */
  as?: SurfaceElement;

  /** Button type — only used when as='button'. */
  type?: 'button' | 'submit' | 'reset';
}

const backgroundClassMap: Record<SurfaceBackground, string> = {
  primary: styles.bgPrimary,
  secondary: styles.bgSecondary,
  transparent: styles.bgTransparent,
  translucent: styles.bgTranslucent,
  shade: styles.bgShade,
};

const elevationClassMap: Record<SurfaceElevation, string> = {
  none: styles.elevationNone,
  depressed: styles.elevationDepressed,
  flat: styles.elevationFlat,
  elevated: styles.elevationElevated,
  floating: styles.elevationFloating,
  overlayLeft: styles.elevationOverlayLeft,
  overlayRight: styles.elevationOverlayRight,
};

const edgeClassMap: Record<SurfaceEdge, string> = {
  top: styles.edgeTop,
  right: styles.edgeRight,
  bottom: styles.edgeBottom,
  left: styles.edgeLeft,
};

const radiusClassMap: Record<SurfaceRadiusPreset, string> = {
  none: styles.radiusNone,
  xs: styles.radiusXs,
  sm: styles.radiusSm,
  md: styles.radiusMd,
  lg: styles.radiusLg,
  xl: styles.radiusXl,
  '2xl': styles.radius2xl,
  full: styles.radiusFull,
};

const getIntentContrastClass = (intent: SurfaceIntent, contrast: SurfaceContrast): string => {
  if (intent === 'default') return '';
  const intentKey = intent.charAt(0).toUpperCase() + intent.slice(1);
  const contrastKey = contrast.charAt(0).toUpperCase() + contrast.slice(1);
  return styles[`intent${intentKey}${contrastKey}`] || '';
};

const isCustomRadius = (radius: SurfaceRadius): radius is `var(--${string})` =>
  radius.startsWith('var(--');

export const Surface = forwardRef<HTMLElement, SurfaceProps>(
  (
    {
      children,
      intent = 'default',
      background = 'transparent',
      contrast = 'faint',
      elevation = 'none',
      edge,
      radius,
      interactive = false,
      selected = false,
      disabled = false,
      as: Component = 'div',
      className = '',
      style,
      type,
      ...rest
    },
    ref
  ) => {
    // Shade background forces elevation to 'none'
    const effectiveElevation =
      intent === 'default' && background === 'shade' ? 'none' : elevation;

    const classes = [
      styles.surface,
      // Background or intent+contrast
      intent === 'default'
        ? backgroundClassMap[background]
        : getIntentContrastClass(intent, contrast),
      // Elevation
      elevationClassMap[effectiveElevation],
      // Edge(s) — only when elevation is 'none'
      ...(edge && effectiveElevation === 'none'
        ? Array.isArray(edge)
          ? edge.map(e => edgeClassMap[e])
          : [edgeClassMap[edge]]
        : []),
      // Radius (preset only — custom handled via style)
      radius && !isCustomRadius(radius) ? radiusClassMap[radius] : '',
      // States
      interactive ? styles.interactive : '',
      selected ? styles.selected : '',
      disabled ? styles.disabled : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const computedStyle: React.CSSProperties = {
      ...style,
      ...(radius && isCustomRadius(radius) ? { borderRadius: radius } : {}),
    };

    const hasStyle =
      (radius && isCustomRadius(radius)) || (style && Object.keys(style).length > 0);

    const elementProps = {
      ref,
      className: classes,
      style: hasStyle ? computedStyle : undefined,
      disabled: Component === 'button' ? disabled : undefined,
      type: Component === 'button' ? type || 'button' : undefined,
      ...rest,
    };

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Component {...(elementProps as any)}>{children}</Component>
    );
  }
);

Surface.displayName = 'Surface';
