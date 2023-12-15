import React from "react";
import {useApplicationStore} from "~/hooks/applicationStore";
import Button from "~/components/Button";
import useCatalog from "~/hooks/useCatalog";
import BarcodeReader from 'react-barcode-reader'
import Keyboard from "~/components/Keyboard";
import SimpleNumberPad from "~/components/SimpleNumberPad";
import useProductForm from "~/hooks/useProductForm";
import useCart from "~/hooks/useCart";
import useLocalServerIntegration from "~/hooks/useLocalServerIntegration";
import {useNavigate} from "@remix-run/react";

const Admin = () => {
    const {catalog, addProduct, deleteProduct} = useCatalog();
    const [subpage, setSubpage] = React.useState("");
    const {emptyCart} = useCart()
    const [testBarcode, setTestBarcode] = React.useState("scan a barcode. it appears here");
    const navigate = useNavigate();

    const { exit, shutdown } = useLocalServerIntegration();
    const {product, onBarcode, onKeyboardDigit, onNumberPadDigit, onSave, onClear} = useProductForm(addProduct);
    const onDelete = (id: string) => {
        deleteProduct(id)
    }
    const exitFromProductPage = () => {
        onClear(); // Use the onClear function here
        setSubpage("");
    };

    const emptyCartAction = () => {
        emptyCart()
        navigate("/")
    }
    return (
        <>
            <div className={"flex-grow basis-0 "}>
                {!subpage && <>
                    <Button onClick={() => setSubpage("products")}>catalogo</Button>
                    <Button onClick={() => setSubpage("test-barcode")}>prova barcode</Button>
                    <Button onClick={emptyCartAction}>svuota carrello</Button>
                    <Button onClick={exit}>exit</Button>
                    <Button onClick={shutdown}>spegni</Button>
                    <Button onClick={() => navigate("/")}>back</Button>
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

export default Admin