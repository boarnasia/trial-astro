import type { Meta, StoryObj } from '@storybook/react-vite';
import BlogSearch from './BlogSearch';

const samplePosts = [
  {
    id: 'first-post',
    title: 'はじめての投稿',
    description: 'Astro でブログを始めました。セットアップ手順と基本的な使い方を紹介します。',
    pubDate: '2024-01-15T00:00:00.000Z',
  },
  {
    id: 'react-in-astro',
    title: 'Astro で React を使う',
    description:
      'client:load ディレクティブを使って React コンポーネントをインタラクティブにする方法を解説します。',
    pubDate: '2024-02-10T00:00:00.000Z',
  },
  {
    id: 'scss-bem-flocss',
    title: 'BEM と FLOCSS で CSS を整理する',
    description:
      'FLOCSS のレイヤー構造と BEM の命名規則を組み合わせてスケーラブルな CSS 設計を実現します。',
    pubDate: '2024-03-05T00:00:00.000Z',
  },
  {
    id: 'storybook-setup',
    title: 'Storybook 導入ガイド',
    description:
      'Astro プロジェクトへ Storybook をセットアップしてコンポーネント駆動開発を始める手順を紹介します。',
    pubDate: '2024-04-20T00:00:00.000Z',
  },
  {
    id: 'astro-islands',
    title: 'Astro Islands アーキテクチャ',
    description:
      'Astro Islands により必要な部分だけ JavaScript を送信し、高速なページを実現します。',
    pubDate: '2024-05-01T00:00:00.000Z',
  },
];

const meta: Meta<typeof BlogSearch> = {
  title: 'Components/BlogSearch',
  component: BlogSearch,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    posts: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof BlogSearch>;

export const Default: Story = {
  args: {
    posts: samplePosts,
  },
};

export const NoPosts: Story = {
  args: {
    posts: [],
  },
};
