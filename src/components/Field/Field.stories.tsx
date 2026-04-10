import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from './Field';
import { Input } from '@/components/Input';
import { Slider } from '@/components/Slider';

const meta: Meta<typeof Field> = {
  title: 'Primitives/Field',
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Field {...args} label="Name" id="name-field">
        <Input
          id="name-field"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your name"
        />
      </Field>
    );
  },
};

export const WithSlider: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);
    return (
      <Field {...args} label="Opacity">
        <Slider
          label="Opacity"
          value={value}
          onChange={setValue}
        />
      </Field>
    );
  },
};
