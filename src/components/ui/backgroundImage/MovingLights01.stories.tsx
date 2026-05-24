import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { MovingLights01 } from './MovingLights01';

const wrapperStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '600px',
  background: '#000',
};

const meta: Meta<typeof MovingLights01> = {
  title: 'BackgroundImage/MovingLights01',
  component: MovingLights01,
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
type Story = StoryObj<typeof MovingLights01>;

export const Default: Story = {};
