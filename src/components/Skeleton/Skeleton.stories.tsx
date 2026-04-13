import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Phoenix Gap/Skeleton',
  component: Skeleton,
  args: {
    variant: 'text',
    animate: true,
  },
  argTypes: {
    variant: { control: 'select', options: ['text', 'circular', 'rectangular'] },
    animate: { control: 'boolean' },
    width: { control: 'text' },
    height: { control: 'text' },
    lines: { control: { type: 'number', min: 1, max: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {};

// ─── Variants ─────────────────────────────────────────────────────────────────

const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 24 };
const row: React.CSSProperties = { display: 'flex', gap: 16, alignItems: 'center' };
const section = (text: string) => (
  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#555' }}>
    {text}
  </div>
);

export const Variants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={col}>
      {section('Text (single line)')}
      <Skeleton variant="text" width={240} />
      {section('Text (multiple lines)')}
      <Skeleton variant="text" lines={4} width={320} />
      {section('Circular')}
      <div style={row}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="circular" width={56} height={56} />
      </div>
      {section('Rectangular')}
      <Skeleton variant="rectangular" width={320} height={120} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, padding: 16, border: '1px solid var(--color-border-secondary)', borderRadius: 12, width: 320 }}>
      <Skeleton variant="circular" width={48} height={48} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" lines={2} />
      </div>
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 400 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={80} />
          <Skeleton variant="text" width={160} />
        </div>
      ))}
    </div>
  ),
};

export const NoAnimation: Story = {
  render: () => (
    <div style={col}>
      <Skeleton variant="text" width={200} animate={false} />
      <Skeleton variant="rectangular" width={200} height={60} animate={false} />
    </div>
  ),
};
