import React, {useState } from 'react';
import useCustomers from "~/hooks/useCustomers";
import Button from "~/components/Button";
import {useNavigate} from "@remix-run/react";
import Keyboard from "~/components/Keyboard";
import usesCustomerForm from "~/hooks/usesCustomerForm";
import BarcodeReader from "~/components/BarcodeReader";

interface Customer {
    id: string;
    name: string;
}

const CustomerManagement: React.FC = () => {
    const [error, setError] = useState("");
    const {customers, deleteCustomer, addCustomer} = useCustomers()
    const navigate = useNavigate();
    const {customer, onKeyboardDigit, onSave, onBarcode} = usesCustomerForm(addCustomer);

    const exitFromProductPage = () => {
        navigate("/admin")
    };

    return (
        <div className={"flex flex-col h-full w-full"}>
            <div><Button onClick={exitFromProductPage} icon={"back"}>indietro</Button></div>

            <div>
                <BarcodeReader onScan={onBarcode}/>
            </div>
            {error && <div>{error}</div>}
            <div className={"flex-grow flex-shrink overflow-auto min-h-0"}>
                <div className={"grid grid-cols-[15ex_1fr_3em] gap-2"}>
                    {customers.map(customer => (
                        <React.Fragment key={customer.objectId}>
                            <div>{customer.cardNumber}</div>
                            <div>{customer.name}</div>
                            <div><Button onClick={() => deleteCustomer(customer.objectId)} icon={"delete"}></Button></div>
                        </React.Fragment>
                    ))}
                </div>
                <div className={"grid grid-cols-[15ex_1fr_3em] gap-2"}>
                    <div className={"bg-white h-[3ex] leading-[3ex]"}>{customer.cardNumber}</div>
                    <div className={"bg-white h-[3ex] leading-[3ex]"}>{customer.name}</div>
                    <div><Button onClick={onSave} icon={"add"}></Button></div>
                </div>
                <div className={"flex"}>
                    <Keyboard onDigit={onKeyboardDigit}></Keyboard>
                </div>

            </div>
        </div>
    );
}
export default CustomerManagement;