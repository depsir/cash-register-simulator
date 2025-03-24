import type { Meta, StoryObj } from '@storybook/react';
import TextBox from '../app/components/TextBox';

const meta: Meta<typeof TextBox> = {
  title: 'Components/TextBox',
  component: TextBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be passed as children, wrapped in a <div>.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Default Child Text</div>,
  },
};

export const WithInitialValue: Story = {
  args: {
    children: <div>Initial Child Text</div>,
  },
};
