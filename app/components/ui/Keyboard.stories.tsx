import type { Meta, StoryObj } from '@storybook/react';
import Keyboard from './Keyboard';

const meta: Meta<typeof Keyboard> = {
  title: 'Components/Keyboard',
  component: Keyboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onDigit: (digit: string) => console.log(`Digit pressed: ${digit}`),
    onBackspace: () => console.log('Backspace pressed'),
  },
};

export const WithAction: Story = {
  args: {
    onDigit: (digit: string) => alert(`Digit pressed: ${digit}`),
    onBackspace: () => alert('Backspace pressed'),
  },
};
