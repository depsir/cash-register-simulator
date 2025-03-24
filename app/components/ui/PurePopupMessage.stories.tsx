import type { Meta, StoryObj } from '@storybook/react';
import PurePopupMessage, { PurePopupMessageProps } from './PurePopupMessage';

const meta: Meta<typeof PurePopupMessage> = {
  title: 'Components/PurePopupMessage',
  component: PurePopupMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'This is a default popup message.',
    type: 'info',
    onClose: () => alert('Popup closed'),
  } as PurePopupMessageProps,
};

export const ErrorMessage: Story = {
  args: {
    message: 'An error occurred!',
    type: 'error',
    onClose: () => alert('Popup closed'),
  } as PurePopupMessageProps,
};

export const SuccessMessage: Story = {
  args: {
    message: 'Operation successful!',
    type: 'success',
    onClose: () => alert('Popup closed'),
  } as PurePopupMessageProps,
};
