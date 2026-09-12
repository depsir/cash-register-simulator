import { useState } from 'react';
import { normalizeCardNumber } from '~/utils/utils';

const useProductForm = () => {
    const [customer, setCustomer] = useState({ cardNumber: "", name: ""});

    const onBarcode = (barcode: string) => {
        setCustomer({...customer, cardNumber: normalizeCardNumber(barcode)});
    }

    const onKeyboardDigit = (digit: string) => {
        setCustomer({...customer, name: customer.name + digit});
    }

    const onClear = () => {
        setCustomer({cardNumber: "", name: ""});
    }

    const onKeyboardBackspace = () => {
        setCustomer({...customer, name: customer.name.slice(0, -1)});
    }

    return { customer, onBarcode, onKeyboardDigit, onClear, onKeyboardBackspace };
}

export default useProductForm;