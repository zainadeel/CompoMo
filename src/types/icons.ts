import type { ForwardRefExoticComponent, RefAttributes, SVGAttributes } from 'react';

/**
 * Props accepted by icon components (compatible with @ds-mo/icons).
 */
export interface IconProps extends SVGAttributes<SVGSVGElement> {
  size?: number | string;
  color?: string;
  className?: string;
}

/**
 * An icon component type (compatible with @ds-mo/icons IconComponent).
 */
export type IconComponent = ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
