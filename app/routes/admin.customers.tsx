import React, {useState } from 'react';
import Button from "~/components/Button";
import {useFetcher, useLoaderData, useNavigate} from "@remix-run/react";
import Keyboard from "~/components/Keyboard";
import usesCustomerForm from "~/hooks/usesCustomerForm";
import BarcodeReader from "~/components/BarcodeReader";
import {loadCustomers} from "~/loaders/customerLoader";
import {ActionFunction, json} from "@remix-run/node";

interface Customer {
    objectId: string;
    name: string;
    cardNumber: string;
    points: number;
}

export const loader = async () => {
    return await loadCustomers()
}

export let action: ActionFunction = async ({ request }) => {
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

    return json({ ok: true });
};


const CustomerManagement: React.FC = () => {
    const [error, setError] = useState("");
    const customers: Customer[] = useLoaderData()
    const navigate = useNavigate();
    const {customer, onKeyboardDigit, onClear, onBarcode, onKeyboardBackspace} = usesCustomerForm();
    const fetcher = useFetcher();
    const exitFromProductPage = () => {
        navigate("/admin")
    };

    const deleteCustomer = (customerId: string) => {
        fetcher.submit(
            { actionType: 'delete', customerId: customerId }, { method: 'post' }
       )
    }
    const onSave = () => {
        fetcher.submit(
            { actionType: 'add', cardNumber: customer.cardNumber, name: customer.name }, { method: 'post' }
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
                <div className={"grid grid-cols-[15ex_1fr_3em_3em] gap-2"}>
                    {customers.map(customer => (
                        <React.Fragment key={customer.objectId}>
                            <div>{customer.cardNumber}</div>
                            <div>{customer.name}</div>
                            <div>{customer.points}</div>
                            <div><Button onClick={() => deleteCustomer(customer.objectId)} icon={"delete"}></Button>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className={"grid grid-cols-[15ex_1fr_3em] gap-2"}>
                    <div className={"bg-white h-[3ex] leading-[3ex]"}>{customer.cardNumber}</div>
                    <div className={"bg-white h-[3ex] leading-[3ex]"}>{customer.name}</div>
                    <div><Button onClick={onSave} icon={"add"}></Button></div>
                </div>
                <div className={"flex"}>
                    <Keyboard onDigit={onKeyboardDigit} onBackspace={onKeyboardBackspace}></Keyboard>
                </div>

            </div>
        </div>
    );
}
export default CustomerManagement;