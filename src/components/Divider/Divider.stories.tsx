import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';
import { Text } from '@/components/Text';

const meta: Meta<typeof Divider> = {
  title: 'Classic/Divider',
  component: Divider,
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {};

export const Horizontal: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Text variant="text-body-medium" as="p">Section one content above the divider.</Text>
      <Divider />
      <Text variant="text-body-medium" as="p">Section two content below the divider.</Text>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 40 }}>
      <Text variant="text-body-medium" as="span">Left</Text>
      <Divider orientation="vertical" />
      <Text variant="text-body-medium" as="span">Right</Text>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', width: 280 }}>
      {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((item, i) => (
        <React.Fragment key={item}>
          {i > 0 && <Divider />}
          <div style={{ padding: '12px 0' }}>
            <Text variant="text-body-medium" as="span">{item}</Text>
          </div>
        </React.Fragment>
      ))}
    </div>
  ),
};
