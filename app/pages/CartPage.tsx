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

const CartPage = () => {
    const {applicationState, setApplicationState} = useApplicationState()
    const {addProduct, total, emptyCart} = useCart()

    const [subpage, setSubpage] = React.useState("")

    const {value: manualBarcode, onDigit: onManualBarcodeDigit, onClear: onManualBarcodeClearInternal, onEnter: onManualBarcodeEnterInternal} = useNumpad()
    const {value: cash, onDigit: onCashDigit, onClear: onCashClearInternal, onEnter: onCashEnterInternal} = useNumpad()
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
            <div className={"flex-grow basis-0 m-2 flex-col"}>
                <div className={"bg-white border-2 p-2 drop-shadow"}>
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
                        onError={(err) => console.error(err)}
                        onScan={addProduct}
                    />

                    <Button onClick={() => setSubpage("manual-barcode")}>manual</Button>
                    <Button onClick={() => addProduct("1")}>sacchetto</Button>
                    <Button onClick={() => setSubpage("checkout")}>checkout</Button>
                    <Button onClick={() => setApplicationState("admin")}>admin</Button>
                </>}
                {subpage == "manual-barcode" && <>
                    <TextBox>{manualBarcode}</TextBox>
                    <NumberPad onEnter={onManualBarcodeEnter} onDigit={onManualBarcodeDigit} onClear={onManualBarcodeClear}/>
                </>}
                {subpage == "checkout" && <>
                    <Button onClick={() => setSubpage("payment-cash")}>contanti</Button>
                </>}
                {subpage == "payment-cash" && <>
                    <MultiElementTextBox>
                        <div>{cash}</div>
                        <div>resto</div>
                        <div>{(cash-total).toFixed(2)}</div>
                    </MultiElementTextBox>
                    <NumberPad onEnter={onCashEnter} onDigit={onCashDigit} onClear={onCashClear}/>
                </>}
            </div>
           </>
    )


}

export default CartPage