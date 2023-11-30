import React, {useEffect} from 'react'
import NumberPad from "~/components/NumberPad";
import {useApplicationStore} from "~/hooks/applicationStore";
import Button from "~/components/Button";
import CartList from "~/components/CartList";
import useCatalog from "~/hooks/useCatalog";
import useCart from "~/hooks/useCart";
import useApplicationState from "~/hooks/useApplicationState";

const Dashboard = () => {
    const {applicationState, setApplicationState} = useApplicationState()
    const {addProduct} = useCart()

    const [pin, setPin] = React.useState<string>("")
    const onDigit = (digit: string) => {
        setPin(pin + digit)
    }
    const onEnter = () => {
        addProduct(pin)
        setPin("")
        setApplicationState("init")
    }
    const onClear = () => {
        setPin("")
        setApplicationState("init")
    }
    return (
        <div className={"bg-gray-100 h-screen"}>
        <h1>App</h1>
            <div className={"flex flex-grow justify-around"}>
                <div className={"flex-grow basis-0 p-2 border-2 m-2 bg-white drop-shadow"}>
                    <CartList/>
                </div>
                <div className={"flex-grow basis-0 p-2 m-2"}>
                    {(!applicationState || applicationState == "init") && <>
                        <Button onClick={() => setApplicationState("manual-barcode")}>manual</Button>
                        <Button onClick={() => addProduct("1")}>sacchetto</Button>
                    </>}
                    {applicationState == "manual-barcode" && <>
                        <div className={"text-center h-12 border-2 p-2"}>{pin}</div>
                        <NumberPad onEnter={onEnter} onDigit={onDigit} onClear={onClear}/>
                    </>}
                </div>
            </div>
        </div>
    )


}

export default Dashboard
