import React from 'react';
import ReceiveMessages from './ReceivePayment';
import { v4 as uuidv4 } from 'uuid';
import Button from '../ui/Button';

interface ReceiveMessagesWrapperProps {
  amount: number;
  onClear: () => void;
  onEnter: () => void;
}

const ReceiveMessagesWrapper: React.FC<ReceiveMessagesWrapperProps> = ({ amount, onClear, onEnter }) => {
  const channelId = React.useMemo(() => uuidv4(), []);

  return (
    <div>
       <Button onClick={onClear} icon="back"> Indietro </Button>
      <ReceiveMessages amount={amount} channelId={channelId} />
    <Button onClick={() => { onEnter(); onClear(); }} icon="check">Confirm</Button>
    </div>
  );
};

export default ReceiveMessagesWrapper;