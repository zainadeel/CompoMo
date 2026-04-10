import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Primitives/Slider',
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(50);
    return (
      <Slider
        {...args}
        label="Volume"
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const CustomRange: Story = {
  render: (args) => {
    const [value, setValue] = useState(5);
    return (
      <Slider
        {...args}
        label="Rating"
        value={value}
        onChange={setValue}
        min={0}
        max={10}
        step={1}
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState(30);
    return (
      <Slider
        {...args}
        label="Brightness"
        value={value}
        onChange={setValue}
        disabled
      />
    );
  },
};
