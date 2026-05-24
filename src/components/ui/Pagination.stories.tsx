import type { Meta, StoryObj } from '@storybook/react-vite';
import Pagination from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
    },
    lastPage: {
      control: { type: 'number', min: 1 },
    },
    prevUrl: {
      control: 'text',
    },
    nextUrl: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    lastPage: 11,
    prevUrl: undefined,
    nextUrl: '/blog/2/',
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 6,
    lastPage: 11,
    prevUrl: '/blog/5/',
    nextUrl: '/blog/7/',
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 11,
    lastPage: 11,
    prevUrl: '/blog/10/',
    nextUrl: undefined,
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    lastPage: 3,
    prevUrl: '/blog/',
    nextUrl: '/blog/3/',
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    lastPage: 1,
    prevUrl: undefined,
    nextUrl: undefined,
  },
};
