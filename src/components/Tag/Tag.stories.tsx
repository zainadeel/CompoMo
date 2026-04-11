import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Tag } from './Tag';
import type { TagIntent, TagContrast, TagVariant, TagSize } from './Tag';
import type { IconComponent } from '@/types/icons';

const PlaceholderIcon: IconComponent = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
    <circle cx="10" cy="10" r="6" />
  </svg>
);

const meta: Meta<typeof Tag> = {
  title: 'Primitives/Tag',
  component: Tag,
  args: {
    label: 'Tag',
    intent: 'neutral',
    contrast: 'faint',
    variant: 'filled',
    size: 'md',
    rounded: false,
    disabled: false,
  },
  argTypes: {
    intent:   { control: 'select', options: ['neutral', 'brand', 'ai', 'negative', 'warning', 'caution', 'positive'] },
    contrast: { control: 'select', options: ['strong', 'bold', 'medium', 'faint'] },
    variant:  { control: 'select', options: ['filled', 'outline'] },
    size:     { control: 'select', options: ['md', 'sm', 'xs'] },
    label:    { control: 'text' },
    rounded:  { control: 'boolean' },
    removable:{ control: 'boolean' },
    disabled: { control: 'boolean' },
    elevation:{ control: 'select', options: [false, true, 'floating'] },
    icon: {
      control: 'boolean',
      mapping: { true: PlaceholderIcon, false: undefined },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Playground: Story = {};

// ─── Matrix helpers ───────────────────────────────────────────────────────────

const INTENTS: TagIntent[]   = ['neutral', 'brand', 'ai', 'negative', 'warning', 'caution', 'positive'];
const CONTRASTS: TagContrast[] = ['strong', 'bold', 'medium', 'faint'];
const VARIANTS: TagVariant[] = ['filled', 'outline'];
const SIZES: TagSize[]       = ['md', 'sm', 'xs'];

const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' };
const row: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' };
const lbl = (): React.CSSProperties => ({ fontSize: 10, fontFamily: 'monospace', color: '#888', minWidth: 72, flexShrink: 0 });
const section = (text: string) => (
  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#555', marginTop: 8 }}>
    {text}
  </div>
);
const divider = <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '16px 0' }} />;

export const Matrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, fontFamily: 'sans-serif' }}>

      {/* ── Intents × Contrasts ── */}
      {section('Intents × Contrasts — filled')}
      <div style={{ ...col, marginTop: 12 }}>
        <div style={row}>
          <span style={lbl()}></span>
          {CONTRASTS.map(c => <span key={c} style={{ ...lbl(), minWidth: 90 }}>{c}</span>)}
        </div>
        {INTENTS.map(intent => (
          <div key={intent} style={row}>
            <span style={lbl()}>{intent}</span>
            {CONTRASTS.map(contrast => (
              <Tag key={contrast} label={intent} intent={intent} contrast={contrast} />
            ))}
          </div>
        ))}
      </div>

      {divider}

      {/* ── Intents × Contrasts — outline ── */}
      {section('Intents × Contrasts — outline')}
      <div style={{ ...col, marginTop: 12 }}>
        {INTENTS.map(intent => (
          <div key={intent} style={row}>
            <span style={lbl()}>{intent}</span>
            {CONTRASTS.map(contrast => (
              <Tag key={contrast} label={intent} intent={intent} contrast={contrast} variant="outline" />
            ))}
          </div>
        ))}
      </div>

      {divider}

      {/* ── Sizes ── */}
      {section('Sizes')}
      <div style={{ ...col, marginTop: 12 }}>
        {SIZES.map(size => (
          <div key={size} style={row}>
            <span style={lbl()}>{size}</span>
            <Tag label="Label" size={size} intent="brand" />
            <Tag label="Label" size={size} intent="brand" icon={PlaceholderIcon} />
            <Tag label="Label" size={size} intent="brand" removable onRemove={() => {}} />
            <Tag label="Label" size={size} intent="brand" icon={PlaceholderIcon} removable onRemove={() => {}} />
          </div>
        ))}
      </div>

      {divider}

      {/* ── Icon + Removable ── */}
      {section('Icon + Removable combos')}
      <div style={{ ...col, marginTop: 12 }}>
        {([
          { combo: 'label only',        icon: false, removable: false },
          { combo: 'icon + label',      icon: true,  removable: false },
          { combo: 'removable',         icon: false, removable: true  },
          { combo: 'icon + removable',  icon: true,  removable: true  },
        ] as const).map(({ combo, icon, removable }) => (
          <div key={combo} style={row}>
            <span style={lbl()}>{combo}</span>
            {VARIANTS.map(v => (
              <Tag
                key={v}
                label="Label"
                variant={v}
                intent="brand"
                icon={icon ? PlaceholderIcon : undefined}
                removable={removable}
                onRemove={removable ? () => {} : undefined}
              />
            ))}
          </div>
        ))}
      </div>

      {divider}

      {/* ── States ── */}
      {section('States')}
      <div style={{ ...col, marginTop: 12 }}>
        {([
          { label: 'default',   props: {} },
          { label: 'rounded',   props: { rounded: true } },
          { label: 'disabled',  props: { disabled: true } },
          { label: 'elevation', props: { elevation: true as const } },
          { label: 'floating',  props: { elevation: 'floating' as const } },
          { label: 'pressed',   props: { pressed: true } },
        ]).map(({ label: stateLabel, props }) => (
          <div key={stateLabel} style={row}>
            <span style={lbl()}>{stateLabel}</span>
            <Tag label="Label" intent="brand" {...(props as object)} />
            <Tag label="Label" intent="brand" variant="outline" {...(props as object)} />
          </div>
        ))}
      </div>

    </div>
  ),
};

// ─── Individual stories ───────────────────────────────────────────────────────

export const Intents: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {INTENTS.map(intent => <Tag key={intent} label={intent} intent={intent} />)}
    </div>
  ),
};

export const Contrasts: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag label="Strong" contrast="strong" intent="brand" />
      <Tag label="Bold"   contrast="bold"   intent="brand" />
      <Tag label="Medium" contrast="medium" intent="brand" />
      <Tag label="Faint"  contrast="faint"  intent="brand" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag label="Medium"      size="md" intent="brand" />
      <Tag label="Small"       size="sm" intent="brand" />
      <Tag label="Extra Small" size="xs" intent="brand" />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {INTENTS.map(intent => <Tag key={intent} label={intent} intent={intent} icon={PlaceholderIcon} />)}
    </div>
  ),
};

export const Removable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag label="Remove me" intent="brand"    removable onRemove={() => {}} />
      <Tag label="Remove me" intent="negative" removable onRemove={() => {}} size="sm" />
      <Tag label="Remove me" intent="positive" removable onRemove={() => {}} size="xs" />
      <Tag label="With icon" intent="brand"    removable onRemove={() => {}} icon={PlaceholderIcon} />
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      {INTENTS.map(intent => <Tag key={intent} label={intent} intent={intent} variant="outline" />)}
    </div>
  ),
};

export const Elevation: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Tag label="No elevation"  intent="brand" />
      <Tag label="Elevated"      intent="brand" elevation />
      <Tag label="Floating"      intent="brand" elevation="floating" />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false);
    const [filters, setFilters] = useState<Record<string, boolean>>({
      positive: false, negative: false, warning: false, brand: false, ai: false,
    });
    const toggle = (key: string) => setFilters(f => ({ ...f, [key]: !f[key] }));

    return (
      <div style={{ ...col, gap: 16 }}>
        <div>
          <div style={{ ...lbl(), marginBottom: 8 }}>Single toggle</div>
          <Tag
            label={pressed ? 'Selected' : 'Click me'}
            intent="brand"
            pressed={pressed}
            onPressedChange={setPressed}
          />
        </div>
        <div>
          <div style={{ ...lbl(), marginBottom: 8 }}>Filter chips</div>
          <div style={row}>
            {(Object.keys(filters) as TagIntent[]).map(intent => (
              <Tag
                key={intent}
                label={intent}
                intent={intent}
                pressed={filters[intent]}
                onPressedChange={() => toggle(intent)}
              />
            ))}
          </div>
        </div>
        <div>
          <div style={{ ...lbl(), marginBottom: 8 }}>Click only (no toggle)</div>
          <Tag label="Click me" intent="neutral" onClick={() => alert('clicked')} />
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Tag label="Disabled"           intent="brand" disabled />
      <Tag label="Disabled removable" intent="brand" disabled removable onRemove={() => {}} />
      <Tag label="Disabled outline"   intent="brand" disabled variant="outline" />
    </div>
  ),
};
