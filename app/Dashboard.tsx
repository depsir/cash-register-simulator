
// a react component

import React from 'react'
import NumberPad from "~/components/NumberPad";
import {useApplicationState} from "~/hooks/applicationState";
import Button from "~/components/Button";

const Dashboard = () => {

    const [pin, setPin] = React.useState<string>("")
    const {state, setApplicationState} = useApplicationState()
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
        <div>
        <h1>App</h1>
            <Button onClick={() => setApplicationState("pin")}>DIGIT</Button>
            <div className={"text-center"}>{pin}</div>
            {state.state == "pin" && <NumberPad onEnter={onEnter} onDigit={onDigit} onClear={onClear}/>}
        </div>
    )


}

export default Dashboard
