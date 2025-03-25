import React from 'react';

interface PresenceUserStatus {
  user: string;
  hasPaid?: boolean;
  role: 'sender' | 'receiver' | 'debug';
  paymentAmount?: number;
}

interface DebugPresenceProps {
  channelId: string;
  presenceState: Record<string, unknown>;
}

const DebugPresence: React.FC<DebugPresenceProps> = ({ channelId, presenceState }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">
        Presence State for channel (Debug Mode): {channelId}
      </h2>
      <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
        {JSON.stringify(presenceState, null, 2)}
      </pre>
      <ul className="mt-4 space-y-4">
        {Object.entries(presenceState).map(([key, users]) => (
          <li key={key} className="border-b pb-2">
            {Array.isArray(users) &&
              users.map((user: any) => (
                <div
                  key={user.user}
                  className={`mb-2 p-2 rounded ${
                    user.role === 'sender'
                      ? 'bg-blue-50 border-l-4 border-blue-500'
                      : user.role === 'receiver'
                      ? 'bg-green-50 border-l-4 border-green-500'
                      : 'bg-gray-50 border-l-4 border-gray-500'
                  }`}
                >
                  <strong>User:</strong> {user.user} <br />
                  <strong>Role:</strong> {user.role} <br />
                  <strong>Payment Status:</strong> {user.hasPaid ? 'Paid ✅' : 'Not Paid ❌'} <br />
                  {user.paymentAmount !== undefined && (
                    <div>
                      <strong>Payment Amount:</strong> €{user.paymentAmount.toFixed(2)}
                    </div>
                  )}
                </div>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DebugPresence;
