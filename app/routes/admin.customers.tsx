import React, {useState} from 'react';
import Button, {Variant} from "~/components/Button";
import {useFetcher, useLoaderData, useNavigate} from "@remix-run/react";
import Keyboard from "~/components/Keyboard";
import usesCustomerForm from "~/hooks/usesCustomerForm";
import BarcodeReader from "~/components/BarcodeReader";
import {loadCustomers} from "~/loaders/customerLoader";
import {ActionFunction, json} from "@remix-run/node";
import ConfirmPopup from '~/components/ConfirmPopup';

interface Customer {
    objectId: string;
    name: string;
    cardNumber: string;
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
                cardNumber: formData.get("cardNumber"),
                name: formData.get("name"),
            };
            await fetch("https://parseapi.back4app.com/classes/customers", {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                    "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCustomer)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            break;
        }
        case "delete": {
            const customerToDelete = formData.get("customerId");
            await fetch(`https://parseapi.back4app.com/classes/customers/${customerToDelete}`, {
                method: "DELETE",
                headers: {
                    "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                    "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503",
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            break;
        }
        default:
            break;
    }

    return json({ok: true});
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
            {actionType: 'delete', customerId: customerId}, {method: 'post'}
        )
        setConfirmDelete(null)
    }
    const onSave = () => {
        fetcher.submit(
            {actionType: 'add', cardNumber: customer.cardNumber, name: customer.name}, {method: 'post'}
        )
        onClear()
    }

    const updateProduct = async (id: string, barcode: string, name: string, price: number) => {
            const updatedProduct = {name, barcode, price}
            return fetch("https://parseapi.back4app.com/classes/products/"+id, {
                method: "PUT",
                headers: {
                    "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                    "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
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
                        <React.Fragment key={customer.objectId}>
                            <div>{customer.cardNumber}</div>
                            <div>{customer.name}</div>
                            <div>{customer.points}</div>
                            <div><Button onClick={() => onDeleteRequest(customer.objectId)} icon={"delete"}></Button>
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