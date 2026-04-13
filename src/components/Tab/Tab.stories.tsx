import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab } from './Tab';
import type { TabBackground } from './Tab';
import { Surface } from '@/components/Surface';

const meta: Meta<typeof Tab> = {
  title: 'Primitives/Tab',
  component: Tab,
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('overview');
    const tabs = ['Overview', 'Activity', 'Settings', 'Members'];
    return (
      <div style={{ display: 'flex', gap: 0, padding: 24 }}>
        {tabs.map(tab => (
          <Tab
            key={tab}
            label={tab}
            isSelected={selected === tab.toLowerCase()}
            onClick={() => setSelected(tab.toLowerCase())}
          />
        ))}
      </div>
    );
  },
};

export const SingleTab: Story = {
  args: {
    label: 'Selected Tab',
    isSelected: true,
  },
};

export const UnselectedTab: Story = {
  args: {
    label: 'Unselected Tab',
    isSelected: false,
  },
};

// ─── Background Context ──────────────────────────────────────────────────────

const BG_CONTEXTS: { bg: TabBackground; contrast: 'faint' | 'medium' | 'bold' | 'strong' }[] = [
  { bg: 'faint',  contrast: 'faint'  },
  { bg: 'medium', contrast: 'medium' },
  { bg: 'bold',   contrast: 'bold'   },
  { bg: 'strong', contrast: 'strong' },
];

export const BackgroundContext: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const [selected, setSelected] = useState<Record<string, string>>({
      faint: 'overview', medium: 'overview', bold: 'overview', strong: 'overview', dark: 'overview',
    });
    const tabs = ['Overview', 'Activity', 'Settings'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {BG_CONTEXTS.map(({ bg, contrast }) => (
          <Surface key={bg} intent="brand" contrast={contrast} radius="md" style={{ padding: 16 }}>
            <span style={{ fontSize: 10, fontFamily: 'monospace', opacity: 0.7, display: 'block', marginBottom: 8 }}>
              background="{bg}"
            </span>
            <div style={{ display: 'flex', gap: 0 }}>
              {tabs.map(tab => (
                <Tab
                  key={tab}
                  label={tab}
                  background={bg}
                  isSelected={selected[bg] === tab.toLowerCase()}
                  onClick={() => setSelected(s => ({ ...s, [bg]: tab.toLowerCase() }))}
                />
              ))}
            </div>
          </Surface>
        ))}
        <div style={{ background: '#1a1a2e', borderRadius: 8, padding: 16 }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 8 }}>
            background="always-dark"
          </span>
          <div style={{ display: 'flex', gap: 0 }}>
            {tabs.map(tab => (
              <Tab
                key={tab}
                label={tab}
                background="always-dark"
                isSelected={selected.dark === tab.toLowerCase()}
                onClick={() => setSelected(s => ({ ...s, dark: tab.toLowerCase() }))}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
};
