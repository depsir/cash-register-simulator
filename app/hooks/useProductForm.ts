// Filename: useProductForm.tsx
import { useState } from 'react';
import useNumpad from "~/hooks/useNumpad";

const useProductForm = () => {
    const [barcode, setBarcode] = useState("");
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const { onDigit, onClear: onNumpadClear, onBackspace, value, onNumber } = useNumpad()

    const onBarcode = (inputBarcode: string) => {
        if (inputBarcode) {
            setBarcode(inputBarcode);
        }
    }

    const onKeyboardDigit = (digit: string) => {
        setName(name + digit);
    }

    const onNumberPadDigit = (digit: string) => {
        onDigit(digit)
    }

    const onName = (inputName: string) => {
        setName(inputName);
    }

    const onPrice = (price: string) => {
        onNumber(price)
    }

    const onClear = () => {
        setBarcode("");
        setName("");
        setId("");
        onNumpadClear()
    }

    const onKeyboardBackspace = () => {
        setName(name.slice(0, -1));
    }

    const onId = (inputId: string) => {
        setId(inputId);
    }
    console.log("product", {barcode, name, price: value, id})

    return { product: {barcode, name, price: value, id}, onBarcode, onKeyboardDigit, onNumberPadDigit, onClear, onNumberPadBackspace: onBackspace, onKeyboardBackspace, onId, onName, onPrice}
}

export default useProductForm;