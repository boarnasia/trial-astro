import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    currentPath: {
      control: 'select',
      options: ['/', '/blog', '/about'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Home: Story = {
  args: {
    currentPath: '/',
  },
};

export const Blog: Story = {
  args: {
    currentPath: '/blog',
  },
};

export const About: Story = {
  args: {
    currentPath: '/about',
  },
};
