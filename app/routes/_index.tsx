import React from "react";
import CartList from "~/components/CartList";
import MultiElementTextBox from "~/components/MultiElementTextBox";
import Button from "~/components/Button";
import useCart from "~/hooks/useCart";
import useNumpad from "~/hooks/useNumpad";
import SimpleNumberPad from "~/components/SimpleNumberPad";
import {useLoaderData, useNavigate} from '@remix-run/react'
import {LoaderFunction} from "@remix-run/node";
import {loadCatalog} from "~/loaders/catalogLoader";
import BarcodeReader from "~/components/BarcodeReader";
import {ManualBarcode} from "~/components/ManualBarcode";
import ManualPrice from "~/components/ManualPrice";
import PaymentCash from "~/components/PaymentCash";

export let loader: LoaderFunction = async () => {
    return loadCatalog()
}

const _index = () => {
    let catalog = useLoaderData();

    const {addProduct, total, emptyCart, addManualPrice} = useCart(catalog)

    const [subpage, setSubpage] = React.useState("")

    const navigate = useNavigate();

    return (
        <>
            <div className={"flex-grow flex basis-0 m-2 flex-col"}>
                <div className={"bg-white flex-grow border-2 p-2 drop-shadow overflow-auto"}>
                    <CartList/>
                </div>
                <div className={"mt-2"}>
                    <MultiElementTextBox>
                        <div>Totale</div>
                        <div>{total.toFixed(2)}</div>
                    </MultiElementTextBox>
                </div>
            </div>
            <div className={"flex-grow basis-0 "}>
                {(!subpage) && <>
                    <BarcodeReader
                        onScan={addProduct}
                    />

                    <Button onClick={() => setSubpage("manual-barcode")} icon={"barcode-scanner"}>barcode manuale</Button>
                    <Button onClick={() => setSubpage("manual-price")} icon={"euro"}>prezzo manuale</Button>
                    <Button onClick={() => addProduct("1")} icon={"shopping-bag"}>sacchetto</Button>
                    <Button onClick={() => setSubpage("checkout")} icon={"checkout"}>checkout</Button>
                    <Button onClick={() => navigate("/admin")} icon={"settings"}>admin</Button>
                </>}
                {subpage == "manual-barcode" && <>
                   <ManualBarcode onEnter={addProduct} onClear={() => setSubpage("")}/>
                </>}
                {subpage == "manual-price" && <>
                    <ManualPrice onEnter={addManualPrice} onClear={() => setSubpage("")} />
                </>}
                {subpage == "checkout" && <>
                    <Button onClick={() => setSubpage("payment-cash")} icon={"payment-cash"}>contanti</Button>
                    <Button onClick={() => setSubpage("")} icon={"back"}>indietro</Button>
                </>}
                {subpage == "payment-cash" && <>
                    <PaymentCash onEnter={emptyCart} onClear={() => setSubpage("")}/>
                </>}
            </div>
           </>
    )


}

export default _index