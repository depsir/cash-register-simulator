import React from 'react';
import Button from '~/components/ui/Button';
import useCart from '~/hooks/useCart';
import useLocalServerIntegration from '~/hooks/useLocalServerIntegration';
import { useNavigate, useLocation } from '@remix-run/react';
import useCustomerCard from '~/hooks/useCustomerCard';
import Menu from '~/components/ui/Menu';

const Admin_index: React.FC = () => {
    const { emptyCart } = useCart([]);
    const { clearCustomerCard } = useCustomerCard();
    const location = useLocation();
    const navigate = useNavigate();
    const { exit, shutdown } = useLocalServerIntegration();

    // `document` non esiste durante il render sul server: il referrer va letto
    // solo quando il bottone viene premuto, cioe' gia' nel browser.
    const goBackToPrevious = () => {
        if (location.state?.from) {
            navigate(location.state.from);
            return;
        }
        const referrer = document.referrer ? new URL(document.referrer) : null;
        const samePage = referrer?.origin === window.location.origin
            && referrer.pathname === window.location.pathname;
        navigate(referrer && referrer.origin === window.location.origin && !samePage
            ? referrer.pathname
            : '/');
    };

    const emptyCartAction = () => {
        emptyCart();
        clearCustomerCard();
        goBackToPrevious();
    };

    const menuConfig = [
        { label: 'Indietro', icon: 'back', action: goBackToPrevious },
        { label: 'Catalogo', icon: 'inventory', action: () => navigate('catalog') },
        { label: 'Clienti', icon: 'person', action: () => navigate('customers') },
        { label: 'Svuota Carrello', icon: 'empty-cart', action: emptyCartAction },
        { label: 'Prova Barcode', icon: 'barcode-scanner', action: () => navigate('test-barcode') },
        { label: 'Torna alla Home', icon: 'settings', action: () => navigate('/') },
        { label: 'Exit', icon: 'logout', action: exit },
        { label: 'Spegni', icon: 'power', action: shutdown },
    ];

    return (
        <div className="w-full">
            <Menu config={menuConfig} />
        </div>
    );
};

export default Admin_index;