import React, { forwardRef } from 'react';
import { Text } from '@/components/Text';
import { Surface } from '@/components/Surface';
import type { IconComponent } from '@/types';
import styles from './MenuItem.module.css';

export type MenuItemSelectionStyle = 'highlight' | 'radio' | 'noOverlay';

export interface MenuItemProps {
  label: string;
  onClick: () => void;
  isSelected?: boolean;
  isInactive?: boolean;
  icon?: IconComponent;
  labelColor?: 'primary' | 'secondary' | 'tertiary';
  subtext?: string;
  showToggle?: boolean;
  toggleValue?: boolean;
  intent?: 'negative';
  selectionStyle?: MenuItemSelectionStyle;
  showTrailingChevron?: boolean;
  checkIcon?: IconComponent;
  chevronIcon?: IconComponent;
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({
    label,
    onClick,
    isSelected = false,
    isInactive = false,
    icon: Icon,
    labelColor,
    subtext,
    showToggle = false,
    toggleValue = false,
    intent,
    selectionStyle = 'highlight',
    showTrailingChevron = false,
    checkIcon: CheckIcon,
    chevronIcon: ChevronIcon,
  }, ref) => {
    const useRadioStyle = selectionStyle === 'radio';
    const noOverlay = selectionStyle === 'noOverlay' || useRadioStyle;
    const showSelectedOverlay = isSelected && !noOverlay;

    return (
      <Surface
        ref={ref as React.Ref<HTMLElement>}
        as="button"
        interactive={!isInactive}
        selected={showSelectedOverlay}
        radius="sm"
        className={`${styles.menuItem} ${isSelected ? styles.menuItemSelected : ''} ${isInactive ? styles.menuItemInactive : ''} ${intent === 'negative' ? styles.menuItemNegative : ''} ${labelColor === 'tertiary' ? styles.menuItemLabelTertiary : ''}`}
        onClick={onClick}
        type="button"
        disabled={isInactive}
      >
        {Icon && (
          <div className={styles.iconPrefix}>
            <Icon size={20} />
          </div>
        )}
        <div className={styles.content}>
          <Text
            style={isSelected ? 'text-body-medium-emphasis' : 'text-body-medium'}
            color={labelColor}
            as="span"
            className={styles.label}
          >
            {label}
          </Text>
          {subtext && (
            <Text style="text-body-small" as="span" className={styles.subtext}>
              {subtext}
            </Text>
          )}
        </div>
        {showToggle && (
          <div className={styles.toggleSuffix}>
            <div className={`${styles.toggle} ${toggleValue ? styles.toggleOn : ''}`}>
              <div className={styles.toggleThumb} />
            </div>
          </div>
        )}
        {useRadioStyle && isSelected && CheckIcon && (
          <div className={styles.checkSuffix}>
            <CheckIcon size={20} />
          </div>
        )}
        {showTrailingChevron && ChevronIcon && (
          <div className={styles.chevronSuffix}>
            <ChevronIcon size={20} />
          </div>
        )}
      </Surface>
    );
  }
);

MenuItem.displayName = 'MenuItem';
