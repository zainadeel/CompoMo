import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
      <Tooltip label="This is a tooltip">
        <Button variant="secondary" label="Hover me" />
      </Tooltip>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div style={{ padding: 100, display: 'flex', gap: 24, justifyContent: 'center' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map(side => (
        <Tooltip key={side} label={`Tooltip on ${side}`} side={side}>
          <Button variant="secondary" label={side} />
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithShortcut: Story = {
  render: () => (
    <div style={{ padding: 80, display: 'flex', gap: 24, justifyContent: 'center' }}>
      <Tooltip label="Save" shortcutKey="S">
        <Button variant="secondary" label="Save" />
      </Tooltip>
      <Tooltip label="Undo" shortcutKey="Z" shortcutKeyPosition="start">
        <Button variant="secondary" label="Undo" />
      </Tooltip>
    </div>
  ),
};
