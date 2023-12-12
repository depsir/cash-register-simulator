import React from "react";
import {useApplicationStore} from "~/hooks/applicationStore";
import Button from "~/components/Button";
import useCatalog from "~/hooks/useCatalog";
import useApplicationState from "~/hooks/useApplicationState";
import BarcodeReader from 'react-barcode-reader'
import Keyboard from "~/components/Keyboard";
import SimpleNumberPad from "~/components/SimpleNumberPad";

const AdminPage = () => {
    const {setApplicationState} = useApplicationState()
    const {catalog, addProduct, deleteProduct} = useCatalog()
    const [subpage, setSubpage] = React.useState("")
    const [cart, setCart] = useApplicationStore('cart')

    const [testBarcode, setTestBarcode] = React.useState("scansiona un barcode. appare qui")

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

    const exitFromProductPage = () => {
        setProduct({barcode: "", name: "", price: ""})
        setSubpage("");
    };

    const emptyCart = () => {
        setCart([])
        setApplicationState("init")
    }
    const exit = () => {
        fetch("http://localhost:8080/cgi-bin/stop-kiosk.sh")
            .then((response) => {
                // alert the result code and the result message
                alert(response.status + " " + response.statusText);
            })
            .catch((err) => {
                // alert the error if any error occurred
                alert(err);
            })
    }
    const shutdown = () => {
        fetch("http://localhost:8080/cgi-bin/shutdown.sh")
            .then((response) => {
                // alert the result code and the result message
                alert(response.status + " " + response.statusText);
            })
            .catch((err) => {
                // alert the error if any error occurred
                alert(err);
            })
    }
    return (
        <>
            <div className={"flex-grow basis-0 "}>
                {!subpage && <>
                    <Button onClick={() => setSubpage("products")}>catalogo</Button>
                    <Button onClick={() => setSubpage("test-barcode")}>prova barcode</Button>
                    <Button onClick={emptyCart}>svuota carrello</Button>
                    <Button onClick={exit}>exit</Button>
                    <Button onClick={shutdown}>spegni</Button>
                    <Button onClick={() => setApplicationState("init")}>back</Button>
                </>}

                {subpage == "test-barcode" && <div className={"flex flex-col h-full"}>
                    <BarcodeReader
                        onError={(err) => console.error(err)}
                        onScan={(barcode: string) => setTestBarcode(barcode)}
                    />
                    <div>{testBarcode}</div>
                    <div><Button onClick={() => {setTestBarcode("");setSubpage("")}}>back</Button></div>
                </div>}
                {subpage == "products" && <div className={"flex flex-col h-full"}>
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
                </div>}
            </div>
        </>
    )


}

export default AdminPage