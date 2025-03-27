import React from 'react';
import CartList from '~/components/CartList';
import MultiElementTextBox from '~/components/ui/MultiElementTextBox';
import useCart from '~/hooks/useCart';
import { useNavigate } from '@remix-run/react';
import PaymentCash from '~/components/PaymentCash';
import Menu from '~/components/ui/Menu';
import ReceiveMessagesWrapper from '~/components/cashlessPayment/ReceiveMessagesWrapper';
import ManualNumber from '~/components/ManualNumber';

const Bar: React.FC = () => {
  const { addManualPrice, total, emptyCart } = useCart([]);
  const navigate = useNavigate();

  const onCheckout = async () => {
    emptyCart();
  };

  const menuConfig = [
     {
      label: 'Bevande Calde',
      icon: 'hot-drink',
      children: [
        { label: 'Caffè', action: () => addManualPrice(1, 'Caffè') },
        { label: 'Cappuccino', action: () => addManualPrice(1.8, 'Cappuccino') },
        { label: 'Ginseng', action: () => addManualPrice(2, 'Ginseng') },
        { label: 'Cioccolata', action: () => addManualPrice(2.5, 'Cioccolata') },
        { label: 'Tè', action: () => addManualPrice(2.5, 'Tè') },
        { label: 'Caffè Speciale', action: () => addManualPrice(2, 'Caffè Speciale') },
        { label: 'Latte', action: () => addManualPrice(1.8, 'Latte') },
      ],
    },
    {
      label: 'Bevande Fredde',
      icon: 'cold-drink',
      children: [
        { label: 'Succo', action: () => addManualPrice(3, 'Succo') },
        { label: 'Acqua', action: () => addManualPrice(1, 'Acqua') },
        { label: 'Bibita', action: () => addManualPrice(2, 'Bibita') },
        { label: 'Latte', action: () => addManualPrice(1.8, 'Latte') },
      ],
    },
    {
      label: 'Cibo',
      icon: 'food',
      children: [
        { label: 'Brioche', action: () => addManualPrice(1.5, 'Brioche') },
        { label: 'Torta', action: () => addManualPrice(3.5, 'Torta') },
        { label: 'Panino', action: () => addManualPrice(5, 'Panino') },
        { label: 'Biscotti', action: () => addManualPrice(2.8, 'Biscotti') },
      ],
    }, 
  {  
    label: 'Prezzo Manuale',
    icon: 'euro',
    component: (props) => <ManualNumber {...props} onClear={props.onBack} onEnter={(value) => addManualPrice(parseFloat(value))} />,
}, 
     {
      label: 'Checkout',
      icon: 'checkout',
      children: [
        {
            label: 'Contanti',
            icon: 'payment-cash',
            component: (props) => <PaymentCash {...props} onClear={props.onBack} onEnter={onCheckout} />,
        },
        {
            label: 'Cellulare',
            icon: 'payment-cash',
            component: (props) => <ReceiveMessagesWrapper {...props} amount={total} onClear={props.onBack} onEnter={onCheckout} />,
        },      ],
    },
    {
      label: 'Admin',
      icon: 'settings',
      action: () => navigate('/admin', { state: { from: '/bar' } }),
    },

  ];

  return (
    <div className="grid lg:grid-cols-[1fr_600px] grid-cols-[1fr_1fr] gap-2 w-full h-full">
      <div className="flex flex-col h-full">
        <div className="bg-white flex-1 p-2 drop-shadow overflow-auto basis-0">
          <CartList />
        </div>
        <div className="flex-none mt-2">
          <MultiElementTextBox>
            <div>Totale</div>
            <div>{total.toFixed(2)}</div>
          </MultiElementTextBox>
        </div>
      </div>
      <div className="flex flex-col h-full overflow-auto">
        <Menu config={menuConfig} />
      </div>
    </div>
  );
};

export default Bar;