import React from "react";
import CartList from "~/components/CartList";
import MultiElementTextBox from "~/components/MultiElementTextBox";
import Button from "~/components/Button";
import useCart from "~/hooks/useCart";
import {useLoaderData, useNavigate} from '@remix-run/react'
import {LoaderFunction} from "@remix-run/node";
import {loadCatalog} from "~/loaders/catalogLoader";
import BarcodeReader from "~/components/BarcodeReader";
import {ManualBarcode} from "~/components/ManualBarcode";
import ManualPrice from "~/components/ManualPrice";
import PaymentCash from "~/components/PaymentCash";
import ScanCustomerCard from "~/components/ScanCustomerCard";
import useCustomerCard from "~/hooks/useCustomerCard";

export let loader: LoaderFunction = async () => {
    return loadCatalog()
}

const _index = () => {
    let catalog = useLoaderData();

    const {addProduct, total, emptyCart, addManualPrice} = useCart(catalog)
    const {customerCard, fetchCustomerCard, updatePoints, clearCustomerCard} = useCustomerCard();

    const [subpage, setSubpage] = React.useState("")

    const navigate = useNavigate();

    const earnedPoints = Math.floor(total)

    const onCustomerCard = async (cardNumber: string) => {
        await fetchCustomerCard(cardNumber)
    }

    const onCheckout = async () => {
        if (customerCard.objectId) {
            await updatePoints(customerCard.objectId, earnedPoints)
            clearCustomerCard();
        }
        emptyCart();
    }

    return (
        <>
            <div className={"flex-grow flex basis-0 m-2 flex-col"}>
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
            <div className={"flex-grow basis-0 "}>
                {(!subpage) && <>
                    <BarcodeReader
                        onScan={addProduct}
                    />

                    <Button onClick={() => setSubpage("manual-barcode")} icon={"barcode-scanner"}>barcode manuale</Button>
                    <Button onClick={() => setSubpage("manual-price")} icon={"euro"}>prezzo manuale</Button>
                    <Button onClick={() => addProduct("1")} icon={"shopping-bag"}>sacchetto</Button>
                    <Button onClick={() => setSubpage("checkout")} icon={"checkout"}>checkout</Button>
                    <Button onClick={() => setSubpage("customer-card")} icon={"membership-card"}>carta fedeltà</Button>
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
                    <PaymentCash onEnter={onCheckout} onClear={() => setSubpage("")}/>
                </>}
                {subpage == "customer-card" && <>
                    <ScanCustomerCard onEnter={onCustomerCard} onClear={() => setSubpage("")}/>
                </>}
            </div>
           </>
    )


}

export default _index