import React from 'react';
import { useParams, Link, useSearchParams } from '@remix-run/react';
import SendMessage from '~/components/cashlessPayment/SendPayment';

interface CheckoutSendParams {
  id: string;
}

const CheckoutSenderPage: React.FC = () => {
  const { id } = useParams<keyof CheckoutSendParams>() as CheckoutSendParams;
  const [searchParams] = useSearchParams();

  const isDebugMode = searchParams.get('debug') === 'true';

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Checkout Session: {id}</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        
        <SendMessage channelId={id} isDebugMode={isDebugMode} />
      </div>
    </div>
  );
};

export default CheckoutSenderPage;