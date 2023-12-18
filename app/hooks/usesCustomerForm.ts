import { useState } from 'react';

const useProductForm = () => {
    const [customer, setCustomer] = useState({ cardNumber: "", name: ""});

    const onBarcode = (barcode: string) => {
        setCustomer({...customer, cardNumber: barcode});
    }

    const onKeyboardDigit = (digit: string) => {
        setCustomer({...customer, name: customer.name + digit});
    }

    const onClear = () => {
        setCustomer({cardNumber: "", name: ""});
    }

    return { customer, onBarcode, onKeyboardDigit, onClear };
}

export default useProductForm;