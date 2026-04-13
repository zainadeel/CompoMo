import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Phoenix Gap/RadioGroup',
  component: RadioGroup,
  args: {
    direction: 'vertical',
    inactive: false,
  },
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    inactive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const OPTIONS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
  { label: 'Option D', value: 'd' },
];

const Controlled = (props: Partial<React.ComponentProps<typeof RadioGroup>>) => {
  const [value, setValue] = useState('b');
  return (
    <RadioGroup
      value={value}
      onChange={setValue}
      options={OPTIONS}
      aria-label="Demo radio group"
      {...props}
    />
  );
};

export const Playground: Story = {
  render: args => <Controlled {...args} />,
};

// ─── Matrix ───────────────────────────────────────────────────────────────────

const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 24 };
const section = (text: string) => (
  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#555', marginTop: 8 }}>
    {text}
  </div>
);

export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={col}>
      {section('Vertical (default)')}
      <Controlled />
      {section('Horizontal')}
      <Controlled direction="horizontal" />
      {section('Inactive')}
      <RadioGroup
        value="b"
        onChange={() => {}}
        options={OPTIONS}
        inactive
        aria-label="Disabled group"
      />
      {section('With inactive individual option')}
      <Controlled
        options={[
          { label: 'Available', value: 'a' },
          { label: 'Available', value: 'b' },
          { label: 'Unavailable', value: 'c', inactive: true },
          { label: 'Available', value: 'd' },
        ]}
      />
    </div>
  ),
};

export const Default: Story = {
  render: () => <Controlled />,
};

export const Horizontal: Story = {
  render: () => <Controlled direction="horizontal" />,
};

export const Inactive: Story = {
  render: () => (
    <RadioGroup
      value="a"
      onChange={() => {}}
      options={OPTIONS}
      inactive
      aria-label="Disabled group"
    />
  ),
};
