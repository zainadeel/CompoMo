import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './Menu';
import { Button } from '../Button';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 48 }}>
        <Button ref={ref} variant="secondary" label="Open Menu" onClick={() => setOpen(true)} />
        <Menu
          isOpen={open}
          onClose={() => setOpen(false)}
          anchorRef={ref as React.RefObject<HTMLElement>}
          items={[
            { label: 'Edit', onClick: () => setOpen(false) },
            { label: 'Duplicate', onClick: () => setOpen(false) },
            { label: 'Archive', onClick: () => setOpen(false) },
          ]}
        />
      </div>
    );
  },
};

export const WithSections: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 48 }}>
        <Button ref={ref} variant="secondary" label="Actions" onClick={() => setOpen(true)} />
        <Menu
          isOpen={open}
          onClose={() => setOpen(false)}
          anchorRef={ref as React.RefObject<HTMLElement>}
          sections={[
            {
              header: 'File',
              items: [
                { label: 'New', onClick: () => setOpen(false) },
                { label: 'Open', onClick: () => setOpen(false) },
                { label: 'Save', onClick: () => setOpen(false) },
              ],
            },
            {
              header: 'Edit',
              items: [
                { label: 'Undo', onClick: () => setOpen(false) },
                { label: 'Redo', onClick: () => setOpen(false) },
              ],
            },
          ]}
        />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('medium');
    const ref = useRef<HTMLButtonElement>(null);
    return (
      <div style={{ padding: 48 }}>
        <Button ref={ref} variant="secondary" label={`Size: ${selected}`} onClick={() => setOpen(true)} />
        <Menu
          isOpen={open}
          onClose={() => setOpen(false)}
          anchorRef={ref as React.RefObject<HTMLElement>}
          items={['small', 'medium', 'large'].map(size => ({
            label: size.charAt(0).toUpperCase() + size.slice(1),
            onClick: () => { setSelected(size); setOpen(false); },
            isSelected: selected === size,
            selectionStyle: 'radio' as const,
          }))}
        />
      </div>
    );
  },
};

export const Positioning: Story = {
  render: () => {
    const [openSide, setOpenSide] = useState<string | null>(null);
    const refs = {
      top: useRef<HTMLButtonElement>(null),
      right: useRef<HTMLButtonElement>(null),
      bottom: useRef<HTMLButtonElement>(null),
      left: useRef<HTMLButtonElement>(null),
    };
    const items = [
      { label: 'Item 1', onClick: () => setOpenSide(null) },
      { label: 'Item 2', onClick: () => setOpenSide(null) },
    ];
    return (
      <div style={{ display: 'flex', gap: 16, padding: 100, justifyContent: 'center' }}>
        {(['top', 'right', 'bottom', 'left'] as const).map(side => (
          <div key={side}>
            <Button
              ref={refs[side]}
              variant="secondary"
              label={side}
              onClick={() => setOpenSide(side)}
            />
            <Menu
              isOpen={openSide === side}
              onClose={() => setOpenSide(null)}
              anchorRef={refs[side] as React.RefObject<HTMLElement>}
              side={side}
              items={items}
            />
          </div>
        ))}
      </div>
    );
  },
};
