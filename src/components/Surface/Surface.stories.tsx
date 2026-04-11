import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Surface } from './Surface';
import type { SurfaceIntent, SurfaceContrast, SurfaceElevation } from './Surface';

const INTENTS: SurfaceIntent[]   = ['brand', 'positive', 'negative', 'warning', 'caution', 'ai', 'neutral'];
const CONTRASTS: SurfaceContrast[] = ['faint', 'medium', 'bold', 'strong'];
const ELEVATIONS: SurfaceElevation[] = ['none', 'depressed', 'depressed-md', 'flat', 'elevated', 'floating'];

const meta: Meta<typeof Surface> = {
  title: 'Primitives (Reviewed)/Surface',
  component: Surface,
  args: {
    background: 'primary',
    elevation: 'elevated',
    radius: 'lg',
    children: 'Surface content',
  },
  argTypes: {
    background: { control: 'select', options: ['primary', 'secondary', 'transparent', 'translucent'] },
    intent:     { control: 'select', options: INTENTS },
    contrast:   { control: 'select', options: CONTRASTS },
    elevation:  { control: 'select', options: [...ELEVATIONS, 'overlayTop', 'overlayRight', 'overlayBottom', 'overlayLeft'] },
    radius:     { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] },
    interactive:{ control: 'boolean' },
    selected:   { control: 'boolean' },
    inactive:   { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Surface>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const monoLabel = (text: string, minWidth = 80) => (
  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--color-foreground-tertiary)', minWidth, flexShrink: 0 }}>
    {text}
  </span>
);

const divider = <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-tertiary)', margin: '16px 0' }} />;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    style: { padding: 24, minWidth: 240, minHeight: 100 },
  },
};

export const Elevations: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    /* Secondary background provides the contrast needed to see depressed vs elevated */
    <div style={{ background: 'var(--color-background-secondary)', padding: 40, borderRadius: 16, display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {ELEVATIONS.map(elevation => (
        <Surface
          key={elevation}
          background="primary"
          elevation={elevation}
          radius="lg"
          style={{ padding: '20px 24px', minWidth: 130, textAlign: 'center', fontSize: 11, fontFamily: 'monospace' }}
        >
          {elevation}
        </Surface>
      ))}
    </div>
  ),
};

export const PanelOverlays: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      {(['overlayTop', 'overlayBottom', 'overlayLeft', 'overlayRight'] as const).map(elevation => {
        const isTop    = elevation === 'overlayTop';
        const isBottom = elevation === 'overlayBottom';
        const isLeft   = elevation === 'overlayLeft';
        return (
          <div key={elevation} style={{ position: 'relative', height: 120, overflow: 'hidden', borderRadius: 10, background: 'var(--color-background-secondary)' }}>
            <Surface
              background="primary"
              elevation={elevation}
              style={{
                position: 'absolute',
                textAlign: 'center',
                fontSize: 11,
                fontFamily: 'monospace',
                ...(isTop    ? { top: 0, left: 0, right: 0, padding: 16 } : {}),
                ...(isBottom ? { bottom: 0, left: 0, right: 0, padding: 16 } : {}),
                ...(isLeft   ? { top: 0, bottom: 0, left: 0, width: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}),
                ...(!isTop && !isBottom && !isLeft ? { top: 0, bottom: 0, right: 0, width: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}),
              }}
            >
              {elevation}
            </Surface>
          </div>
        );
      })}
    </div>
  ),
};

export const IntentMatrix: Story = {
  name: 'Intent × Contrast',
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 4, marginLeft: 88 }}>
        {CONTRASTS.map(c => (
          <span key={c} style={{ minWidth: 140, textAlign: 'center', fontSize: 10, fontFamily: 'monospace', color: 'var(--color-foreground-tertiary)' }}>{c}</span>
        ))}
      </div>
      {INTENTS.map(intent => (
        <div key={intent} style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
          {monoLabel(intent, 88)}
          {CONTRASTS.map(contrast => (
            <Surface
              key={contrast}
              intent={intent}
              contrast={contrast}
              radius="md"
              style={{ minWidth: 140, padding: '10px 16px', fontSize: 11, fontFamily: 'monospace', textAlign: 'center' }}
            >
              {intent} / {contrast}
            </Surface>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Backgrounds: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {(['primary', 'secondary', 'translucent', 'transparent'] as const).map(bg => (
        <div key={bg} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
          <Surface
            background={bg}
            elevation="flat"
            radius="lg"
            style={{ width: 140, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: 'monospace' }}
          >
            {bg}
          </Surface>
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {([
        { label: 'default',            props: {} },
        { label: 'interactive',        props: { interactive: true } },
        { label: 'selected',           props: { interactive: true, selected: true } },
        { label: 'inactive',           props: { inactive: true } },
        { label: 'as="button"',        props: { interactive: true, as: 'button' as const } },
      ]).map(({ label, props }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
          <Surface
            background="primary"
            elevation="elevated"
            radius="lg"
            style={{ width: 160, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: 'monospace', cursor: props.interactive ? 'pointer' : 'default' }}
            {...props}
          >
            {label}
          </Surface>
        </div>
      ))}
    </div>
  ),
};

export const EdgeDividers: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
      {/* Single edge variants */}
      <div style={{ display: 'flex', gap: 16 }}>
        {(['top', 'right', 'bottom', 'left'] as const).map(edge => (
          <div key={edge} style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
            {monoLabel(edge)}
            <Surface
              edge={edge}
              style={{ width: 80, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: 'monospace' }}
            >
              {edge}
            </Surface>
          </div>
        ))}
      </div>
      {divider}
      {/* Stacked sections pattern */}
      <div>
        {monoLabel('stacked sections')}
        <div style={{ width: 200, marginTop: 8 }}>
          <Surface edge="bottom" style={{ padding: '12px 16px', fontSize: 12 }}>Section 1</Surface>
          <Surface edge="bottom" style={{ padding: '12px 16px', fontSize: 12 }}>Section 2</Surface>
          <Surface style={{ padding: '12px 16px', fontSize: 12 }}>Section 3</Surface>
        </div>
      </div>
    </div>
  ),
};
