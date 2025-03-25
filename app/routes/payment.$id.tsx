import React from 'react';
import { useParams, Link } from '@remix-run/react';
import ReceiveMessages from '~/components/cashlessPayment/ReceivePayment';

interface PaymentParams {
  id: string;
}

const PaymentPage: React.FC = () => {
  const { id } = useParams<keyof PaymentParams>() as PaymentParams;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pagamento: {id}</h1>
        <Link 
          to={`/checkout/${id}/sender`} 
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors"
        >
          Visualizza pagina cliente
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      
        <ReceiveMessages channelId={id} />
      </div>
    </div>
  );
};

export default PaymentPage;