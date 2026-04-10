import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';
import { SidebarSection } from './SidebarSection';
import { SidebarItem } from './SidebarItem';

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('dashboard');
    return (
      <div style={{ height: 500, display: 'flex' }}>
        <Sidebar>
          <SidebarSection label="Main">
            <SidebarItem label="Dashboard" isSelected={selected === 'dashboard'} onClick={() => setSelected('dashboard')} />
            <SidebarItem label="Projects" isSelected={selected === 'projects'} onClick={() => setSelected('projects')} />
            <SidebarItem label="Tasks" isSelected={selected === 'tasks'} onClick={() => setSelected('tasks')} />
          </SidebarSection>
          <SidebarSection label="Settings">
            <SidebarItem label="Account" isSelected={selected === 'account'} onClick={() => setSelected('account')} />
            <SidebarItem label="Preferences" isSelected={selected === 'preferences'} onClick={() => setSelected('preferences')} />
          </SidebarSection>
        </Sidebar>
        <div style={{ flex: 1, padding: 24, background: 'var(--color-background-secondary)' }}>
          Content: {selected}
        </div>
      </div>
    );
  },
};

export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selected, setSelected] = useState('dashboard');
    return (
      <div style={{ height: 500, display: 'flex' }}>
        <Sidebar isCollapsed={collapsed} onToggle={() => setCollapsed(c => !c)}>
          <SidebarSection label="Navigation">
            <SidebarItem label="Dashboard" isSelected={selected === 'dashboard'} onClick={() => setSelected('dashboard')} />
            <SidebarItem label="Analytics" isSelected={selected === 'analytics'} onClick={() => setSelected('analytics')} />
            <SidebarItem label="Reports" isSelected={selected === 'reports'} onClick={() => setSelected('reports')} />
          </SidebarSection>
        </Sidebar>
        <div style={{ flex: 1, padding: 24, background: 'var(--color-background-secondary)' }}>
          Content area
        </div>
      </div>
    );
  },
};

export const WithSubitems: Story = {
  render: () => {
    const [selected, setSelected] = useState('general');
    return (
      <div style={{ height: 500, display: 'flex' }}>
        <Sidebar>
          <SidebarSection label="Settings">
            <SidebarItem label="General" isSelected={selected === 'general'} onClick={() => setSelected('general')}>
              <SidebarItem label="Profile" isSelected={selected === 'profile'} onClick={() => setSelected('profile')} />
              <SidebarItem label="Notifications" isSelected={selected === 'notifications'} onClick={() => setSelected('notifications')} />
            </SidebarItem>
            <SidebarItem label="Security" isSelected={selected === 'security'} onClick={() => setSelected('security')}>
              <SidebarItem label="Password" isSelected={selected === 'password'} onClick={() => setSelected('password')} />
              <SidebarItem label="Two Factor" isSelected={selected === '2fa'} onClick={() => setSelected('2fa')} />
            </SidebarItem>
          </SidebarSection>
        </Sidebar>
        <div style={{ flex: 1, padding: 24, background: 'var(--color-background-secondary)' }}>
          Content: {selected}
        </div>
      </div>
    );
  },
};

export const CollapsibleSections: Story = {
  render: () => {
    const [selected, setSelected] = useState('dashboard');
    return (
      <div style={{ height: 500, display: 'flex' }}>
        <Sidebar>
          <SidebarSection label="Main" collapsible>
            <SidebarItem label="Dashboard" isSelected={selected === 'dashboard'} onClick={() => setSelected('dashboard')} />
            <SidebarItem label="Projects" isSelected={selected === 'projects'} onClick={() => setSelected('projects')} />
          </SidebarSection>
          <SidebarSection label="Admin" collapsible defaultCollapsed>
            <SidebarItem label="Users" isSelected={selected === 'users'} onClick={() => setSelected('users')} />
            <SidebarItem label="Billing" isSelected={selected === 'billing'} onClick={() => setSelected('billing')} />
          </SidebarSection>
        </Sidebar>
        <div style={{ flex: 1, padding: 24, background: 'var(--color-background-secondary)' }}>
          Content: {selected}
        </div>
      </div>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [selected, setSelected] = useState('home');
    return (
      <div style={{ height: 500, display: 'flex' }}>
        <Sidebar footer={<div style={{ padding: '12px 16px', fontSize: 12, color: 'var(--color-foreground-tertiary)' }}>v1.0.0</div>}>
          <SidebarSection>
            <SidebarItem label="Home" isSelected={selected === 'home'} onClick={() => setSelected('home')} />
            <SidebarItem label="Explore" isSelected={selected === 'explore'} onClick={() => setSelected('explore')} />
          </SidebarSection>
        </Sidebar>
        <div style={{ flex: 1, padding: 24, background: 'var(--color-background-secondary)' }}>
          Content: {selected}
        </div>
      </div>
    );
  },
};
