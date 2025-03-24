import type { Meta, StoryObj } from '@storybook/react';
import NumberPad from './NumberPad';

const meta = {
    title: 'Components/NumberPad',
    component: NumberPad,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof NumberPad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        onDigit: (digit) => { console.log('Digit pressed:', digit) },
        onBackspace: () => { console.log('Backspace pressed') },
    },
};

export const WithActions: Story = {
    args: {
        onDigit: (digit) => { alert(`Digit pressed: ${digit}`) },
        onBackspace: () => { alert('Backspace pressed') },
    },
}; 