import React, {useState} from 'react';
import Button, {Variant} from "~/components/ui/Button";
import {useFetcher, useLoaderData, useNavigate} from "@remix-run/react";
import Keyboard from "~/components/ui/Keyboard";
import usesCustomerForm from "~/hooks/usesCustomerForm";
import BarcodeReader from "~/components/BarcodeReader";
import {loadCustomers} from "~/loaders/customerLoader";
import {ActionFunction, json} from "@remix-run/node";
import ConfirmPopup from '~/components/ui/ConfirmPopup';
import { supabase } from "~/lib/supabase.server";

interface Customer {
    id: string;
    name: string;
    card_number: string;
    points: number;
}

export const loader = async () => {
    return await loadCustomers()
}

export let action: ActionFunction = async ({request}) => {
    const formData = new URLSearchParams(await request.text());
    const actionType = formData.get("actionType");

    switch (actionType) {
        case "add": {
            const newCustomer = {
                card_number: formData.get("cardNumber"),
                name: formData.get("name"),
                points: 0
            };
            const { error } = await supabase
                .from('customers')
                .insert([newCustomer]);
            
            if (error) {
                console.error("Error adding customer:", error);
                return json({ error: "Errore durante l'aggiunta del cliente" }, { status: 500 });
            }
            break;
        }
        case "delete": {
            const customerId = formData.get("customerId");
            const { error } = await supabase
                .from('customers')
                .delete()
                .eq('id', customerId);
            
            if (error) {
                console.error("Error deleting customer:", error);
                return json({ error: "Errore durante l'eliminazione del cliente" }, { status: 500 });
            }
            break;
        }
        default:
            break;
    }

    return loadCustomers();
};

const CustomerManagement: React.FC = () => {
    const [error, setError] = useState("");
    const customers: Customer[] = useLoaderData()
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const toggleKeyboard = () => {
        if (keyboardVisible) {
            onClear()
        }
        setKeyboardVisible(!keyboardVisible);
    };

    const navigate = useNavigate();
    const {customer, onKeyboardDigit, onClear, onBarcode, onKeyboardBackspace} = usesCustomerForm();
    const fetcher = useFetcher();
    const exitFromProductPage = () => {
        navigate("/admin")
    };

    const [confirmDelete, setConfirmDelete] = React.useState<string | null>(null);

    const onDeleteRequest = (id: string) => {
        setConfirmDelete(id);
    }

    const onDelete = (customerId: string) => {
        fetcher.submit(
            {actionType: 'delete', customerId: customerId}, 
            {method: 'post'}
        )
        setConfirmDelete(null)
    }

    const onSave = () => {
        fetcher.submit(
            {actionType: 'add', cardNumber: customer.cardNumber, name: customer.name}, 
            {method: 'post'}
        )
        onClear()
    }

    return (
        <div className={"flex flex-col h-full w-full"}>
            <div><Button onClick={exitFromProductPage} icon={"back"}>indietro</Button></div>

            <div>
                <BarcodeReader onScan={onBarcode}/>
            </div>
            {error && <div>{error}</div>}
            <div className={"flex-grow flex-shrink overflow-auto min-h-0"}>
                <div className={"grid grid-cols-[20ex_1fr_3em_3em] gap-2"}>
                    <div className={"mb-2 pb-2 border-b-4"}>carta</div>
                    <div className={"mb-2 pb-2 border-b-4"}>nome</div>
                    <div className={"mb-2 pb-2 border-b-4"}>punti</div>
                    <div className={"mb-2 pb-2 border-b-4"}></div>

                    {customers.map(customer => (
                        <React.Fragment key={customer.id}>
                            <div>{customer.card_number}</div>
                            <div>{customer.name}</div>
                            <div>{customer.points}</div>
                            <div><Button onClick={() => onDeleteRequest(customer.id)} icon={"delete"}></Button>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className={"absolute bottom-2 right-2"}>
                <Button variant={Variant.SQUARE} onClick={toggleKeyboard}
                        icon={keyboardVisible ? "keyboard-hide" : "person-add"}></Button>
            </div>

            {keyboardVisible && <div>
            <div className={"grid grid-cols-[15ex_1fr_3em] gap-2"}>
                    <div className={"bg-white h-[3ex] leading-[3ex]"}>{customer.cardNumber}</div>
                    <div className={"bg-white h-[3ex] leading-[3ex]"}>{customer.name}</div>
                    <div><Button onClick={onSave} icon={"person-add"}></Button></div>
                </div>
                <div className={"flex"}>
                    <Keyboard onDigit={onKeyboardDigit} onBackspace={onKeyboardBackspace}></Keyboard>
                </div>
            </div>}
            {confirmDelete && (
                <ConfirmPopup
                    message="Sei sicuro di voler eliminare questo cliente?"
                    onConfirm={() => {
                        onDelete(confirmDelete);
                    }}
                    onCancel={() => setConfirmDelete(null)}
                />
            )}
        </div>
    );
}

export default CustomerManagement;