import React from 'react';
import { useParams, Link } from '@remix-run/react';
import SendMessage from '~/components/cashlessPayment/SendPayment';

interface CheckoutSendParams {
  id: string;
}

const CheckoutSenderPage: React.FC = () => {
  const { id } = useParams<keyof CheckoutSendParams>() as CheckoutSendParams;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Checkout Session: {id}</h1>
        <Link 
          to={`/payment/${id}`} 
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors"
        >
          View Receiver Page
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                Questa è la pagina di pagamento cliente. Il cassiere invierà il totale da pagare, e tu potrai confermare il pagamento.
              </p>
            </div>
          </div>
        </div>
        
        <SendMessage channelId={id} />
      </div>
    </div>
  );
};

export default CheckoutSenderPage;