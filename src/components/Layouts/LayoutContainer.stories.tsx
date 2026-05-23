import type { Meta, StoryObj } from '@storybook/react-vite';
import LayoutContainer from './LayoutContainer';

const meta: Meta<typeof LayoutContainer> = {
  title: 'Layouts/LayoutContainer',
  component: LayoutContainer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LayoutContainer>;

const SampleContent = () => (
  <div style={{ background: '#eef', padding: '1em' }}>
    <p>
      ここに本文が入ります。LayoutContainer は max-width と padding-inline を
      与えるラッパーです。
    </p>
  </div>
);

export const Md: Story = {
  args: {
    size: 'md',
    children: <SampleContent />,
  },
};

export const Sm: Story = {
  args: {
    size: 'sm',
    children: <SampleContent />,
  },
};
