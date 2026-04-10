import type { Meta, StoryObj } from '@storybook/react-vite';
import { Surface } from './Surface';

const meta: Meta<typeof Surface> = {
  title: 'Primitives/Surface',
  component: Surface,
  argTypes: {
    background: {
      control: 'select',
      options: ['primary', 'secondary', 'transparent', 'translucent'],
    },
    intent: {
      control: 'select',
      options: ['brand', 'positive', 'negative', 'warning', 'caution', 'ai', 'neutral', 'walkthrough', 'guide'],
    },
    contrast: {
      control: 'select',
      options: ['faint', 'medium', 'bold', 'strong'],
    },
    elevation: {
      control: 'select',
      options: ['none', 'depressed', 'depressed-md', 'flat', 'elevated', 'floating', 'overlayTop', 'overlayRight', 'overlayBottom', 'overlayLeft'],
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
    <div style={{ display: 'flex', gap: 24, padding: 24, flexWrap: 'wrap' }}>
      {(['none', 'depressed', 'depressed-md', 'flat', 'elevated', 'floating'] as const).map(elevation => (
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

export const PanelOverlays: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, padding: 24 }}>
      <div style={{ position: 'relative', height: 120, overflow: 'hidden', borderRadius: 8, background: 'var(--color-background-secondary)' }}>
        <Surface
          background="primary"
          elevation="overlayTop"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: 16, textAlign: 'center' }}
        >
          overlayTop
        </Surface>
      </div>
      <div style={{ position: 'relative', height: 120, overflow: 'hidden', borderRadius: 8, background: 'var(--color-background-secondary)' }}>
        <Surface
          background="primary"
          elevation="overlayBottom"
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, textAlign: 'center' }}
        >
          overlayBottom
        </Surface>
      </div>
      <div style={{ position: 'relative', height: 120, overflow: 'hidden', borderRadius: 8, background: 'var(--color-background-secondary)' }}>
        <Surface
          background="primary"
          elevation="overlayLeft"
          style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 140, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          overlayLeft
        </Surface>
      </div>
      <div style={{ position: 'relative', height: 120, overflow: 'hidden', borderRadius: 8, background: 'var(--color-background-secondary)' }}>
        <Surface
          background="primary"
          elevation="overlayRight"
          style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 140, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          overlayRight
        </Surface>
      </div>
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
        inactive
        style={{ padding: 24, width: 200, textAlign: 'center' }}
      >
        Inactive
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
