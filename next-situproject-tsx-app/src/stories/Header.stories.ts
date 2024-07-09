import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Header } from './Header';

const meta = {
  title: 'Example/Header',
  component: Header,
  
  tags: ['autodocs'],
  parameters: {
<<<<<<< HEAD
   
=======
    
>>>>>>> 771d7a355e5ee234471cdd0c15d68c207e52fa7e
    layout: 'fullscreen',
  },
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};
