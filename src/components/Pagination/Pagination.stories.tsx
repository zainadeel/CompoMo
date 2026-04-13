import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Phoenix Gap/Pagination',
  component: Pagination,
  args: {
    inactive: false,
    siblingCount: 1,
  },
  argTypes: {
    inactive: { control: 'boolean' },
    siblingCount: { control: { type: 'number', min: 0, max: 3 } },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const Controlled = (props: Partial<React.ComponentProps<typeof Pagination>> & { totalPages?: number }) => {
  const total = props.totalPages ?? 10;
  const [page, setPage] = useState(1);
  return <Pagination page={page} totalPages={total} onPageChange={setPage} {...props} />;
};

export const Playground: Story = {
  render: args => <Controlled totalPages={20} {...args} />,
};

export const Default: Story = {
  render: () => <Controlled totalPages={10} />,
};

export const ManyPages: Story = {
  render: () => <Controlled totalPages={100} />,
};

export const FewPages: Story = {
  render: () => <Controlled totalPages={3} />,
};

export const SinglePage: Story = {
  render: () => <Controlled totalPages={1} />,
};

export const Inactive: Story = {
  render: () => (
    <Pagination page={5} totalPages={20} onPageChange={() => {}} inactive />
  ),
};
