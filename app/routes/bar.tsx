import React from "react";
import CartList from "~/components/CartList";
import MultiElementTextBox from "~/components/MultiElementTextBox";
import Button from "~/components/ui/Button";
import useCart from "~/hooks/useCart";
import {useNavigate} from '@remix-run/react'
import PaymentCash from "~/components/PaymentCash";

const bar = () => {
    const {addManualPrice, total, emptyCart} = useCart([])
    const navigate = useNavigate();
    const [subpage, setSubpage] = React.useState("")

    const onCheckout = async () => {
        emptyCart();
        setSubpage("")
    }

    return (
        <div className={"grid lg:grid-cols-[1fr_600px] grid-cols-[1fr_1fr] gap-2 w-full h-full"}>
            <div className={"flex flex-col h-full"}>
                <div className={"bg-white flex-1 p-2 drop-shadow overflow-auto basis-0 "}>
                    <CartList/>
                </div>
                <div className={"flex-none mt-2"}>
                    <MultiElementTextBox>
                        <div>Totale</div>
                        <div>{total.toFixed(2)}</div>
                    </MultiElementTextBox>
                </div>
            </div>
            <div className={"flex flex-col h-full overflow-auto"}>
                {(!subpage) && <>
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
                        <Button onClick={() => addManualPrice(1.8, "latte")}>latte</Button>
                        <Button onClick={() => addManualPrice(2.8, "biscotti")}>biscotti</Button>
                    </div>
                    <Button onClick={() => setSubpage("checkout")} icon={"checkout"}>checkout</Button>
                    <Button onClick={() => navigate("/admin", { state: { from: "/bar" } })} icon={"settings"}>admin</Button>
                </>}
                {subpage == "checkout" && <>
                    <Button onClick={() => setSubpage("payment-cash")} icon={"payment-cash"}>contanti</Button>
                    <Button onClick={() => setSubpage("")} icon={"back"}>indietro</Button>
                </>}
                {subpage == "payment-cash" && <>
                    <PaymentCash onEnter={onCheckout} onClear={() => setSubpage("")}/>
                </>}
            </div>
        </div>
    )
}

export default bar 