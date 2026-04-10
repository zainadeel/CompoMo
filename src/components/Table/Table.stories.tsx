import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const sampleData: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Active' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 4, name: 'Dan Brown', email: 'dan@example.com', role: 'Editor', status: 'Active' },
  { id: 5, name: 'Eva Green', email: 'eva@example.com', role: 'Admin', status: 'Active' },
  { id: 6, name: 'Frank Lee', email: 'frank@example.com', role: 'Viewer', status: 'Inactive' },
  { id: 7, name: 'Grace Kim', email: 'grace@example.com', role: 'Editor', status: 'Active' },
  { id: 8, name: 'Hank Miller', email: 'hank@example.com', role: 'Viewer', status: 'Active' },
];

const columns = [
  { id: 'name', header: 'Name', accessorKey: 'name', sortable: true },
  { id: 'email', header: 'Email', accessorKey: 'email' },
  { id: 'role', header: 'Role', accessorKey: 'role', sortable: true },
  { id: 'status', header: 'Status', accessorKey: 'status' },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Table columns={columns} data={sampleData} />
    </div>
  ),
};

export const WithSorting: Story = {
  render: () => {
    const [sortState, setSortState] = useState<{ columnId: string; direction: 'asc' | 'desc' }>({ columnId: 'name', direction: 'asc' });
    return (
      <div style={{ padding: 24 }}>
        <Table
          columns={columns}
          data={sampleData}
          sortState={sortState}
          onSort={(columnId) => {
            setSortState(prev =>
              prev.columnId === columnId
                ? { columnId, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
                : { columnId, direction: 'asc' }
            );
          }}
        />
      </div>
    );
  },
};

export const WithPagination: Story = {
  render: () => {
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 3 });
    return (
      <div style={{ padding: 24 }}>
        <Table
          columns={columns}
          data={sampleData}
          pagination={pagination}
          onPaginationChange={(pageIndex, pageSize) => setPagination({ pageIndex, pageSize })}
        />
      </div>
    );
  },
};

export const ClickableRows: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Table
        columns={columns}
        data={sampleData.slice(0, 4)}
        onRowClick={(row) => alert(`Clicked: ${(row as User).name}`)}
      />
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Table columns={columns} data={[]} loading />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <Table columns={columns} data={[]} emptyMessage="No users found." />
    </div>
  ),
};
