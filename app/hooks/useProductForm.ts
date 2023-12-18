// Filename: useProductForm.tsx
import { useState } from 'react';

const useProductForm = () => {
    const [product, setProduct] = useState({ barcode: "", name: "", price: ""});

    const onBarcode = (barcode: string) => {
        setProduct({...product, barcode: barcode});
    }

    const onKeyboardDigit = (digit: string) => {
        setProduct({...product, name: product.name + digit});
    }

    const onNumberPadDigit = (digit: string) => {
        setProduct({...product, price: product.price + digit});
    }


    const onClear = () => {
        setProduct({barcode: "", name: "", price: ""});
    }

    return { product, onBarcode, onKeyboardDigit, onNumberPadDigit, onClear };
}

export default useProductForm;