import React from "react";
import CartList from "~/components/CartList";
import MultiElementTextBox from "~/components/MultiElementTextBox";
import NumberPad from "~/components/NumberPad";
import {useApplicationStore} from "~/hooks/applicationStore";
import Button from "~/components/Button";
import useCatalog from "~/hooks/useCatalog";
import useCart from "~/hooks/useCart";
import useApplicationState from "~/hooks/useApplicationState";
import TextBox from "~/components/TextBox";
import useNumpad from "~/hooks/useNumpad";
import BarcodeReader from 'react-barcode-reader'
import Keyboard from "~/components/Keyboard";
import SimpleNumberPad from "~/components/SimpleNumberPad";

const AdminPage = () => {
    const {setApplicationState} = useApplicationState()
    const {catalog, addProduct, deleteProduct} = useCatalog()
    const [subpage, setSubpage] = React.useState("")
    const [cart, setCart] = useApplicationStore('cart')


    const [product, setProduct] = React.useState({barcode: "", name: "", price: ""})

    const onKeyboardDigit = (digit: string) => {
        setProduct({...product, name: product.name + digit})
    }

    const onNumberPadDigit = (digit: string) => {
        setProduct({...product, price: product.price + digit})
    }
    const onBarcode = (barcode: string) => {
        setProduct({...product, barcode: barcode})
    }
    const onSave = () => {
        addProduct({barcode: product.barcode, name: product.name, price: parseFloat(product.price)})
        setProduct({barcode: "", name: "", price: ""})
    }

    const onDelete = (id: string) => {
        deleteProduct(id)
    }

    return (
        <>
            <div className={"flex-grow basis-0 "}>
                {!subpage && <>
                    <Button onClick={() => setApplicationState("init")}>back</Button>
                    <Button onClick={() => setSubpage("products")}>products</Button>
                </>}

                {subpage == "products" && <div className={"flex flex-col h-full"}>
                    <BarcodeReader
                        onError={(err) => console.error(err)}
                        onScan={onBarcode}
                    />

                    <div><Button onClick={() => setSubpage("")}>back</Button></div>
                    <div className={"flex-grow"}>
                    <div className={" grid grid-cols-[15ex_1fr_6ex_3em] gap-2"}>
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
                        <div className={"bg-white h-10"}>{product.barcode}</div>
                        <div className={"bg-white h-10"}>{product.name}</div>
                        <div className={"bg-white h-10"}>{product.price}</div>
                        <div><Button onClick={onSave}>Add</Button></div>
                    </div>
                    <div className={"flex"}>
                        <Keyboard onDigit={onKeyboardDigit}></Keyboard>
                        <SimpleNumberPad onDigit={onNumberPadDigit}></SimpleNumberPad>
                    </div>
                </div>}
            </div>
        </>
    )


}

export default AdminPage