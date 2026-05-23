import type { Meta, StoryObj } from '@storybook/react-vite';
import { LayoutHero } from './LayoutHero';

const meta: Meta<typeof LayoutHero> = {
  title: 'Layouts/Blog/LayoutHero',
  component: LayoutHero,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LayoutHero>;

const Placeholder = () => (
  <div style={{ background: '#fde68a', padding: '2em', textAlign: 'center' }}>
    Hero Area
  </div>
);

export const Default: Story = {
  args: {
    children: <Placeholder />,
  },
};
