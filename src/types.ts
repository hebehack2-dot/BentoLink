export type BlockType = 'link' | 'social' | 'text' | 'image';
export type BlockSize = '1x1' | '2x1' | '2x2';

export interface Block {
  id: string;
  type: BlockType;
  title?: string;
  url?: string;
  icon?: string;
  content?: string;
  imageUrl?: string;
  size: BlockSize;
  bgColor?: string;
  textColor?: string;
}

export interface UserProfile {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  theme: 'light' | 'dark' | 'glass';
  blocks: Block[];
}

export const DEFAULT_PROFILE: UserProfile = {
  username: 'johndoe',
  name: 'John Doe',
  bio: 'Creator, Designer, Developer. Building cool things on the internet.',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  theme: 'light',
  blocks: [
    {
      id: '1',
      type: 'link',
      title: 'My Portfolio',
      url: 'https://example.com',
      size: '2x1',
      bgColor: '#000000',
      textColor: '#ffffff',
    },
    {
      id: '2',
      type: 'social',
      title: 'Twitter',
      url: 'https://twitter.com',
      icon: 'twitter',
      size: '1x1',
      bgColor: '#1DA1F2',
      textColor: '#ffffff',
    },
    {
      id: '3',
      type: 'social',
      title: 'GitHub',
      url: 'https://github.com',
      icon: 'github',
      size: '1x1',
      bgColor: '#333333',
      textColor: '#ffffff',
    },
    {
      id: '4',
      type: 'text',
      title: 'About Me',
      content: 'I love building products that people use every day.',
      size: '2x2',
      bgColor: '#f3f4f6',
      textColor: '#111827',
    }
  ]
};
