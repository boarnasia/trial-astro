import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageLayout } from './PageLayout';
import { HeroLayout } from './HeroLayout';
import { HeaderLayout } from './HeaderLayout';
import { BodyLayout } from './BodyLayout';

const meta: Meta<typeof PageLayout> = {
  title: 'Pages/Blog/PageLayout',
  component: PageLayout,
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
type Story = StoryObj<typeof PageLayout>;

export const Default: Story = {
  args: {
    children: (
      <>
        <HeroLayout>
          <div style={{ background: '#fde68a', padding: '3em', textAlign: 'center' }}>
            Hero: アイキャッチ画像などが入る
          </div>
        </HeroLayout>
        <HeaderLayout>
          <div style={{ background: '#bfdbfe', padding: '1.5em', width: '100%', textAlign: 'center' }}>
            Header: 記事タイトル・メタ情報
          </div>
        </HeaderLayout>
        <BodyLayout>
          <div style={{ background: '#d1fae5', padding: '2em' }}>
            Body: 本文コンテンツが入る
          </div>
        </BodyLayout>
      </>
    ),
  },
};

export const WithoutHero: Story = {
  args: {
    variant: 'without-hero',
    children: (
      <>
        <HeaderLayout>
          <div style={{ background: '#bfdbfe', padding: '1.5em', width: '100%', textAlign: 'center' }}>
            Header: 記事タイトル・メタ情報
          </div>
        </HeaderLayout>
        <BodyLayout>
          <div style={{ background: '#d1fae5', padding: '2em' }}>
            Body: 本文コンテンツが入る
          </div>
        </BodyLayout>
      </>
    ),
  },
};
