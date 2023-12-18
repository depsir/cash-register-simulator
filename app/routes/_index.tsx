import React from "react";
import CartList from "~/components/CartList";
import MultiElementTextBox from "~/components/MultiElementTextBox";
import Button from "~/components/Button";
import useCart from "~/hooks/useCart";
import TextBox from "~/components/TextBox";
import useNumpad from "~/hooks/useNumpad";
import SimpleNumberPad from "~/components/SimpleNumberPad";
import {useLoaderData, useNavigate} from '@remix-run/react'
import {LoaderFunction} from "@remix-run/node";
import {loadCatalog} from "~/loaders/catalogLoader";
import BarcodeReader from "~/components/BarcodeReader";
export let loader: LoaderFunction = async () => {
    return loadCatalog()
}

const _index = () => {
    let catalog = useLoaderData();

    const {addProduct, total, emptyCart, addManualPrice} = useCart(catalog)
    const cartListRef = React.useRef(null)

    const [subpage, setSubpage] = React.useState("")

    const {value: manualBarcode, onDigit: onManualBarcodeDigit, onClear: onManualBarcodeClearInternal, onEnter: onManualBarcodeEnterInternal} = useNumpad()
    const {value: manualPrice, onDigit: onManualPriceDigit, onClear: onManualPriceClearInternal, onEnter: onManualPriceEnterInternal} = useNumpad()
    const {value: cash, onDigit: onCashDigit, onClear: onCashClearInternal, onEnter: onCashEnterInternal} = useNumpad()
    const navigate = useNavigate();

    const onManualPriceEnter = () => {
        addManualPrice(parseFloat(manualPrice))
        onManualPriceEnterInternal()
        setSubpage("")
    }
    const onManualPriceClear = () => {
        onManualPriceClearInternal()
        setSubpage("")
    }
    const onManualBarcodeEnter = () => {
        addProduct(manualBarcode)
        onManualBarcodeEnterInternal()
        setSubpage("")
    }
    const onCashEnter = () => {
        onCashEnterInternal()
        emptyCart()
        setSubpage("")
    }

    const onManualBarcodeClear = () => {
        onManualBarcodeClearInternal()
        setSubpage("")
    }

    const onCashClear = () => {
        onCashClearInternal()
        setSubpage("")
    }


    return (
        <>
            <div className={"flex-grow flex basis-0 m-2 flex-col"}>
                <div ref={cartListRef} className={"bg-white flex-grow border-2 p-2 drop-shadow overflow-auto"}>
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
                    <TextBox>{manualBarcode}</TextBox>
                    <SimpleNumberPad onDigit={onManualBarcodeDigit}/>
                    <Button onClick={() => onManualBarcodeEnter()} icon={"check"}>enter</Button>
                    <Button onClick={() => onManualBarcodeClear()} icon={"close"}>clear</Button>
                </>}
                {subpage == "manual-price" && <>
                    <TextBox>{manualPrice}</TextBox>
                    <SimpleNumberPad onDigit={onManualPriceDigit}/>
                    <Button onClick={() => onManualPriceEnter()} icon={"check"}>enter</Button>
                    <Button onClick={() => onManualPriceClear()} icon={"close"}>clear</Button>
                </>}
                {subpage == "checkout" && <>
                    <Button onClick={() => setSubpage("payment-cash")} icon={"payment-cash"}>contanti</Button>
                    <Button onClick={() => setSubpage("")} icon={"back"}>indietro</Button>
                </>}
                {subpage == "payment-cash" && <>
                    <MultiElementTextBox>
                        <div>{cash}</div>
                        <div>resto</div>
                        <div>{(cash-total).toFixed(2)}</div>
                    </MultiElementTextBox>
                    <SimpleNumberPad onDigit={onCashDigit}/>
                    <Button onClick={onCashEnter} icon={"check"}>ok</Button>
                    <Button onClick={onCashClear} icon={"close"}>indietro</Button>


                </>}
            </div>
           </>
    )


}

export default _index