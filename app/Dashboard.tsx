import React, {useEffect} from 'react'
import NumberPad from "~/components/NumberPad";
import {useApplicationStore} from "~/hooks/applicationStore";
import Button from "~/components/Button";
import CartList from "~/components/CartList";
import useCatalog from "~/hooks/useCatalog";
import useCart from "~/hooks/useCart";
import useApplicationState from "~/hooks/useApplicationState";
import TextBox from "~/components/TextBox";
import MultiElementTextBox from "~/components/MultiElementTextBox";
import useNumpad from "~/hooks/useNumpad";
import BarcodeReader from 'react-barcode-reader'

const Dashboard = () => {
    const {applicationState, setApplicationState} = useApplicationState()
    const {addProduct, total, emptyCart} = useCart()

    const {value: manualBarcode, onDigit: onManualBarcodeDigit, onClear: onManualBarcodeClear, onEnter: onManualBarcodeEnterInternal} = useNumpad("init")
    const {value: cash, onDigit: onCashDigit, onClear: onCashClear, onEnter: onCashEnterInternal} = useNumpad("checkout")
    const onManualBarcodeEnter = () => {
        addProduct(manualBarcode)
        onManualBarcodeEnterInternal()
    }
    const onCashEnter = () => {
        onCashEnterInternal()
        emptyCart()
        setApplicationState("init")
    }
    return (
        <div className={"bg-gray-100 h-screen p-2"}>
        <h1>App</h1>
            <div className={"flex flex-grow justify-around"}>
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
                    {(!applicationState || applicationState == "init") && <>
                        <BarcodeReader
                            onError={(err) => console.error(err)}
                            onScan={addProduct}
                        />

                        <Button onClick={() => setApplicationState("manual-barcode")}>manual</Button>
                        <Button onClick={() => addProduct("1")}>sacchetto</Button>
                        <Button onClick={() => setApplicationState("checkout")}>checkout</Button>
                    </>}
                    {applicationState == "manual-barcode" && <>
                        <TextBox>{manualBarcode}</TextBox>
                        <NumberPad onEnter={onManualBarcodeEnter} onDigit={onManualBarcodeDigit} onClear={onManualBarcodeClear}/>
                    </>}
                    {applicationState == "checkout" && <>
                        <Button onClick={() => setApplicationState("payment-cash")}>contanti</Button>
                    </>}
                    {applicationState == "payment-cash" && <>
                        <MultiElementTextBox>
                            <div>{cash}</div>
                            <div>resto</div>
                            <div>{(cash-total).toFixed(2)}</div>
                        </MultiElementTextBox>
                        <NumberPad onEnter={onCashEnter} onDigit={onCashDigit} onClear={onCashClear}/>
                    </>}
                </div>
            </div>
        </div>
    )


}

export default Dashboard
