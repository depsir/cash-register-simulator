import React, { useEffect, useState, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import usePaymentPresence from './usePaymentPresence';
import PaymentAmountDisplay from './PaymentAmountDisplay';
import DebugPresence from './DebugPresence';

interface Message {
  content: string;
  isSystemMessage?: boolean;
}

interface PresenceUser {
  user: string;
  typing?: boolean;
  messagePreview?: string;
  hasPaid?: boolean;
  role?: 'sender' | 'receiver';
  amount?: number;
}

interface ReceiveMessagesProps {
  channelId: string;
  amount: number;
  isDebugMode?: boolean; 
}

const ReceiveMessages: React.FC<ReceiveMessagesProps> = ({ channelId, amount, isDebugMode }) => {
  const userStatus: PresenceUser = useMemo(() => ({
    user: `receiver-${channelId}`,
    role: 'receiver',
    amount,
  }), [channelId, amount]);

  const { presenceState, hasAnyUserPaid } = usePaymentPresence(channelId, userStatus);
  const [clientUrl, setClientUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setClientUrl(`${window.location.origin}/payment/${channelId}`);
    }
  }, [channelId]);

  return (
    <div className="p-4">

      <PaymentAmountDisplay amount={amount} />
      
      {clientUrl && (
        <div className="flex flex-col items-center space-y-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold">Scansiona per pagare</h2>
          <QRCodeSVG 
            value={clientUrl} 
            size={200}
            level="H"
          />
          <div className="text-center mt-2">
            <p className="text-sm text-gray-600 mb-1">Link diretto:</p>
            <a 
              href={clientUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 text-sm break-all"
            >
              {clientUrl}
            </a>
          </div>
        </div>
      )}
      
      {hasAnyUserPaid ? (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded text-green-700">
          <span className="font-bold">✅ Pagamento completato!</span>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded text-yellow-700">
          <span className="font-bold">⌛ In attesa di pagamento...</span> 
        </div>
      )}
      
      {isDebugMode && <DebugPresence channelId={channelId} presenceState={presenceState} />}
    </div>
  );
};

export default ReceiveMessages;

