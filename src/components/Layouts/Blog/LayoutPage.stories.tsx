import type { Meta, StoryObj } from '@storybook/react-vite';
import { LayoutPage } from './LayoutPage';
import { LayoutHero } from './LayoutHero';
import { LayoutHeader } from './LayoutHeader';
import { LayoutBody } from './LayoutBody';

const meta: Meta<typeof LayoutPage> = {
  title: 'Layouts/Blog/LayoutPage',
  component: LayoutPage,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['with-hero', 'without-hero'],
    },
    as: {
      control: { type: 'select' },
      options: ['div', 'article', 'section', 'main'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LayoutPage>;

export const Default: Story = {
  args: {
    children: (
      <>
        <LayoutHero>
          <div style={{ background: '#fde68a', padding: '3em', textAlign: 'center' }}>
            Hero: アイキャッチ画像などが入る
          </div>
        </LayoutHero>
        <LayoutHeader>
          <div style={{ background: '#bfdbfe', padding: '1.5em', width: '100%', textAlign: 'center' }}>
            Header: 記事タイトル・メタ情報
          </div>
        </LayoutHeader>
        <LayoutBody>
          <div style={{ background: '#d1fae5', padding: '2em' }}>
            Body: 本文コンテンツが入る
          </div>
        </LayoutBody>
      </>
    ),
  },
};

export const WithoutHero: Story = {
  args: {
    variant: 'without-hero',
    children: (
      <>
        <LayoutHeader>
          <div style={{ background: '#bfdbfe', padding: '1.5em', width: '100%', textAlign: 'center' }}>
            Header: 記事タイトル・メタ情報
          </div>
        </LayoutHeader>
        <LayoutBody>
          <div style={{ background: '#d1fae5', padding: '2em' }}>
            Body: 本文コンテンツが入る
          </div>
        </LayoutBody>
      </>
    ),
  },
};
