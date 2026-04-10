import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Banner } from './Banner';
import { Button } from '../Button';

const meta: Meta<typeof Banner> = {
  title: 'Components/Banner',
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Intents: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24 }}>
      {(['brand', 'positive', 'negative', 'warning', 'caution', 'ai', 'neutral'] as const).map(intent => (
        <Banner key={intent} intent={intent} contrast="faint" message={`This is a ${intent} banner.`} />
      ))}
    </div>
  ),
};

export const Contrasts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24 }}>
      {(['faint', 'medium', 'bold', 'strong'] as const).map(contrast => (
        <Banner key={contrast} intent="brand" contrast={contrast} message={`Brand banner — ${contrast} contrast`} />
      ))}
    </div>
  ),
};

export const WithHeader: Story = {
  args: {
    intent: 'positive',
    contrast: 'faint',
    message: 'Your changes have been saved successfully.',
    header: true,
  },
};

export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <div style={{ padding: 24 }}>
        {visible ? (
          <Banner
            intent="warning"
            contrast="faint"
            message="This banner can be dismissed."
            onDismiss={() => setVisible(false)}
          />
        ) : (
          <Button variant="secondary" label="Show Banner" onClick={() => setVisible(true)} />
        )}
      </div>
    );
  },
};

export const FloatingToast: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button variant="primary" label="Show Toast" onClick={() => setShow(true)} />
        {show && (
          <Banner
            intent="positive"
            contrast="faint"
            message="Operation completed!"
            floating
            onDismiss={() => setShow(false)}
          />
        )}
      </div>
    );
  },
};
