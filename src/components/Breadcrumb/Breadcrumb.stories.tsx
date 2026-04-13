import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Classic/Breadcrumb',
  component: Breadcrumb,
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Playground: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => {} },
      { label: 'Products', onClick: () => {} },
      { label: 'Widget Pro' },
    ],
  },
};

export const Default: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', onClick: () => {} },
        { label: 'Settings', onClick: () => {} },
        { label: 'General' },
      ]}
    />
  ),
};

export const Deep: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', onClick: () => {} },
        { label: 'Products', onClick: () => {} },
        { label: 'Inventory', onClick: () => {} },
        { label: 'Item #482', onClick: () => {} },
        { label: 'Maintenance' },
      ]}
    />
  ),
};

export const WithLinks: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '#' },
        { label: 'Products', href: '#' },
        { label: 'Widget Pro' },
      ]}
    />
  ),
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb
      separator=">"
      items={[
        { label: 'Dashboard', onClick: () => {} },
        { label: 'Reports', onClick: () => {} },
        { label: 'Q4 Summary' },
      ]}
    />
  ),
};
