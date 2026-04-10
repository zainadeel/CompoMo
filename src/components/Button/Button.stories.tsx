import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Button } from './Button';
import type { IconComponent } from '@/types/icons';

/** Placeholder icon component for stories (no real icon dependency). */
const PlaceholderIcon: IconComponent = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
    <circle cx="10" cy="10" r="6" />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    intent: { control: 'select', options: ['brand', 'neutral', 'positive', 'negative', 'warning', 'caution', 'ai'] },
    size: { control: 'select', options: ['medium', 'small', 'extraSmall'] },
    contrast: { control: 'select', options: ['bold', 'medium', 'strong'] },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" label="Primary" />
      <Button variant="secondary" label="Secondary" />
      <Button variant="tertiary" label="Tertiary" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button size="medium" label="Medium" />
      <Button size="small" label="Small" />
      <Button size="extraSmall" label="Extra Small" />
    </div>
  ),
};

export const Intents: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button intent="brand" label="Brand" />
      <Button intent="neutral" label="Neutral" />
      <Button intent="positive" label="Positive" />
      <Button intent="negative" label="Negative" />
      <Button intent="warning" label="Warning" />
      <Button intent="caution" label="Caution" />
      <Button intent="ai" label="AI" />
    </div>
  ),
};

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" icon={PlaceholderIcon} aria-label="Action" />
      <Button variant="secondary" icon={PlaceholderIcon} aria-label="Action" />
      <Button variant="tertiary" icon={PlaceholderIcon} aria-label="Action" />
    </div>
  ),
};

export const IconAndLabel: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" icon={PlaceholderIcon} label="Primary" />
      <Button variant="secondary" icon={PlaceholderIcon} label="Secondary" />
      <Button variant="tertiary" icon={PlaceholderIcon} label="Tertiary" />
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="secondary" label="Messages" badgeCount={3} />
      <Button variant="secondary" label="Notifications" badgeCount={9} />
      <Button variant="secondary" label="Alerts" badgeCount={12} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" label="Primary" disabled />
      <Button variant="secondary" label="Secondary" disabled />
      <Button variant="tertiary" label="Tertiary" disabled />
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" label="Rounded" rounded />
      <Button variant="secondary" label="Rounded" rounded />
      <Button variant="tertiary" label="Rounded" rounded />
    </div>
  ),
};

export const Contrasts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="primary" label="Bold" contrast="bold" />
      <Button variant="primary" label="Medium" contrast="medium" />
      <Button variant="primary" label="Strong" contrast="strong" />
    </div>
  ),
};

export const Selected: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button variant="secondary" label="Selected" isSelected toggle />
      <Button variant="tertiary" label="Selected" isSelected toggle />
      <Button variant="secondary" label="Selected (no bg)" isSelected toggle showSelectedBackground={false} />
    </div>
  ),
};
