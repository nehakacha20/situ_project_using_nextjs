import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button } from './Button';

<<<<<<< HEAD
=======

>>>>>>> 771d7a355e5ee234471cdd0c15d68c207e52fa7e
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    
    layout: 'centered',
  },
<<<<<<< HEAD
  
=======
 
>>>>>>> 771d7a355e5ee234471cdd0c15d68c207e52fa7e
  tags: ['autodocs'],
 
  argTypes: {
    backgroundColor: { control: 'color' },
  },
<<<<<<< HEAD
 
=======
  
>>>>>>> 771d7a355e5ee234471cdd0c15d68c207e52fa7e
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
