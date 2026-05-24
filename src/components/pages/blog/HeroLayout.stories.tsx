import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroLayout } from './HeroLayout';

const meta: Meta<typeof HeroLayout> = {
  title: 'Pages/Blog/HeroLayout',
  component: HeroLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HeroLayout>;

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
