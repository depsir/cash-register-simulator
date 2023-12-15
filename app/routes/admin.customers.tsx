import React, {useState } from 'react';
import BarcodeReader from 'react-barcode-reader';
import useCustomers from "~/hooks/useCustomers";
import Button from "~/components/Button";
import {useNavigate} from "@remix-run/react";
import Keyboard from "~/components/Keyboard";
import usesCustomerForm from "~/hooks/usesCustomerForm";

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

    const handleError = (err: any) => {
        console.error(err);
    }

    return (
        <div className={"flex flex-col h-full w-full"}>
            <div><Button onClick={exitFromProductPage}>back</Button></div>

            <div>
                <BarcodeReader onError={handleError} onScan={onBarcode}/>
            </div>
            {error && <div>{error}</div>}
            <div className={"flex-grow flex-shrink overflow-auto min-h-0"}>
                <div className={"grid grid-cols-[15ex_1fr_3em] gap-2"}>
                    {customers.map(customer => (
                        <React.Fragment key={customer.objectId}>
                            <div>{customer.cardNumber}</div>
                            <div>{customer.name}</div>
                            <div><Button onClick={() => deleteCustomer(customer.objectId)}>X</Button></div>
                        </React.Fragment>
                    ))}
                </div>
                <div className={"grid grid-cols-[15ex_1fr_3em] gap-2"}>
                    <div className={"bg-white h-[3ex] leading-[3ex]"}>{customer.cardNumber}</div>
                    <div className={"bg-white h-[3ex] leading-[3ex]"}>{customer.name}</div>
                    <div><Button onClick={onSave}>Add</Button></div>
                </div>
                <div className={"flex"}>
                    <Keyboard onDigit={onKeyboardDigit}></Keyboard>
                </div>

            </div>
        </div>
    );
}
export default CustomerManagement;