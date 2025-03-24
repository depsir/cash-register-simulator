import type { Meta, StoryObj } from '@storybook/react';
import ConfirmPopup from './ConfirmPopup';

const meta: Meta<typeof ConfirmPopup> = {
    title: 'Components/ConfirmPopup',
    component: ConfirmPopup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        message: 'Are you sure you want to proceed?',
        onConfirm: () => alert('Confirmed!'),
        onCancel: () => alert('Cancelled!'),
    },
};