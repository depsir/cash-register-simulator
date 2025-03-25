import React, { useState } from 'react';
import PaymentAmountDisplay from './PaymentAmountDisplay';
import DebugPresence from './DebugPresence';
import usePaymentPresence, { PresenceUser } from './usePaymentPresence';

interface SendMessageProps {
  channelId: string;
  isDebugMode: boolean; // New prop for debug mode
}

const SendMessage: React.FC<SendMessageProps> = ({ channelId, isDebugMode }) => {
  const [userStatus, setUserStatus] = useState<PresenceUser>({
    user: `sender-${channelId}`,
    role: 'sender',
  });
  const { presenceState, amount, hasAnyUserPaid, trackPresenceUpdate } = usePaymentPresence(channelId, userStatus);

  const handlePaymentStatusChange = async (): Promise<void> => {
    try {
      await trackPresenceUpdate({
        ...userStatus,
        hasPaid: true,
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  return (
    <div className="p-4">
      <PaymentAmountDisplay amount={amount} />

      <div className="mb-6">
        <button
          onClick={handlePaymentStatusChange}
          className={`w-full py-3 px-4 text-white text-lg font-bold rounded-lg transition-colors duration-200 ${
            hasAnyUserPaid 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          aria-pressed={hasAnyUserPaid}
          disabled={amount === null}
        >
          {hasAnyUserPaid ? '✅ Pagamento completato' : '💰 Conferma pagamento'}
        </button>
      </div>

      {isDebugMode && <DebugPresence channelId={channelId} presenceState={presenceState} />}
    </div>
  );
};

export default SendMessage;