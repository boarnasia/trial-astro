import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { SimpleWave01 } from './SimpleWave01';

const wrapperStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '600px',
  background: 'linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%)',
};

const meta: Meta<typeof SimpleWave01> = {
  title: 'BackgroundImage/SimpleWave01',
  component: SimpleWave01,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={wrapperStyle}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SimpleWave01>;

export const Default: Story = {};
