import type { Meta, StoryObj } from '@storybook/react';
import MultiElementTextBox from './MultiElementTextBox';

const meta: Meta<typeof MultiElementTextBox> = {
  title: 'Components/MultiElementTextBox',
  component: MultiElementTextBox,
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
    children: <div>Default MultiElement Child Text</div>,
  },
};

export const WithCustomChildren: Story = {
  args: {
    children: <div>Custom MultiElement Child Text</div>,
  },
};
