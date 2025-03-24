import type { Meta, StoryObj } from '@storybook/react';
import Popup from '../app/components/Popup';

const meta: Meta<typeof Popup> = {
  title: 'Components/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Default Popup',
    content: 'This is the content of the popup.',
    onClose: () => alert('Popup closed'),
  },
};

export const WithCustomContent: Story = {
  args: {
    isOpen: true,
    title: 'Custom Popup',
    content: <div><strong>Custom content</strong> inside the popup.</div>,
    onClose: () => alert('Popup closed'),
  },
};
