import type { Meta, StoryObj } from '@storybook/react-vite';
import { LayoutBody } from './LayoutBody';

const meta: Meta<typeof LayoutBody> = {
  title: 'Layouts/Blog/LayoutBody',
  component: LayoutBody,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LayoutBody>;

const Placeholder = () => (
  <div style={{ background: '#d1fae5', padding: '2em', textAlign: 'center' }}>
    Body Area
  </div>
);

export const Default: Story = {
  args: {
    children: <Placeholder />,
  },
};
