import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastContainer, toast } from './Toast';
import type { ToastIntent } from './Toast';

const meta: Meta<typeof ToastContainer> = {
  title: 'Phoenix Gap/Toast',
  component: ToastContainer,
  args: {
    position: 'top-center',
  },
  argTypes: {
    position: { control: 'select', options: ['top-center', 'top-right', 'bottom-center', 'bottom-right'] },
  },
};

export default meta;
type Story = StoryObj<typeof ToastContainer>;

const INTENTS: ToastIntent[] = ['neutral', 'brand', 'positive', 'negative', 'warning', 'caution'];

const row: React.CSSProperties = { display: 'flex', gap: 8, flexWrap: 'wrap' };

const ToastDemo = (props: React.ComponentProps<typeof ToastContainer>) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={row}>
      <button onClick={() => toast.info('This is an info message.')}>Info</button>
      <button onClick={() => toast.success('Operation completed successfully.')}>Success</button>
      <button onClick={() => toast.error('Something went wrong.')}>Error</button>
      <button onClick={() => toast.warning('Please check your input.')}>Warning</button>
    </div>
    <div style={row}>
      {INTENTS.map(intent => (
        <button
          key={intent}
          onClick={() => toast.show({ message: `Toast with ${intent} intent`, intent })}
        >
          {intent}
        </button>
      ))}
    </div>
    <div style={row}>
      <button onClick={() => toast.show({ message: 'Persistent toast (no auto-dismiss)', intent: 'brand', duration: 0 })}>
        No auto-dismiss
      </button>
      <button onClick={() => toast.dismissAll()}>Dismiss all</button>
    </div>
    <ToastContainer {...props} />
  </div>
);

export const Playground: Story = {
  render: args => <ToastDemo {...args} />,
};

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const TopRight: Story = {
  render: () => <ToastDemo position="top-right" />,
};

export const BottomCenter: Story = {
  render: () => <ToastDemo position="bottom-center" />,
};
