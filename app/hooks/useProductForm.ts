// Filename: useProductForm.tsx
import { useState } from 'react';
import useNumpad from "~/hooks/useNumpad";

const useProductForm = () => {
    const [product, setProduct] = useState({ barcode: "", name: ""});
    const { onDigit, onClear: onNumpadClear, onBackspace, value } = useNumpad()

    const onBarcode = (barcode: string) => {
        setProduct({...product, barcode: barcode});
    }

    const onKeyboardDigit = (digit: string) => {
        setProduct({...product, name: product.name + digit});
    }

    const onNumberPadDigit = (digit: string) => {
        onDigit(digit)
    }


    const onClear = () => {
        setProduct({barcode: "", name: ""});
        onNumpadClear()
    }


    return { product: {...product, price: value}, onBarcode, onKeyboardDigit, onNumberPadDigit, onClear, onNumberPadBackspace: onBackspace}
}

export default useProductForm;