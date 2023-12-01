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
import Keyboard from "~/components/Keyboard";
import CartPage from "~/pages/CartPage";
import AdminPage from "~/pages/AdminPage";

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
            <div className={"flex flex-grow justify-around h-full"}>
                {(!applicationState || applicationState == "init") && <CartPage/> }
                {(applicationState == "admin") && <AdminPage/> }

            </div>
        </div>
    )


}

export default Dashboard
