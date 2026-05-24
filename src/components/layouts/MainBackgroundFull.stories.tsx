import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import MainBackgroundFull from './MainBackgroundFull';

const wrapperStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '600px',
  background: '#f5f5f5',
};

const headerAnchorStyle: CSSProperties = {
  height: '64px',
  background: '#222',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  anchorName: '--page-header',
} as CSSProperties;

const footerAnchorStyle: CSSProperties = {
  height: '80px',
  background: '#222',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  anchorName: '--page-footer',
} as CSSProperties;

const childPreviewStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  background:
    'repeating-linear-gradient(45deg, rgba(100,150,255,0.15) 0 12px, rgba(100,150,255,0.3) 12px 24px)',
};

const meta: Meta<typeof MainBackgroundFull> = {
  title: 'Layouts/MainBackgroundFull',
  component: MainBackgroundFull,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={wrapperStyle}>
        <div style={headerAnchorStyle}>--page-header (anchor)</div>
        <Story />
        <div style={{ ...footerAnchorStyle, position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          --page-footer (anchor)
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MainBackgroundFull>;

export const Default: Story = {
  args: {
    children: <div style={childPreviewStyle} />,
  },
};
