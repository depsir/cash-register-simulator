import React, { useEffect, useState } from 'react';
import { supabase } from 'app/lib/supabase';

interface Message {
  content: string;
}

const ReceiveMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.error('Supabase Realtime must run in the browser.');
      return;
    }

    const channel = supabase.channel('message-channel');

    channel.on('broadcast', { event: 'new-message' }, (payload) => {
      console.log('Message received:', payload);
      if (payload.payload && payload.payload.content) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: payload.payload.content },
        ]);
      } else {
        console.warn('Unexpected payload structure:', payload);
      }
    });

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Messaggi Ricevuti</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReceiveMessages;