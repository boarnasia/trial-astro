import type { Meta, StoryObj } from '@storybook/react-vite';
import Typography from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['display', 'title', 'lead', 'body', 'muted', 'eyebrow'],
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'],
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Display: Story = {
  args: {
    as: 'h1',
    variant: 'display',
    children: 'Display heading',
  },
};

export const Title: Story = {
  args: {
    as: 'h2',
    variant: 'title',
    children: 'Section title',
  },
};

export const Lead: Story = {
  args: {
    variant: 'lead',
    children:
      'リード文。導入や概要などに使う、本文よりやや大きめのテキストです。',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children:
      '本文テキスト。読みやすさを優先した標準サイズで、段落の中身などに使います。',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    children: '補足や注釈などの控えめなテキスト。',
  },
};

export const Eyebrow: Story = {
  args: {
    as: 'span',
    variant: 'eyebrow',
    children: 'Eyebrow',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ maxWidth: '40rem' }}>
      <Typography as="span" variant="eyebrow">
        Eyebrow
      </Typography>
      <Typography as="h1" variant="display">
        Display heading
      </Typography>
      <Typography as="h2" variant="title">
        Section title
      </Typography>
      <Typography variant="lead">
        リード文。導入や概要などに使う、本文よりやや大きめのテキストです。
      </Typography>
      <Typography variant="body">
        本文テキスト。読みやすさを優先した標準サイズで、段落の中身などに使います。
      </Typography>
      <Typography variant="muted">
        補足や注釈などの控えめなテキスト。
      </Typography>
    </div>
  ),
};
