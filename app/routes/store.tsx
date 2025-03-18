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
export const config = { runtime: "nodejs", regions: ["fra1"], maxDuration: 30 };

const store = () => {
    let catalog = useLoaderData();
    const {addProduct, total, emptyCart, addManualPrice, removeProduct} = useCart(catalog)
    const {customerCard, fetchCustomerCard, updatePoints, clearCustomerCard} = useCustomerCard();
    const [subpage, setSubpage] = React.useState("")
    const navigate = useNavigate();
    const earnedPoints = Math.floor(total)

    const onCustomerCard = async (cardNumber: string) => {
        if (/^[0-9]+$/.test(cardNumber)) {
            cardNumber = `CRS-CUSTOMER-${String(cardNumber).padStart(3, '0')}`;
        }
        console.log("cardNumber", cardNumber)
        await fetchCustomerCard(cardNumber)
        setSubpage("")
    }

    const onCheckout = async () => {
        if (customerCard.id) {
            await updatePoints(customerCard.id, earnedPoints)
        }
        clearCustomerCard();
        emptyCart();
        setSubpage("")
    }

    return (
        <div className={"grid lg:grid-cols-[1fr_600px] grid-cols-[1fr_1fr] gap-2 w-full h-full"}>
            <div className={"flex flex-col h-full"}>
                <div className={"bg-white flex-1 p-2 drop-shadow overflow-auto"}>
                    <CartList/>
                </div>
                <div className={"flex-none mt-2"}>
                    <MultiElementTextBox>
                        <div>Totale</div>
                        <div>{total.toFixed(2)}</div>
                    </MultiElementTextBox>
                    {customerCard.id && <div className={"mt-2"}>
                        <MultiElementTextBox>
                            <div>cliente: {customerCard.name}</div>
                            <div>punti attuali {customerCard.points} - nuovi {earnedPoints} </div>
                        </MultiElementTextBox>
                    </div>}
                </div>
            </div>
            <div className={"flex flex-col h-full overflow-auto"}>
                {(!subpage) && <>
                    <BarcodeReader
                        onScan={addProduct}
                        active={!subpage}
                    />

                    <Button onClick={() => setSubpage("manual-barcode")} icon={"barcode-scanner"}>barcode
                        manuale</Button>
                    <Button onClick={() => setSubpage("remove-product")} icon={"remove-product"}>rimuovi
                        prodotto</Button>
                    <Button onClick={() => setSubpage("manual-price")} icon={"euro"}>prezzo manuale</Button>
                    <Button onClick={() => addProduct("1")} icon={"shopping-bag"}>sacchetto</Button>
                    <Button onClick={() => setSubpage("checkout")} icon={"checkout"}>checkout</Button>
                    <Button onClick={() => setSubpage("customer-card")} icon={"membership-card"}>carta fedeltà</Button>
                    <Button onClick={() => navigate("/admin", { state: { from: "/store" } })} icon={"settings"}>admin</Button>
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
            </div>
        </div>
    )
}

export default store 