import React from 'react';
import { useMessages } from '~/hooks/useMessages';
import PurePopupMessage from './ui/PurePopupMessage';

const PopupMessage: React.FC = () => {
  const { messages, deleteFirstMessage } = useMessages();

  if (!messages || messages.length === 0) return null;

  return (
    <PurePopupMessage
      message={messages[0].message}
      type="info"
      onClose={deleteFirstMessage}
    />
  );
};

export default PopupMessage;