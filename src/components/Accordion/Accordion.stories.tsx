import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';
import { Text } from '@/components/Text';

const meta: Meta<typeof Accordion> = {
  title: 'Classic/Accordion',
  component: Accordion,
  args: {
    multiple: false,
  },
  argTypes: {
    multiple: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const ITEMS = [
  {
    id: 'shipping',
    label: 'Shipping Information',
    content: (
      <Text variant="text-body-medium" as="p" color="secondary">
        We offer free standard shipping on all orders over $50. Express shipping is available for $9.99.
        International shipping rates are calculated at checkout based on destination.
      </Text>
    ),
  },
  {
    id: 'returns',
    label: 'Returns & Exchanges',
    content: (
      <Text variant="text-body-medium" as="p" color="secondary">
        Items can be returned within 30 days of purchase. Items must be in original condition with tags attached.
        Refunds are processed within 5-7 business days.
      </Text>
    ),
  },
  {
    id: 'warranty',
    label: 'Warranty',
    content: (
      <Text variant="text-body-medium" as="p" color="secondary">
        All products come with a 1-year manufacturer warranty against defects in materials and workmanship.
      </Text>
    ),
  },
  {
    id: 'contact',
    label: 'Contact Support',
    content: (
      <Text variant="text-body-medium" as="p" color="secondary">
        Email us at support@example.com or call 1-800-EXAMPLE. Our support hours are Mon-Fri 9am-5pm EST.
      </Text>
    ),
  },
];

const Controlled = (props: Partial<React.ComponentProps<typeof Accordion>>) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  return <Accordion items={ITEMS} expandedIds={expanded} onExpandedChange={setExpanded} {...props} />;
};

export const Playground: Story = {
  render: args => <Controlled {...args} />,
};

export const Default: Story = {
  render: () => <Controlled />,
};

export const Multiple: Story = {
  render: () => <Controlled multiple />,
};

export const WithInactive: Story = {
  render: () => (
    <Controlled
      items={[
        ...ITEMS.slice(0, 2),
        { ...ITEMS[2], inactive: true },
        ITEMS[3],
      ]}
    />
  ),
};

export const PreExpanded: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<string[]>(['shipping']);
    return <Accordion items={ITEMS} expandedIds={expanded} onExpandedChange={setExpanded} />;
  },
};
