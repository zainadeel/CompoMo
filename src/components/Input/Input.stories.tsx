import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'tel', 'url', 'search', 'password'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const WithPlaceholder: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter some text..."
      />
    );
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('Hello, CompoMo!');
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState('Disabled input');
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled
      />
    );
  },
};

export const Search: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="search"
        placeholder="Search..."
      />
    );
  },
};
