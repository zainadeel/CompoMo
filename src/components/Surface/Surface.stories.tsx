import type { Meta, StoryObj } from '@storybook/react';
import { Surface } from './Surface';

const meta: Meta<typeof Surface> = {
  title: 'Primitives/Surface',
  component: Surface,
  argTypes: {
    background: {
      control: 'select',
      options: ['primary', 'secondary', 'transparent', 'translucent', 'shade'],
    },
    intent: {
      control: 'select',
      options: ['default', 'brand', 'positive', 'negative', 'warning', 'caution', 'ai', 'neutral'],
    },
    contrast: {
      control: 'select',
      options: ['faint', 'medium', 'bold', 'strong'],
    },
    elevation: {
      control: 'select',
      options: ['none', 'depressed', 'flat', 'elevated', 'floating'],
    },
    radius: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Surface>;

export const Default: Story = {
  args: {
    background: 'primary',
    elevation: 'elevated',
    radius: 'lg',
    style: { padding: 24, width: 300 },
    children: 'A simple elevated surface',
  },
};

export const Elevations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24 }}>
      {(['flat', 'elevated', 'floating'] as const).map(elevation => (
        <Surface
          key={elevation}
          background="primary"
          elevation={elevation}
          radius="lg"
          style={{ padding: 24, width: 160, textAlign: 'center' }}
        >
          {elevation}
        </Surface>
      ))}
    </div>
  ),
};

export const Intents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24 }}>
      {(['brand', 'positive', 'negative', 'warning', 'caution', 'ai', 'neutral'] as const).map(
        intent => (
          <Surface
            key={intent}
            intent={intent}
            contrast="faint"
            radius="md"
            style={{ padding: 16 }}
          >
            {intent} (faint)
          </Surface>
        )
      )}
    </div>
  ),
};

export const IntentContrasts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24 }}>
      {(['faint', 'medium', 'bold', 'strong'] as const).map(contrast => (
        <Surface
          key={contrast}
          intent="brand"
          contrast={contrast}
          radius="md"
          style={{ padding: 16 }}
        >
          brand / {contrast}
        </Surface>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 24 }}>
      <Surface
        background="primary"
        elevation="elevated"
        radius="lg"
        interactive
        style={{ padding: 24, width: 200, textAlign: 'center' }}
        onClick={() => alert('Clicked!')}
      >
        Hover & click me
      </Surface>
      <Surface
        background="primary"
        elevation="elevated"
        radius="lg"
        interactive
        selected
        style={{ padding: 24, width: 200, textAlign: 'center' }}
      >
        Selected
      </Surface>
      <Surface
        background="primary"
        elevation="elevated"
        radius="lg"
        disabled
        style={{ padding: 24, width: 200, textAlign: 'center' }}
      >
        Disabled
      </Surface>
    </div>
  ),
};

export const EdgeDividers: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, padding: 24, width: 300 }}>
      <Surface edge="bottom" style={{ padding: 16 }}>
        Section 1 (bottom edge)
      </Surface>
      <Surface edge="bottom" style={{ padding: 16 }}>
        Section 2 (bottom edge)
      </Surface>
      <Surface style={{ padding: 16 }}>Section 3 (no edge)</Surface>
    </div>
  ),
};
