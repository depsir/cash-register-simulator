import { useState } from 'react';

const useProductForm = (addCustomer: any) => {
    const [customer, setCustomer] = useState({ cardNumber: "", name: ""});

    const onBarcode = (barcode: string) => {
        setCustomer({...customer, cardNumber: barcode});
    }

    const onKeyboardDigit = (digit: string) => {
        setCustomer({...customer, name: customer.name + digit});
    }


    const onSave = () => {
        addCustomer({ cardNumber: customer.cardNumber, name: customer.name });
        setCustomer({ cardNumber: "", name: ""});
    }

    const onClear = () => {
        setCustomer({cardNumber: "", name: ""});
    }

    return { customer, onBarcode, onKeyboardDigit, onSave, onClear };
}

export default useProductForm;