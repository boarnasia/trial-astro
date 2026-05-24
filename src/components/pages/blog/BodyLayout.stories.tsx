import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyLayout } from './BodyLayout';

const meta: Meta<typeof BodyLayout> = {
  title: 'Pages/Blog/BodyLayout',
  component: BodyLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof BodyLayout>;

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
