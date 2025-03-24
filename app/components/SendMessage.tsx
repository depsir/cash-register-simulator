import React, { useState } from 'react';
import { supabase } from 'app/lib/supabase';

const SendMessage: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const channel = supabase.channel('message-channel');

    const response = await channel.send({
      type: 'broadcast',
      event: 'new-message',
      payload: { content: message },
    });

    if (response !== 'ok') {
      console.error('Failed to send message:', response);
    } else {
      setMessage(''); // Reset the input field
    }
  };

  return (
    <div>
      <h1>Send a Message</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message"
      />
      <button type="button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
};

export default SendMessage;