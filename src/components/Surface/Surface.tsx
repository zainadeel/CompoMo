import React, { forwardRef } from 'react';
import styles from './Surface.module.css';

/**
 * Semantic intent for colored surfaces.
 * Each intent has four contrast levels (faint, medium, bold, strong).
 */
export type SurfaceIntent =
  | 'brand'
  | 'positive'
  | 'negative'
  | 'warning'
  | 'caution'
  | 'ai'
  | 'neutral'
  | 'walkthrough'
  | 'guide';

/** Background type for non-intent surfaces. */
export type SurfaceBackground = 'primary' | 'secondary' | 'transparent' | 'translucent';

/** Contrast level for semantic intents. */
export type SurfaceContrast = 'faint' | 'medium' | 'bold' | 'strong';

/** Elevation for depth/shadow effects. Progressive: none → flat → elevated → floating. */
export type SurfaceElevation =
  | 'none'
  | 'depressed'
  | 'depressed-md'
  | 'flat'
  | 'elevated'
  | 'floating'
  | 'overlayTop'
  | 'overlayRight'
  | 'overlayBottom'
  | 'overlayLeft';

/** Edge divider border direction. */
export type SurfaceEdge = 'top' | 'right' | 'bottom' | 'left';

/** Corner radius presets. */
export type SurfaceRadiusPreset = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/** Corner radius — preset, CSS variable, or custom string (e.g. '12px 12px 0 0'). */
export type SurfaceRadius = SurfaceRadiusPreset | (string & {});

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

/** Props shared by both surface modes. */
interface SurfaceBaseProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
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
  /** Dim and disable pointer events. */
  inactive?: boolean;
  /** HTML element to render. Defaults to 'div'. */
  as?: SurfaceElement;
  /** Button type — only used when as='button'. */
  type?: 'button' | 'submit' | 'reset';
}

/** Non-intent surface — uses a basic background color. */
interface SurfaceDefaultProps extends SurfaceBaseProps {
  /** Background color. Defaults to 'transparent'. */
  background?: SurfaceBackground;
  intent?: never;
  contrast?: never;
}

/** Intent surface — uses a semantic color with contrast level. */
interface SurfaceIntentProps extends SurfaceBaseProps {
  /** Semantic intent color. */
  intent: SurfaceIntent;
  /** Contrast level for the intent background. Defaults to 'faint'. */
  contrast?: SurfaceContrast;
  background?: never;
}

export type SurfaceProps = SurfaceDefaultProps | SurfaceIntentProps;

const backgroundClassMap: Record<SurfaceBackground, string> = {
  primary: styles.bgPrimary,
  secondary: styles.bgSecondary,
  transparent: styles.bgTransparent,
  translucent: styles.bgTranslucent,
};

const elevationClassMap: Record<SurfaceElevation, string> = {
  none: styles.elevationNone,
  depressed: styles.elevationDepressed,
  'depressed-md': styles.elevationDepressedMd,
  flat: styles.elevationFlat,
  elevated: styles.elevationElevated,
  floating: styles.elevationFloating,
  overlayTop: styles.elevationOverlayTop,
  overlayRight: styles.elevationOverlayRight,
  overlayBottom: styles.elevationOverlayBottom,
  overlayLeft: styles.elevationOverlayLeft,
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
  const intentKey = intent.charAt(0).toUpperCase() + intent.slice(1);
  const contrastKey = contrast.charAt(0).toUpperCase() + contrast.slice(1);
  return styles[`intent${intentKey}${contrastKey}`] || '';
};

const isPresetRadius = (radius: SurfaceRadius): radius is SurfaceRadiusPreset =>
  radius in radiusClassMap;

export const Surface = forwardRef<HTMLElement, SurfaceProps>(
  (
    {
      children,
      background = 'transparent',
      intent,
      contrast = 'faint',
      elevation = 'none',
      edge,
      radius,
      interactive = false,
      selected = false,
      inactive = false,
      as: Component = 'div',
      className = '',
      style,
      type,
      ...rest
    },
    ref
  ) => {
    const classes = [
      styles.surface,
      // Background or intent+contrast
      intent
        ? getIntentContrastClass(intent, contrast)
        : backgroundClassMap[background],
      // Elevation
      elevationClassMap[elevation],
      // Edge(s) — only when elevation is 'none'
      ...(edge && elevation === 'none'
        ? Array.isArray(edge)
          ? edge.map(e => edgeClassMap[e])
          : [edgeClassMap[edge]]
        : []),
      // Radius (preset only — custom handled via inline style)
      radius && isPresetRadius(radius) ? radiusClassMap[radius] : '',
      // States
      interactive ? styles.interactive : '',
      selected ? styles.selected : '',
      inactive ? styles.inactive : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const computedStyle: React.CSSProperties = {
      ...style,
      ...(radius && !isPresetRadius(radius) ? { borderRadius: radius } : {}),
    };

    const hasStyle =
      (radius && !isPresetRadius(radius)) || (style && Object.keys(style).length > 0);

    const elementProps = {
      ref,
      className: classes,
      style: hasStyle ? computedStyle : undefined,
      disabled: Component === 'button' ? inactive : undefined,
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
