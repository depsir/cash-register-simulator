
// a react component

import React, {useEffect} from 'react'
import NumberPad from "~/components/NumberPad";
import {useApplicationState} from "~/hooks/applicationState";
import Button from "~/components/Button";
import CartList from "~/components/CartList";
import useCatalog from "~/hooks/useCatalog";

const Dashboard = () => {
    useCatalog()

    const [pin, setPin] = React.useState<string>("")
    const {state, setApplicationState, addProduct} = useApplicationState()
    const onDigit = (digit: string) => {
        setPin(pin + digit)
    }
    const onEnter = () => {
        alert(pin)
    }
    const onClear = () => {
        setPin("")
    }
    return (
        <div className={"bg-gray-100 h-screen"}>
        <h1>App</h1>
            <div className={"flex flex-grow justify-around"}>
                <div className={"flex-grow basis-0 p-2 border-2 m-2 bg-white drop-shadow"}>
                    <CartList/>
                </div>
                <div className={"flex-grow basis-0 p-2 m-2"}>
                    <Button onClick={() => setApplicationState("pin")}>DIGIT</Button>
                    <Button onClick={() => addProduct("1")}>sacchetto</Button>
                    <div className={"text-center"}>{pin}</div>
                    {state.state == "pin" && <NumberPad onEnter={onEnter} onDigit={onDigit} onClear={onClear}/>}
                </div>
            </div>
        </div>
    )


}

export default Dashboard
