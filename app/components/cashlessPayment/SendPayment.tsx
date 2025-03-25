import React, { useState, useEffect, useRef, useMemo } from 'react';
import { supabase } from '~/lib/supabase';
import debounce from 'lodash.debounce';

interface SendMessageProps {
  channelId: string;
}

interface PresenceUserStatus {
  user: string;
  hasPaid?: boolean;
  role: 'sender' | 'receiver';
  paymentAmount?: number;
}

const SendMessage: React.FC<SendMessageProps> = ({ channelId }) => {
  const [presenceState, setPresenceState] = useState<Record<string, unknown>>({});
    const [paymentAmount, setPaymentAmount] = useState<string | null>(null);
  const [hasPaid, setHasPaid] = useState<boolean>(false);
  const presenceChannelRef = useRef<any>(null);
  const randomUser = useMemo(() => Math.random().toString(36).substring(9), []);

  useEffect(() => {
    // Initialize the presence channel with the provided channelId
    const channelName = `payment/${channelId}/presence`;
    const presenceChannel = supabase.channel(channelName, {
      config: {
        presence: {
          key: channelId,
        },
      },
    });
    presenceChannelRef.current = presenceChannel;

    // Set up presence event handlers
    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const newState = presenceChannel.presenceState();
        console.log('sync', newState);
        setPresenceState({...newState});
        
        // Check if any receiver has set a payment amount
        Object.values(newState).forEach((users: any) => {
          if (Array.isArray(users)) {
            users.forEach((user: PresenceUserStatus) => {
              if (user.role === 'receiver' && user.amount !== undefined) {
                setPaymentAmount(user.amount);
              }
            });
          }
        });
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('join', key, newPresences);
        setPresenceState((prevState) => ({
          ...prevState,
          [key]: newPresences,
        }));
        
        // Check if the joining user has a payment amount
        if (Array.isArray(newPresences)) {
          newPresences.forEach((user: PresenceUserStatus) => {
            if (user.role === 'receiver' && user.paymentAmount !== undefined) {
              setPaymentAmount(user.paymentAmount);
            }
          });
        }
      })
      .on('presence', { event: 'leave' }, ({ key }) => {
        console.log('leave', key);
        setPresenceState((prevState) => {
          const newState = { ...prevState };
          delete newState[key];
          return newState;
        });
      });

    // Subscribe to the presence channel and track initial presence
    const userStatus: PresenceUserStatus = {
      user: `sender-${randomUser}`,
      hasPaid: false,
      role: 'sender',
    };

    presenceChannel.subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') return;
      const presenceTrackStatus = await presenceChannel.track(userStatus);
      console.log('Presence track status:', presenceTrackStatus);
    });

    // Cleanup function for presence channel
    return () => {
      console.log('Unsubscribing from presence channel');
      presenceChannel.unsubscribe();
    };
  }, [channelId, randomUser]);

  const handleTyping = useMemo(
    () =>
      debounce(async (isTyping: boolean, messagePreview: string = '') => {
        if (!presenceChannelRef.current) {
          console.error('Presence channel not initialized');
          return;
        }

        const userStatus: PresenceUserStatus = {
          user: `sender-${randomUser}`,
          hasPaid,
          role: 'sender',
        };

        await presenceChannelRef.current.track(userStatus);
        console.log('Presence track status:', userStatus);
      }, 300),
    [randomUser, hasPaid]
  );

  const handlePaymentStatusChange = async (): Promise<void> => {
    if (!presenceChannelRef.current) {
      console.error('Presence channel not initialized');
      return;
    }

    const newPaymentStatus = !hasPaid;
    setHasPaid(newPaymentStatus);

    const userStatus: PresenceUserStatus = {
      user: `sender-${randomUser}`,
      hasPaid: newPaymentStatus,
      role: 'sender',
    };

    try {
      await presenceChannelRef.current.track(userStatus);
      console.log('Payment status updated:', newPaymentStatus);
      
      // Send a system message about the payment status
      const channelName = `payment/${channelId}`;
      await supabase.channel(channelName).send({
        type: 'broadcast',
        event: 'new-message',
        payload: { 
          content: `[System] User ${randomUser} has ${newPaymentStatus ? 'completed' : 'cancelled'} the payment.`,
          isSystemMessage: true
        },
      });
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Presence Input for user {randomUser}</h1>
      
      {/* Payment amount display */}
      {paymentAmount !== null && (
        <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg text-center">
          <div className="text-sm uppercase text-green-700 font-semibold mb-1">Totale da pagare</div>
          <div className="text-3xl font-bold text-green-800">€{paymentAmount}</div>
        </div>
      )}
      
      {/* Payment button - improved visibility */}
      <div className="mb-6">
        <button
          onClick={handlePaymentStatusChange}
          className={`w-full py-3 px-4 text-white text-lg font-bold rounded-lg transition-colors duration-200 ${
            hasPaid 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          aria-pressed={hasPaid}
          disabled={paymentAmount === null}
        >
          {hasPaid ? '✅ Pagamento completato' : '💰 Conferma pagamento'}
        </button>
        
        {paymentAmount === null && (
          <p className="text-center text-sm text-gray-500 mt-2">In attesa del totale dal cassiere...</p>
        )}
      </div>
      
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Presence State:</h2>
        <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
          {JSON.stringify(presenceState, null, 2)}
        </pre>
        <ul className="mt-4 space-y-4">
          {Object.entries(presenceState).map(([key, users]) => (
            <li key={key} className="border-b pb-2">
              {Array.isArray(users) &&
                users.map((user: PresenceUserStatus) => (
                  <div 
                    key={user.user} 
                    className={`mb-2 p-2 rounded ${
                      user.role === 'sender' 
                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                        : 'bg-green-50 border-l-4 border-green-500'
                    }`}
                  >
                    <strong>User:</strong> {user.user} <br />
                    <strong>Role:</strong> {user.role} <br />
                    <strong>Payment Status:</strong> {user.hasPaid ? 'Paid ✅' : 'Not Paid ❌'} <br />
                    {user.paymentAmount !== undefined && (
                      <div><strong>Payment Amount:</strong> €{user.paymentAmount.toFixed(2)}</div>
                    )}
                  </div>
                ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SendMessage;