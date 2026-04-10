import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  argTypes: {
    style: {
      control: 'select',
      options: [
        'text-display-medium',
        'text-display-small',
        'text-title-large',
        'text-title-medium',
        'text-title-small',
        'text-body-large',
        'text-body-large-emphasis',
        'text-body-medium',
        'text-body-medium-emphasis',
        'text-body-small',
        'text-body-small-emphasis',
        'text-caption',
        'text-caption-emphasis',
      ],
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'brand',
        'negative',
        'positive',
        'warning',
        'caution',
        'ai',
        'on-strong',
        'on-bold',
        'inherit',
      ],
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'label', 'h1', 'h2', 'h3'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    style: 'text-body-medium',
    children: 'Hello, CompoMo!',
  },
};

export const AllStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text style="text-display-medium">Display Medium</Text>
      <Text style="text-display-small">Display Small</Text>
      <Text style="text-title-large">Title Large</Text>
      <Text style="text-title-medium">Title Medium</Text>
      <Text style="text-title-small">Title Small</Text>
      <Text style="text-body-large">Body Large</Text>
      <Text style="text-body-large-emphasis">Body Large Emphasis</Text>
      <Text style="text-body-medium">Body Medium</Text>
      <Text style="text-body-medium-emphasis">Body Medium Emphasis</Text>
      <Text style="text-body-small">Body Small</Text>
      <Text style="text-body-small-emphasis">Body Small Emphasis</Text>
      <Text style="text-caption">Caption</Text>
      <Text style="text-caption-emphasis">Caption Emphasis</Text>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text style="text-body-medium" color="primary">Primary</Text>
      <Text style="text-body-medium" color="secondary">Secondary</Text>
      <Text style="text-body-medium" color="tertiary">Tertiary</Text>
      <Text style="text-body-medium" color="brand">Brand</Text>
      <Text style="text-body-medium" color="positive">Positive</Text>
      <Text style="text-body-medium" color="negative">Negative</Text>
      <Text style="text-body-medium" color="warning">Warning</Text>
      <Text style="text-body-medium" color="caution">Caution</Text>
      <Text style="text-body-medium" color="ai">AI</Text>
    </div>
  ),
};

export const Truncation: Story = {
  render: () => (
    <div style={{ maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text style="text-body-medium" lineTruncation={1}>
        This is a long text that will be truncated after one line with an ellipsis at the end.
      </Text>
      <Text style="text-body-medium" lineTruncation={2}>
        This is a long text that will be truncated after two lines. It keeps going and going to demonstrate the multi-line truncation feature.
      </Text>
      <Text style="text-body-medium" lineTruncation="none">
        This text will never be truncated. It wraps naturally across as many lines as needed.
      </Text>
    </div>
  ),
};

export const Decorations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Text style="text-body-medium" decoration="underline">Underline</Text>
      <Text style="text-body-medium" decoration="dotted-underline">Dotted Underline</Text>
      <Text style="text-body-medium" italic>Italic</Text>
    </div>
  ),
};
