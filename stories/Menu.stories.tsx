import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Menu from '~/components/ui/Menu';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockAction = () => alert('Action executed!');
const MockNumberPad: React.FC<{ onBack: () => void; onReset: () => void }> = ({ onBack, onReset }) => (
  <div>
    <div>Number Pad Component</div>
    <button onClick={onBack}>Go Back</button>
    <button onClick={onReset}>Reset Menu</button>
  </div>
);

const menuConfig: MenuConfig[] = [
  {
    label: 'Option 1',
    icon: 'icon-1',
    action: mockAction,
  },
  {
    label: 'Option 2',
    icon: 'icon-2',
    children: [
      {
        label: 'Sub Option 1',
        icon: 'sub-icon-1',
        action: mockAction,
      },
      {
        label: 'Sub Option 2',
        icon: 'sub-icon-2',
        component: MockNumberPad,
      },
    ],
  },
  {
    label: 'Option 3',
    icon: 'icon-3',
    component: MockNumberPad,
  },
];

export const Default: Story = {
  args: {
    config: menuConfig,
  },
};