import type { Meta, StoryObj } from '@storybook/react-vite';
import HeroBlock from './HeroBlock';

const meta: Meta<typeof HeroBlock> = {
  title: 'Components/HeroBlock',
  component: HeroBlock,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof HeroBlock>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/1020/510',
    alt: '',
    width: 1020,
    height: 510,
  },
};
