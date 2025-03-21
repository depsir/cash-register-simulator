import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button, { Variant } from '../app/components/Button';
import '../app/styles/tailwind.css';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Base: Story = {
  args: {
    children: 'Base Button',
  },
};

export const WithIcon: Story = {
  args: {
    icon: 'add',
    children: 'Add Item',
  },
};

export const IconOnly: Story = {
  args: {
    icon: 'search',
    children: '',
  },
};

export const FullWidth: Story = {
  args: {
    variant: Variant.FULL,
    children: 'Full Width Button',
  },
};

export const Square: Story = {
  args: {
    variant: Variant.SQUARE,
    icon: 'settings',
    children: '',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button>Base Button</Button>
      <Button icon="add">With Icon</Button>
      <Button variant={Variant.FULL}>Full Width Button</Button>
      <Button variant={Variant.SQUARE} icon="settings" />
    </div>
  ),
}; 