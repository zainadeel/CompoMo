import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Text } from './Text';
import type { TextVariant, TextColorToken } from './Text';

const VARIANTS: TextVariant[] = [
  'text-display-medium',
  'text-display-small',
  'text-title-large',
  'text-title-medium',
  'text-title-small',
  'text-body-large',
  'text-body-large-emphasis',
  'text-body-medium',
  'text-body-medium-emphasis',
  'text-body-small',
  'text-body-small-emphasis',
  'text-caption',
  'text-caption-emphasis',
];

const COLORS: TextColorToken[] = [
  'primary', 'secondary', 'tertiary',
  'brand', 'negative', 'positive', 'warning', 'caution', 'ai',
  'on-strong', 'on-bold', 'inherit',
];

const meta: Meta<typeof Text> = {
  title: 'Primitives (Reviewed)/Text',
  component: Text,
  args: {
    variant: 'text-body-medium',
    children: 'The quick brown fox jumps over the lazy dog',
  },
  argTypes: {
    variant:       { control: 'select', options: VARIANTS },
    color:         { control: 'select', options: COLORS },
    as:            { control: 'select', options: ['p', 'span', 'div', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    align:         { control: 'select', options: ['left', 'center', 'right'] },
    decoration:    { control: 'select', options: ['none', 'underline', 'dotted-underline'] },
    italic:        { control: 'boolean' },
    lineTruncation:{ control: 'select', options: [1, 2, 3, 4, 5, 'none'] },
    wrap:          { control: 'select', options: ['wrap', 'nowrap', 'balance', 'pretty'] },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const monoLabel = (text: string) => (
  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--color-foreground-tertiary)', minWidth: 210, flexShrink: 0, paddingTop: 2 }}>
    {text}
  </span>
);

const sectionHeading = (title: string) => (
  <div style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-foreground-tertiary)', marginTop: 12, marginBottom: 2 }}>
    {title}
  </div>
);

const divider = <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-tertiary)', margin: '12px 0' }} />;

const SAMPLE      = 'The quick brown fox jumps over the lazy dog';
const SHORT_SAMPLE = 'Bright vixens jump dozy fowl quack';
const LONG_SAMPLE  = 'This text is intentionally long to demonstrate how the component behaves when content exceeds the available width and must either wrap or truncate gracefully.';

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {};

export const TypeScale: Story = {
  name: 'Type Scale',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {sectionHeading('Display')}
      {(['text-display-medium', 'text-display-small'] as TextVariant[]).map(v => (
        <div key={v} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          {monoLabel(v)}
          <Text variant={v}>{SHORT_SAMPLE}</Text>
        </div>
      ))}
      {divider}
      {sectionHeading('Title')}
      {(['text-title-large', 'text-title-medium', 'text-title-small'] as TextVariant[]).map(v => (
        <div key={v} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          {monoLabel(v)}
          <Text variant={v}>{SAMPLE}</Text>
        </div>
      ))}
      {divider}
      {sectionHeading('Body')}
      {([
        'text-body-large', 'text-body-large-emphasis',
        'text-body-medium', 'text-body-medium-emphasis',
        'text-body-small', 'text-body-small-emphasis',
      ] as TextVariant[]).map(v => (
        <div key={v} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          {monoLabel(v)}
          <Text variant={v}>{SAMPLE}</Text>
        </div>
      ))}
      {divider}
      {sectionHeading('Caption')}
      {(['text-caption', 'text-caption-emphasis'] as TextVariant[]).map(v => (
        <div key={v} style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          {monoLabel(v)}
          <Text variant={v}>{SAMPLE}</Text>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {(['primary', 'secondary', 'tertiary'] as TextColorToken[]).map(color => (
        <div key={color} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {monoLabel(color)}
          <Text variant="text-body-medium" color={color}>{SAMPLE}</Text>
        </div>
      ))}
      {divider}
      {(['brand', 'negative', 'positive', 'warning', 'caution', 'ai'] as TextColorToken[]).map(color => (
        <div key={color} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {monoLabel(color)}
          <Text variant="text-body-medium" color={color}>{SAMPLE}</Text>
        </div>
      ))}
      {divider}
      {/* on-strong and on-bold require a colored background to be legible */}
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ background: 'var(--color-background-strong-brand)', borderRadius: 8, padding: '12px 16px', flex: 1, display: 'flex', gap: 16, alignItems: 'center' }}>
          {monoLabel('on-strong')}
          <Text variant="text-body-medium" color="on-strong">{SAMPLE}</Text>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ background: 'var(--color-background-bold-brand)', borderRadius: 8, padding: '12px 16px', flex: 1, display: 'flex', gap: 16, alignItems: 'center' }}>
          {monoLabel('on-bold')}
          <Text variant="text-body-medium" color="on-bold">{SAMPLE}</Text>
        </div>
      </div>
    </div>
  ),
};

export const Decorations: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {([
        { label: 'underline',        props: { decoration: 'underline' as const } },
        { label: 'dotted-underline', props: { decoration: 'dotted-underline' as const } },
        { label: 'italic',           props: { italic: true } },
        { label: 'italic + underline', props: { italic: true, decoration: 'underline' as const } },
      ]).map(({ label, props }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {monoLabel(label)}
          <Text variant="text-body-medium" {...props}>{SAMPLE}</Text>
        </div>
      ))}
    </div>
  ),
};

export const Alignment: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 480 }}>
      {(['left', 'center', 'right'] as const).map(align => (
        <div key={align} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {monoLabel(align)}
          <Text
            variant="text-body-medium"
            align={align}
            style={{ flex: 1, background: 'var(--color-background-secondary)', borderRadius: 6, padding: '8px 12px' }}
          >
            The quick brown fox
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Truncation: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {([1, 2, 3] as const).map(lines => (
        <div key={lines} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          {monoLabel(`${lines} line${lines > 1 ? 's' : ''}`)}
          <Text variant="text-body-medium" lineTruncation={lines} style={{ flex: 1 }}>
            {LONG_SAMPLE}
          </Text>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {monoLabel('no truncation')}
        <Text variant="text-body-medium" style={{ flex: 1 }}>
          {LONG_SAMPLE}
        </Text>
      </div>
    </div>
  ),
};
