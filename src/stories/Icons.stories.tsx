import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import * as Icons from '@ds-mo/icons';
import type { IconComponent } from '@ds-mo/icons';

const meta: Meta = {
  title: 'Design System/Icons',
  parameters: { layout: 'fullscreen' },
};

export default meta;

// ── Helpers ──────────────────────────────────────────────────────────────────

const allIcons = Object.entries(Icons).filter(
  ([name, v]) => name !== 'createIcon' && v != null
) as [string, IconComponent][];

const SIZE_OPTIONS = [12, 16, 20, 24, 32] as const;
type Size = typeof SIZE_OPTIONS[number];

// ── Story ─────────────────────────────────────────────────────────────────────

function IconGrid() {
  const [search, setSearch]   = useState('');
  const [size, setSize]       = useState<Size>(20);
  const [copied, setCopied]   = useState<string | null>(null);

  const filtered = allIcons.filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const copy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div style={{ fontFamily: 'var(--font-family-sans, system-ui)', padding: 24 }}>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          type="search"
          placeholder={`Search ${allIcons.length} icons…`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: '1 1 240px',
            minWidth: 200,
            maxWidth: 400,
            height: 36,
            padding: '0 12px',
            border: '1px solid var(--color-border-tertiary, #e0e0e0)',
            borderRadius: 6,
            fontSize: 14,
            outline: 'none',
            background: 'var(--color-background-primary, #fff)',
            color: 'var(--color-foreground-primary, #111)',
          }}
        />
        <div style={{ display: 'flex', gap: 4 }}>
          {SIZE_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                height: 36,
                padding: '0 12px',
                border: '1px solid var(--color-border-tertiary, #e0e0e0)',
                borderRadius: 6,
                fontSize: 13,
                cursor: 'pointer',
                fontWeight: size === s ? 600 : 400,
                background: size === s
                  ? 'var(--color-background-faint-brand, #eff3ff)'
                  : 'var(--color-background-primary, #fff)',
                color: size === s
                  ? 'var(--color-foreground-bold-brand, #3a5ccc)'
                  : 'var(--color-foreground-secondary, #555)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 13, color: 'var(--color-foreground-secondary, #888)', marginLeft: 'auto' }}>
          {filtered.length} {filtered.length === 1 ? 'icon' : 'icons'}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p style={{ color: 'var(--color-foreground-secondary, #888)', fontSize: 14 }}>
          No icons match "{search}"
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: 4,
        }}>
          {filtered.map(([name, Icon]) => (
            <button
              key={name}
              onClick={() => copy(name)}
              title={`Click to copy: ${name}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 8px',
                border: '1px solid transparent',
                borderRadius: 8,
                cursor: 'pointer',
                background: copied === name
                  ? 'var(--color-background-faint-brand, #eff3ff)'
                  : 'transparent',
                color: 'var(--color-foreground-primary, #111)',
                transition: 'background 0.12s',
                textAlign: 'center',
              }}
              onMouseEnter={e => {
                if (copied !== name)
                  (e.currentTarget as HTMLElement).style.background =
                    'var(--color-background-faint-neutral, #f5f5f5)';
              }}
              onMouseLeave={e => {
                if (copied !== name)
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <Icon size={size} />
              <span style={{
                fontSize: 10,
                lineHeight: 1.3,
                color: copied === name
                  ? 'var(--color-foreground-bold-brand, #3a5ccc)'
                  : 'var(--color-foreground-secondary, #888)',
                wordBreak: 'break-word',
                maxWidth: '100%',
              }}>
                {copied === name ? '✓ copied' : name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const AllIcons: StoryObj = {
  name: 'All Icons',
  render: () => <IconGrid />,
};
