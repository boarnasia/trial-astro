import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import MovingLights02 from './MovingLights02';

const wrapperStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '600px',
  background: '#fff',
};

const meta: Meta<typeof MovingLights02> = {
  title: 'BackgroundImage/MovingLights02',
  component: MovingLights02,
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
type Story = StoryObj<typeof MovingLights02>;

export const Default: Story = {};
