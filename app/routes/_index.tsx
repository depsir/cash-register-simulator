import React from "react";
import CartList from "~/components/CartList";
import MultiElementTextBox from "~/components/MultiElementTextBox";
import Button from "~/components/Button";
import useCart from "~/hooks/useCart";
import {useLoaderData, useNavigate} from '@remix-run/react'
import {LoaderFunction} from "@remix-run/node";
import {loadCatalog} from "~/loaders/catalogLoader";
import BarcodeReader from "~/components/BarcodeReader";
import ManualNumber from "~/components/ManualNumber";
import PaymentCash from "~/components/PaymentCash";
import useCustomerCard from "~/hooks/useCustomerCard";

export let loader: LoaderFunction = async () => {
    return loadCatalog()
}

const _index = () => {
    let catalog = useLoaderData();

    const {addProduct, total, emptyCart, addManualPrice, removeProduct} = useCart(catalog)
    const {customerCard, fetchCustomerCard, updatePoints, clearCustomerCard} = useCustomerCard();

    const [subpage, setSubpage] = React.useState("")

    const navigate = useNavigate();

    const earnedPoints = Math.floor(total)

    const onCustomerCard = async (cardNumber: string) => {
        if (/^[0-9]+$/.test(cardNumber)) {
            cardNumber = `CRS'CUSTOMER'${String(cardNumber).padStart(3, '0')}`;
        }
        console.log("cardNumber", cardNumber)
        await fetchCustomerCard(cardNumber)
        setSubpage("")
    }

    const onCheckout = async () => {
        if (customerCard.objectId) {
            await updatePoints(customerCard.objectId, earnedPoints)
            clearCustomerCard();
        }
        emptyCart();
    }

    return (
        <div className={"grid lg:grid-cols-[1fr_600px] grid-cols-[1fr_1fr] gap-2 w-full"}>
            <div className={"flex flex-grow flex-col"}>
                <div className={"bg-white flex-grow border-2 p-2 drop-shadow overflow-auto"}>
                    <CartList/>
                </div>
                {customerCard.objectId && <div className={"mt-2"}>
                    <MultiElementTextBox>
                        <div>cliente: {customerCard.name}</div>
                        <div>punti attuali {customerCard.points} - nuovi {earnedPoints} </div>
                    </MultiElementTextBox>
                </div>}
                <div className={"mt-2"}>
                    <MultiElementTextBox>
                        <div>Totale</div>
                        <div>{total.toFixed(2)}</div>
                    </MultiElementTextBox>
                </div>
            </div>
            <div className={"flex-grow"}>
                {(!subpage) && <>
                    <BarcodeReader
                        onScan={addProduct}
                    />

                    <Button onClick={() => setSubpage("bar")} icon={"coffee"}>bar</Button>
                    <Button onClick={() => setSubpage("manual-barcode")} icon={"barcode-scanner"}>barcode
                        manuale</Button>
                    <Button onClick={() => setSubpage("remove-product")} icon={"remove-product"}>rimuovi
                        prodotto</Button>
                    <Button onClick={() => setSubpage("manual-price")} icon={"euro"}>prezzo manuale</Button>
                    <Button onClick={() => addProduct("1")} icon={"shopping-bag"}>sacchetto</Button>
                    <Button onClick={() => setSubpage("checkout")} icon={"checkout"}>checkout</Button>
                    <Button onClick={() => setSubpage("customer-card")} icon={"membership-card"}>carta fedeltà</Button>
                    <Button onClick={() => navigate("/admin")} icon={"settings"}>admin</Button>
                </>}
                {subpage == "manual-barcode" && <>
                    <ManualNumber onEnter={addProduct} onClear={() => setSubpage("")}/>
                </>}
                {subpage == "manual-price" && <>
                    <ManualNumber onEnter={(number) => addManualPrice(parseFloat(number))}
                                  onClear={() => setSubpage("")}/>
                </>}
                {subpage == "remove-product" && <>
                    <ManualNumber onEnter={removeProduct} onClear={() => setSubpage("")} allowBarcode={true}/>
                </>}
                {subpage == "checkout" && <>
                    <Button onClick={() => setSubpage("payment-cash")} icon={"payment-cash"}>contanti</Button>
                    <Button onClick={() => setSubpage("")} icon={"back"}>indietro</Button>
                </>}
                {subpage == "payment-cash" && <>
                    <PaymentCash onEnter={onCheckout} onClear={() => setSubpage("")}/>
                </>}
                {subpage == "customer-card" && <>
                    <ManualNumber onEnter={onCustomerCard} onClear={() => setSubpage("")} allowBarcode={true}/>
                </>}
                {subpage == "bar" && <>
                    <div className="flex flex-wrap">
                        <Button onClick={() => addManualPrice(1, "caffe")}>caffe</Button>
                        <Button onClick={() => addManualPrice(1.8, "cappuccino")}>cappuccino</Button>
                        <Button onClick={() => addManualPrice(1.5, "brioche")}>brioche</Button>
                        <Button onClick={() => addManualPrice(2, "ginseng")}>ginseng</Button>
                        <Button onClick={() => addManualPrice(2.5, "cioccolata")}>cioccolata</Button>
                        <Button onClick={() => addManualPrice(2.5, "the")}>the</Button>
                        <Button onClick={() => addManualPrice(2, "caffe speciale")}>caffe speciale</Button>
                        <Button onClick={() => addManualPrice(3, "succo")}>succo</Button>
                        <Button onClick={() => addManualPrice(1, "acqua")}>acqua</Button>
                        <Button onClick={() => addManualPrice(2, "bibita")}>bibita</Button>
                        <Button onClick={() => addManualPrice(3.5, "torta")}>torta</Button>
                        <Button onClick={() => addManualPrice(5, "panino")}>panino</Button>
                    </div>
                    <Button onClick={() => setSubpage("")} icon={"back"}>indietro</Button>
                </>
                }
            </div>
        </div>
    )


}

export default _index