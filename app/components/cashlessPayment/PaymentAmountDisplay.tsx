import React from 'react';

interface PaymentAmountDisplayProps {
  amount: number | null;
}

const PaymentAmountDisplay: React.FC<PaymentAmountDisplayProps> = ({ amount }) => {
  if (amount === null) {
    return (
      <p className="text-center text-sm text-gray-500 mt-2">
        In attesa del totale dal cassiere...
      </p>
    );
  }

  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-300 rounded-lg text-center">
      <div className="text-sm uppercase text-green-700 font-semibold mb-1">Totale da pagare</div>
      <div className="text-3xl font-bold text-green-800">€{amount}</div>
    </div>
  );
};

export default PaymentAmountDisplay;
