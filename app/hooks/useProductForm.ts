// Filename: useProductForm.tsx
import { useState } from 'react';
import useNumpad from "~/hooks/useNumpad";

const useProductForm = () => {
    const [barcode, setBarcode] = useState("");
    const [name, setName] = useState("");
    const { onDigit, onClear: onNumpadClear, onBackspace, value } = useNumpad()

    const onBarcode = (inputBarcode: string) => {
        setBarcode(inputBarcode);
    }

    const onKeyboardDigit = (digit: string) => {
        setName(name + digit);
    }

    const onNumberPadDigit = (digit: string) => {
        onDigit(digit)
    }

    const onClear = () => {
        setBarcode("");
        setName("");
        onNumpadClear()
    }

    const onKeyboardBackspace = () => {
        setName(name.slice(0, -1));
    }

    return { product: {barcode, name, price: value}, onBarcode, onKeyboardDigit, onNumberPadDigit, onClear, onNumberPadBackspace: onBackspace, onKeyboardBackspace}
}

export default useProductForm;