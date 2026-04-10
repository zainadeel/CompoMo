import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Props accepted by icon components (compatible with @icomo/icons).
 */
export interface IconProps extends SVGAttributes<SVGSVGElement> {
  size?: number | string;
  color?: string;
  className?: string;
}

/**
 * An icon component type (compatible with @icomo/icons IconComponent).
 */
export type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
