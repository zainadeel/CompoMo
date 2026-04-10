import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" label="Open Modal" onClick={() => setOpen(true)} />
        <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm Action">
          <p>Are you sure you want to proceed? This action cannot be undone.</p>
        </Modal>
      </>
    );
  },
};

export const WithSubtitleAndFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" label="Open Modal" onClick={() => setOpen(true)} />
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Edit Profile"
          subtitle="Update your personal information"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button variant="secondary" label="Cancel" onClick={() => setOpen(false)} />
              <Button variant="primary" label="Save Changes" onClick={() => setOpen(false)} />
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p>Form content would go here.</p>
          </div>
        </Modal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null);
    return (
      <>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" label="Small" onClick={() => setSize('sm')} />
          <Button variant="secondary" label="Medium" onClick={() => setSize('md')} />
          <Button variant="secondary" label="Large" onClick={() => setSize('lg')} />
        </div>
        <Modal isOpen={!!size} onClose={() => setSize(null)} title={`${size} modal`} width={size || 'md'}>
          <p>This is a {size} width modal.</p>
        </Modal>
      </>
    );
  },
};
