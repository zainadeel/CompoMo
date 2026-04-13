import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabGroup } from './TabGroup';

const meta: Meta<typeof TabGroup> = {
  title: 'Classic/TabGroup',
  component: TabGroup,
};

export default meta;
type Story = StoryObj<typeof TabGroup>;

const TABS = [
  { label: 'Overview', id: 'overview' },
  { label: 'Activity', id: 'activity' },
  { label: 'Settings', id: 'settings' },
  { label: 'Members', id: 'members' },
];

const Controlled = (props: Partial<React.ComponentProps<typeof TabGroup>>) => {
  const [active, setActive] = useState(0);
  return (
    <div>
      <TabGroup tabs={TABS} activeIndex={active} onTabChange={setActive} {...props} />
      <div style={{ padding: '16px 0', color: 'var(--color-foreground-secondary)', fontSize: 14 }}>
        Content for: <strong>{TABS[active].label}</strong>
      </div>
    </div>
  );
};

export const Playground: Story = {
  render: () => <Controlled />,
};

export const Default: Story = {
  render: () => <Controlled />,
};

export const ManyTabs: Story = {
  render: () => (
    <Controlled
      tabs={[
        { label: 'Dashboard' },
        { label: 'Analytics' },
        { label: 'Reports' },
        { label: 'Users' },
        { label: 'Settings' },
        { label: 'Billing' },
        { label: 'Integrations' },
      ]}
    />
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <Controlled tabs={[{ label: 'Active' }, { label: 'Archived' }]} />
  ),
};
