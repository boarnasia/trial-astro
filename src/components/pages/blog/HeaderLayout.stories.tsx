import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderLayout } from './HeaderLayout';

const meta: Meta<typeof HeaderLayout> = {
  title: 'Pages/Blog/HeaderLayout',
  component: HeaderLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HeaderLayout>;

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
