import React from 'react';
import useProductForm from "~/hooks/useProductForm";
import useCatalog from "~/hooks/useCatalog";
import {useNavigate} from "@remix-run/react";
import Button from "~/components/Button";
import Keyboard from "~/components/Keyboard";
import SimpleNumberPad from "~/components/SimpleNumberPad";
import BarcodeReader from 'react-barcode-reader'

interface ProductsProps {
    subpage: string,
    onBarcode: (data: any) => void,
    exitFromProductPage: () => void,
    catalog: Array<any>,
    onDelete: (id: string) => void,
    product: any,
    onSave: () => void,
    onKeyboardDigit: (digit: string) => void,
    onNumberPadDigit: (digit: string) => void,
}

const Products : React.FC<ProductsProps> = () => {
    const {catalog, addProduct, deleteProduct} = useCatalog();

    const navigate = useNavigate();
    const {product, onBarcode, onKeyboardDigit, onNumberPadDigit, onSave, onClear} = useProductForm(addProduct);
    const onDelete = (id: string) => {
        deleteProduct(id)
    }
    const exitFromProductPage = () => {
        onClear(); // Use the onClear function here
        navigate("/admin")
    };

    return (
         <div className={"flex flex-col h-full w-full"}>
            <BarcodeReader
                onError={(err) => console.error(err)}
                onScan={onBarcode}
            />
            <div><Button onClick={exitFromProductPage}>back</Button></div>
            <div className={"flex-grow flex-shrink overflow-auto min-h-0"}>
                <div className={"grid grid-cols-[15ex_1fr_6ex_3em] gap-2"}>
                    {catalog.map((product: any) => {
                        return <React.Fragment key={product.objectId}>
                            <div>{product.barcode}</div>
                            <div>{product.name}</div>
                            <div>{product.price}</div>
                            <div><Button onClick={() => onDelete(product.objectId)}>X</Button></div>
                        </React.Fragment>
                    })}
                </div>
            </div>
            <div className={" grid grid-cols-[15ex_1fr_6ex_3em] gap-2"}>
                <div className={"bg-white h-[3ex] leading-[3ex]"}>{product.barcode}</div>
                <div className={"bg-white h-[3ex] leading-[3ex]"}>{product.name}</div>
                <div className={"bg-white h-[3ex] leading-[3ex]"}>{product.price}</div>
                <div><Button onClick={onSave}>Add</Button></div>
            </div>
            <div className={"flex"}>
                <Keyboard onDigit={onKeyboardDigit}></Keyboard>
                <SimpleNumberPad onDigit={onNumberPadDigit}></SimpleNumberPad>
            </div>
        </div>
    );
}

export default Products;