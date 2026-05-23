import type { Meta, StoryObj } from '@storybook/react-vite';
import { LayoutHeader } from './LayoutHeader';

const meta: Meta<typeof LayoutHeader> = {
  title: 'Layouts/Blog/LayoutHeader',
  component: LayoutHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LayoutHeader>;

const Placeholder = () => (
  <div style={{ background: '#bfdbfe', padding: '1.5em', textAlign: 'center' }}>
    Header Area
  </div>
);

export const Default: Story = {
  args: {
    children: <Placeholder />,
  },
};
