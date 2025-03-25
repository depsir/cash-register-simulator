import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import usePaymentPresence from './usePaymentPresence';

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
}

const ReceiveMessages: React.FC<ReceiveMessagesProps> = ({ channelId }) => {
  const { presenceState, hasAnyUserPaid } = usePaymentPresence(channelId);
  const [clientUrl, setClientUrl] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setClientUrl(`${window.location.origin}/checkout/${channelId}/sender`);
    }
  }, [channelId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Messaggi Ricevuti</h1>
      
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
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
      
        {hasAnyUserPaid && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded text-green-700">
            <span className="font-bold">✅ Pagamento completato!</span> Un utente ha confermato il pagamento.
          </div>
        )}
          
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Utenti attivi:</h2>
          <div className="divide-y divide-gray-200 border rounded-lg">
            {Object.entries(presenceState).map(([key, users]) => (
              <div key={key} className="p-3">
                {Array.isArray(users) &&
                  users.map((user: PresenceUser) => (
                    <div key={user.user} className={`flex items-center space-x-2 p-2 rounded ${
                      user.role === 'sender' 
                        ? 'bg-blue-50' 
                        : 'bg-green-50'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${user.typing ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                      <div className="flex-1">
                        <p className="font-medium">{user.user}</p>
                        <p className="text-xs text-gray-500">Role: {user.role || 'unknown'}</p>
                        {user.typing && (
                          <p className="text-sm text-gray-500 italic">
                            sta scrivendo: {user.messagePreview || '...'}
                          </p>
                        )}
                        {user.amount !== undefined && (
                          <p className="text-sm font-medium text-green-700">
                            Totale: €{user.amount}
                          </p>
                        )}
                      </div>
                      {user.hasPaid && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Pagato ✓
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiveMessages;

