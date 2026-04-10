import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const NoContent: Story = {
  args: {
    type: 'no-content',
  },
};

export const NoResults: Story = {
  args: {
    type: 'no-results',
  },
};

export const NoResultsFilter: Story = {
  args: {
    type: 'no-results-filter',
  },
};

export const NoAccess: Story = {
  args: {
    type: 'no-access',
  },
};

export const CustomMessage: Story = {
  args: {
    type: 'no-content',
    message: 'Create your first project to get started.',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 24 }}>
      {(['no-content', 'no-results', 'no-results-filter', 'no-access'] as const).map(type => (
        <div key={type} style={{ border: '1px solid var(--color-border-tertiary)', borderRadius: 8, padding: 24 }}>
          <EmptyState type={type} />
        </div>
      ))}
    </div>
  ),
};
