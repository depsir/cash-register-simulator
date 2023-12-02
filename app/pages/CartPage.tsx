import React from "react";
import CartList from "~/components/CartList";
import MultiElementTextBox from "~/components/MultiElementTextBox";
import NumberPad from "~/components/NumberPad";
import Button from "~/components/Button";
import useCart from "~/hooks/useCart";
import useApplicationState from "~/hooks/useApplicationState";
import TextBox from "~/components/TextBox";
import useNumpad from "~/hooks/useNumpad";
import BarcodeReader from 'react-barcode-reader'
import SimpleNumberPad from "~/components/SimpleNumberPad";

const CartPage = () => {
    const {setApplicationState} = useApplicationState()
    const {addProduct, total, emptyCart, cart, addManualPrice} = useCart()
    const cartListRef = React.useRef(null)

    const [subpage, setSubpage] = React.useState("")

    const {value: manualBarcode, onDigit: onManualBarcodeDigit, onClear: onManualBarcodeClearInternal, onEnter: onManualBarcodeEnterInternal} = useNumpad()
    const {value: manualPrice, onDigit: onManualPriceDigit, onClear: onManualPriceClearInternal, onEnter: onManualPriceEnterInternal} = useNumpad()
    const {value: cash, onDigit: onCashDigit, onClear: onCashClearInternal, onEnter: onCashEnterInternal} = useNumpad()
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

    React.useEffect(() => {
        if (cartListRef.current) {
            // @ts-ignore
            cartListRef.current.scrollTop = cartListRef.current.scrollHeight
        }
    }, [cart])

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
                        onError={(err) => console.error(err)}
                        onScan={addProduct}
                    />

                    <Button onClick={() => setSubpage("manual-barcode")}>barcode manuale</Button>
                    <Button onClick={() => setSubpage("manual-price")}>prezzo manuale</Button>
                    <Button onClick={() => addProduct("1")}>sacchetto</Button>
                    <Button onClick={() => setSubpage("checkout")}>checkout</Button>
                    <Button onClick={() => setApplicationState("admin")}>admin</Button>
                </>}
                {subpage == "manual-barcode" && <>
                    <TextBox>{manualBarcode}</TextBox>
                    <SimpleNumberPad onDigit={onManualBarcodeDigit}/>
                    <Button onClick={() => onManualBarcodeEnter()}>enter</Button>
                    <Button onClick={() => onManualBarcodeClear()}>clear</Button>
                </>}
                {subpage == "manual-price" && <>
                    <TextBox>{manualPrice}</TextBox>
                    <SimpleNumberPad onDigit={onManualPriceDigit}/>
                    <Button onClick={() => onManualPriceEnter()}>enter</Button>
                    <Button onClick={() => onManualPriceClear()}>clear</Button>
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