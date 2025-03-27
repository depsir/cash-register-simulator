import React from 'react';
import Menu from '~/components/ui/Menu';
import { useNavigate } from '@remix-run/react';
import useCart from '~/hooks/useCart';
import useCustomerCard from '~/hooks/useCustomerCard';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { emptyCart } = useCart([]);
  const { clearCustomerCard } = useCustomerCard();

  const navigateToMode = (path: string) => {
    emptyCart();
    clearCustomerCard();
    navigate(path);
  };

  const menuConfig = [
    { label: 'Negozio', icon: 'shopping-bag', action: () => navigateToMode('/store') },
    { label: 'Bar', icon: 'coffee', action: () => navigateToMode('/bar') },
    { label: 'Admin', icon: 'user-cog', action: () => navigateToMode('/admin') },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <Menu config={menuConfig} />
      </div>
    </div>
  );
};

export default Index;