import React from "react";
import CartList from "~/components/CartList";
import MultiElementTextBox from "~/components/ui/MultiElementTextBox";
import Button from "~/components/ui/Button";
import useCart from "~/hooks/useCart";
import {useLoaderData, useNavigate, useFetcher} from '@remix-run/react';
import {LoaderFunction} from "@remix-run/node";
import {loadCatalog} from "~/loaders/catalogLoader";
import BarcodeReader from "~/components/BarcodeReader";
import ManualNumber from "~/components/ManualNumber";
import PaymentCash from "~/components/PaymentCash";
import useCustomerCard from "~/hooks/useCustomerCard";
import Menu from '~/components/ui/Menu';

export let loader: LoaderFunction = async () => {
    return loadCatalog();
};
export const config = { runtime: "nodejs", regions: ["fra1"], maxDuration: 30 };

const store = () => {
    let catalog = useLoaderData();
    const {addProduct, total, emptyCart, addManualPrice, removeProduct} = useCart(catalog);
    const {customerCard, fetchCustomerCard, updatePoints, clearCustomerCard} = useCustomerCard();
    const [subpage, setSubpage] = React.useState("");
    const navigate = useNavigate();
    const earnedPoints = Math.floor(total);
    const fetcher = useFetcher();

    const onCustomerCard = async (cardNumber: string) => {
        if (/^[0-9]+$/.test(cardNumber)) {
            cardNumber = `CRS-CUSTOMER-${String(cardNumber).padStart(3, '0')}`;
        }
        console.log("cardNumber", cardNumber);
        await fetchCustomerCard(cardNumber);
    };

    const onCheckout = async () => {
        if (customerCard.id) {
            await updatePoints(customerCard.id, earnedPoints);
        }
        clearCustomerCard();
        emptyCart();
    };

    const onNavigateToAdmin = () => {
        navigate("/admin", { state: { from: "/store" } });
    };

    // Ricarica il catalogo quando torni alla pagina store
    React.useEffect(() => {
        const handlePopState = () => {
            if (window.history.state?.from === "/admin") {
                fetcher.load("/store");
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [fetcher]);

    const menuConfig = [
        {
            customElement:  <BarcodeReader onScan={addProduct} active={true} />,
        },
     
        {
            label: 'Barcode Manuale',
            icon: 'barcode-scanner',
            component: (props) => <ManualNumber {...props} onClear={props.onBack} onEnter={(value) => addProduct(value)} />,
        },
        {
            label: 'Rimuovi Prodotto',
            icon: 'remove-product',
            component: (props) => <ManualNumber {...props} onClear={props.onBack} allowBarcode={true} onEnter={(value) => removeProduct(value)} />,
        },
{
            label: 'Prezzo Manuale',
            icon: 'euro',
            component: (props) => <ManualNumber {...props} onClear={props.onBack} onEnter={(value) => addManualPrice(parseFloat(value))} />,
        },
        {
            label: 'Sacchetto',
            icon: 'shopping-bag',
            action: () => addProduct('1'),
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
            ],
        },
        {
            label: 'Carta Fedeltà',
            icon: 'membership-card',
            component: (props) => <ManualNumber {...props} onClear={props.onBack} onEnter={(value) => onCustomerCard(value)} />,
        },
        {
            label: 'Admin',
            icon: 'settings',
            action: onNavigateToAdmin,
        },
    ];

    return (
        <div className={"grid lg:grid-cols-[1fr_600px] grid-cols-[1fr_1fr] gap-2 w-full h-full"}>
            <div className={"flex flex-col h-full"}>
                <div className={"bg-white flex-1 p-2 drop-shadow overflow-auto"}>
                    <CartList/>
                </div>
                <div className={"flex-none mt-2"}>
                    <MultiElementTextBox>
                        <div>Totale</div>
                        <div>{total.toFixed(2)}</div>
                    </MultiElementTextBox>
                    {customerCard.id && <div className={"mt-2"}>
                        <MultiElementTextBox>
                            <div>cliente: {customerCard.name}</div>
                            <div>punti attuali {customerCard.points} - nuovi {earnedPoints} </div>
                        </MultiElementTextBox>
                    </div>}
                </div>
            </div>
            <div className={"flex flex-col h-full overflow-auto"}>
               
                <Menu config={menuConfig} />
            </div>
        </div>
    );
};

export default store;