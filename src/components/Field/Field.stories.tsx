import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from './Field';
import { Input } from '@/components/Input';
import { Slider } from '@/components/Slider';

const meta: Meta<typeof Field> = {
  title: 'Primitives/Field',
  component: Field,
  args: {
    label: 'Label',
  },
  argTypes: {
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 280 }}>
        <Field {...args}>
          <Input id={args.id} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value…" />
        </Field>
      </div>
    );
  },
};

// ─── Matrix ───────────────────────────────────────────────────────────────────

const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 20 };
const section = (text: string) => (
  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#555' }}>
    {text}
  </div>
);
const divider = <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '4px 0 20px' }} />;

export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [textVal, setTextVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    const [searchVal, setSearchVal] = useState('');
    const [sliderVal, setSliderVal] = useState(50);
    const [opacityVal, setOpacityVal] = useState(0.8);

    return (
      <div style={{ ...col, fontFamily: 'sans-serif', maxWidth: 320 }}>

        {section('With Input')}
        {divider}
        <Field label="Full name" id="name">
          <Input id="name" value={textVal} onChange={(e) => setTextVal(e.target.value)} placeholder="e.g. Jane Smith" />
        </Field>
        <Field label="Email address" id="email">
          <Input id="email" type="email" value={emailVal} onChange={(e) => setEmailVal(e.target.value)} placeholder="user@example.com" />
        </Field>
        <Field label="Search" id="search">
          <Input id="search" type="search" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} placeholder="Search…" />
        </Field>
        <Field label="Disabled field" id="disabled">
          <Input id="disabled" value="Read-only value" disabled onChange={() => {}} />
        </Field>

        {section('With Slider')}
        {divider}
        <Field label="Volume">
          <Slider label="Volume" value={sliderVal} onChange={setSliderVal} />
        </Field>
        <Field label="Opacity">
          <Slider label="Opacity" value={opacityVal} onChange={setOpacityVal} min={0} max={1} step={0.05} />
        </Field>

      </div>
    );
  },
};

// ─── Individual stories ───────────────────────────────────────────────────────

export const WithInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 280 }}>
        <Field label="Name" id="name-field">
          <Input id="name-field" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter your name" />
        </Field>
      </div>
    );
  },
};

export const WithSlider: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div style={{ width: 280 }}>
        <Field label="Volume">
          <Slider label="Volume" value={value} onChange={setValue} />
        </Field>
      </div>
    );
  },
};
